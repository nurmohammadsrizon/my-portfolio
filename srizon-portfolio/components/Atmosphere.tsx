"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Green liquid light drifting over the artwork, plus a soft glow that follows the cursor. */
export default function Atmosphere() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 70, damping: 20 });
  const sy = useSpring(y, { stiffness: 70, damping: 20 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 280);
      y.set(e.clientY - 280);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="liquid absolute -left-32 top-[8%] h-[520px] w-[520px] bg-[radial-gradient(circle_at_40%_40%,rgba(110,231,183,0.34),transparent_68%)] mix-blend-screen"
      />
      <div
        className="liquid absolute -right-24 top-[42%] h-[560px] w-[560px] bg-[radial-gradient(circle_at_50%_50%,rgba(190,242,100,0.22),transparent_68%)] mix-blend-screen"
        style={{ animationDelay: "-8s", animationDuration: "26s" }}
      />
      <div
        className="liquid absolute bottom-[-160px] left-[30%] h-[600px] w-[600px] bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.3),transparent_68%)] mix-blend-screen"
        style={{ animationDelay: "-15s", animationDuration: "30s" }}
      />
      <motion.div
        className="absolute h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(167,243,208,0.26),transparent_65%)] mix-blend-screen"
        style={{ x: sx, y: sy }}
      />
    </div>
  );
}
