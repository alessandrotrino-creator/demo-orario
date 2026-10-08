# demo-orario-online – come metterla online e usarla in presentazione

Demo di Orario Facile e dell'app Luis@i da aprire **dal telefono dei corsisti**. Parte **vuota**: durante la
presentazione la riempi, generi l'orario e lo **pubblichi in diretta**; i telefoni lo vedono comparire da soli.

È separata da tutto il resto:
- sta sul **tuo** account GitHub (indirizzo `tuonome.github.io/demo-orario`), quindi ha una memoria del browser diversa
  da quella dell'app vera (`comprensivoalmese.github.io`): sui telefoni le due cose non si mescolano;
- nessun collegamento a Google Drive o ai dati della scuola (ID svuotati in `app/js/config-TEST.js`);
- docenti e classi sono inventati.

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

## 2. Il «token» per pubblicare (prima di ogni presentazione)

«📤 Pubblica» scrive i file in `dati/` del repository: per farlo GitHub vuole un permesso, il token.
1. GitHub → foto in alto a destra → **Settings → Developer settings → Personal access tokens → Fine-grained tokens →
   Generate new token**.
2. Nome: «demo orario»; **Expiration**: 7 giorni; **Repository access: Only select repositories → `demo-orario`**;
   **Permissions → Repository permissions → Contents: Read and write** (nient'altro) → **Generate token**.
3. Copia il token e tienilo a portata di mano (es. in un file sul tuo computer, mai sulle slide o nel repository).
   La prima volta che premi «📤 Pubblica» la pagina lo chiede: incollalo. Resta solo in quella scheda del browser e
   sparisce quando la chiudi. Anche se qualcuno lo trovasse, potrebbe solo scrivere nel repository `demo-orario`.
   Dopo la presentazione puoi cancellarlo da GitHub (stessa pagina → Delete).

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
