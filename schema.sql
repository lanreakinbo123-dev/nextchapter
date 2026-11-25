-- =============================================================
-- Next Chapter (nextchaptercv.com) — Database Schema
-- Run this ONCE in your Neon / Supabase / Railway SQL editor.
-- Safe to re-run (uses IF NOT EXISTS).
-- =============================================================

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  document_type TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  target_role TEXT NOT NULL,
  target_company TEXT,
  experience_level TEXT DEFAULT 'entry',
  content TEXT NOT NULL,
  ats_score INTEGER DEFAULT 92,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  plan TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'NGN' NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  payment_method TEXT DEFAULT 'paystack' NOT NULL,
  status TEXT DEFAULT 'active' NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  career_interest TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS pending_exports (
  id SERIAL PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  filename TEXT NOT NULL,
  content_type TEXT NOT NULL,
  file_data TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMP NOT NULL
);
