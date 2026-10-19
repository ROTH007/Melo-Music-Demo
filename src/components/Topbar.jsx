import { IconBell, IconUser } from './Icons'

export default function Topbar({ query, onQueryChange, onUpload }) {
  return (
    <header className="topbar">
      <input
        className="search"
        placeholder="What do you want to play?"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <div className="topbar-right">
        <button className="btn-upload" onClick={onUpload}>
          + Upload Song
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <IconBell />
        </button>
        <div className="avatar">
          <IconUser />
        </div>
      </div>
    </header>
  )
}