const o = [
  "/mypasswordgen/app/immutable/entry/app.d2db627a.js",
  "/mypasswordgen/app/immutable/chunks/0.c652a2f3.js",
  "/mypasswordgen/app/immutable/chunks/1.c6a3574b.js",
  "/mypasswordgen/app/immutable/chunks/2.47d36494.js",
  "/mypasswordgen/app/immutable/chunks/3.d510b951.js",
  "/mypasswordgen/app/immutable/chunks/4.2ea5eef2.js",
  "/mypasswordgen/app/immutable/chunks/_layout.af12d980.js",
  "/mypasswordgen/app/immutable/chunks/index.31605c7e.js",
  "/mypasswordgen/app/immutable/chunks/paths.0e043e6f.js",
  "/mypasswordgen/app/immutable/chunks/preload-helper.41c905a7.js",
  "/mypasswordgen/app/immutable/chunks/singletons.8ea13fc7.js",
  "/mypasswordgen/app/immutable/assets/flowbite.1a628648.css",
  "/mypasswordgen/app/immutable/entry/start.1e6af88d.js",
  "/mypasswordgen/app/immutable/entry/error.svelte.41f015b3.js",
  "/mypasswordgen/app/immutable/entry/layout.svelte.0553304f.js",
  "/mypasswordgen/app/immutable/chunks/worker.a658c318.js",
  "/mypasswordgen/app/immutable/entry/_layout.js.b42fa9ea.js",
  "/mypasswordgen/app/immutable/assets/_page.2a8c6188.css",
  "/mypasswordgen/app/immutable/entry/_page.svelte.882adbb8.js",
  "/mypasswordgen/app/immutable/assets/_page.76340e48.css",
  "/mypasswordgen/app/immutable/entry/about-page.svelte.ffaa279f.js",
  "/mypasswordgen/app/immutable/entry/cookies-page.svelte.ad0f30d4.js"
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
], c = "1679325807134", n = `cache-${c}`, m = [
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
