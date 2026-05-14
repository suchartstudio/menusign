const CACHE_NAME = 'yum-ruam-jit-v1';
const urlsToCache = [
  'index.html',
  'admin.html',
  'order.html',
  'report.html',
  'manifest.json'
];

// ติดตั้ง Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// เรียกใช้ไฟล์จาก Cache (Network First)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});