import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  documentType: text("document_type").notNull(), // 'cv' | 'cover_letter' | 'personal_statement'
  fullName: text("full_name").notNull(),
  email: text("email"),
  targetRole: text("target_role").notNull(),
  targetCompany: text("target_company"),
  experienceLevel: text("experience_level").default("entry"), // 'entry' | 'mid' | 'senior' | 'graduate_trainee'
  content: text("content").notNull(),
  atsScore: integer("ats_score").default(92),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  plan: text("plan").notNull(), // 'weekly' | 'monthly'
  amount: integer("amount").notNull(), // 7000 | 20000
  currency: text("currency").default("NGN").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name").notNull(),
  paymentMethod: text("payment_method").default("paystack").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  phone: text("phone"),
  careerInterest: text("career_interest"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Short-lived generated files (PDF / DOCX) for secure token downloads
export const pendingExports = pgTable("pending_exports", {
  id: serial("id").primaryKey(),
  token: text("token").unique().notNull(),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  fileData: text("file_data").notNull(), // base64-encoded file
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});
