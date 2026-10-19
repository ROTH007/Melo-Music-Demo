import { IconPlay } from './Icons'

export default function PlaylistCard({ playlist, onPlay }) {
  const count = playlist.songs?.length || 0
  const cover = playlist.songs?.[0]?.cover || `https://picsum.photos/seed/playlist${playlist.id}/300`

  return (
    <div className="card playlist-card" onClick={onPlay}>
      <div className="card-cover-wrap">
        <img className="card-cover" src={cover} alt={playlist.name} />
        {count > 0 && (
          <button className="play-btn" aria-label="Play playlist">
            <IconPlay />
          </button>
        )}
      </div>
      <div className="card-title">{playlist.name}</div>
      <div className="card-sub">{count} song{count === 1 ? '' : 's'}</div>
    </div>
  )
}