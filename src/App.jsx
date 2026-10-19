import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Banner from './components/Banner'
import BannerEditModal from './components/BannerEditModal'
import PlaylistCard from './components/PlaylistCard'
import CreatePlaylistModal from './components/CreatePlaylistModal'
import AddToPlaylistMenu from './components/AddToPlaylistMenu'
import NowPlayingPanel from './components/NowPlayingPanel'
import SongCard from './components/SongCard'
import Player from './components/Player'
import UploadModal from './components/UploadModal'
import { IconPlus } from './components/Icons'
import {
  fetchSongs,
  uploadSong,
  fetchPlaylists,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  fetchRecentlyPlayed,
  logPlay,
  fetchBanner,
  updateBanner,
} from './lib/api'
import './App.css'

export default function App() {
  const [songs, setSongs] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)

  // The currently playing list + position within it. Could be "all songs",
  // a shuffled copy of them, or one specific playlist's songs.
  const [queue, setQueue] = useState([])
  const [queueIndex, setQueueIndex] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false)
  const [creatingPlaylist, setCreatingPlaylist] = useState(false)
  const [showBannerEdit, setShowBannerEdit] = useState(false)
  const [savingBanner, setSavingBanner] = useState(false)
  const [addMenuSong, setAddMenuSong] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    Promise.all([fetchSongs(), fetchPlaylists(), fetchRecentlyPlayed(), fetchBanner()])
      .then(([s, p, r, b]) => {
        setSongs(s)
        setPlaylists(p)
        setRecentlyPlayed(r)
        setBanner(b)
      })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const current = queueIndex !== null ? queue[queueIndex] : null

  const filteredSongs = songs.filter((s) =>
    `${s.title} ${s.artist}`.toLowerCase().includes(query.toLowerCase())
  )

  const playFrom = (list, index) => {
    if (!list.length) return
    setQueue(list)
    setQueueIndex(index)
    setIsPlaying(true)
    logPlay(list[index].id)
    setRecentlyPlayed((prev) => {
      const without = prev.filter((s) => s.id !== list[index].id)
      return [list[index], ...without].slice(0, 8)
    })
  }

  const playSongById = (song) => {
    const index = songs.findIndex((s) => s.id === song.id)
    if (index === -1) return
    if (current?.id === song.id) {
      setIsPlaying((p) => !p)
    } else {
      playFrom(songs, index)
    }
  }

  const playAll = () => songs.length && playFrom(songs, 0)
  const shuffleAll = () => {
    if (!songs.length) return
    const shuffled = [...songs].sort(() => Math.random() - 0.5)
    playFrom(shuffled, 0)
  }
  const playPlaylist = (playlist) => playlist.songs.length && playFrom(playlist.songs, 0)

  const nextSong = () => {
    if (!queue.length) return
    setQueueIndex((i) => ((i ?? -1) + 1) % queue.length)
    setIsPlaying(true)
  }

  const prevSong = () => {
    if (!queue.length) return
    setQueueIndex((i) => ((i ?? 1) - 1 + queue.length) % queue.length)
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

  const handleCreatePlaylist = async (name) => {
    setCreatingPlaylist(true)
    try {
      const playlist = await createPlaylist(name)
      setPlaylists((prev) => [playlist, ...prev])
      setShowCreatePlaylist(false)
    } catch (err) {
      alert(`Couldn't create playlist: ${err.message}`)
    } finally {
      setCreatingPlaylist(false)
    }
  }

  const handleToggleInPlaylist = async (playlist, add) => {
    const song = addMenuSong
    if (!song) return
    try {
      if (add) {
        await addSongToPlaylist(playlist.id, song.id)
      } else {
        await removeSongFromPlaylist(playlist.id, song.id)
      }
      setPlaylists((prev) =>
        prev.map((p) =>
          p.id !== playlist.id
            ? p
            : {
                ...p,
                songs: add ? [...p.songs, song] : p.songs.filter((s) => s.id !== song.id),
              }
        )
      )
    } catch (err) {
      alert(`Couldn't update playlist: ${err.message}`)
    }
  }

  const handleSaveBanner = async (data) => {
    setSavingBanner(true)
    try {
      const updated = await updateBanner(data)
      setBanner(updated)
      setShowBannerEdit(false)
    } catch (err) {
      alert(`Couldn't save banner: ${err.message}`)
    } finally {
      setSavingBanner(false)
    }
  }

  return (
    <div className="app">
      <div className="main-row">
        <Sidebar songs={songs} onUpload={() => setShowUpload(true)} onPlay={(i) => playFrom(songs, i)} />

        <main className="content">
          <Topbar query={query} onQueryChange={setQuery} onUpload={() => setShowUpload(true)} />

          {loading ? (
            <p className="empty">Loading…</p>
          ) : loadError ? (
            <p className="empty">Couldn't load: {loadError}</p>
          ) : (
            <>
              <Banner
                banner={banner}
                onPlayAll={playAll}
                onShuffle={shuffleAll}
                onEdit={() => setShowBannerEdit(true)}
                disabled={songs.length === 0}
              />

              <section className="row-section">
                <div className="row-header">
                  <h2 className="section-title">Your Playlists</h2>
                </div>
                <div className="row-scroll">
                  {playlists.map((p) => (
                    <PlaylistCard key={p.id} playlist={p} onPlay={() => playPlaylist(p)} />
                  ))}
                  <button className="card playlist-create-card" onClick={() => setShowCreatePlaylist(true)}>
                    <div className="playlist-create-icon"><IconPlus /></div>
                    <div className="card-title">Create Playlist</div>
                  </button>
                </div>
              </section>

              {recentlyPlayed.length > 0 && (
                <section className="row-section">
                  <div className="row-header">
                    <h2 className="section-title">Recently Played</h2>
                  </div>
                  <div className="row-scroll">
                    {recentlyPlayed.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        isActive={current?.id === song.id}
                        isPlaying={isPlaying && current?.id === song.id}
                        onPlay={() => playSongById(song)}
                      />
                    ))}
                  </div>
                </section>
              )}

              <section className="row-section">
                <div className="row-header">
                  <h2 className="section-title">Your Songs</h2>
                </div>
                {filteredSongs.length === 0 ? (
                  <p className="empty">
                    {songs.length === 0 ? 'No songs yet — upload your first one!' : 'No songs found.'}
                  </p>
                ) : (
                  <div className="grid">
                    {filteredSongs.map((song) => (
                      <SongCard
                        key={song.id}
                        song={song}
                        isActive={current?.id === song.id}
                        isPlaying={isPlaying && current?.id === song.id}
                        onPlay={() => playSongById(song)}
                        onAddToPlaylist={() => setAddMenuSong(song)}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </main>

        <NowPlayingPanel
          song={current}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          duration={duration}
          totalSongs={songs.length}
          recentCount={recentlyPlayed.length}
          onCreatePlaylist={() => setShowCreatePlaylist(true)}
        />
      </div>

      <Player
        song={current}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={nextSong}
        onPrev={prevSong}
        onProgress={(t, d) => {
          setCurrentTime(t)
          setDuration(d)
        }}
      />

      {showUpload && (
        <UploadModal uploading={uploading} onClose={() => !uploading && setShowUpload(false)} onSave={addSong} />
      )}

      {showCreatePlaylist && (
        <CreatePlaylistModal
          saving={creatingPlaylist}
          onClose={() => !creatingPlaylist && setShowCreatePlaylist(false)}
          onSave={handleCreatePlaylist}
        />
      )}

      {showBannerEdit && (
        <BannerEditModal
          banner={banner}
          saving={savingBanner}
          onClose={() => !savingBanner && setShowBannerEdit(false)}
          onSave={handleSaveBanner}
        />
      )}

      {addMenuSong && (
        <AddToPlaylistMenu
          playlists={playlists}
          song={addMenuSong}
          onToggle={handleToggleInPlaylist}
          onClose={() => setAddMenuSong(null)}
        />
      )}
    </div>
  )
}