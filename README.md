# Nur Mohammad Srizon — Portfolio

White-glass, scroll-driven portfolio.
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
# my-portfolio
