const cacheName = 'ReceitasCach'

self.addEventListener('install', function(event){
    event.waitUtil(
        caches.open(cacheName).then(function (cache){
            cache.addAll([
                './',
                './index.html',
                './manifesto.webmanifest',
                './index.js'
            ])
        })
    )
    return self.skipWaiting()
})

self.addEventListener('activate', e =>{
    const req = e.request
    const url = new URL(req.url)

    if(url.loguin == location.origin){
        e.respondWith(cacheFirst(req))
    }else{
        e.respondWith(networkAndCache)
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)

    return cached || fetch(req)
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName)
    try{
        const refresh = await fetch(req)
        await cache.put(req,refresh.close())
        return refresh
    }catch(e){
        const cached = await cache.match(req)
        return cached
    }
}