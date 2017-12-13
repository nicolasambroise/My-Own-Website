var staticCacheName = 'nico-static-v1';
var contentImgsCache = 'nico-content-imgs';
var allCaches = [staticCacheName,contentImgsCache];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
		'/index_sw.html',
		'/cover/script/modals.html',
		'/cover/js/jquery.min.js',
		'/cover/js/cover.js',
		'/cover/js/bootstrap.min.js',
		'/cover/js/ie10-viewport-bug-workaround.js',
		'/cover/css/cover.css',
		'/cover/css/merged-cleaned.min.css',
		'/cover/css/cover_top.css',
		'/cover/img/Nicolas-AMBROISE-photo.jpg',
		'/cover/img/Nicolas-AMBROISE-photo-min.jpg',
		'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
	  ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
	
  event.respondWith(
	  caches.match(event.request).then(function(response) {
		// caches.match() always resolves
		// but in case of success response will have value
		if (response !== undefined) {
		  return response;
		} else {
		  return fetch(event.request).then(function (response) {
			// response may be used only once
			// we need to save clone to put one copy in cache
			// and serve second one
			var responseClone = response.clone();
			
			caches.open(staticCacheName).then(function (cache) {
			  cache.put(event.request, responseClone);
			});
			return response;
		  }).catch(function () {
			return caches.match('/cover/img/Nicolas-AMBROISE-photo.jpg');
		  });
		}
	  })
  );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('nico-') && !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('message', function(event) {
  console.log(event.data.action);
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
