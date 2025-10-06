// sw.js
const CACHE_NAME = 'sntf-horaires-cache-v2';
const APP_SHELL_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  // Scripts
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/hooks/useTrainData.ts',
  '/hooks/useLanguage.ts',
  '/services/translations.ts',
  '/services/trainDataService.ts',
  '/components/IconComponents.tsx',
  '/components/StationInput.tsx',
  '/components/TripCard.tsx',
  '/components/FavoriteRouteCard.tsx',
  // Data files
  '/services/data/agha-aeroport.ts',
  '/services/data/agha-est.ts',
  '/services/data/agha-oran-tlemcen.ts',
  '/services/data/agha-zeralda.ts',
  '/services/data/aeroport-agha.ts',
  '/services/data/alger-elaffroun.ts',
  '/services/data/alger-thenia.ts',
  '/services/data/elaffroun-alger.ts',
  '/services/data/elaffroun-thenia.ts',
  '/services/data/ouedaissi-thenia-agha.ts',
  '/services/data/thenia-alger.ts',
  '/services/data/thenia-ouedaissi.ts',
  '/services/data/thenia-zeralda.ts',
  '/services/data/tlemcen-oran-agha.ts',
  '/services/data/zeralda-agha.ts',
  '/services/data/zeralda-thenia.ts',
  '/services/data/est-agha.ts',
  '/services/data/bejaia-beni-mensour.ts',
  '/services/data/beni-mensour-bejaia.ts',
  '/services/data/tissemsilt-bordj.ts',
  '/services/data/bordj-tissemsilt.ts',
  '/services/data/djelfa-laghouat.ts',
  '/services/data/laghouat-djelfa.ts',
  '/services/data/algerie-tunisie.ts',
  '/services/data/tunisie-algerie.ts',
  '/services/data/thenia-elaffroun.ts',
  // External CDNs
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap'
];


// On install, pre-cache the app shell and all critical assets.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell and data');
        return cache.addAll(APP_SHELL_URLS);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker.
        return self.skipWaiting();
      })
  );
});

// On activate, clean up old caches and take control of any uncontrolled clients.
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            console.log('Service Worker: Clearing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Use a cache-first, then-network strategy for all GET requests.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // Return the cached response if it exists.
        if (cachedResponse) {
          return cachedResponse;
        }

        // If the resource is not in the cache, fetch it from the network.
        return fetch(event.request).then((networkResponse) => {
          // If we get a valid response, clone it, cache it, and return it.
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            cache.put(event.request, responseToCache);
          }
          return networkResponse;
        }).catch(error => {
          console.error('Service Worker: Fetch failed:', error);
        });
      });
    })
  );
});
