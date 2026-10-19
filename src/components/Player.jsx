import { useEffect, useRef, useState } from 'react'
import { IconPlay, IconPause, IconPrev, IconNext, IconVolume } from './Icons'

const formatTime = (sec) => {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function Player({ song, isPlaying, setIsPlaying, onNext, onPrev }) {
  const audioRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  // Play or pause when isPlaying or the song changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !song) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, song, setIsPlaying])

  // Keep volume in sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  // Media Session API: gives the OS a "now playing" card with cover art,
  // title and artist, plus play/pause/next/prev controls on the lock
  // screen, notification shade, earbuds, and media keys. This is also what
  // keeps mobile browsers from suspending audio once the screen turns off,
  // because the OS now treats the tab as an active media session.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return

    if (song) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: song.title,
        artist: song.artist,
        artwork: song.cover
          ? [
              { src: song.cover, sizes: '300x300', type: 'image/png' },
              { src: song.cover, sizes: '512x512', type: 'image/png' },
            ]
          : [],
      })
    } else {
      navigator.mediaSession.metadata = null
    }

    navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true))
    navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false))
    navigator.mediaSession.setActionHandler('previoustrack', onPrev)
    navigator.mediaSession.setActionHandler('nexttrack', onNext)

    return () => {
      navigator.mediaSession.setActionHandler('play', null)
      navigator.mediaSession.setActionHandler('pause', null)
      navigator.mediaSession.setActionHandler('previoustrack', null)
      navigator.mediaSession.setActionHandler('nexttrack', null)
    }
  }, [song, onNext, onPrev, setIsPlaying])

  // Keep the OS playback state (and the lock-screen play/pause icon) in sync
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
    }
  }, [isPlaying])

  // Report position so the lock screen's seek bar tracks the real song
  useEffect(() => {
    if (!('mediaSession' in navigator) || !('setPositionState' in navigator.mediaSession)) return
    if (!duration || isNaN(duration)) return
    try {
      navigator.mediaSession.setPositionState({
        duration,
        playbackRate: 1,
        position: Math.min(currentTime, duration),
      })
    } catch {
      // Some browsers throw if called at the wrong time — safe to ignore.
    }
  }, [duration, currentTime])

  const seek = (e) => {
    const time = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const progressPct = duration ? (currentTime / duration) * 100 : 0

  return (
    <footer className="player">
      <audio
        ref={audioRef}
        src={song?.src || undefined}
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={onNext}
      />

      <div className="player-left">
        {song ? (
          <>
            <img src={song.cover} alt={song.title} className="player-cover" />
            <div className="player-meta">
              <div className="lib-title">{song.title}</div>
              <div className="lib-sub">{song.artist}</div>
            </div>
          </>
        ) : (
          <span className="lib-sub">Select a song to play</span>
        )}
      </div>

      <div className="player-center">
        <div className="controls">
          <button onClick={onPrev} disabled={!song} aria-label="Previous"><IconPrev /></button>
          <button className="main-play" onClick={() => setIsPlaying((p) => !p)} disabled={!song} aria-label="Play/Pause">
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
          <button onClick={onNext} disabled={!song} aria-label="Next"><IconNext /></button>
        </div>
        <div className="progress-row">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={seek}
            disabled={!song}
            style={{ '--pct': `${progressPct}%` }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <span className="volume-icon"><IconVolume /></span>
        <input
          type="range"
          className="volume-bar"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{ '--pct': `${volume * 100}%` }}
        />
      </div>
    </footer>
  )
}