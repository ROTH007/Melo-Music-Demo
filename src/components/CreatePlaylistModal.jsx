import { useState } from 'react'

export default function CreatePlaylistModal({ onClose, onSave, saving }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave(name.trim())
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Create playlist</h3>

        <label>
          Playlist name *
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Chill Vibes"
            disabled={saving}
            autoFocus
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-upload" disabled={saving || !name.trim()}>
            {saving ? 'Creating…' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
