// Small, modern line-icon set (no emoji). Each icon inherits color via
// `currentColor`, so it follows the nav item's text color automatically.

export const IconLogo = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
    <path
      d="M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconHome = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
    <path
      d="M3 10.5 12 3l9 7.5M5 9.5V20a1 1 0 0 0 1 1h4v-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6h4a1 1 0 0 0 1-1V9.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const IconUpload = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" {...props}>
    <path
      d="M12 16V4m0 0 4 4m-4-4-4 4M5 16v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconLibrary = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
    <path
      d="M4 6h3v15H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm6-3h3a1 1 0 0 1 1 1v17h-5V4a1 1 0 0 1 1-1Zm8.2 3.1 2.6.9a1 1 0 0 1 .6 1.3L17 20.7l-2.9-1 4.1-14.6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconPlay = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
    <path d="M7 4.5v15l13-7.5-13-7.5Z" />
  </svg>
)

export const IconPause = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
    <rect x="6" y="4" width="4.5" height="16" rx="1" />
    <rect x="13.5" y="4" width="4.5" height="16" rx="1" />
  </svg>
)

export const IconPrev = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M6 5h2v14H6V5Zm3.5 7 10.5 7V5l-10.5 7Z" />
  </svg>
)

export const IconNext = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M18 5h-2v14h2V5Zm-3.5 7L4 5v14l10.5-7Z" />
  </svg>
)

export const IconVolume = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" {...props}>
    <path
      d="M4 9.5h3.2L12 6v12l-4.8-3.5H4v-5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M16 9a4 4 0 0 1 0 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M18.5 7a7.5 7.5 0 0 1 0 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const IconShuffle = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" {...props}>
    <path
      d="M3 6h3.5a4 4 0 0 1 3.2 1.6L15 16a4 4 0 0 0 3.2 1.6H21M3 18h3.5a4 4 0 0 0 3.2-1.6l.6-.8M14.5 7.6a4 4 0 0 1 3.2-1.6H21"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M18.5 3 21.5 6l-3 3M18.5 21 21.5 18l-3-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" {...props}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

export const IconCheck = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" {...props}>
    <path d="m4 12 6 6L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconBell = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" {...props}>
    <path
      d="M6 10a6 6 0 1 1 12 0c0 3.4.9 5 2 6H4c1.1-1 2-2.6 2-6Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9.5 19a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export const IconUser = (props) => (
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" {...props}>
    <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M4.5 20c1.4-3.4 4.3-5.5 7.5-5.5s6.1 2.1 7.5 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
)

export const IconPencil = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" {...props}>
    <path
      d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const IconClock = (props) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" {...props}>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const IconMusicNote = (props) => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" {...props}>
    <path
      d="M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)