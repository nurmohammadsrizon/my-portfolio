"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/resume";
import { SectionHeading } from "./Reveal";

const tints = ["#3b6dff", "#e0408f", "#7c5cff", "#06b6d4", "#3b6dff", "#e0408f"];

/** Vertical scroll drives a horizontal gallery (sticky pin) — scroll-jacking without the jank. */
export default function Projects() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(800);
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const measure = () => {
      setVh(window.innerHeight);
      setWide(window.innerWidth >= 768);
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 48));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <SectionHeading
          eyebrow="04 — Selected projects"
          title="Things I've"
          accent="built and explored."
          intro="From API-driven services to a voice-controlled desktop assistant. Keep scrolling and the gallery slides sideways."
        />
      </div>

      <div ref={section} style={{ height: wide ? dist + vh : "auto" }} className="relative">
        <div className={wide ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden" : ""}>
          <motion.div
            ref={track}
            style={wide ? { x } : undefined}
            className={
              wide
                ? "flex w-max gap-6 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
                : "mx-auto grid max-w-7xl gap-5 px-6"
            }
          >
            {projects.map((p, i) => (
              <article
                key={p.num}
                className={`glass-strong glow-border group relative flex flex-col overflow-hidden rounded-[2rem] p-8 ${
                  wide ? "h-[460px] w-[400px] shrink-0 lg:w-[440px]" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-40 blur-3xl transition duration-500 group-hover:opacity-70"
                  style={{ background: tints[i] }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="font-display text-6xl font-bold gradient-text">{p.num}</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink/40 shadow-sm transition group-hover:bg-ink group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <p className="eyebrow relative mt-6 !text-muted">{p.tag}</p>
                <h3 className="relative mt-2 font-display text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted">{p.description}</p>
                <div className="relative mt-auto flex flex-wrap gap-2 pt-6">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white bg-white/80 px-3 py-1 font-mono text-xs text-ink/75 shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>

          {wide && (
            <div className="mx-auto mt-10 h-[3px] w-48 overflow-hidden rounded-full bg-ink/10">
              <motion.div style={{ width: bar }} className="h-full rounded-full bg-gradient-to-r from-electric via-violet to-magenta" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
