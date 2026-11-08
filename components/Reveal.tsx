"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
}) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-5xl">
        {title} {accent && <span className="gradient-text">{accent}</span>}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
