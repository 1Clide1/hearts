console.log("this is the service worker");
// naming the cache and data
const CACHE_NAME = "my-love-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/static/media/line.daa55c7403d09e305d9bc7f32ba321a4.svg",
  "/static/media/pink-bg.efb7a226fc069fbfa4e1.gif",
  "static/js/main.chunk.js",
  "static/js/0.chunk.js",
  "/static/js/bundle.js",
  "/manifest.json",
  "/favicon.ico",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "/Assets/icons/android-chrome-192x192.png",
  "/Assets/icons/android-chrome-152x512.png",
  "/Assets/icons/apple-touch-icon.png",
];
const URLS = [
  "/hearts/",
  "/hearts/index.html",
  "/hearts/static/media/line.e0115d9576e8cea5e789b9af68681348.svg",
  "/hearts/favicon.ico",
  "/hearts/static/media/pink-bg.efb7a226fc069fbfa4e1.gif",
  "/hearts/manifest.json",
  "/hearts/Assets/icons/apple-touch-icon.png",
];
// Respond with cached resources
self.addEventListener("fetch", function (e) {
  console.log("fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
});
// installing the service worker
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("files were pre-cached!!");
      return cache.addAll(URLS) || cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
// activating the service worker
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("removed the old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
// intercept the fetch request with the service worker
self.addEventListener("fetch", function (evt) {
  // if the cache does not include an api
  //   must have if there is no api
  evt.respondWith(
    fetch(evt.request).catch(function () {
      return caches.match(evt.request).then(function (response) {
        if (response) {
          return response;
        } else if (evt.request.headers.get("accept").includes("text/html")) {
          // return the cached home page for all requests for html pages
          return caches.match("/");
        }
      });
    })
  );
});
