self.addEventListener('install', function (event) {
  let CACHE_NAME = 'restaurant-reviews-cache';
    event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache;
      })
      );
});

self.addEventListener('fetch', function (event) {

  let CACHE_NAME = 'restaurant-reviews-cache';
  let request = event.request;
  event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if(response) {
            return response;
          }
          fetch(request.url).then(function (response) {
            if(response.ok) {
              let CACHE_NAME = 'restaurant-reviews-cache';
              caches.open(CACHE_NAME).then(function(cache) {
                cache.add(request.url).then(function() {
                  return response;
                })
              })
            }
          });
        })

    );
});