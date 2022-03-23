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
  "/hearts/static/media/line.daa55c7403d09e305d9bc7f32ba321a4.svg",
  "/hearts/static/media/pink-bg.efb7a226fc069fbfa4e1.gif",
  "/hearts/static/js/main.chunk.js",
  "/hearts/static/js/0.chunk.js",
  "/hearts/static/js/bundle.js",
  "/hearts/manifest.json",
  "/hearts/favicon.ico",
  "/hearts/favicon-16x16.png",
  "/hearts/favicon-32x32.png",
  "/hearts/Assets/icons/android-chrome-192x192.png",
  "/hearts/Assets/icons/android-chrome-152x512.png",
  "/hearts/Assets/icons/apple-touch-icon.png",
];
// installing the service worker
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("files were pre-cached!!");
      return cache.addAll(FILES_TO_CACHE || URLS);
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
