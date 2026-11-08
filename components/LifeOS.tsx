"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Brain, Database, Lightbulb, RadioTower, ShieldCheck, Layers } from "lucide-react";
import { lifeos } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

const layerIcons = [Brain, Database, Lightbulb, RadioTower, ShieldCheck, Layers];
const layerColors = ["#bef264", "#2dd4bf", "#34d399", "#6ee7b7", "#2dd4bf", "#34d399"];

/** Scroll-driven architecture flow: the line fills and nodes light up as you scroll. */
function Flow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [reached, setReached] = useState(0);
  const n = lifeos.flow.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.round(v * (n - 1)) + (v > 0.02 ? 1 : 0)));

  return (
    <div ref={ref} className="glass-strong rounded-3xl p-6 md:p-8">
      <p className="eyebrow mb-8">System flow</p>

      {/* desktop: horizontal */}
      <div className="relative hidden lg:block">
        <div className="absolute left-[8%] right-[8%] top-[22px] h-[3px] rounded-full bg-white/20" />
        <motion.div
          style={{ scaleX: fill }}
          className="absolute left-[8%] right-[8%] top-[22px] h-[3px] origin-left rounded-full bg-gradient-to-r from-electric via-violet to-magenta"
        />
        {/* live data packet travelling the line */}
        <div className="absolute left-[8%] right-[8%] top-[18px] h-3">
          <span className="absolute h-3 w-3 animate-travel rounded-full bg-white shadow-[0_0_16px_4px_rgba(52,211,153,0.9)]" />
        </div>
        <ol className="relative grid grid-cols-6">
          {lifeos.flow.map((step, i) => {
            const on = i < reached;
            return (
              <li key={step} className="flex flex-col items-center text-center">
                <motion.span
                  animate={{ scale: on ? 1 : 0.85 }}
                  className={`flex h-[46px] w-[46px] items-center justify-center rounded-full border font-mono text-sm transition-colors duration-500 ${
                    on ? "border-transparent bg-emerald-300 text-emerald-950 shadow-[0_0_22px_rgba(52,211,153,0.7)]" : "border-white/30 bg-white/10 text-white/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <span className={`mt-4 text-sm font-medium transition-colors duration-500 ${on ? "text-ink" : "text-muted"}`}>
                  {step}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* mobile: vertical list */}
      <ol className="space-y-3 lg:hidden">
        {lifeos.flow.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-300 font-mono text-xs text-emerald-950">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium text-ink">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function LifeOS() {
  return (
    <section id="lifeos" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="03 — Flagship project"
        title="LifeOS:"
        accent={lifeos.subtitle}
        intro={lifeos.description}
      />

      <Reveal className="mb-10">
        <Flow />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lifeos.layers.map((l, i) => {
          const Icon = layerIcons[i];
          const color = layerColors[i];
          return (
            <Reveal key={l.key} delay={0.07 * (i % 3)}>
              <div className="glass glow-border group relative h-full overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-2">
                <span
                  aria-hidden
                  className="absolute -right-2 -top-5 select-none font-display text-8xl font-bold text-white/[0.06] transition duration-500 group-hover:text-white/[0.14]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/25"
                  style={{ color, boxShadow: `0 10px 26px -8px ${color}99` }}
                >
                  <Icon className="h-5 w-5" />
                  <span
                    className="absolute inset-0 rounded-xl opacity-60"
                    style={{ boxShadow: `0 0 0 0 ${color}66`, animation: "ping 2.6s cubic-bezier(0,0,0.2,1) infinite" }}
                  />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">{l.key}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{l.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
