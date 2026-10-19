// Minimal service worker. Its only job is to make Melo installable as an
// app (required for "Add to Home Screen" / standalone mode), which is what
// lets mobile OSes treat audio playback as a real background media session
// instead of suspending it when the screen locks. It does not cache or
// intercept requests.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))