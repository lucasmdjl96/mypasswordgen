const r = [
  "/mypasswordgen/_app/immutable/entry/app.e83cba6a.js",
  "/mypasswordgen/_app/immutable/chunks/0.3433fde9.js",
  "/mypasswordgen/_app/immutable/chunks/1.6c41f04f.js",
  "/mypasswordgen/_app/immutable/chunks/2.40db1284.js",
  "/mypasswordgen/_app/immutable/chunks/3.e0c0a7f4.js",
  "/mypasswordgen/_app/immutable/chunks/4.7977709f.js",
  "/mypasswordgen/_app/immutable/chunks/_layout.73540493.js",
  "/mypasswordgen/_app/immutable/chunks/index.a5c23e87.js",
  "/mypasswordgen/_app/immutable/chunks/paths.d709c32c.js",
  "/mypasswordgen/_app/immutable/chunks/preload-helper.41c905a7.js",
  "/mypasswordgen/_app/immutable/chunks/singletons.ebb4ecfd.js",
  "/mypasswordgen/_app/immutable/assets/app.ffd536f2.css",
  "/mypasswordgen/_app/immutable/entry/start.6a2ec5b8.js",
  "/mypasswordgen/_app/immutable/entry/error.svelte.092f2c12.js",
  "/mypasswordgen/_app/immutable/entry/layout.svelte.9d08ff59.js",
  "/mypasswordgen/_app/immutable/chunks/worker.a658c318.js",
  "/mypasswordgen/_app/immutable/entry/_layout.js.50a6b084.js",
  "/mypasswordgen/_app/immutable/assets/_page.316af8a7.css",
  "/mypasswordgen/_app/immutable/entry/_page.svelte.b3a292e1.js",
  "/mypasswordgen/_app/immutable/assets/_page.76340e48.css",
  "/mypasswordgen/_app/immutable/entry/about-page.svelte.82cb3765.js",
  "/mypasswordgen/_app/immutable/entry/cookies-page.svelte.6eda56ef.js"
], o = [
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
], c = "1679354316887", n = `cache-${c}`, m = [
  ...r,
  // the app itself
  ...o
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
self.addEventListener("fetch", (s) => {
  if (s.request.url.endsWith("/deleteCache")) {
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
