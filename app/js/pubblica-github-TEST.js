/*
  pubblica-github-TEST.js – SOLO PER LA DEMO ONLINE.
  «Pubblicare» = scrivere i file nella cartella dati/ del repository GitHub che ospita la demo, con le API di GitHub:
  - dati/orario-TEST.json         l'orario ufficiale (tasto «📤 Pubblica orario» di Orario Facile)
  - dati/sostituzioni-TEST.json   assenze e sostituzioni (tasto «📤 Pubblica sostituzioni», vedi pubblica-sostituzioni-TEST.js)
  Nella scuola vera questo lavoro lo fanno GitHub (orario) e Google Drive (sostituzioni): qui c'è solo GitHub.
  Dopo ogni scrittura GitHub Pages aggiorna il sito in circa un minuto e l'app dei telefoni rilegge i file ogni minuto.

  Si attiva SOLO se la pagina è su un indirizzo «nome.github.io» diverso da quello della scuola (mai sul sito vero).
  Serve un «token» GitHub che chi presenta incolla una volta (fine-grained, SOLO questo repository, permesso
  «Contents: Read and write», con scadenza breve). Resta solo in questa scheda del browser (sessionStorage):
  non sta nel codice, non va nel repository e sparisce chiudendo la scheda.
*/
const PubblicaGitHub = (() => {
  const CHIAVE = 'demo.tokenGitHub';
  const host = location.hostname.toLowerCase();
  // attivo solo su un sito GitHub Pages che NON è quello della scuola
  const attivo = () => /\.github\.io$/.test(host) && host !== 'comprensivoalmese.github.io';
  const proprietario = () => host.replace(/\.github\.io$/, '');
  // «nome.github.io/demo-orario/…» → repository «demo-orario»; «nome.github.io/…» → repository «nome.github.io»
  const repository = () => {
    const primo = location.pathname.split('/').filter(Boolean)[0] || '';
    return primo && !/\.html?$/i.test(primo) && !['app', 'orario-facile', 'sostituzioni', 'dati', 'manuali'].includes(primo)
      ? primo : proprietario() + '.github.io';
  };

  const token = () => { try { return sessionStorage.getItem(CHIAVE) || ''; } catch (e) { return ''; } };
  const dimentica = () => { try { sessionStorage.removeItem(CHIAVE); } catch (e) { /* ignorato */ } };
  function chiediToken() {
    const t = (window.prompt('DEMO – Per pubblicare incolla il token GitHub (fine-grained, solo per il repository «' +
      repository() + '», permesso «Contents: Read and write»).\nResta solo in questa scheda del browser.') || '').trim();
    if (t) { try { sessionStorage.setItem(CHIAVE, t); } catch (e) { /* ignorato */ } }
    return t;
  }

  const indirizzo = percorso => `https://api.github.com/repos/${encodeURIComponent(proprietario())}/${encodeURIComponent(repository())}/contents/${percorso}`;
  // testo UTF-8 ↔ base64 (GitHub vuole il contenuto dei file in base64)
  function base64(testo) {
    const b = new TextEncoder().encode(testo); let s = '';
    for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000));
    return btoa(s);
  }
  const daBase64 = b => new TextDecoder().decode(Uint8Array.from(atob(String(b || '').replace(/\s/g, '')), c => c.charCodeAt(0)));

  async function chiama(percorso, opzioni) {
    const t = token() || chiediToken();
    if (!t) throw new Error('per pubblicare serve il token GitHub');
    const r = await fetch(indirizzo(percorso), Object.assign({ cache: 'no-store' }, opzioni || {}, {
      headers: { Authorization: 'Bearer ' + t, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json' }
    }));
    if (r.status === 401 || r.status === 403) {
      dimentica();
      throw new Error('GitHub non accetta il token (scaduto, sbagliato o senza il permesso «Contents: Read and write» su ' + repository() + '): riprova incollandone uno valido');
    }
    return r;
  }

  // Legge un file del repository: { testo, sha } oppure null se non c'è (sha = «impronta» che serve per sostituirlo)
  async function leggi(percorso) {
    const r = await chiama(percorso);
    if (r.status === 404) return null;
    if (!r.ok) throw new Error('GitHub ha risposto ' + r.status + ' leggendo ' + percorso);
    const j = await r.json();
    return { sha: j.sha, testo: daBase64(j.content) };
  }

  // Scrive (crea o sostituisce) un file del repository con un commit
  async function scrivi(percorso, testo, messaggio) {
    const prima = await leggi(percorso);
    const corpo = Object.assign({ message: messaggio, content: base64(testo) }, prima ? { sha: prima.sha } : {});
    const r = await chiama(percorso, { method: 'PUT', body: JSON.stringify(corpo) });
    if (!r.ok) throw new Error('GitHub ha risposto ' + r.status + ' salvando ' + percorso);
  }

  return { attivo, leggi, scrivi, haToken: () => !!token(), dimentica, repository, proprietario };
})();
