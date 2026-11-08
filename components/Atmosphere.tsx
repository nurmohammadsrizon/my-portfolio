"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Living pastel background: drifting colour fields plus a soft light that follows the cursor. */
export default function Atmosphere() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 70, damping: 20 });
  const sy = useSpring(y, { stiffness: 70, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 260);
      y.set(e.clientY - 260);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 -top-32 h-[560px] w-[560px] rounded-full bg-[#b9a7ff]/55 blur-[120px] animate-drift" />
      <div
        className="absolute -right-32 top-[18%] h-[520px] w-[520px] rounded-full bg-[#8fd3ff]/55 blur-[120px] animate-drift"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute bottom-[-160px] left-[28%] h-[520px] w-[520px] rounded-full bg-[#ffb3d6]/50 blur-[130px] animate-drift"
        style={{ animationDelay: "-14s" }}
      />
      <motion.div
        className="absolute h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22),transparent_65%)]"
        style={{ x: sx, y: sy }}
      />
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
