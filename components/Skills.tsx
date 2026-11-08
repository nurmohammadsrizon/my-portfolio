"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Brain, Server, Code2, Database, LayoutPanelTop, Terminal, ShieldCheck, Cpu } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";

const icons = {
  brain: Brain,
  server: Server,
  code: Code2,
  database: Database,
  layout: LayoutPanelTop,
  terminal: Terminal,
  shield: ShieldCheck,
  cpu: Cpu,
};

const accents = {
  electric: { hex: "59,109,255", color: "#3b6dff" },
  violet: { hex: "124,92,255", color: "#7c5cff" },
  cyan: { hex: "6,182,212", color: "#06b6d4" },
  magenta: { hex: "224,64,143", color: "#e0408f" },
};

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 220, damping: 22 });
  const ry = useSpring(0, { stiffness: 220, damping: 22 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const { hex, color } = accents[group.accent];
  const Icon = icons[group.icon];
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mx}% ${my}%, rgba(${hex},0.2), transparent 65%)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * 12);
    rx.set(-(py - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal delay={0.07 * (index % 3)} className="h-full">
      {/* live float */}
      <motion.div
        className="h-full"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      >
        <motion.div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          className="glass glow-border group relative h-full overflow-hidden rounded-3xl p-6"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
            style={{ background: spotlight }}
          />
          <div className="relative">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
              style={{ color, boxShadow: `0 10px 28px -8px rgba(${hex},0.55), inset 0 0 0 1px rgba(${hex},0.15)` }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold text-ink">{group.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{group.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((it) => (
                <span
                  key={it}
                  className="rounded-lg border border-white bg-white/70 px-2.5 py-1 font-mono text-xs text-ink/75 shadow-sm transition hover:-translate-y-0.5"
                  style={{ ["--c" as string]: color }}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        eyebrow="02 — Technical skills"
        title="The toolkit behind"
        accent="the systems."
        intro="Grouped by the layer of a product they serve, from the AI core down to the Linux shell."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <SkillCard key={g.title} group={g} index={i} />
        ))}
      </div>
    </section>
  );
}
