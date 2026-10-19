import { sql, ensureTable } from '../lib/db.js'

// POST   /api/playlist-songs  { playlistId, songId }  -> add a song to a playlist
// DELETE /api/playlist-songs  { playlistId, songId }  -> remove it
export default async function handler(req, res) {
  await ensureTable()

  if (req.method === 'POST') {
    const { playlistId, songId } = req.body || {}
    if (!playlistId || !songId) {
      return res.status(400).json({ error: 'playlistId and songId are required' })
    }
    await sql`
      INSERT INTO playlist_songs (playlist_id, song_id)
      VALUES (${playlistId}, ${songId})
      ON CONFLICT DO NOTHING
    `
    return res.status(201).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const { playlistId, songId } = req.body || {}
    if (!playlistId || !songId) {
      return res.status(400).json({ error: 'playlistId and songId are required' })
    }
    await sql`
      DELETE FROM playlist_songs
      WHERE playlist_id = ${playlistId} AND song_id = ${songId}
    `
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', ['POST', 'DELETE'])
  return res.status(405).json({ error: `Method ${req.method} not allowed` })
}