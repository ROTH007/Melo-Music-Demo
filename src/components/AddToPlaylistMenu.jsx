import { IconCheck } from './Icons'

export default function AddToPlaylistMenu({ playlists, song, onToggle, onClose }) {
  return (
    <div className="add-menu-backdrop" onClick={onClose}>
      <div className="add-menu" onClick={(e) => e.stopPropagation()}>
        <div className="add-menu-title">Add "{song.title}" to playlist</div>
        {playlists.length === 0 ? (
          <div className="add-menu-empty">No playlists yet — create one first.</div>
        ) : (
          playlists.map((p) => {
            const inPlaylist = p.songs?.some((s) => s.id === song.id)
            return (
              <button
                key={p.id}
                type="button"
                className="add-menu-item"
                onClick={() => onToggle(p, !inPlaylist)}
              >
                <span>{p.name}</span>
                {inPlaylist && (
                  <span className="add-menu-check">
                    <IconCheck />
                  </span>
                )}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}