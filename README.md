# Discover

Progetto "Discover" di Marco Rizzo.

Il repository contiene la UI (login, dashboard, chat 1:1) realizzata per essere visivamente identica ai design di riferimento forniti, **più un vero backend di autenticazione** basato su [Supabase](https://supabase.com/): registrazione e login con email + password, sessione persistente e popolamento automatico del database utenti. Dashboard e chat sono al momento ancora solo grafica (nessun dato reale caricato/inviato): sono il prossimo step.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) per i componenti primitivi (`Button`, `Input`)
- [lucide-react](https://lucide.dev/) per le icone (menu, ricerca, chat, avatar di default, ecc.)
- Font [Geist](https://vercel.com/font) per i testi e [Poppins](https://fonts.google.com/specimen/Poppins) (peso 800) per il wordmark "Discover", per riprodurre fedelmente il font geometrico del logo
- [Supabase](https://supabase.com/) (`@supabase/supabase-js` + `@supabase/ssr`) per autenticazione (email + password) e database Postgres

## Pagine

### `/` — Registrazione ("Create an account")

- Mockup della status bar iOS in alto (ora, icone segnale/wifi/batteria)
- Logo "Discover" con l'icona della lente d'ingrandimento
- Titolo "Create an account" e sottotitolo
- Campo email + campo password (min. 6 caratteri), bottone nero "Continue" **funzionante**: crea l'utente su Supabase (`auth.signUp`) e, appena la sessione è attiva, reindirizza a `/dashboard`
- Divisore "or" e bottoni "Continue with Google" / "Continue with Apple" (solo grafici, non collegati: nessun OAuth richiesto per ora)
- Testo legale in fondo con link "Terms of Service" e "Privacy Policy", e link "Already have an account? Log in" verso `/login`

### `/login` — Accesso ("Welcome back")

Stessa identità visiva della schermata di registrazione, con campo email + password e bottone "Log in" che autentica l'utente esistente (`auth.signInWithPassword`) e reindirizza a `/dashboard`. Link "Don't have an account? Sign up" verso `/`.

### `/dashboard` — Dashboard (dopo il login)

- Header con menu, titolo "Discover" e avatar profilo (in alto a destra)
- Pillole filtro "Filters" (attiva) e "Tab"
- Lista di card "viaggio": avatar autore + nome, foto, titolo, tag (`#where`, `#when`, `#who`) e, quando presente, un badge con partecipanti (es. "0/2")
- Bottom tab bar con 4 icone (home, ricerca, scambio, chat)

Rispetto allo screenshot di riferimento, **tutte le foto profilo** (header, autore della card, badge partecipanti) usano un **avatar di default** generico (icona persona su sfondo grigio) invece della foto reale, come richiesto. La foto del viaggio in camper resta invece quella del design, perché fa parte del contenuto del post e non è una foto profilo.

### `/chat` — Conversazione 1:1

- Header con freccia indietro, avatar del contatto, nome ("Helena Hills") + stato ("Active 11m ago"), e le icone chiamata/videochiamata
- Thread di messaggi in stile iMessage: bolle ricevute (grigie, a sinistra, con angolo sinistro squadrato e avatar visibile solo sull'ultimo messaggio del gruppo) e bolle inviate (nere, a destra, con gli angoli "di giunzione" squadrati quando più bolle consecutive appartengono allo stesso gruppo)
- Un separatore data/ora centrato ("Nov 30, 2023, 9:41 AM")
- Barra di input in basso con placeholder "Message...", e le icone microfono, emoji e immagine

L'avatar del contatto è stato ritagliato direttamente dallo screenshot di riferimento (non è stata richiesta la sostituzione con un'immagine di default per questa pagina).

Tutte e quattro le pagine condividono lo stesso mockup di dispositivo (status bar iOS + home indicator) tramite il componente `PhoneFrame`, e sono racchiuse in un contenitore in stile mobile (max-width 430px, centrato), così restano leggibili e fedeli al design anche su schermi desktop.

## Collegare Supabase

L'app funziona anche **senza** Supabase collegato: le pagine restano visibili, ma il submit dei form di login/registrazione mostra un messaggio "Login isn't connected to a database yet." invece di un errore. Per rendere il login realmente funzionante:

1. **Crea un progetto** su [supabase.com](https://supabase.com/) (se non l'hai già fatto).
2. Vai su **Project Settings → API** e copia:
   - `Project URL` → variabile `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → variabile `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **In locale**: copia `.env.local.example` in `.env.local` e incolla i due valori.
   **Su questo agente cloud**: aggiungi le stesse due variabili in **Cursor Dashboard → Cloud Agents → Secrets** (con questi nomi esatti), così vengono iniettate automaticamente nelle prossime esecuzioni.
4. **Crea la tabella utenti**: apri **SQL Editor** nel progetto Supabase, incolla ed esegui il contenuto di [`supabase/schema.sql`](./supabase/schema.sql). Crea una tabella `profiles` (collegata 1:1 a `auth.users`, che Supabase gestisce già in automatico per ogni sign-up) popolata automaticamente ad ogni registrazione tramite un trigger — questo è il "database utenti" che si popola da solo quando le persone si registrano.
5. **(Consigliato per iniziare subito a testare)**: in **Authentication → Sign In / Providers → Email**, disattiva "Confirm email" così un nuovo utente può accedere subito dopo la registrazione senza dover confermare l'indirizzo via email. Puoi riattivarlo quando l'app andrà in produzione: in quel caso, dopo la `signUp` l'utente vedrà il messaggio "Account created! Check your email…" e potrà accedere solo dopo aver confermato.
6. Riavvia `npm run dev` (o rilancia l'agente): login e registrazione parleranno con il tuo progetto Supabase e ogni nuovo utente comparirà in **Authentication → Users** e nella tabella `profiles`.

Nessun'altra configurazione è richiesta: non serve una service role key né una connection string al database per questo step.

## Sviluppo locale

Requisiti: Node.js 18+.

```bash
npm install
npm run dev
```

L'app sarà disponibile su [http://localhost:4127](http://localhost:4127) (porta personalizzata, vedi script `dev` in `package.json`). La dashboard è su [http://localhost:4127/dashboard](http://localhost:4127/dashboard) e la chat su [http://localhost:4127/chat](http://localhost:4127/chat).

Altri comandi utili:

```bash
npm run build   # build di produzione
npm run start   # avvia la build di produzione
npm run lint    # esegue eslint
```

## Struttura principale

```
src/
  app/
    page.tsx              # Schermata di registrazione (Create an account)
    login/
      page.tsx             # Schermata di accesso (Welcome back)
    dashboard/
      page.tsx             # Dashboard post-login
    chat/
      page.tsx             # Conversazione 1:1
    layout.tsx             # Layout root, font, metadata
    globals.css            # Tema Tailwind / shadcn
  proxy.ts                 # Refresh sessione Supabase + protezione rotte (ex "middleware")
  lib/
    auth-actions.ts        # Server Actions: signUpAction, signInAction, signOutAction
    supabase/
      client.ts             # Client Supabase per i Client Component
      server.ts              # Client Supabase per Server Component/Actions (cookie-based)
      middleware.ts           # Logica di refresh sessione + redirect usata da proxy.ts
      env.ts                  # Env var Supabase + messaggio "non configurato"
  components/
    chrome/
      phone-frame.tsx       # Wrapper condiviso: contenitore mobile + status bar + home indicator
      ios-status-bar.tsx    # Mockup status bar iOS
      home-indicator.tsx    # Home indicator iOS
    auth/
      signup-form.tsx        # Form email + password per la registrazione
      signin-form.tsx        # Form email + password per l'accesso
      submit-button.tsx      # Bottone submit con stato "in corso"
    login/
      discover-logo.tsx     # Wordmark "Discover" + logo lente
      social-icons.tsx      # Icone Google/Apple
    dashboard/
      dashboard-header.tsx  # Header con menu, titolo e avatar (l'avatar fa anche da bottone "log out")
      filter-pills.tsx      # Pillole "Filters" / "Tab"
      trip-card.tsx         # Card viaggio (avatar, foto, titolo, tag, badge)
      tag-pill.tsx          # Singolo tag (#where, #when, ...)
      participants-badge.tsx# Badge partecipanti (avatar + conteggio)
      default-avatar.tsx    # Avatar profilo di default (icona persona)
      bottom-nav.tsx        # Tab bar inferiore
    chat/
      chat-header.tsx        # Header conversazione (back → dashboard, avatar, nome, chiamata/video)
      chat-input.tsx         # Barra di input in basso
      message-bubble.tsx     # Bolla singola (variante sent/received)
      message-group.tsx      # Gruppo di bolle consecutive + avatar
    ui/                     # Componenti shadcn (Button, Input)
public/
  logo/discover-lens.png    # Logo lente d'ingrandimento
  images/camper-trip.jpg    # Foto del viaggio in camper (contenuto della card)
  images/helena-hills.jpg   # Foto profilo del contatto nella chat
supabase/
  schema.sql                # Script SQL: tabella "profiles" + trigger di auto-popolamento
.env.local.example          # Template per NEXT_PUBLIC_SUPABASE_URL / ANON_KEY
```

## Protezione delle rotte

Quando Supabase è collegato, `/dashboard` e `/chat` richiedono un utente autenticato (altrimenti si viene rediretti a `/login`), mentre chi è già loggato viene rediretto automaticamente a `/dashboard` se prova ad aprire `/` o `/login`. Finché Supabase non è configurato, questa logica è disattivata e tutte le pagine restano liberamente accessibili come semplice UI statica.
