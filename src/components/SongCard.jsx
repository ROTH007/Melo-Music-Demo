import { IconPlay, IconPause, IconPlus } from './Icons'

export default function SongCard({ song, isActive, isPlaying, onPlay, onAddToPlaylist }) {
  return (
    <div className={`card ${isActive ? 'card-active' : ''}`} onClick={onPlay}>
      <div className="card-cover-wrap">
        <img className="card-cover" src={song.cover} alt={song.title} />
        <button className="play-btn" aria-label="Play">
          {isPlaying ? <IconPause /> : <IconPlay />}
        </button>
        {onAddToPlaylist && (
          <button
            className="add-btn"
            aria-label="Add to playlist"
            onClick={(e) => {
              e.stopPropagation()
              onAddToPlaylist()
            }}
          >
            <IconPlus />
          </button>
        )}
      </div>
      <div className="card-title">{song.title}</div>
      <div className="card-sub">{song.artist}</div>
    </div>
  )
}