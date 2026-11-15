const CACHE_NAME = 'pwa-cache-v1';
const ASSETS = ['./', './index.html', './styles.css', './script.js', 'https://code.jquery.com/jquery-3.7.1.min.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));