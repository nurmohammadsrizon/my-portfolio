import { skillGroups } from "@/data/resume";

const all = Array.from(new Set(skillGroups.flatMap((g) => g.items)));
const half = Math.ceil(all.length / 2);
const rowA = all.slice(0, half);
const rowB = all.slice(half);

const dots = ["#6ee7b7", "#34d399", "#2dd4bf", "#bef264"];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="pause-on-hover flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div
        className={`marquee-track flex shrink-0 gap-3 pr-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="glass flex items-center gap-2.5 whitespace-nowrap rounded-full px-5 py-2.5 font-mono text-sm text-ink/80"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: dots[i % dots.length] }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technologies" className="relative space-y-3 py-10">
      <Row items={rowA} />
      <Row items={rowB} reverse />
    </section>
  );
}
