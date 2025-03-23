const CACHE_NAME = "offline-statics"
  , ASSET_URL = "https://s100.divarcdn.com/statics/the-wall/public/offline-statics/"
  , OFFLINE = `${ASSET_URL}index.html`
  , URLS = [OFFLINE, `${ASSET_URL}styles.css`, `${ASSET_URL}offline.svg`, `${ASSET_URL}logo.svg`, `${ASSET_URL}IRANSansWeb.eot`, `${ASSET_URL}IRANSansWeb.woff2`, `${ASSET_URL}IRANSansWeb.woff`, `${ASSET_URL}IRANSansWeb.ttf`, "https://s100.divarcdn.com/static/thewall-assets/favicon-32x32.png"]
  , ACTION_TYPES = {
  OPEN_CHAT_CONVERSATION: "chat",
  OPEN_CHAT_POSTCHI: "postchi",
  OPEN_POST_MANAGE: "manage"
}
  , NOTIFICATION_BASE_CONFIG = {
  lang: "FA",
  dir: "rtl",
  renotify: !0,
  badge: "https://s100.divarcdn.com/static/thewall-assets/notif-badge.png",
  icon: "https://s100.divarcdn.com/static/thewall-assets/android-chrome-192x192.png"
}
  , OFFLINE_VERSION = 5;
function installHandler(t) {
  t.waitUntil(caches.open(CACHE_NAME).then((t=>t.addAll(URLS.map((t=>new Request(t,{
    cache: "reload"
  })))))).catch((t=>console.warn(t)))),
  self.skipWaiting()
}
function activateHandler(t) {
  self.clients.claim(),
  t.waitUntil(self.registration.navigationPreload ? self.registration.navigationPreload.enable() : Promise.resolve())
}
function messageHandler(t) {
  if (t.data && "SKIP_WAITING" === t.data.type)
    updateActivationHandler()
}
function updateActivationHandler() {
  self.addEventListener("activate", (()=>{
    self.clients.matchAll({
      type: "window"
    }).then((t=>{
      t.forEach((t=>{
        t.postMessage({
          type: "RELOAD"
        })
      }
      ))
    }
    ))
  }
  )),
  self.skipWaiting()
}
function fetchHandler(t) {
  "navigate" === t.request.mode && t.respondWith(Promise.resolve(t.preloadResponse).then((e=>e || fetch(t.request))).catch((()=>caches.open(CACHE_NAME).then((t=>t.match(OFFLINE)))))),
  /https:\/\/s100.divarcdn.com\/statics\/the-wall\/public\/offline-statics\/.*|https:\/\/s100.divarcdn.com\/static\/thewall-assets\/favicon-32x32.png/.test(t.request.url) && t.respondWith(caches.open(CACHE_NAME).then((e=>e.match(t.request.url))).catch((e=>e || fetch(t.request))))
}
function pushHandler(t) {
  try {
    if (!t || !t.data)
      return;
    const e = t.data.json()
      , {action: a, param: n, callback_url: s, title: i, body: c, source: r, push_id: o} = e;
    if ("divar" !== r)
      return;
    const l = JSON.parse(n.replaceAll("'", '"'));
    let d;
    switch (a) {
    case ACTION_TYPES.OPEN_CHAT_CONVERSATION:
      d = `chat-${l.id}`;
      break;
    case ACTION_TYPES.OPEN_CHAT_POSTCHI:
      d = "postchi";
      break;
    case ACTION_TYPES.OPEN_POST_MANAGE:
      d = "manage"
    }
    const h = Object.assign({
      body: c,
      tag: d,
      data: {
        action: a,
        params: l
      }
    }, NOTIFICATION_BASE_CONFIG);
    t.waitUntil(self.registration.showNotification(i, h).then((()=>fetch(s, {
      method: "POST"
    }).catch((()=>queueDeliveredPush(o))))))
  } catch (e) {}
}
function notificationClickHandler(t) {
  try {
    const {action: e, params: a} = t?.notification?.data || {};
    switch (e) {
    case ACTION_TYPES.OPEN_CHAT_CONVERSATION:
      a?.id && t.waitUntil(clients.openWindow(`https://divar.ir/chat/${a.id}`));
      break;
    case ACTION_TYPES.OPEN_CHAT_POSTCHI:
      t.waitUntil(clients.openWindow("https://divar.ir/chat/postchi"));
      break;
    case ACTION_TYPES.OPEN_POST_MANAGE:
      a?.mng_token && t.waitUntil(clients.openWindow(`https://divar.ir/manage/${a.mng_token}`))
    }
    t.notification.close()
  } catch (e) {}
}
function queueDeliveredPush(t) {
  const e = "DeliveredPushIds"
    , a = getPushStore();
  return getIdbItem(e, a).then((e=>(Array.isArray(e) || (e = []),
  e.push(t),
  e))).then((t=>setIdbItem(e, t, a))).catch((()=>{}
  ))
}
function getPushStore() {
  return createIdbStore("push-db", "push-store")
}
function getIdbItem(t, e) {
  return e("readonly", (e=>promisifyRequest(e.get(t))))
}
function setIdbItem(t, e, a) {
  return a("readwrite", (a=>(a.put(e, t),
  promisifyRequest(a.transaction))))
}
function promisifyRequest(t) {
  return new Promise(((e,a)=>{
    t.oncomplete = t.onsuccess = ()=>e(t.result),
    t.onabort = t.onerror = ()=>a(t.error)
  }
  ))
}
function createIdbStore(t, e) {
  const a = indexedDB.open(t);
  a.onupgradeneeded = ()=>a.result.createObjectStore(e);
  const n = promisifyRequest(a);
  return (t,a)=>n.then((n=>a(n.transaction(e, t).objectStore(e))))
}
self.addEventListener("install", installHandler),
self.addEventListener("activate", activateHandler),
self.addEventListener("message", messageHandler),
self.addEventListener("fetch", fetchHandler),
self.addEventListener("push", pushHandler),
self.addEventListener("notificationclick", noti
