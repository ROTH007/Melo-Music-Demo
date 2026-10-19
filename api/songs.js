import { sql, ensureTable } from '../lib/db.js'

// GET  /api/songs  -> list all songs, newest first
// POST /api/songs  -> save a song's metadata after its files are already
//                      uploaded to Vercel Blob (see api/upload.js)
export default async function handler(req, res) {
  await ensureTable()

  if (req.method === 'GET') {
    const songs = await sql`
      SELECT id, title, artist,
             audio_url AS "audioUrl",
             cover_url AS "coverUrl",
             created_at AS "createdAt"
      FROM songs
      ORDER BY created_at DESC
    `
    return res.status(200).json(songs)
  }

  if (req.method === 'POST') {
    const { title, artist, audioUrl, coverUrl } = req.body || {}
    if (!title || !audioUrl) {
      return res.status(400).json({ error: 'title and audioUrl are required' })
    }

    const [song] = await sql`
      INSERT INTO songs (title, artist, audio_url, cover_url)
      VALUES (${title}, ${artist || 'Unknown Artist'}, ${audioUrl}, ${coverUrl || null})
      RETURNING id, title, artist,
                audio_url AS "audioUrl",
                cover_url AS "coverUrl",
                created_at AS "createdAt"
    `
    return res.status(201).json(song)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} not allowed` })
}