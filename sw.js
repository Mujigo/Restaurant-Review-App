// This installs the service worker and sets up the cache to work with.
self.addEventListener('install', function (event) {
  let CACHE_NAME = 'restaurant-reviews-cache';
    event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache;
      })
      );
});

// This will hadle requests from the page. We are going to see if they request is in the cache and if not then we put it in there.
self.addEventListener('fetch', function (event) {

  let CACHE_NAME = 'restaurant-reviews-cache';
  let request = event.request;
  event.respondWith(
    caches.match(event.request).then(
      function(response) {
        // If we found a match in the cache we return it.
        if(response) {
          return response;
        }

      // If we don't find it then we fetch it if we can and add it to the cache.
      return fetch(request.url).then(
        function (response) {
          if(response.ok) {
            let CACHE_NAME = 'restaurant-reviews-cache';
            caches.open(CACHE_NAME).then(
              function(cache) {
                cache.add(request.url).then(
                  function() {
                    return response;
                  })
            })
          }
          return response;
        });
    })
  )
});