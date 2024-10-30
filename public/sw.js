self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1.1.0').then(cache => {
            return cache.addAll([
                '/',
            ])
        })
    )
})

self.addEventListener('activate', function (event) {
    self.clients.claim() 
    event.waitUntil(
        Promise.all([
            caches.keys().then(keyList => {
                keyList.map(function (name) {
                    if (name != 'v1.1.0') {
                        return caches.delete(name)
                    }
                })
            })
        ])
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            //如果发送的请求 跟cache 里面缓存的路径一样就返回
            return response || fetch(event.request)
        })
    )
})