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

## 3b. Caricare TUTTI i dati da un file Excel (aule, cattedre, monte ore, vincoli…)

Orario Facile → **Esporta** → riquadro «Database completo da file Excel (.xlsx)»:
- **📂 Carica da file Excel** – legge un file con tutti i dati e li mette in Orario Facile (prima mostra cosa ha trovato e gli
  eventuali errori, riga per riga). Poi: scheda Orario → **Genera orario** (con i tuoi vincoli) → **📤 Pubblica orario**.
- **📄 Scarica il modello vuoto** – il file da compilare, con le materie standard e i vincoli predefiniti già scritti.
- **💾 Salva su file Excel** – scrive i dati attuali nello stesso formato (per modificarli in Excel e ricaricarli).
- Esempio pronto, scuola inventata con vincoli: **`FOGLIO-PROVA-database-completo-TEST.xlsx`** (9 classi da 30 ore,
  16 docenti, 17 aule con il tipo, 270 ore di cattedra, giorni liberi, indisponibilità e limiti). Con questi vincoli il
  generatore colloca tutte le 270 ore senza conflitti.

**Altri due esempi sulle aule** (stessa scuola inventata, stessi docenti e cattedre; cambiano solo le aule).
Questi due file NON sono nel repository: stanno sul computer di chi presenta, nella cartella `test-orario` del Desktop,
e si caricano con «📂 Carica da file Excel» scegliendoli da lì.

1. **`FOGLIO-PROVA-database-13aule-16docenti-TEST.xlsx`** – meno aule che docenti. Quattro aule sono condivise:
   Aula Matematica 2 (Solari + Danesi), Aula Francese e Arte (Dufort + Albizzi), Aula Lingue (Ashford + Rinaldelli),
   Aula Lettere 5 (Ferrandi + Lodigiani); l'**Aula 13 (libera)** non è assegnata a nessuno.
   - *Così com'è*: «Genera orario» si ferma con la **Diagnosi di fattibilità**: «Aula Matematica 2 / Aula Francese e Arte:
     devono ospitare 36 ore ma ne offrono al massimo 30… aggiungi un'aula a questi docenti». Con «Genera comunque»
     restano fuori circa 13 ore.
   - *La correzione* (scheda **Docenti** → «+ aggiungi aula…»): Danesi → Aula 13 (libera) e Aula musica · Solari → Aula 13 e
     Aula Lettere 4 · Albizzi → Aula 13 · Dufort → Aula Lettere 1 · Rinaldelli → Aula Lettere 2 · Lodigiani → Aula Lettere 3.
     Poi «Genera orario»: 270/270 (se resta 1 ora, **✨ Ottimizza** la colloca).
2. **`FOGLIO-PROVA-database-11aule-9classi-TEST.xlsx`** – appena più aule che classi (Aula 1-8, Lab. scienze, Lab. tecnologia,
   Palestra): nessun docente ha un'aula tutta sua, ognuno ha un'aula preferita e due alternative. Le aule si riempiono quasi
   tutte (alcune 30 ore su 30): di solito 270/270; a volte restano 1-2 ore → **✨ Ottimizza**, «Genera orario» di nuovo con
   qualità «Accurata», oppure trascinale a mano nella vista «Per aula».

**Come si scrive il file** (è il formato del Foglio database della scuola: dettagli anche nella scheda «Leggimi» del file e in
`orario-facile/DATABASE-TEST.md`). Non cambiare i nomi delle schede né l'ordine delle colonne; riga 1 = intestazione.

| Scheda | Una riga per… | Colonne |
|---|---|---|
| **Impostazioni** | voce | A voce · B valore: Scuola, Anno scolastico, Durata ora (minuti), Inizio lezioni (08:00), Ore del mattino, Ore del pomeriggio, Giorni (`Lunedì, Martedì, …`) |
| **Vincoli** | vincolo | A nome fisso (`maxConsec`, `maxConsecDoc`, `maxOreGiorno`, `maxOreDiscGiorno`, `rispettaIndisp`, `giornoLibero`, `peso…`) · B valore (numero o SI/NO) · C spiegazione |
| **Discipline** | materia | A sigla (ITA, MAT…) · B nome · C ore standard · D principale SI/NO · E blocchi di 2 ore SI/NO · F (vuota) · G può stare all'ultima ora SI/NO · H colore 0-360 |
| **Aule** | aula | A nome · B tipo (Aula, Laboratorio, Palestra) · C più classi insieme SI/NO |
| **Classi** | classe | A classe (1A) · B anno · poi per ogni giorno due colonne: «Lunedì mattino», «Lunedì pomeriggio», … = ore di lezione |
| **Quadro** | classe | A classe · poi una colonna per materia (riga 1 = SIGLA) = monte ore settimanale |
| **Docenti** | docente | A Codice (nome mostrato, es. «Rosa Fantini») · B Cognome · C Nome (facoltativi) · D aule separate da virgola (la prima è la principale) · E giorno libero · F max ore al giorno · G max ore consecutive · H indisponibilità (`Lunedì 1,2; Venerdì 6,p1`) |
| **Cattedre** | docente+classe+materia | A docente (come in Docenti, colonna A) · B vuota · C classe · D sigla materia · E ore |
| **Orario** *(facoltativa)* | docente | righe 1-2 giorni e ore; dalla riga 3: A docente · da C una colonna per ora: `1A`, `1A STO`, `1A ITA @Palestra`, `+2B SOS` (compresenza), `… *` (bloccata) |

Obbligatorie: Classi, Docenti, Cattedre. Le altre schede, se mancano, prendono i valori predefiniti.
Controllo utile: per ogni classe, la somma delle ore in Classi (giorno per giorno) deve essere uguale al totale del Quadro,
e le ore delle Cattedre di quella classe devono coprire il Quadro materia per materia (Orario Facile lo segnala nelle schede).

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
