import { sql, ensureTable } from '../lib/db.js'

// POST /api/plays            { songId }   -> record that a song started playing
// GET  /api/plays?limit=8                 -> most recently played distinct songs
export default async function handler(req, res) {
  await ensureTable()

  if (req.method === 'POST') {
    const { songId } = req.body || {}
    if (!songId) return res.status(400).json({ error: 'songId is required' })
    await sql`INSERT INTO play_history (song_id) VALUES (${songId})`
    return res.status(201).json({ ok: true })
  }

  if (req.method === 'GET') {
    const limitNum = Math.min(Math.max(Number(req.query?.limit) || 8, 1), 50)
    const rows = await sql`
      SELECT
        s.id, s.title, s.artist,
        s.cover_url AS "coverUrl",
        s.audio_url AS "audioUrl",
        MAX(ph.played_at) AS "lastPlayedAt"
      FROM play_history ph
      JOIN songs s ON s.id = ph.song_id
      GROUP BY s.id
      ORDER BY "lastPlayedAt" DESC
      LIMIT ${limitNum}
    `
    return res.status(200).json(rows)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} not allowed` })
}