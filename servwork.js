//asignar un nombre y versión al cache
const CACHE_NAME = 'CV';
const urlsToCache = [
    '/Script.js',
    '/style.css',
    '/index.html'
  ];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .catch(error => console.error('Cache addAll error:', error))
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
    caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
    caches.keys()
        .then(cacheNames => Promise.all(
        cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
            }
        })
        ))
    );
});