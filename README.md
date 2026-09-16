# Discover

Progetto "Discover" di Marco Rizzo.

Questo repository contiene, per ora, solo la **UI statica della schermata di login** ("Create an account"), realizzata per essere visivamente identica al design di riferimento fornito. Non è presente alcuna logica di autenticazione: i campi e i bottoni sono solo grafica, pronti per essere collegati in un secondo step.

## Stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) per i componenti primitivi (`Button`, `Input`)
- Font [Geist](https://vercel.com/font) per i testi e [Poppins](https://fonts.google.com/specimen/Poppins) (peso 800) per il wordmark "Discover", per riprodurre fedelmente il font geometrico del logo

## Cosa contiene la schermata

- Mockup della status bar iOS in alto (ora, icone segnale/wifi/batteria)
- Logo "Discover" con una lente d'ingrandimento contenente l'emoji 😍 al posto del vetro
- Titolo "Create an account" e sottotitolo
- Campo email, bottone nero "Continue"
- Divisore "or"
- Bottoni "Continue with Google" e "Continue with Apple"
- Testo legale in fondo con link "Terms of Service" e "Privacy Policy"
- Home indicator iOS in basso

Tutto il contenuto è racchiuso in un contenitore in stile mobile (max-width 430px, centrato), così la pagina resta leggibile e fedele al design anche su schermi desktop.

## Sviluppo locale

Requisiti: Node.js 18+.

```bash
npm install
npm run dev
```

L'app sarà disponibile su [http://localhost:4127](http://localhost:4127) (porta personalizzata, vedi script `dev` in `package.json`).

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
    page.tsx          # Schermata di login (Create an account)
    layout.tsx         # Layout root, font, metadata
    globals.css         # Tema Tailwind / shadcn
  components/
    login/
      discover-logo.tsx    # Wordmark "Discover" + lente con emoji
      ios-status-bar.tsx   # Mockup status bar iOS
      home-indicator.tsx   # Home indicator iOS
      social-icons.tsx     # Icone Google/Apple
    ui/                    # Componenti shadcn (Button, Input)
```
