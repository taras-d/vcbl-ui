const cachePrefix = 'assets';
const cacheVersion = 3;
const cacheName = `${cachePrefix}-${cacheVersion}`;

const assetsToCache = [
  /\/assets\/index\.\w+\.(js|css)$/,
  /\/assets\/vendor\.\w+\.js$/,
  /\/theme\/\w+\.css$/,
  /\/language\/\w+\.json$/,
  /\/favicon\.png$/,
];

addEventListener('install', event => {
  log('install');
  skipWaiting();
});

addEventListener('activate', event => {
  log('activate');
  event.waitUntil(deleteOldCache());
});

addEventListener('fetch', event => {
  const request = event.request;

  if (request.destination === 'document') {
    event.respondWith(getChachedResponse(new Request('/')));
  } else if (isAssetToCache(request)) {
    event.respondWith(getChachedResponse(request));
  }
});

function log(message) {
  console.log(`[sw] ${message}`);
}

async function deleteOldCache() {
  const keys = await caches.keys();

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (key.startsWith(cachePrefix) && key !== cacheName) {
      log(`Delete old cache '${key}'`);
      await caches.delete(key); 
    }
  }
}

function isAssetToCache(request) {
  return assetsToCache.some(pattern => pattern.test(request.url));
}

async function getChachedResponse(request) {
  const cache = await caches.open(cacheName);

  const path = new URL(request.url).pathname;

  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    log(`Return '${path}' from cache`);
    return cachedResponse;
  }

  log(`Fetch '${path}'`);
  const response = await fetch(request);

  if (response.ok) {
    log(`Save '${path}' in cache`);
    cache.put(request, response.clone());
  }

  return response;
}
