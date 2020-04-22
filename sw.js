self.addEventListener("install", (event) => {
    console.log("V1 installing…");

    // cache a cat SVG
    event.waitUntil(
        caches.open("static-v1").then((cache) => {
            Promise.all(cache.add("./cat.svg"), cache.add("./dog.svg"));
        })
    );
});

self.addEventListener("activate", (event) => {
    clients.claim();
    console.log("V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    console.log(event.request);
    
    // serve the cat SVG from the cache if the request is same-origin
    if (url.origin == location.origin) {
        event.respondWith(caches.match(url.pathname));
    }
});
