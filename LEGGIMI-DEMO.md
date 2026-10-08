# demo-orario-online – come metterla online e usarla in presentazione

Demo di Orario Facile e dell'app Luis@i da aprire **dal telefono dei corsisti**. Parte **vuota**: durante la
presentazione la riempi, generi l'orario e lo **pubblichi in diretta**; i telefoni lo vedono comparire da soli.

È separata da tutto il resto:
- sta sul **tuo** account GitHub (indirizzo `tuonome.github.io/demo-orario`), quindi ha una memoria del browser diversa
  da quella dell'app vera (`comprensivoalmese.github.io`): sui telefoni le due cose non si mescolano;
- nessun collegamento a Google Drive o ai dati della scuola (ID svuotati in `app/js/config-TEST.js`);
- docenti e classi sono inventati.

## 0. Aggiornare la demo già caricata (8 ottobre 2026)

La demo è già su `https://alessandrotrino-creator.github.io/demo-orario/`. Rispetto a quella caricata sono cambiati
4 file: nel repository fai **Add file → Upload files** e trascina, mantenendo le cartelle (oppure ricarica tutto il
contenuto della cartella: i file uguali restano uguali):
- `.nojekyll` (nuovo, vuoto: se non si trascina, **Add file → Create new file**, nome `.nojekyll`, Commit)
- `app/icone/qr-app-TEST.svg` (il QR della demo)
- `app/js/dati-TEST.js` e `orario-facile/index.html` (la demo salva i dati con un nome suo, `demoorario.bozza`: il vecchio
  Orario Facile del repository `orario`, sullo stesso indirizzo, usa `orariofacile.v2` e così non si mescolano)

## 1. Mettere la demo online (una volta sola, ~10 minuti)

1. Su GitHub, con il **tuo account personale** (non `comprensivoalmese`): **New repository** → nome **`demo-orario`**
   → **Public** (GitHub Pages gratuito funziona solo con i repository pubblici) → **Create repository**.
2. Nella pagina del repository vuoto: **uploading an existing file** → apri la cartella `demo-orario-online` sul Desktop,
   seleziona **tutto il contenuto** (non la cartella stessa) e trascinalo nella pagina (Chrome o Edge mantengono le
   sottocartelle) → **Commit changes**. Sono meno di 100 file, il limite di GitHub per un caricamento.
   Attenzione: i file nascosti come `.nojekyll` a volte non si trascinano. Se manca, crealo con **Add file → Create new file**,
   nome `.nojekyll`, contenuto vuoto.
3. **Settings → Pages** → «Build and deployment»: Source **Deploy from a branch**, Branch **main**, cartella **/ (root)** → **Save**.
4. Dopo 1-2 minuti la demo è su `https://tuonome.github.io/demo-orario/`. Aprila e controlla che si veda la pagina con
   l'avviso giallo «DEMO per la presentazione».

## 2. Il «token» per pubblicare (una volta, 2-3 giorni prima della presentazione)

**Che cos'è.** Quando premi «📤 Pubblica», la pagina deve salvare un file nel tuo repository `demo-orario`, come faresti tu
caricandolo a mano. GitHub però non lascia scrivere una pagina web a nome tuo senza un permesso: il token è quel permesso.
È una lunga parola segreta (comincia con `github_pat_…`) che crei tu su GitHub, una specie di **chiave di una sola stanza**:
apre solo il repository `demo-orario`, solo per leggere e scrivere i file, e smette di funzionare alla data di scadenza.

**Come si crea** (sul computer, con GitHub aperto e il tuo account):
1. Vai su **https://github.com/settings/personal-access-tokens/new**
   (oppure: foto in alto a destra → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token).
2. **Token name**: `demo orario`. **Expiration**: scegli una data qualche giorno **dopo** la presentazione.
3. **Repository access**: «Only select repositories» → scegli **`demo-orario`**.
4. **Permissions** → «Repository permissions» → **Contents** → **Read and write** (lascia tutto il resto com'è).
5. **Generate token** → GitHub lo mostra **una volta sola**: copialo e incollalo in un file di testo sul tuo computer
   (es. sul Desktop). Non metterlo sulle slide, nel repository o in chat.

**Come si usa.** In presentazione, la prima volta che premi «📤 Pubblica» compare una finestrella: incolli il token, OK.
La pagina lo ricorda solo finché quella scheda resta aperta. Chiudendola lo dimentica: alla volta dopo lo chiede di nuovo.
Anche se qualcuno lo vedesse, potrebbe solo cambiare i file della demo, e solo fino alla scadenza.
Dopo la presentazione puoi cancellarlo: stessa pagina di GitHub → il token → **Delete**.

**Fai una prova generale** il giorno in cui lo crei: pubblica una volta l'orario e guarda se compare sul tuo telefono
(poi rimetti la demo vuota, vedi sotto). Se il token è sbagliato o scaduto, la pagina lo dice e te lo richiede.

**Senza token?** Si può: Esporta → «Scarica orario-TEST.json» → su GitHub, cartella `dati` del repository → Add file →
Upload files → trascina il file → Commit. Funziona solo per l'orario (non per le sostituzioni) e in diretta è più lento.

## 3. In presentazione

Sul **tuo computer** apri `https://tuonome.github.io/demo-orario/orario-facile/`.
Ai **corsisti** dai l'indirizzo `https://tuonome.github.io/demo-orario/app/` (o un QR con quell'indirizzo): l'app si apre
subito, senza accesso, e all'inizio dice che non ci sono lezioni.

