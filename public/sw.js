if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>a(e,n),f={module:{uri:n},exports:c,require:r};s[n]=Promise.all(t.map((e=>f[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"90aaf2680654b6d281dc5fef0b9c57bc"},{url:"/_next/static/chunks/1517-162b15082a3d9a9d.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/152-53976d2149bc1acd.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/1566-9d93a73c3220c049.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/2651-6c073a0c4dd51363.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/3368-68069d8895117531.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/3478-acb0bb7023eec2b9.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/4377-127efd07fd952a53.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/4721-90c2a48f53bb4777.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/4bd1b696-86667e5f2a58a779.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/5203.7c54c202406d4620.js",revision:"7c54c202406d4620"},{url:"/_next/static/chunks/608-ba8f21a334c0f1dc.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/6218.ec4f3176909768d6.js",revision:"ec4f3176909768d6"},{url:"/_next/static/chunks/6384.fae37f68bbbef7a1.js",revision:"fae37f68bbbef7a1"},{url:"/_next/static/chunks/6387-9d0ad8d6ddd9c3a9.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/6483-6da2a15471fa2285.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/6801-bca9aa1b52af664b.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/809.f4b38931f89f8b9d.js",revision:"f4b38931f89f8b9d"},{url:"/_next/static/chunks/8173-647e404274ae5482.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/8409-6df612e8153d9bdd.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/8805-fd5c2933cfc78a90.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/9234-4b43cbea83c6fb56.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/9496-9da9d8b74a2d142f.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/9689-4b426552bb1587c6.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/%5B...not-found%5D/page-c8961292e03f178b.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(blank-layout-pages)/layout-3047c3eec7c97c6b.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(blank-layout-pages)/login/page-4e5bf8e2ac65e0fd.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/about/page-a782786862d12802.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/companies/create/page-1fc382263a03ca6b.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/companies/page-6e1e1ed44913c229.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/home/page-742cd3a30271171e.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/layout-c70e234a87eec8a1.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/products/create/page-dbfafc260bdd73e6.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/shipments/create/page-fb9400cd973c3ad4.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/(dashboard)/shipments/page-a2f66ab68933a01a.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/_not-found/page-252ad147863e372b.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/api/companies/route-122d42ab88ec0cd3.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/api/opost/cities/%5Bid%5D/areas/route-ea351eddc8ed0541.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/api/opost/cities/route-9c9d9146be9c7130.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/api/products/route-8e91ccd7c5f6295a.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/api/shipments/route-1099360623dd0015.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/api/upload/route-769b30edee3716bf.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/app/layout-0eb21ed6afc55f81.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/c16f53c3-5e57f85fc5bd88a9.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/framework-1ec85e83ffeb8a74.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/main-0560220f774b0624.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/main-app-d0df9993e82bb90f.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/pages/_app-c9ef09d97714d9a0.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/pages/_error-34df4b788d70a0b4.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f2def2e171f65b0d.js",revision:"gEHtfXgxkTR5vJJXT0Qle"},{url:"/_next/static/css/285c76789052e8a8.css",revision:"285c76789052e8a8"},{url:"/_next/static/css/50c7d79a9c948eba.css",revision:"50c7d79a9c948eba"},{url:"/_next/static/css/e4778f411e7569f3.css",revision:"e4778f411e7569f3"},{url:"/_next/static/gEHtfXgxkTR5vJJXT0Qle/_buildManifest.js",revision:"b74858c79163187454237809895e9f00"},{url:"/_next/static/gEHtfXgxkTR5vJJXT0Qle/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/icons/icon-192.png",revision:"768026d21e635e7f01082a114b1a8deb"},{url:"/icons/icon-512.png",revision:"e98685f215e5d66c0ce83c92fd7bce4b"},{url:"/images/avatars/1.png",revision:"defcf57fdce3b0b8d415b4f5dbc3102b"},{url:"/images/illustrations/auth/v2-login-dark-border.png",revision:"d8dbaca14b87dfd512ae7af1c988269a"},{url:"/images/illustrations/auth/v2-login-dark.png",revision:"d3a68b05d5a2ad1e36399a9080f3a1bc"},{url:"/images/illustrations/auth/v2-login-light-border.png",revision:"f472df89f80cbaa3ee5f005a157738a4"},{url:"/images/illustrations/auth/v2-login-light.png",revision:"cdc1d1a6e39f3396fe86dfb93b9ce180"},{url:"/images/illustrations/characters/3.png",revision:"b27cfbf9cd1112d113d8f78965d8c79f"},{url:"/images/pages/auth-v2-mask-1-dark.png",revision:"a9484afc35cc8b32411082bfa18ba7c9"},{url:"/images/pages/auth-v2-mask-1-light.png",revision:"3085b7a364f2806354d052142fbc63fc"},{url:"/images/pages/misc-mask-1-dark.png",revision:"0403f9f9b9d82562ab6ac47ed41fbcee"},{url:"/images/pages/misc-mask-1-light.png",revision:"e72ba27b79c342fe1739fc4fad74802a"},{url:"/manifest.json",revision:"62f417dd323353a491d99d57da37e716"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
