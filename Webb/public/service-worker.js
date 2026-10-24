const CACHE="careconnect-shell-v2"
const SHELL=["/","/index.html","/offline.html","/manifest.json","/favicon.svg"]
self.addEventListener("install",event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))
})
self.addEventListener("activate",event=>{
 event.waitUntil(Promise.all([
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),
  self.clients.claim()
 ]))
})
self.addEventListener("fetch",event=>{
 const request=event.request
 if(request.method!=="GET" || new URL(request.url).origin!==self.location.origin)return
 if(request.mode==="navigate"){
  event.respondWith(fetch(request).catch(async()=>{
   const cache=await caches.open(CACHE)
   return (await cache.match("/index.html")) || (await cache.match("/offline.html"))
  }))
  return
 }
 event.respondWith(caches.match(request).then(cached=>cached || fetch(request).then(response=>{
  if(response.ok && (request.destination==="script"||request.destination==="style"||request.destination==="image"||request.destination==="font")){
   const copy=response.clone()
   caches.open(CACHE).then(cache=>cache.put(request,copy))
  }
  return response
 })))
})
