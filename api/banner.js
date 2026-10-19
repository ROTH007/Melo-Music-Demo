import { sql, ensureTable } from '../lib/db.js'

// GET  /api/banner  -> the single homepage banner row (created on first read)
// POST /api/banner  { title?, subtitle?, imageUrl? } -> update any of the fields
export default async function handler(req, res) {
  await ensureTable()
  await sql`INSERT INTO banner (id) VALUES (1) ON CONFLICT (id) DO NOTHING`

  if (req.method === 'GET') {
    const [banner] = await sql`
      SELECT title, subtitle, image_url AS "imageUrl" FROM banner WHERE id = 1
    `
    return res.status(200).json(banner)
  }

  if (req.method === 'POST') {
    const { title, subtitle, imageUrl } = req.body || {}
    const [banner] = await sql`
      UPDATE banner SET
        title = COALESCE(${title ?? null}, title),
        subtitle = COALESCE(${subtitle ?? null}, subtitle),
        image_url = COALESCE(${imageUrl ?? null}, image_url)
      WHERE id = 1
      RETURNING title, subtitle, image_url AS "imageUrl"
    `
    return res.status(200).json(banner)
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: `Method ${req.method} not allowed` })
}