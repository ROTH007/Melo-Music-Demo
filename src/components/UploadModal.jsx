import { useState } from 'react'

export default function UploadModal({ onClose, onSave, uploading }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [coverFile, setCoverFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !audioFile) {
      alert('Please enter a title and choose an audio file.')
      return
    }
    onSave({
      title: title.trim(),
      artist: artist.trim() || 'Unknown Artist',
      audioFile,
      coverFile,
    })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Upload your song</h3>

        <label>
          Song title *
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My cool song"
            disabled={uploading}
          />
        </label>

        <label>
          Artist
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Your name"
            disabled={uploading}
          />
        </label>

        <label>
          Audio file (mp3, wav) *
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudioFile(e.target.files[0])}
            disabled={uploading}
          />
        </label>

        <label>
          Cover image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files[0])}
            disabled={uploading}
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={uploading}>
            Cancel
          </button>
          <button type="submit" className="btn-upload" disabled={uploading}>
            {uploading ? 'Uploading…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}