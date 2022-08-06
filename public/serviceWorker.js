// https://medium.com/swlh/converting-existing-react-app-to-pwa-3c7e4e773db3

let CACHE_NAME = 'notmal-cache-v1'
const urlsToCache = ['/', '/index.html']

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
