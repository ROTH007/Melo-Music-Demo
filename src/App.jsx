import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import SongCard from './components/SongCard'
import Player from './components/Player'
import UploadModal from './components/UploadModal'
import { fetchSongs, uploadSong } from './lib/api'
import './App.css'

export default function App() {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [query, setQuery] = useState('')

  // Load songs from the database on first render
  useEffect(() => {
    fetchSongs()
      .then(setSongs)
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const current = currentIndex !== null ? songs[currentIndex] : null

  const filteredSongs = songs.filter((s) =>
    `${s.title} ${s.artist}`.toLowerCase().includes(query.toLowerCase())
  )

  const playSong = (index) => {
    if (index === currentIndex) {
      setIsPlaying((p) => !p)
    } else {
      setCurrentIndex(index)
      setIsPlaying(true)
    }
  }

  const nextSong = () => {
    if (songs.length === 0) return
    setCurrentIndex((i) => ((i ?? -1) + 1) % songs.length)
    setIsPlaying(true)
  }

  const prevSong = () => {
    if (songs.length === 0) return
    setCurrentIndex((i) => ((i ?? 1) - 1 + songs.length) % songs.length)
    setIsPlaying(true)
  }

  const addSong = async (data) => {
    setUploading(true)
    try {
      const song = await uploadSong(data)
      setSongs((prev) => [song, ...prev])
      setShowUpload(false)
    } catch (err) {
      alert(`Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="app">
      <div className="main-row">
        <Sidebar songs={songs} onUpload={() => setShowUpload(true)} onPlay={playSong} />

        <main className="content">
          <header className="topbar">
            <input
              className="search"
              placeholder="What do you want to play?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn-upload" onClick={() => setShowUpload(true)}>
              + Upload Song
            </button>
          </header>

          <section>
            <h2 className="section-title">Your Songs</h2>
            {loading ? (
              <p className="empty">Loading songs…</p>
            ) : loadError ? (
              <p className="empty">Couldn't load songs: {loadError}</p>
            ) : filteredSongs.length === 0 ? (
              <p className="empty">
                {songs.length === 0 ? 'No songs yet — upload your first one!' : 'No songs found.'}
              </p>
            ) : (
              <div className="grid">
                {filteredSongs.map((song) => {
                  const index = songs.indexOf(song)
                  return (
                    <SongCard
                      key={song.id}
                      song={song}
                      isActive={current?.id === song.id}
                      isPlaying={isPlaying && current?.id === song.id}
                      onPlay={() => playSong(index)}
                    />
                  )
                })}
              </div>
            )}
          </section>
        </main>
      </div>

      <Player
        song={current}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={nextSong}
        onPrev={prevSong}
      />

      {showUpload && (
        <UploadModal
          uploading={uploading}
          onClose={() => !uploading && setShowUpload(false)}
          onSave={addSong}
        />
      )}
    </div>
  )
}