import { handleUpload } from '@vercel/blob/client'

// Backs the client-side upload flow in src/lib/api.js. The browser never
// sends the file through this function's body (that would hit Vercel's
// ~4.5MB request limit) — instead it asks this endpoint for a short-lived
// token, then uploads the file straight to Blob storage.
export default async function handler(req, res) {
  try {
    const jsonResponse = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'audio/mpeg',
          'audio/wav',
          'audio/mp3',
          'audio/ogg',
          'audio/x-m4a',
          'image/png',
          'image/jpeg',
          'image/webp',
        ],
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // Nothing to do here — the song record is saved separately via a
        // POST to /api/songs once the upload finishes (see src/lib/api.js).
      },
    })
    return res.status(200).json(jsonResponse)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}