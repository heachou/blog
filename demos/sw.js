self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache').then(cache => {
      console.log(111)
      // 缓存index.html文件
      return cache.add('./sw.html')
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      console.log(222)
      // 匹配返回缓存资源
      return caches.match('./sw.html')
    })
  )
})