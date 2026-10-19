import { IconLogo, IconHome, IconSearch, IconUpload, IconLibrary } from './Icons'

export default function Sidebar({ songs, onUpload, onPlay }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-mark">
          <IconLogo />
        </span>
        Melo
      </div>

      <nav className="nav-card">
        <div className="nav-item active">
          <IconHome /> Home
        </div>
        <div className="nav-item">
          <IconSearch /> Search
        </div>
        <div className="nav-item" onClick={onUpload}>
          <IconUpload /> Upload Song
        </div>
      </nav>

      <div className="library">
        <div className="library-header">
          <IconLibrary /> Your Library
        </div>

        <div className="library-list">
          {songs.map((song, i) => (
            <div key={song.id} className="library-item" onClick={() => onPlay(i)}>
              <img src={song.cover} alt={song.title} />
              <div>
                <div className="lib-title">{song.title}</div>
                <div className="lib-sub">Song • {song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}