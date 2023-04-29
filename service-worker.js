const i = [
  "/_app/immutable/entry/app.ff76ce1f.js",
  "/_app/immutable/chunks/0.3433fde9.js",
  "/_app/immutable/chunks/1.9d2a7f48.js",
  "/_app/immutable/chunks/2.8a4a18fe.js",
  "/_app/immutable/chunks/3.da826e0c.js",
  "/_app/immutable/chunks/4.53e4cafc.js",
  "/_app/immutable/chunks/_layout.73540493.js",
  "/_app/immutable/chunks/index.a5c23e87.js",
  "/_app/immutable/chunks/paths.f76d1b79.js",
  "/_app/immutable/chunks/preload-helper.41c905a7.js",
  "/_app/immutable/chunks/singletons.8cd9473a.js",
  "/_app/immutable/assets/app.def24908.css",
  "/_app/immutable/entry/start.0837c497.js",
  "/_app/immutable/entry/error.svelte.de78deba.js",
  "/_app/immutable/entry/layout.svelte.9d08ff59.js",
  "/_app/immutable/chunks/worker.a658c318.js",
  "/_app/immutable/entry/_layout.js.50a6b084.js",
  "/_app/immutable/assets/_page.316af8a7.css",
  "/_app/immutable/entry/_page.svelte.051f900f.js",
  "/_app/immutable/assets/_page.76340e48.css",
  "/_app/immutable/entry/about-page.svelte.a941a07f.js",
  "/_app/immutable/entry/cookies-page.svelte.cb4d9fe1.js"
], l = [
  "/.nojekyll",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/browserconfig.xml",
  "/CNAME",
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
], u = "1682809325998", t = `cache-${u}`, p = [
  ...i,
  // the app itself
  ...l
  // everything in `static`
];
self.addEventListener("install", (e) => {
  async function a() {
    await (await caches.open(t)).addAll(p);
  }
  e.waitUntil(a());
});
self.addEventListener("activate", (e) => {
  async function a() {
    for (const s of await caches.keys())
      s !== t && await caches.delete(s);
  }
  e.waitUntil(a());
});
self.addEventListener("fetch", (e) => {
  if (e.request.url.endsWith("/deleteCache")) {
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
    async function a() {
      const s = new URL(e.request.url), n = await caches.open(t);
      if (p.includes(s.pathname))
        return n.match(e.request);
      try {
        const c = await fetch(e.request);
        return c.status === 200 && n.put(e.request, c.clone()), c;
      } catch {
        return n.match(e.request);
      }
    }
    e.respondWith(a());
  }
});
