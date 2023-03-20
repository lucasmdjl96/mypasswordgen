const p = [
  "/_app/immutable/entry/app.7078091e.js",
  "/_app/immutable/chunks/0.093d241a.js",
  "/_app/immutable/chunks/1.d5887b9b.js",
  "/_app/immutable/chunks/2.061d2502.js",
  "/_app/immutable/chunks/3.6f0896dd.js",
  "/_app/immutable/chunks/4.66a37b99.js",
  "/_app/immutable/chunks/_layout.da46b06b.js",
  "/_app/immutable/chunks/index.2f401660.js",
  "/_app/immutable/chunks/preload-helper.41c905a7.js",
  "/_app/immutable/chunks/singletons.fb087793.js",
  "/_app/immutable/assets/flowbite.1a628648.css",
  "/_app/immutable/entry/start.ba23bb57.js",
  "/_app/immutable/entry/error.svelte.7cfcd201.js",
  "/_app/immutable/entry/layout.svelte.ec82f168.js",
  "/_app/immutable/chunks/worker.a658c318.js",
  "/_app/immutable/entry/_layout.js.984db11e.js",
  "/_app/immutable/assets/_page.316af8a7.css",
  "/_app/immutable/entry/_page.svelte.11c623fc.js",
  "/_app/immutable/assets/_page.76340e48.css",
  "/_app/immutable/entry/about-page.svelte.516b604e.js",
  "/_app/immutable/entry/cookies-page.svelte.601fe1e2.js"
], l = [
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/browserconfig.xml",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/icon-maskable.svg",
  "/icon.svg",
  "/manifest.json",
  "/mstile-144x144.png",
  "/mstile-150x150.png",
  "/mstile-310x150.png",
  "/mstile-310x310.png",
  "/mstile-70x70.png",
  "/safari-pinned-tab.svg"
], u = "1679313582992", t = `cache-${u}`, i = [
  ...p,
  // the app itself
  ...l
  // everything in `static`
];
self.addEventListener("install", (e) => {
  async function s() {
    await (await caches.open(t)).addAll(i);
  }
  e.waitUntil(s());
});
self.addEventListener("activate", (e) => {
  async function s() {
    for (const a of await caches.keys())
      a !== t && await caches.delete(a);
  }
  e.waitUntil(s());
});
self.addEventListener("fetch", (e) => {
  if (e.request.url === `${self.location.origin}/deleteCache`) {
    e.respondWith(
      async function() {
        return await caches.delete(t), new Response(null, {
          status: 200
        });
      }()
    );
    return;
  } else {
    if (e.request.method !== "GET")
      return;
    async function s() {
      const a = new URL(e.request.url), n = await caches.open(t);
      if (i.includes(a.pathname))
        return n.match(e.request);
      try {
        const c = await fetch(e.request);
        return c.status === 200 && n.put(e.request, c.clone()), c;
      } catch {
        return n.match(e.request);
      }
    }
    s().then((a) => {
      a !== void 0 && e.respondWith(a);
    });
  }
});
