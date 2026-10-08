/*
  sw-TEST.js – "service worker": permette di installare l'app e di aprirla anche senza connessione.
  Strategia: prima prova la rete (così si vedono subito le modifiche), se non c'è usa la copia salvata.
*/
// Nome della memoria dell'app: cambiandolo (per esempio con la data) i dispositivi buttano la copia vecchia
// e scaricano tutto da capo. Tenerlo uguale a "versioneApp" in js/config-TEST.js.
const CACHE = 'orario-dada-demo-1';
const FILE_APP = [
  './', 'index.html', 'manuale-TEST.html', 'css/app-TEST.css', 'css/brief-TEST.css', 'css/campanella-TEST.css', 'css/barra-TEST.css', 'css/smart-TEST.css', 'css/piantine-TEST.css', 'css/menu-TEST.css', 'css/avviso-per-te-TEST.css', 'css/calendario-TEST.css', 'manifest-TEST.webmanifest',
  'js/config-TEST.js', 'js/tema-TEST.js', 'js/dati-TEST.js', 'js/accesso-TEST.js', 'js/ruoli-TEST.js', 'js/nomi-TEST.js', 'js/autorizzazioni-TEST.js', 'js/supplenze-TEST.js', 'js/compresenze-TEST.js', 'js/piantine-TEST.js', 'js/viste-TEST.js', 'js/brief-TEST.js', 'js/smart-TEST.js', 'js/piano-attivita-TEST.js', 'js/impegni-drive-TEST.js', 'js/calendario-TEST.js', '../sostituzioni/js/docx-TEST.js', 'js/xlsx-TEST.js', 'js/quaranta-ore-TEST.js', 'js/storico-sostituzioni-TEST.js', '../sostituzioni/js/foglio-TEST.js', 'js/ingresso-TEST.js', 'js/intervallo-TEST.js', 'js/modifiche-TEST.js', 'js/storie-TEST.js', 'js/campanella-TEST.js', 'js/installa-TEST.js', 'js/condividi-TEST.js', 'js/avviso-per-te-TEST.js', 'js/pubblica-drive-TEST.js', 'js/pubblica-github-TEST.js', 'js/pubblica-sostituzioni-TEST.js', 'js/app-TEST.js',
  'icone/icona-TEST.svg', 'icone/favicon-TEST.svg', 'icone/icona-192-TEST.png', 'icone/apple-touch-icon-TEST.png', 'icone/qr-app-TEST.svg',
  '../dati/orario-TEST.json', '../dati/campanella-TEST.json'
];

// Alla prima installazione salva i file dell'app
self.addEventListener('install', evento => {
  evento.waitUntil(caches.open(CACHE).then(c => c.addAll(FILE_APP)).then(() => self.skipWaiting()));
});
// Quando la versione nuova prende il posto di quella vecchia: si cancellano le memorie vecchie
// e si prendono subito in carico le pagine aperte (che poi si ricaricano da sole, vedi app-TEST.js)
self.addEventListener('activate', evento => evento.waitUntil(
  caches.keys()
    .then(nomi => Promise.all(nomi.filter(n => n.startsWith('orario-dada') && n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', evento => {
  const richiesta = evento.request;
  // Solo file del nostro sito (non Google, non altri siti)
  if (richiesta.method !== 'GET' || new URL(richiesta.url).origin !== location.origin) return;
  evento.respondWith(
    // cache: 'no-cache' = chiede sempre al sito se il file è cambiato, invece di usare
    // la copia che il browser tiene per 10 minuti (così le modifiche si vedono subito)
    fetch(richiesta, { cache: 'no-cache' })
      .then(risposta => {
        if (risposta.ok) {
          const copia = risposta.clone();
          caches.open(CACHE).then(c => c.put(richiesta, copia));
        }
        return risposta;
      })
      .catch(() => caches.match(richiesta, { ignoreSearch: true }))
  );
});

// Tocco sulla notifica "Orario cambiato" (vedi modifiche-TEST.js): porta in primo piano l'app, o la apre
self.addEventListener('notificationclick', evento => {
  evento.notification.close();
  evento.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(finestre => {
    const app = finestre.find(f => f.url.includes('/app/'));
    // l'app aperta mostra subito le modifiche in stile storie (vedi storie-TEST.js)
    if (app) return app.focus().then(f => (f || app).postMessage({ tipo: 'apriStorie' }));
    return self.clients.openWindow('./?storie');
  }));
});
