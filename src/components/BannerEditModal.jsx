import { useState } from 'react'

export default function BannerEditModal({ banner, onClose, onSave, saving }) {
  const [title, setTitle] = useState(banner?.title || '')
  const [subtitle, setSubtitle] = useState(banner?.subtitle || '')
  const [imageFile, setImageFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ title: title.trim(), subtitle: subtitle.trim(), imageFile })
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h3>Edit banner</h3>

        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Good Music, Better Days" disabled={saving} />
        </label>

        <label>
          Subtitle
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Your favorite songs, always with you." disabled={saving} />
        </label>

        <label>
          Banner image {banner?.imageUrl && '(leave empty to keep current)'}
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} disabled={saving} />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-upload" disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
