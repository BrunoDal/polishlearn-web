/* Generated at build time. Atomic pre-cache; activation only with user action. */
const VERSION="3aecc94463b961";
const ASSETS=["/polishlearn-web/","/polishlearn-web/404.html","/polishlearn-web/_next/static/62d96bc0-4154-40da-8e4c-7814879bc20f/_buildManifest.js","/polishlearn-web/_next/static/62d96bc0-4154-40da-8e4c-7814879bc20f/_ssgManifest.js","/polishlearn-web/_next/static/chunks/app-route-prefetch-policy-BhDSoqip.js","/polishlearn-web/_next/static/chunks/framework-DPUjrTes.js","/polishlearn-web/_next/static/chunks/index-SUJNrpGB.js","/polishlearn-web/_next/static/chunks/layout-segment-context-CDq_-PiD.js","/polishlearn-web/_next/static/chunks/polish-app-8qfj1D6L.js","/polishlearn-web/_next/static/chunks/rolldown-runtime-DV0rEmfY.js","/polishlearn-web/_next/static/chunks/streamed-icons-BNQ-_8q3.js","/polishlearn-web/_next/static/css/index.DLYikjWt.css","/polishlearn-web/course.json","/polishlearn-web/favicon.svg","/polishlearn-web/icons/apple-touch-icon.png","/polishlearn-web/icons/icon-192.png","/polishlearn-web/icons/icon-512.png","/polishlearn-web/icons/maskable-512.png","/polishlearn-web/index.html","/polishlearn-web/index.rsc","/polishlearn-web/manifest.webmanifest","/polishlearn-web/vinext-client-entry-manifest.json"];
const SCOPE=new URL(self.registration.scope).pathname;
const CACHE_PREFIX='polishlearn-'+encodeURIComponent(SCOPE)+'-';
const CACHE=CACHE_PREFIX+VERSION;
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 try{await cache.addAll(ASSETS);}catch(error){await caches.delete(CACHE);throw error;}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 await Promise.all((await caches.keys()).filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('message',event=>{
 if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();
 if(event.data?.type==='CACHE_STATUS')event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);const keys=await cache.keys();
  event.ports[0]?.postMessage({ready:keys.length>=ASSETS.length,version:VERSION,count:keys.length});
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;const url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 if(!url.pathname.startsWith(SCOPE))return;
 if(request.mode==='navigate'){
  event.respondWith((async()=>{
   const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),5000);
   try{const response=await fetch(request,{signal:controller.signal});if(response.ok)return response;throw new Error('Navigation unavailable');}
   catch{const cache=await caches.open(CACHE);return await cache.match(SCOPE)??Response.error();}finally{clearTimeout(timer);}
  })());return;
 }
 if(ASSETS.includes(url.pathname))event.respondWith((async()=>{
  const cache=await caches.open(CACHE);return await cache.match(url.pathname)??fetch(request);
 })());
});
