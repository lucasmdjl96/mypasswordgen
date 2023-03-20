const m = [
  "/mypasswordgen/app/immutable/entry/app.7aa8947b.js",
  "/mypasswordgen/app/immutable/chunks/0.c652a2f3.js",
  "/mypasswordgen/app/immutable/chunks/1.8a0eb897.js",
  "/mypasswordgen/app/immutable/chunks/2.ec4f1efb.js",
  "/mypasswordgen/app/immutable/chunks/3.9c881956.js",
  "/mypasswordgen/app/immutable/chunks/4.a838bb3f.js",
  "/mypasswordgen/app/immutable/chunks/_layout.af12d980.js",
  "/mypasswordgen/app/immutable/chunks/index.31605c7e.js",
  "/mypasswordgen/app/immutable/chunks/paths.8cf225f3.js",
  "/mypasswordgen/app/immutable/chunks/preload-helper.41c905a7.js",
  "/mypasswordgen/app/immutable/chunks/singletons.0b3bd38f.js",
  "/mypasswordgen/app/immutable/assets/flowbite.1a628648.css",
  "/mypasswordgen/app/immutable/entry/start.4548f29d.js",
  "/mypasswordgen/app/immutable/entry/error.svelte.065920d7.js",
  "/mypasswordgen/app/immutable/entry/layout.svelte.0553304f.js",
  "/mypasswordgen/app/immutable/chunks/worker.a658c318.js",
  "/mypasswordgen/app/immutable/entry/_layout.js.b42fa9ea.js",
  "/mypasswordgen/app/immutable/assets/_page.2a8c6188.css",
  "/mypasswordgen/app/immutable/entry/_page.svelte.f6298986.js",
  "/mypasswordgen/app/immutable/assets/_page.76340e48.css",
  "/mypasswordgen/app/immutable/entry/about-page.svelte.b1509fab.js",
  "/mypasswordgen/app/immutable/entry/cookies-page.svelte.1f1cddf3.js"
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
  "/mypasswordgen/node_modules/flowbite/dist/flowbite.min.js",
  "/mypasswordgen/safari-pinned-tab.svg"
], c = "1679325950431", n = `cache-${c}`, o = [
  ...m,
  // the app itself
  ...r
  // everything in `static`
];
self.addEventListener("install", (s) => {
  async function e() {
    await (await caches.open(n)).addAll(o);
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
      const a = new URL(s.request.url), t = await caches.open(n);
      if (o.includes(a.pathname))
        return t.match(s.request);
      try {
        const p = await fetch(s.request);
        return p.status === 200 && t.put(s.request, p.clone()), p;
      } catch {
        return t.match(s.request);
      }
    }
    s.respondWith(e());
  }
});
