# Hosting Next Chapter on nextchaptercv.com

## Quick decision guide

| Option | Cost/mo | Ease | Verdict |
|--------|---------|------|---------|
| **Railway** (app + Postgres, one bill) | ~$8–10 (or ~$5 with free Neon DB) | ★★★★★ | **Recommended** |
| **Render** (web) + free Neon Postgres | ~$7 | ★★★★ | Great alternative |
| Vercel (free) + free Neon Postgres | $0 | ★★★★★ | Also excellent, if you want $0 |
| Namecheap shared hosting (cPanel) | ~$3–6 | ✗ | **Doesn't work** — it's PHP/WordPress oriented; this app is Next.js (Node) + PostgreSQL and needs a build step + API server |
| Namecheap VPS | ~$9+ | ★★ | Works, but you'd be the sysadmin (nginx, PM2/Docker, SSL, backups) — hardest to maintain |

**Best combo: keep Namecheap for the domain** (you already have it) and host the app on Railway. Pointing Namecheap's DNS to Railway is free and takes 5 minutes in the Namecheap dashboard.

You'll use the same 2 files regardless of host:
- **`schema.sql`** — paste once into your database's SQL editor
- **`DATABASE_URL`** — one environment variable pointing at your Postgres

---

## STEP 0 — Push your code to GitHub (any host)

```bash
git init
git add .
git commit -m "Next Chapter — AI CV platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nextchapter.git
git push -u origin main
```

(The included `.gitignore` keeps `.env` out of the repo.)

---

## OPTION A — RAILWAY (recommended, ~$5–10/mo, everything in one dashboard)

1. **Sign up** at https://railway.app using your GitHub account.
2. **New Project → Deploy from GitHub repo** → select your `nextchapter` repo.
   - Keep the default provider (Nixpacks). It auto-detects Next.js
     (build: `next build`, start: `next start`).
3. **Add the database:** project screen → **"+ New" → "Database" → "PostgreSQL"**
   → pick **512 MB / 10 GB** → **Provision**.
4. **Get the connection string:** click the PostgreSQL service → **Connect** tab
   → **Generate** → copy the connection string it creates.
5. **Connect the app:** click your web service → **Variables** tab → add
   `DATABASE_URL` = the string from step 4 → save. The service redeploys automatically.
6. **Create the tables:** PostgreSQL service → **"Query" tab** → paste the entire
   contents of **`schema.sql`** → run. You should see 4 tables.
7. **Test it:** web service → **Settings → Networking → "Generate Domain"** →
   open the `https://xxx.up.railway.app` URL. Your site should load. 🎉
8. **Add your domain:** same Networking tab → **"Add Domain"** → enter
   `nextchaptercv.com`. Railway will display the exact DNS records you need.
9. **Point Namecheap's DNS:** Namecheap → **Domain List → nextchaptercv.com → Manage
   → Advanced DNS**:
   - Delete any existing A records for host `@` (Namecheap's default "parking" records).
   - **A record:** host `@`, value = the IP Railway displayed → Auto TTL.
   - **CNAME:** host `www`, target = your `xxx.up.railway.app` domain → Auto TTL.
   - Save. Wait 5–30 minutes. Railway's dashboard turns green = connected, and
     Railway automatically provisions free SSL (HTTPS).
10. Done: **https://nextchaptercv.com** is live. Every future `git push` to `main`
    auto-deploys a new version.

> **If the build fails** on Railway: web service → Settings → Deploy → set
> Build Command = `npm run build` and Start Command = `next start -p $PORT`.

### Staying at ~$5/mo
Railway Hobby ($5/mo, includes $5 usage credit) + Railway Postgres (~$5) ≈ $8–10/mo.
To keep it at **~$5/mo**, use a **free** Postgres instead: create a project at
**neon.tech**, run `schema.sql` in its SQL editor, and put that connection string in
`DATABASE_URL`. Your traffic is tiny — the free tier is more than enough.

---

## OPTION B — RENDER (alternative, ~$7–14/mo)

1. **Push to GitHub** (Step 0).
2. Go to https://render.com → sign in with GitHub → **New → Web Service** →
   connect your repo. It auto-detects Next.js (Build: `npm run build`, Start: `npm start`).
3. Choose the **Starter plan ($7/mo)** and deploy.
4. **Database (pick one):**
   - **Free:** create a project at **neon.tech** → run `schema.sql` in its SQL editor → copy the connection string.
   - **Paid:** Render → New → **PostgreSQL** ($7/mo) → run `schema.sql` in its Query tab → copy the connection string.
5. **Connect:** Web Service → **Environment** tab → add `DATABASE_URL` = your string →
   save (triggers a redeploy).
6. **Domain:** Web Service → **Settings → Domains → Add Domain** →
   `nextchaptercv.com` (+ `www.nextchaptercv.com`). Render shows you the DNS records.
7. **Namecheap DNS:** Advanced DNS →
   - **A record** `@` → the IP Render gives you (or a CNAME if Render offers one)
   - **CNAME** `www` → your `xxx.onrender.com` service domain
   - Remove old parking records. HTTPS certificate is issued automatically.

---

## OPTION C — VERCEL (free, if you change your mind)

1. Push to GitHub → vercel.com → import repo (auto-detects Next.js).
2. Env var `DATABASE_URL` = free **neon.tech** connection string (run `schema.sql` there).
3. Settings → Domains → add `nextchaptercv.com` → DNS at Namecheap:
   - A record `@` → `76.76.21.21`
   - CNAME `www` → `cname.vercel-dns.com`

---

## Paystack (your payments)

Your existing Paystack links already work on any domain — no code change needed:

- Weekly ₦7,000 → `https://paystack.shop/pay/20knk7t8-x`
- Monthly ₦20,000 → `https://paystack.shop/pay/sib3xbc6ly`

They live in `src/components/DocumentStudio.tsx` (search `PAYSTACK_LINKS`).
Optional upgrade: create branded payment pages in the Paystack dashboard (they'll show
nextchaptercv.com as the merchant) and swap the two links.

## After launch — check your data

In your Neon/Railway/Render database console you can inspect:
- `subscriptions` — every checkout attempt (plan, amount, email)
- `leads` — free playbook signups
- `documents` — every generated CV (with ATS score)

## Production notes (worth doing later)

- The **"I've Paid — Start My Download"** button trusts the customer's confirmation.
  For bulletproof verification, integrate Paystack Inline JS and verify the `reference`
  server-side with your Paystack Secret Key, then mark the user paid in the
  `subscriptions` table.
- Set the optional `OPENAI_API_KEY` env var on your host for smarter AI generation.
- Backups: Railway/Neon/Render all have one-click backup options on their dashboards.
