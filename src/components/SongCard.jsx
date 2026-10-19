export default function SongCard({ song, isActive, isPlaying, onPlay }) {
  return (
    <div className={`card ${isActive ? 'card-active' : ''}`} onClick={onPlay}>
      <div className="card-cover-wrap">
        <img className="card-cover" src={song.cover} alt={song.title} />
        <button className="play-btn" aria-label="Play">
          {isPlaying ? '❚❚' : '▶'}
        </button>
      </div>
      <div className="card-title">{song.title}</div>
      <div className="card-sub">{song.artist}</div>
    </div>
  )
}
