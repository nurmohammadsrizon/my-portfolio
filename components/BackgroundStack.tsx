"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";

/** Focal point per image so the subject stays visible on narrow screens. */
const slides = [
  { src: "/bg/bg-1.jpg", pos: "62% 45%" },
  { src: "/bg/bg-2.jpg", pos: "52% 50%" },
  { src: "/bg/bg-3.jpg", pos: "68% 50%" },
  { src: "/bg/bg-4.jpg", pos: "45% 50%" },
  { src: "/bg/bg-5.jpg", pos: "46% 45%" },
  { src: "/bg/bg-6.jpg", pos: "48% 50%" },
];

const N = slides.length;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep

/** Image i fades in (and un-blurs) while scrolled position s moves from i-0.85 to i-0.15. */
const WINDOW_START = 0.85;
const WINDOW_LEN = 0.7;

function Layer({
  src,
  pos,
  i,
  s,
  vb,
  reduced,
}: {
  src: string;
  pos: string;
  i: number;
  s: MotionValue<number>;
  vb: MotionValue<number>;
  reduced: boolean;
}) {
  // 0 -> not yet arrived, 1 -> fully arrived
  const t = useTransform(s, (v) => (i === 0 ? 1 : ease(clamp((v - (i - WINDOW_START)) / WINDOW_LEN))));
  // 0 -> still on top, 1 -> fully covered by the next image
  const out = useTransform(s, (v) =>
    i === N - 1 ? 0 : ease(clamp((v - (i + 1 - WINDOW_START)) / WINDOW_LEN))
  );

  const filter = useTransform([t, out], (vals: number[]) => {
    if (reduced) return "none";
    const [a, b] = vals;
    const sat = 1 + (1 - a) * 0.35; // slight colour boost while an image arrives
    const bright = 1 - b * 0.25; // slight dim while an image leaves
    return `saturate(${sat.toFixed(3)}) brightness(${bright.toFixed(3)})`;
  });

  // incoming images zoom-settle; the whole stack drifts slowly with scroll (parallax)
  const scale = useTransform([t, out, vb], (vals: number[]) => {
    const [a, b, c] = vals;
    return 1.08 + (reduced ? 0 : (1 - a) * 0.14 - b * 0.03 + c * 0.004);
  });
  const y = useTransform(s, (v) => (reduced ? 0 : (v - i) * -46));

  const visibility = useTransform([t, out], (vals: number[]) => {
    const [a, b] = vals;
    return (i > 0 && a <= 0.001) || b >= 0.999 ? "hidden" : "visible";
  });

  return (
    <motion.div
      aria-hidden
      className="absolute -inset-[7%] will-change-transform"
      style={{ opacity: t, filter, scale, y, visibility, zIndex: i }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        className="kenburns h-full w-full select-none object-cover"
        style={{
          objectPosition: pos,
          animationDirection: i % 2 ? "alternate-reverse" : "alternate",
          animationDuration: `${24 + i * 3}s`,
        }}
      />
    </motion.div>
  );
}

/**
 * Fixed full-screen backdrop. Page scroll progress is mapped across the images;
 * each one crossfades with a blur + zoom, and fast scrolling adds extra motion blur.
 */
export default function BackgroundStack() {
  const reducedPref = useReducedMotion();
  const reduced = !!reducedPref;
  const { scrollY, scrollYProgress } = useScroll();

  const raw = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const s = useSpring(raw, { stiffness: 85, damping: 26, mass: 0.7 });

  const velocity = useSpring(useVelocity(scrollY), { stiffness: 120, damping: 30 });
  const vb = useTransform(velocity, (v) => Math.min(Math.abs(v) / 260, 7));

  const [active, setActive] = useState(0);
  useMotionValueEvent(s, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v)))));

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04100c]">
        {slides.map((sl, i) => (
          <Layer key={sl.src} src={sl.src} pos={sl.pos} i={i} s={s} vb={vb} reduced={reduced} />
        ))}

        {/* light grade only, so the artwork stays vivid: soft top/bottom shade, vignette and a green glow */}
        <div className="absolute inset-0 z-[20] bg-[linear-gradient(180deg,rgba(2,12,8,0.34)_0%,rgba(2,12,8,0.12)_40%,rgba(2,12,8,0.4)_100%)]" />
        <div className="absolute inset-0 z-[21] bg-[radial-gradient(ellipse_at_50%_40%,transparent_48%,rgba(1,8,5,0.5)_100%)]" />
        <div className="absolute inset-0 z-[22] bg-[radial-gradient(ellipse_at_50%_115%,rgba(16,185,129,0.28),transparent_60%)]" />
      </div>

      {/* live scene indicator */}
      <div aria-hidden className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`block w-[3px] rounded-full transition-all duration-500 ${
              i === active ? "h-9 bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.9)]" : "h-3 bg-white/40"
            }`}
          />
        ))}
        <span className="mt-1 font-mono text-[10px] tracking-widest text-white/70">
          {String(active + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}
