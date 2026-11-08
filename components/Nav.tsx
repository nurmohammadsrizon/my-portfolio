"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/resume";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "lifeos", label: "LifeOS" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    const top = document.getElementById("top");
    if (top) observer.observe(top);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass-strong flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight text-ink">
          <span className="gradient-text">NMS</span>
          <span className="ml-2 hidden text-muted sm:inline">{profile.lastName}</span>
        </a>
        <ul className="relative hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id} className="relative">
              <a
                href={`#${l.id}`}
                className={`relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  active === l.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </a>
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_4px_14px_-4px_rgba(80,90,190,0.35)]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-white transition hover:scale-105"
        >
          Hire me
        </a>
      </nav>
    </motion.header>
  );
}
