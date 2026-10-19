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

async function uploadFile(file) {
  const blob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/upload',
  })
  return blob.url
}

export async function fetchSongs() {
  const res = await fetch('/api/songs')
  if (!res.ok) throw new Error('Failed to load songs')
  const rows = await res.json()
  return rows.map(mapSong)
}

export async function uploadSong({ title, artist, audioFile, coverFile }) {
  const audioUrl = await uploadFile(audioFile)
  const coverUrl = coverFile ? await uploadFile(coverFile) : null

  const res = await fetch('/api/songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, artist, audioUrl, coverUrl }),
  })
  if (!res.ok) throw new Error('Failed to save song')
  return mapSong(await res.json())
}

export async function fetchPlaylists() {
  const res = await fetch('/api/playlists')
  if (!res.ok) throw new Error('Failed to load playlists')
  const rows = await res.json()
  return rows.map((p) => ({ ...p, songs: p.songs.map(mapSong) }))
}

export async function createPlaylist(name) {
  const res = await fetch('/api/playlists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error('Failed to create playlist')
  const row = await res.json()
  return { ...row, songs: [] }
}

export async function addSongToPlaylist(playlistId, songId) {
  const res = await fetch('/api/playlist-songs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlistId, songId }),
  })
  if (!res.ok) throw new Error('Failed to add song to playlist')
}

export async function removeSongFromPlaylist(playlistId, songId) {
  const res = await fetch('/api/playlist-songs', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlistId, songId }),
  })
  if (!res.ok) throw new Error('Failed to remove song from playlist')
}

export async function fetchRecentlyPlayed(limit = 8) {
  const res = await fetch(`/api/plays?limit=${limit}`)
  if (!res.ok) throw new Error('Failed to load recently played')
  const rows = await res.json()
  return rows.map(mapSong)
}

export async function logPlay(songId) {
  // Best-effort — a failed play log shouldn't interrupt playback.
  try {
    await fetch('/api/plays', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songId }),
    })
  } catch {
    // ignore
  }
}

export async function fetchBanner() {
  const res = await fetch('/api/banner')
  if (!res.ok) throw new Error('Failed to load banner')
  return res.json()
}

export async function updateBanner({ title, subtitle, imageFile }) {
  const imageUrl = imageFile ? await uploadFile(imageFile) : undefined
  const res = await fetch('/api/banner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, subtitle, imageUrl }),
  })
  if (!res.ok) throw new Error('Failed to save banner')
  return res.json()
}