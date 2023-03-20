const o = [
  "/mypasswordgen/app/immutable/entry/app.410edc44.js",
  "/mypasswordgen/app/immutable/chunks/0.af58139e.js",
  "/mypasswordgen/app/immutable/chunks/1.a9f26223.js",
  "/mypasswordgen/app/immutable/chunks/2.abe3d1ff.js",
  "/mypasswordgen/app/immutable/chunks/3.f4fd4f48.js",
  "/mypasswordgen/app/immutable/chunks/4.950ef5d8.js",
  "/mypasswordgen/app/immutable/chunks/_layout.af12d980.js",
  "/mypasswordgen/app/immutable/chunks/index.c05d037a.js",
  "/mypasswordgen/app/immutable/chunks/paths.47353643.js",
  "/mypasswordgen/app/immutable/chunks/preload-helper.41c905a7.js",
  "/mypasswordgen/app/immutable/chunks/singletons.ff43b899.js",
  "/mypasswordgen/app/immutable/assets/flowbite.1a628648.css",
  "/mypasswordgen/app/immutable/entry/start.4e36c459.js",
  "/mypasswordgen/app/immutable/entry/error.svelte.914d6bcb.js",
  "/mypasswordgen/app/immutable/entry/layout.svelte.a8916b40.js",
  "/mypasswordgen/app/immutable/chunks/worker.a658c318.js",
  "/mypasswordgen/app/immutable/entry/_layout.js.b42fa9ea.js",
  "/mypasswordgen/app/immutable/assets/_page.2a8c6188.css",
  "/mypasswordgen/app/immutable/entry/_page.svelte.2ea8ee1d.js",
  "/mypasswordgen/app/immutable/assets/_page.76340e48.css",
  "/mypasswordgen/app/immutable/entry/about-page.svelte.db20fd88.js",
  "/mypasswordgen/app/immutable/entry/cookies-page.svelte.2d51addb.js"
], r = [
  "/mypasswordgen/.nojekyll",
  "/mypasswordgen/android-chrome-192x192.png",
  "/mypasswordgen/android-chrome-512x512.png",
  "/mypasswordgen/apple-touch-icon.png",
  "/mypasswordgen/browserconfig.xml",
  "/mypasswordgen/favicon-16x16.png",
  "/mypasswordgen/favicon-32x32.png",
  "/mypasswordgen/favicon.ico",
  "/mypasswordgen/icon-maskable.svg",
  "/mypasswordgen/icon.svg",
  "/mypasswordgen/manifest.json",
  "/mypasswordgen/mstile-144x144.png",
  "/mypasswordgen/mstile-150x150.png",
  "/mypasswordgen/mstile-310x150.png",
  "/mypasswordgen/mstile-310x310.png",
  "/mypasswordgen/mstile-70x70.png",
  "/mypasswordgen/safari-pinned-tab.svg"
], c = "1679324861787", n = `cache-${c}`, m = [
  ...o,
  // the app itself
  ...r
  // everything in `static`
];
self.addEventListener("install", (s) => {
  async function e() {
    await (await caches.open(n)).addAll(m);
  }
  s.waitUntil(e());
});
self.addEventListener("activate", (s) => {
  async function e() {
    for (const a of await caches.keys())
      a !== n && await caches.delete(a);
  }
  s.waitUntil(e());
});
self.addEventListener("fetch", async (s) => {
  if (s.request.url === `${self.location.origin}/deleteCache`) {
    s.respondWith(
      async function() {
        return await caches.delete(n), new Response(null, {
          status: 200
        });
      }()
    );
    return;
  } else {
    if (s.request.method !== "GET")
      return;
    async function e() {
      const a = new URL(s.request.url), p = await caches.open(n);
      if (m.includes(a.pathname))
        return p.match(s.request);
      try {
        const t = await fetch(s.request);
        return t.status === 200 && p.put(s.request, t.clone()), t;
      } catch {
        return p.match(s.request);
      }
    }
    s.respondWith(e());
  }
});
