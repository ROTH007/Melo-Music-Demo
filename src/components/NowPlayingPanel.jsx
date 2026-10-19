import { IconPlay, IconPause, IconPlus, IconClock, IconMusicNote } from './Icons'

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function NowPlayingPanel({
  song,
  isPlaying,
  setIsPlaying,
  currentTime,
  duration,
  totalSongs,
  recentCount,
  onCreatePlaylist,
}) {
  const progressPct = duration ? (currentTime / duration) * 100 : 0

  return (
    <aside className="now-playing">
      <div className="panel-card">
        <div className="panel-header">
          <IconMusicNote /> Now Playing
        </div>

        {song ? (
          <>
            <img src={song.cover} alt={song.title} className="now-playing-cover" />
            <div className="now-playing-title">{song.title}</div>
            <div className="now-playing-artist">{song.artist}</div>

            <div className="now-playing-progress">
              <div className="now-playing-bar">
                <div className="now-playing-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <div className="now-playing-times">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <button className="now-playing-toggle" onClick={() => setIsPlaying((p) => !p)}>
              {isPlaying ? <IconPause /> : <IconPlay />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </>
        ) : (
          <div className="now-playing-empty">Nothing playing yet — pick a song to get started.</div>
        )}
      </div>

      <div className="panel-card">
        <div className="panel-header">Quick Links</div>
        <div className="quick-link">
          <span className="quick-link-icon"><IconMusicNote /></span>
          <div>
            <div className="quick-link-title">All Songs</div>
            <div className="quick-link-sub">{totalSongs} song{totalSongs === 1 ? '' : 's'}</div>
          </div>
        </div>
        <div className="quick-link">
          <span className="quick-link-icon"><IconClock /></span>
          <div>
            <div className="quick-link-title">Recently Played</div>
            <div className="quick-link-sub">{recentCount} song{recentCount === 1 ? '' : 's'}</div>
          </div>
        </div>
        <button className="quick-link quick-link-action" onClick={onCreatePlaylist}>
          <span className="quick-link-icon"><IconPlus /></span>
          <div className="quick-link-title">Create Playlist</div>
        </button>
      </div>
    </aside>
  )
}