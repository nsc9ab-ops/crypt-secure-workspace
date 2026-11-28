const CACHE_NAME = 'sfn-shell-v43';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './firebase-config.js',
  './members.js',
  './secure-keyboard.js',
  './features.js',
  './games/cyber-arcade-twin-system.html',
  './games/game-preferences.js',
  './games/kenya-highway-pro.html',
  './games/kenya-highway-pro.css',
  './games/kenya-highway-pro.js',
  './games/nexus-v-quantum-party-matrix.html',
  './games/neon-nexus.css',
  './assets/member-motion.css',
  './app-icon.svg',
  './app-icon-64.png',
  './app-icon-180.png',
  './app-icon-192.png',
  './app-icon-512.png',
  './assets/login-hero.webp',
  './assets/scott-fn-app-icon-1024.png',
  './vendor/firebase-13.4.0/firebase-sdk.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('sfn-shell-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    if (request.mode === 'navigate') {
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch {
        return await cache.match(request) || await cache.match('./index.html') || Response.error();
      }
    }

    const cached = await cache.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      return Response.error();
    }
  })());
});
