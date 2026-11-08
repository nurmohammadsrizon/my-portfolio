"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Globe, MousePointer2 } from "lucide-react";
import { profile } from "@/data/resume";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <div className="h-44 w-44 animate-pulse rounded-full bg-violet/30 blur-3xl" />
    </div>
  ),
});

const socials = [
  { href: profile.links.github, label: "GitHub", Icon: Github },
  { href: profile.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.links.portfolio, label: "Portfolio", Icon: Globe },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Live typewriter that cycles through the roles on the resume. */
function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const t = setTimeout(
      () => {
        if (done) setDeleting(true);
        else if (empty) {
          setDeleting(false);
          setI((n) => n + 1);
        } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      done ? 1500 : empty ? 250 : deleting ? 38 : 75
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="font-mono text-base text-white/90 md:text-lg tshadow">
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-violet" />
    </span>
  );
}

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden pb-2 align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "115%", rotate: 4 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatChip({
  children,
  className,
  delay = 0,
  dur = 5,
}: {
  children: React.ReactNode;
  className: string;
  delay?: number;
  dur?: number;
}) {
  return (
    <motion.div
      className={`glass-strong absolute hidden rounded-2xl px-4 py-3 sm:block ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.8, delay: 1.2 + delay },
        scale: { duration: 0.8, delay: 1.2 + delay },
        y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden pt-28">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-6 px-6 lg:grid-cols-[1.05fr_1fr]">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10 py-10">
          {/* soft scrim behind the copy so it stays readable over bright artwork; the rest of the picture stays clear */}
          <div aria-hidden className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 bg-[radial-gradient(ellipse_at_35%_50%,rgba(2,12,8,0.5),transparent_72%)]" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="glass mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="eyebrow !tracking-[0.18em] !text-ink/70">Open to opportunities</span>
          </motion.div>

          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white tshadow sm:text-6xl xl:text-7xl">
            <Word delay={0.1}>Nur</Word> <Word delay={0.18}>Mohammad</Word>
            <br />
            <span className="gradient-text">
              <Word delay={0.28}>Srizon</Word>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-6 h-8"
          >
            <Typewriter words={profile.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease }}
            className="mt-5 max-w-xl font-display text-xl font-medium text-white tshadow md:text-2xl"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease }}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/80 tshadow md:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-300 px-7 py-3.5 text-sm font-semibold text-emerald-950 shadow-[0_14px_44px_-10px_rgba(16,185,129,0.85)] transition hover:scale-[1.04]"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-electric via-violet to-magenta transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative transition-colors">Explore My Work</span>
              <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass-strong inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-ink transition hover:scale-[1.04]"
            >
              Let&apos;s Connect
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10 flex items-center gap-3"
          >
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="glass glow-border flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition hover:-translate-y-1 hover:text-ink"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          style={{ y: sceneY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease }}
          className="relative h-[420px] sm:h-[520px] lg:h-[680px]"
        >
          <HeroScene />
          <FloatChip className="bottom-10 left-0" dur={5.5}>
            <p className="eyebrow !text-[0.6rem] !text-muted">Flagship</p>
            <p className="mt-1 font-display text-sm font-semibold text-ink">LifeOS</p>
          </FloatChip>
          <FloatChip className="right-0 top-12" delay={0.8} dur={6.5}>
            <p className="eyebrow !text-[0.6rem] !text-muted">Backend</p>
            <p className="mt-1 font-display text-sm font-semibold text-ink">Python · FastAPI</p>
          </FloatChip>
          <FloatChip className="bottom-24 right-6" delay={1.6} dur={5}>
            <p className="eyebrow !text-[0.6rem] !text-muted">Focus</p>
            <p className="mt-1 font-display text-sm font-semibold text-ink">AI Engineering</p>
          </FloatChip>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex"
      >
        <span className="eyebrow !text-[0.6rem] !text-white/70">Scroll</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <MousePointer2 className="h-4 w-4 rotate-180" />
        </motion.span>
      </motion.div>
    </section>
  );
}
