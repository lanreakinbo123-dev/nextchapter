import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { eq, sql, and } from "drizzle-orm";
import { pendingExports } from "@/db/schema";
import { createCvDocx, createDocxBuffer } from "@/lib/docx-builder";
import { buildCvPdfBuffer, buildPlainPdfBuffer } from "@/lib/pdf-generator";
import { CvData, CvTemplateId } from "@/lib/cv-templates";

interface PendingExport {
  buffer: Buffer;
  filename: string;
  contentType: string;
  expiresAt: number;
}

// Fallback cache (used only if the database is temporarily unreachable)
const memoryCache = new Map<string, PendingExport>();

const MIME: Record<string, string> = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const TTL_MS = 10 * 60 * 1000; // 10 minutes

function newToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function storeInDb(token: string, item: PendingExport): Promise<void> {
  // Purge expired rows
  await db
    .delete(pendingExports)
    .where(sql`${pendingExports.expiresAt} < now()`)
    .catch(() => undefined);

  await db.insert(pendingExports).values({
    token,
    filename: item.filename,
    contentType: item.contentType,
    fileData: item.buffer.toString("base64"),
    expiresAt: new Date(item.expiresAt),
  });
}

async function fetchFromDb(
  token: string
): Promise<{ buffer: Buffer; filename: string; contentType: string } | null> {
  const rows = await db
    .select()
    .from(pendingExports)
    .where(
      and(eq(pendingExports.token, token), sql`${pendingExports.expiresAt} > now()`)
    );
  if (!rows.length) return null;
  // Single-use: remove after delivery
  await db.delete(pendingExports).where(eq(pendingExports.id, rows[0].id)).catch(() => undefined);
  return {
    buffer: Buffer.from(rows[0].fileData, "base64"),
    filename: rows[0].filename,
    contentType: rows[0].contentType,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const format = body.format === "docx" ? "docx" : "pdf";

    let buffer: Buffer;
    let filename: string;

    if (body.cvData) {
      const data = body.cvData as CvData;
      const template = (body.template || "clean") as CvTemplateId;
      if (format === "pdf") {
        buffer = buildCvPdfBuffer(data, template);
      } else {
        buffer = await createCvDocx(data, template);
      }
      const safeName = (data.fullName || "CV").replace(/[^a-zA-Z0-9_\-\s]/g, "").replace(/\s+/g, "_");
      filename = `${safeName}_CV_${template}.${format}`;
    } else if (body.content) {
      const title = body.title || "Next_Chapter_Document";
      const safeTitle = title.replace(/[^a-zA-Z0-9_\-\s]/g, "").replace(/\s+/g, "_");
      if (format === "pdf") {
        buffer = buildPlainPdfBuffer(title, body.content);
      } else {
        buffer = await createDocxBuffer(title, body.content);
      }
      filename = `${safeTitle}.${format}`;
    } else {
      return NextResponse.json({ error: "Nothing to export" }, { status: 400 });
    }

    const token = newToken();
    const item: PendingExport = {
      buffer,
      filename,
      contentType: MIME[format],
      expiresAt: Date.now() + TTL_MS,
    };

    // Persist to DB so the GET works on any Vercel instance; fall back to memory
    try {
      await storeInDb(token, item);
    } catch (dbErr) {
      console.warn("DB store failed, using in-memory cache:", dbErr);
      memoryCache.set(token, item);
    }

    return NextResponse.json({ token, filename });
  } catch (error) {
    console.error("Export prep failed:", error);
    return NextResponse.json({ error: "Failed to prepare your file. Please try again." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  let item: { buffer: Buffer; filename: string; contentType: string } | null = null;

  if (token) {
    try {
      item = await fetchFromDb(token);
    } catch (dbErr) {
      console.warn("DB fetch failed, using in-memory cache:", dbErr);
    }
    if (!item) {
      const mem = memoryCache.get(token);
      if (mem && mem.expiresAt > Date.now()) {
        item = mem;
        memoryCache.delete(token);
      }
    }
  }

  if (!item) {
    return NextResponse.json(
      { error: "File link expired. Please click download again." },
      { status: 410 }
    );
  }

  return new NextResponse(new Uint8Array(item.buffer), {
    status: 200,
    headers: {
      "Content-Type": item.contentType,
      "Content-Disposition": `attachment; filename="${item.filename}"`,
      "Content-Length": String(item.buffer.length),
      "Cache-Control": "no-store",
    },
  });
}
