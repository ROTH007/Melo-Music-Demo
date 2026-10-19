import { sql, ensureTable } from '../lib/db.js'

// GET  /api/playlists  -> every playlist, each with its songs nested inside
// POST /api/playlists  -> create a new, empty playlist ({ name })
export default async function handler(req, res) {
  await ensureTable()

  if (req.method === 'GET') {
    const playlists = await sql`
      SELECT
        p.id, p.name, p.cover_url AS "coverUrl", p.created_at AS "createdAt",
        COALESCE(
          json_agg(
            json_build_object(
              'id', s.id,
              'title', s.title,
              'artist', s.artist,
              'coverUrl', s.cover_url,
              'audioUrl', s.audio_url
            ) ORDER BY ps.added_at
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS songs
      FROM playlists p
      LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
      LEFT JOIN songs s ON s.id = ps.song_id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `
    return res.status(200).json(playlists)
  }

  if (req.method === 'POST') {
    const { name } = req.body || {}
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'name is required' })
    }
    const [playlist] = await sql`
      INSERT INTO playlists (name)
      VALUES (${name.trim()})
      RETURNING id, name, cover_url AS "coverUrl", created_at AS "createdAt"
    `
    return res.status(201).json({ ...playlist, songs: [] })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} not allowed` })
}