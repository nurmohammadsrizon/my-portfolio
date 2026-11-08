"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function W({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.28em] inline-block">
      {word}
    </motion.span>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1.6 / words.length;
        return <W key={i} word={w} progress={scrollYProgress} range={[start, Math.min(end, 1)]} />;
      })}
    </p>
  );
}
