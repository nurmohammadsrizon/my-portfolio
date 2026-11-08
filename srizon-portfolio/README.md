# Nur Mohammad Srizon — Portfolio

Clear-glass (1% fill), white-and-green, scroll-driven portfolio over HD animated artwork.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · React Three Fiber 9 + drei 10 · Framer Motion · Lenis · Lucide.

## Run
```bash
# in a fresh folder (delete any old node_modules / package-lock.json first)
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Edit content
All text lives in `data/resume.ts`; components in `components/` render from it.

## What animates
- Lenis inertial smooth scroll + top scroll-progress bar
- Hero: typewriter roles, word-reveal name, glass 3D orb that reacts to mouse AND scroll, floating chips
- Infinite tech marquee (pauses on hover)
- About: paragraph lights up word-by-word as you scroll
- Skills: floating glass cards with 3D tilt + cursor spotlight
- LifeOS: scroll-filled architecture flow with a live data packet
- Projects: vertical scroll drives a horizontal gallery
- Contact: magnetic button

## Scroll-driven image backdrop
`components/BackgroundStack.tsx` maps page scroll across the six images in `public/bg/` (`bg-1.jpg` … `bg-6.jpg`).
Each image crossfades in with blur + zoom, the stack drifts with parallax, and fast scrolling adds extra motion blur.
To change images, replace the files in `public/bg/` (keep the names) or edit the `slides` array (focal point per image is the `pos` value).
Respects `prefers-reduced-motion` (plain crossfade, no blur).

## Theme notes
- Glass lives in `app/globals.css` (`.glass`, `.glass-strong`): 1% white fill + backdrop blur/darken + a slow light sweep.
  To make cards more readable, raise the fill alpha (`rgba(255,255,255,0.01)`) or lower `brightness(...)`.
- Green palette tokens are in `tailwind.config.ts` (`electric`, `violet`, `cyan`, `magenta` now map to mint / emerald / teal / lime).
- Backgrounds are 2560px-wide HD JPGs in `public/bg/`, with a slow Ken Burns drift and green liquid light (`components/Atmosphere.tsx`).
