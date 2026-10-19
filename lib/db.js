import { neon } from '@neondatabase/serverless'

// DATABASE_URL comes from the Neon connection string, set as an
// environment variable in Vercel (Settings → Environment Variables)
// and pulled locally with `vercel env pull .env.local`.
const sql = neon(process.env.DATABASE_URL)

let schemaReady = null

// Creates every table the app needs on first use. Safe to call on every
// request — CREATE TABLE IF NOT EXISTS / ADD COLUMN IF NOT EXISTS are
// no-ops once things already exist.
export async function ensureTable() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS songs (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          artist TEXT NOT NULL DEFAULT 'Unknown Artist',
          audio_url TEXT NOT NULL,
          cover_url TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      await sql`
        CREATE TABLE IF NOT EXISTS playlists (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          cover_url TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      await sql`
        CREATE TABLE IF NOT EXISTS playlist_songs (
          playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
          song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
          added_at TIMESTAMPTZ NOT NULL DEFAULT now(),
          PRIMARY KEY (playlist_id, song_id)
        )
      `
      await sql`
        CREATE TABLE IF NOT EXISTS play_history (
          id SERIAL PRIMARY KEY,
          song_id INTEGER NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
          played_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `
      await sql`
        CREATE TABLE IF NOT EXISTS banner (
          id INTEGER PRIMARY KEY DEFAULT 1,
          title TEXT NOT NULL DEFAULT 'Good Music, Better Days',
          subtitle TEXT NOT NULL DEFAULT 'Your favorite songs, always with you.',
          image_url TEXT,
          CHECK (id = 1)
        )
      `
    })()
  }
  await schemaReady
}

export { sql }