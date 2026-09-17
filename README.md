# Discover

Progetto "Discover" di Marco Rizzo.

Questo repository contiene, per ora, solo la **UI statica** dell'app: la schermata di login ("Create an account"), la dashboard successiva al login e la schermata di chat 1:1. Sono realizzate per essere visivamente identiche ai design di riferimento forniti. Non è presente alcuna logica di autenticazione, invio messaggi o dati reali: campi, bottoni e liste sono solo grafica, pronti per essere collegati in un secondo step.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) per i componenti primitivi (`Button`, `Input`)
- [lucide-react](https://lucide.dev/) per le icone (menu, ricerca, chat, avatar di default, ecc.)
- Font [Geist](https://vercel.com/font) per i testi e [Poppins](https://fonts.google.com/specimen/Poppins) (peso 800) per il wordmark "Discover", per riprodurre fedelmente il font geometrico del logo

## Pagine

### `/` — Login ("Create an account")

- Mockup della status bar iOS in alto (ora, icone segnale/wifi/batteria)
- Logo "Discover" con l'icona della lente d'ingrandimento
- Titolo "Create an account" e sottotitolo
- Campo email, bottone nero "Continue"
- Divisore "or"
- Bottoni "Continue with Google" e "Continue with Apple"
- Testo legale in fondo con link "Terms of Service" e "Privacy Policy"

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

Tutte e tre le pagine condividono lo stesso mockup di dispositivo (status bar iOS + home indicator) tramite il componente `PhoneFrame`, e sono racchiuse in un contenitore in stile mobile (max-width 430px, centrato), così restano leggibili e fedeli al design anche su schermi desktop.

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
    page.tsx              # Schermata di login (Create an account)
    dashboard/
      page.tsx             # Dashboard post-login
    chat/
      page.tsx             # Conversazione 1:1
    layout.tsx             # Layout root, font, metadata
    globals.css            # Tema Tailwind / shadcn
  components/
    chrome/
      phone-frame.tsx       # Wrapper condiviso: contenitore mobile + status bar + home indicator
      ios-status-bar.tsx    # Mockup status bar iOS
      home-indicator.tsx    # Home indicator iOS
    login/
      discover-logo.tsx     # Wordmark "Discover" + logo lente
      social-icons.tsx      # Icone Google/Apple
    dashboard/
      dashboard-header.tsx  # Header con menu, titolo e avatar
      filter-pills.tsx      # Pillole "Filters" / "Tab"
      trip-card.tsx         # Card viaggio (avatar, foto, titolo, tag, badge)
      tag-pill.tsx          # Singolo tag (#where, #when, ...)
      participants-badge.tsx# Badge partecipanti (avatar + conteggio)
      default-avatar.tsx    # Avatar profilo di default (icona persona)
      bottom-nav.tsx        # Tab bar inferiore
    chat/
      chat-header.tsx        # Header conversazione (back, avatar, nome, chiamata/video)
      chat-input.tsx         # Barra di input in basso
      message-bubble.tsx     # Bolla singola (variante sent/received)
      message-group.tsx      # Gruppo di bolle consecutive + avatar
    ui/                     # Componenti shadcn (Button, Input)
public/
  logo/discover-lens.png    # Logo lente d'ingrandimento
  images/camper-trip.jpg    # Foto del viaggio in camper (contenuto della card)
  images/helena-hills.jpg   # Foto profilo del contatto nella chat
```
