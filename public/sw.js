if(!self.define){let e,c={};const s=(s,i)=>(s=new URL(s+".js",i).href,c[s]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=c,document.head.appendChild(e)}else e=s,importScripts(s),c()})).then((()=>{let e=c[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(c[n])return;let t={};const r=e=>s(e,n),d={module:{uri:n},exports:t,require:r};c[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"c38b9bc48e12f5f7c7e9466649c85d0f"},{url:"/_next/static/4khdZcvd1iicjXO-FYGj_/_buildManifest.js",revision:"f2dfe0787adfd3e4dd8527626cfbd57f"},{url:"/_next/static/4khdZcvd1iicjXO-FYGj_/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/210.17190856a860b47c.js",revision:"17190856a860b47c"},{url:"/_next/static/chunks/218.57a830a2c55ba802.js",revision:"57a830a2c55ba802"},{url:"/_next/static/chunks/399-ae94bbb13a80e1ba.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/42.56659cd3185b896e.js",revision:"56659cd3185b896e"},{url:"/_next/static/chunks/43-7e16ee1649298c36.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/4bd1b696-13defb77b23b7ffd.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/517-e64a6b0fc577dcee.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/552.6138c6fe3764b87e.js",revision:"6138c6fe3764b87e"},{url:"/_next/static/chunks/565-76f6bd4522c876f5.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/613.c9efe3efd43e9694.js",revision:"c9efe3efd43e9694"},{url:"/_next/static/chunks/83.051e0987c834a2b8.js",revision:"051e0987c834a2b8"},{url:"/_next/static/chunks/ad2866b8.696ea9185f6b6ceb.js",revision:"696ea9185f6b6ceb"},{url:"/_next/static/chunks/app/_not-found/page-d0fbfad21229a527.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/app/layout-b2015b510a4515e6.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/app/not-found-422c2cc09e0eb9ce.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/app/page-37bdd6f3b6e8ba1f.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/framework-6b27c2b7aa38af2d.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/main-64ba4be274c8df5f.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/main-app-a64a598ab009091d.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/pages/_error-2d7241423c4a35ba.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d851d720275c53eb.js",revision:"4khdZcvd1iicjXO-FYGj_"},{url:"/_next/static/css/471d3a9d13e8dc25.css",revision:"471d3a9d13e8dc25"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/assets/not-found.webp",revision:"ef1dc73bcfe6d3249c80054031a557ad"},{url:"/cursor/cursor-idle.webp",revision:"87e8c75e051aa550ded1589abf63f3b2"},{url:"/cursor/cursor-pointer.webp",revision:"bc37c69213424936cb0c483b35db2d29"},{url:"/icon/icon-128x128.png",revision:"689363093426de4e0ccc3944fd07f957"},{url:"/icon/icon-144x144.png",revision:"01fde48376bc5fe307a1891da635c7d3"},{url:"/icon/icon-152x152.png",revision:"4e4416e1ee973b5e843e9934d98f1d9d"},{url:"/icon/icon-192x192.png",revision:"e879ede12cffc27e3678374c8a01caf3"},{url:"/icon/icon-384x384.png",revision:"39a0c85250fcf8478d25cede7657566b"},{url:"/icon/icon-48x48.png",revision:"c2e1536d41b4b252dfb7ba094b2f2299"},{url:"/icon/icon-512x512.png",revision:"cb2069589da8e70ba8280230bd59cead"},{url:"/icon/icon-72x72.png",revision:"8e1ba90240dc91a2c8490ba2dffc1568"},{url:"/icon/icon-96x96.png",revision:"513ac4258a1c884564ffd7e1fc33d624"},{url:"/manifest.json",revision:"ab641b10c6f9e73b4028ab1f3f6c3941"},{url:"/metadata/manifest.webp",revision:"24ed09fbc59bcf4b74de86eb208b8442"},{url:"/metadata/readme-1.webp",revision:"b0dfce79a12a13db41446d03f2e44c7b"},{url:"/metadata/readme-2.webp",revision:"734260c6791644ee6b48a80962c355e9"},{url:"/metadata/readme-3.webp",revision:"f7dc36254b530db8152d1d2bf27fd8d5"},{url:"/metadata/readme-4.webp",revision:"7b73be56bc852c838fdb3aa8ea8b2be5"},{url:"/metadata/readme-5.webp",revision:"437b62aaaf304ab4df75d322258ff8b6"},{url:"/metadata/readme-6.webp",revision:"36818296db4f0dcc869ac3ad1d2f1a68"},{url:"/metadata/readme-7.webp",revision:"d9a1cb73fd3625bcf20a3535425f8d88"},{url:"/metadata/readme-8.webp",revision:"4478f6481c42f23b21d46fa993ae6702"},{url:"/metadata/readme-9.webp",revision:"9cf3416f1c856105694b27b8c2053824"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:c,event:s,state:i})=>c&&"opaqueredirect"===c.type?new Response(c.body,{status:200,statusText:"OK",headers:c.headers}):c}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const c=e.pathname;return!c.startsWith("/api/auth/")&&!!c.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
