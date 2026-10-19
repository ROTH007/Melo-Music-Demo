import { IconPlay, IconShuffle, IconPencil } from './Icons'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return { icon: '☀️', text: 'Good Morning' }
  if (h < 18) return { icon: '🌤️', text: 'Good Afternoon' }
  return { icon: '🌙', text: 'Good Evening' }
}

export default function Banner({ banner, onPlayAll, onShuffle, onEdit, disabled }) {
  const { icon, text } = greeting()
  const style = banner?.imageUrl
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0.1) 100%), url(${banner.imageUrl})`,
      }
    : undefined

  return (
    <section className="banner" style={style}>
      <button className="banner-edit" onClick={onEdit} aria-label="Edit banner">
        <IconPencil />
      </button>
      <div className="banner-eyebrow">
        <span>{icon}</span> {text.toUpperCase()}
      </div>
      <h1 className="banner-title">{banner?.title || 'Good Music, Better Days'}</h1>
      <p className="banner-subtitle">{banner?.subtitle || 'Your favorite songs, always with you.'}</p>
      <div className="banner-actions">
        <button className="btn-upload banner-play" onClick={onPlayAll} disabled={disabled}>
          <IconPlay /> Play All
        </button>
        <button className="btn-ghost banner-shuffle" onClick={onShuffle} disabled={disabled}>
          <IconShuffle /> Shuffle
        </button>
      </div>
    </section>
  )
}