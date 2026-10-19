import { neon } from '@neondatabase/serverless'

// DATABASE_URL comes from the Neon connection string, set as an
// environment variable in Vercel (Settings → Environment Variables)
// and pulled locally with `vercel env pull .env.local`.
const sql = neon(process.env.DATABASE_URL)

let tableReady = null

// Creates the songs table on first use. Safe to call on every request —
// CREATE TABLE IF NOT EXISTS is a no-op once the table exists.
export async function ensureTable() {
  if (!tableReady) {
    tableReady = sql`
      CREATE TABLE IF NOT EXISTS songs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        artist TEXT NOT NULL DEFAULT 'Unknown Artist',
        audio_url TEXT NOT NULL,
        cover_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
  }
  await tableReady
}

export { sql }