1. Orario Facile → **Esporta** → «Importa da foglio di calcolo» → `FOGLIO-PROVA-scuola-fittizia-TEST.xlsx`
   (sta anche nel sito: `…/demo-orario/FOGLIO-PROVA-scuola-fittizia-TEST.xlsx`) → **Importa**.
2. Scheda **Orario** → **Genera orario** (pochi secondi) → **📤 Pubblica orario** → incolla il token (solo la prima volta).
3. Entro **1-2 minuti** l'orario compare sui telefoni, senza ricaricare (GitHub aggiorna il sito in circa un minuto e
   l'app lo ricontrolla ogni minuto). L'app avvisa anche con «Modifiche all'orario di oggi».
4. Scheda **Sostituzioni** → «Assenza di un docente» → scegli il docente → **Registra l'assenza** → **Assegna** un
   sostituto → **📤 Pubblica sostituzioni**. Dopo 1-2 minuti sui telefoni la lezione ha la cornice **SOSTITUZIONE**.
5. **Compresenza**: scheda Orario → clic su una casella → riquadro «Compresenza» → docente libero + attività → **+ Aggiungi**
   → **Conferma** → **📤 Pubblica orario**. Sui telefoni si vede spuntando **Compresenze**.

Tutto quello che i corsisti toccano sul loro telefono resta sul loro telefono: non possono cambiare la demo per gli altri
(per pubblicare serve il token, che hai solo tu).

Cosa NON si può mostrare (nella scuola passa da Google Drive): Nomi da Drive, scheda 8 Compresenze, foglio del conteggio
ore, 40+40, impegni, piantine.

## 4. Dopo la presentazione: tornare a vuoto

Nel repository su GitHub apri `dati/orario-TEST.json` → matita (Edit) → sostituisci tutto con il contenuto di
`dati/orario-TEST.json` di questa cartella sul Desktop (è quello vuoto) → Commit. Lo stesso per `dati/sostituzioni-TEST.json`.
Sul tuo computer, in Orario Facile: «⋯ Altro» → **Scuola vuota**. Sui telefoni dei corsisti l'app torna vuota da sola.

## Cosa cambia rispetto alla copia locale `test-orario`

| File | Modifica |
|---|---|
| `app/js/pubblica-github-TEST.js` | NUOVO: pubblica scrivendo in `dati/` del repository con le API di GitHub (si attiva solo su un `*.github.io` che non è quello della scuola) |
| `app/js/pubblica-sostituzioni-TEST.js` | nella demo pubblica le sostituzioni in `dati/sostituzioni-TEST.json` invece che su Drive |
| `app/js/supplenze-TEST.js` | l'app legge le sostituzioni pubblicate da `dati/sostituzioni-TEST.json` (`CONFIG.urlSostituzioni`) |
| `app/js/config-TEST.js` | indirizzo dell'app ricavato dalla pagina, `urlSostituzioni`, aggiornamento ogni 1 minuto |
| `orario-facile/index.html`, `orario-facile/pubblica-TEST.js` | tasti «📤 Pubblica orario» / «📤 Pubblica sostituzioni» verso GitHub |
| `index.html`, `README.md`, `404.html` | avviso «DEMO», descrizione del repository, indirizzi `/demo-orario/` |
| `app/icone/qr-app-TEST.svg` | il QR dell'app vera è stato sostituito con un segnaposto |

Tolti rispetto alla copia locale: `AVVIA-TEST.bat`, `server-locale-TEST.ps1`, `CLAUDE.md`, `app/lim/`, `strumenti/`.

© 2026 Istituto Comprensivo di Almese – realizzato dal Gruppo Wolf. Tutti i diritti riservati (`LICENZA.md`).
