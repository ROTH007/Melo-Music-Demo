import { upload } from '@vercel/blob/client'

const DEFAULT_COVER = 'https://picsum.photos/seed/default/300'

// Maps the API's {audioUrl, coverUrl} shape to the {src, cover} shape the
// existing UI components (SongCard, Player, Sidebar) already expect.
function mapSong(row) {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    cover: row.coverUrl || DEFAULT_COVER,
    src: row.audioUrl,
  }
}

export async function fetchSongs() {
  const res = await fetch('/api/songs')
  if (!res.ok) throw new Error('Failed to load songs')
  const rows = await res.json()
  return rows.map(mapSong)
}

export async function uploadSong({ title, artist, audioFile, coverFile }) {
  const audioBlob = await upload(audioFile.name, audioFile, {
    access: 'public',
    handleUploadUrl: '/api/upload',
  })

  let coverUrl = null
  if (coverFile) {
    const coverBlob = await upload(coverFile.name, coverFile, {
      access: 'public',
      handleUploadUrl: '/api/upload',
    })
    coverUrl = coverBlob.url
  }

  const res = await fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      artist,
      audioUrl: audioBlob.url,
      coverUrl,
    }),
  })
  if (!res.ok) throw new Error('Failed to save song')
  return mapSong(await res.json())
}