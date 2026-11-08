"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Globe, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/resume";
import { Reveal } from "./Reveal";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", value: "nurmohammadsrizon", href: profile.links.github, Icon: Github },
  { label: "LinkedIn", value: "nur-mohammad-srizon", href: profile.links.linkedin, Icon: Linkedin },
  { label: "Portfolio", value: "nmssrizon.netlify.app", href: profile.links.portfolio, Icon: Globe },
];

/** Button that leans toward the cursor. */
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 15 });
  const y = useSpring(0, { stiffness: 220, damping: 15 });
  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 pb-16 pt-28">
      <Reveal>
        <div className="glass-strong relative overflow-hidden rounded-[2.2rem] p-8 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-drift rounded-full bg-emerald-300/25 blur-[90px]" />
          <div
            className="pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 animate-drift rounded-full bg-lime-300/20 blur-[90px]"
            style={{ animationDelay: "-9s" }}
          />
          <div className="relative">
            <p className="eyebrow mb-4">05 — Contact</p>
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Let&apos;s build something <span className="gradient-text">worth scaling.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Open to conversations about AI engineering, backend architecture, FastAPI and Python software.
            </p>

            <div className="mt-8">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-8 py-4 text-sm font-semibold text-emerald-950 shadow-[0_16px_44px_-12px_rgba(16,185,129,0.8)]"
                >
                  <Mail className="h-4 w-4" /> Say hello
                </a>
              </Magnetic>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass glow-border group flex items-center justify-between rounded-2xl p-5 transition hover:-translate-y-1"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300 ring-1 ring-white/25">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-muted">{label}</span>
                      <span className="block break-all text-ink">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-ink/30 transition group-hover:text-ink" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-8 text-sm text-white/70 sm:flex-row">
        <p>© {new Date().getFullYear()} Nur Mohammad Srizon</p>
        <p>{profile.location}</p>
      </footer>
    </section>
  );
}
