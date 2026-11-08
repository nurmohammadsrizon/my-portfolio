"use client";

import { MapPin, GraduationCap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { about, strengths } from "@/data/resume";
import { Reveal, SectionHeading } from "./Reveal";
import ScrollWords from "./ScrollWords";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28">
      <SectionHeading eyebrow="01 — About" title="Architecture first," accent="then interfaces." />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <ScrollWords
            text={about.lead}
            className="font-display text-2xl font-medium leading-snug text-white tshadow md:text-[2rem] md:leading-[1.25]"
          />
          <div className="mt-10 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="max-w-2xl text-lg leading-relaxed text-white/80 tshadow">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10 grid gap-4 sm:grid-cols-2">
            <motion.div whileHover={{ y: -6 }} className="glass rounded-2xl p-5">
              <GraduationCap className="mb-3 h-5 w-5 text-cyan" />
              <p className="text-sm leading-relaxed text-ink/75">{about.education}</p>
            </motion.div>
            <motion.div whileHover={{ y: -6 }} className="glass rounded-2xl p-5">
              <Target className="mb-3 h-5 w-5 text-magenta" />
              <p className="text-sm leading-relaxed text-ink/75">{about.goal}</p>
            </motion.div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="glass-strong glow-border rounded-3xl p-7">
              <p className="eyebrow mb-5">Problems I enjoy</p>
              <ul className="space-y-4">
                {about.problems.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.12 * i, duration: 0.6 }}
                    className="flex gap-3 text-ink/80"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-electric to-magenta" />
                    <span>{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-7">
              <p className="eyebrow mb-5">Core strengths</p>
              <div className="flex flex-wrap gap-2.5">
                {strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/25 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/90 transition hover:-translate-y-0.5 hover:border-emerald-300/60 hover:text-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4" /> Mymensingh, Bangladesh
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
