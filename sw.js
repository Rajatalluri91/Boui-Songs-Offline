caches.open('boui-cache').then(cache => {
  return cache.addAll([
    './index.html',
    'https://rajatalluri91.github.io/Boui-Songs/01.%20Samadhine.mp3',
    'https://music.wixstatic.com/preview/f4beae_fdb38790f6ff49689d03cc0c1bf85b97-128.mp3',
	'https://music.wixstatic.com/preview/f4beae_2008f3853d404030ac6d1191f38bcde9-128.mp3',
	'https://music.wixstatic.com/preview/f4beae_3edddf7761fb4b6da130e09a34447a32-128.mp3',
	'https://music.wixstatic.com/preview/f4beae_a4ba5e067fe24624866a4d6a1527f33b-128.mp3',
	'https://music.wixstatic.com/preview/f4beae_4754a4897cee4a1589db243c05e6479e-128.mp3',
	'https://music.wixstatic.com/preview/f4beae_81cecfc41fba4a229ee678b8e5c1846a-128.mp3',
	'https://music.wixstatic.com/preview/f4beae_a42641112556421f91c0e725f8469529-128.mp3',
	...
  ]);
});
self.addEventListener('install', event => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(resp => {
        return caches.open('boui-cache').then(cache => {
          cache.put(event.request, resp.clone());
          return resp;
        });
      });
    }).catch(() => {
      return new Response("🔌 Offline & not cached.", { status: 503 });
    })
  );
});
