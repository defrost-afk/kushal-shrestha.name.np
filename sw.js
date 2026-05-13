const CACHE_NAME = 'chhal-cache-v4';
const STATIC_CACHE = 'chhal-static-v2';
const DYNAMIC_CACHE = 'chhal-dynamic-v2';
const POPULAR_CACHE = 'chhal-popular-v2';

// Core files that should always be cached
const CORE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Popular categories to cache first
const POPULAR_CATEGORIES = [
  './imposter/words.js',
  './headsup/headsup-words.js'
];

// Install event - cache core files
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(CORE_URLS)),
      caches.open(POPULAR_CACHE).then((cache) => cache.addAll(POPULAR_CATEGORIES))
    ])
  );
});

// Fetch event with smart caching
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle different types of requests
  if (isWordCategoryRequest(url)) {
    event.respondWith(handleWordCategoryRequest(request));
  } else if (isStaticAssetRequest(url)) {
    event.respondWith(handleStaticAssetRequest(request));
  } else {
    event.respondWith(handlePageRequest(request));
  }
});

// Check if request is for word category
function isWordCategoryRequest(url) {
  return url.pathname.includes('words.js') || url.pathname.includes('headsup-words.js');
}

// Check if request is for static asset
function isStaticAssetRequest(url) {
  return /\.(png|jpg|jpeg|gif|svg|webp|css|js)$/i.test(url.pathname);
}

// Handle word category requests with smart caching
async function handleWordCategoryRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    // Update cache in background
    updateCacheInBackground(request);
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      // Cache popular categories immediately, others with lower priority
      const cacheName = isPopularCategory(request.url) ? POPULAR_CACHE : DYNAMIC_CACHE;
      const targetCache = await caches.open(cacheName);
      targetCache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return cached version if network fails
    return cached || new Response('Offline - Category not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Handle static asset requests
async function handleStaticAssetRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return cached || new Response('Asset not available', { status: 404 });
  }
}

// Handle page requests (HTML / navigations): network-first so game updates are not stuck on old cache.
async function handlePageRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Return index.html for navigation requests (SPA fallback)
    if (request.mode === 'navigate') {
      return cache.match('./index.html') || new Response('Offline', { status: 503 });
    }
    return new Response('Page not available', { status: 404 });
  }
}

// Check if category is popular
function isPopularCategory(url) {
  return POPULAR_CATEGORIES.some(popular => url.includes(popular));
}

// Update cache in background
async function updateCacheInBackground(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response);
    }
  } catch (error) {
    // Silent fail for background updates
  }
}

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== POPULAR_CACHE &&
                cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Sync any cached actions when back online
  // This can be expanded for user-generated content
}
