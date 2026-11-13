import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Github as GH } from "../components/icons";
import { useRef } from "react";
import { Btn, Reveal, SectionHeading, Tilt } from "../components/ui";
import { PROJECTS } from "../lib/data";

export default function Projects() {
  return (
    <section
      id="projects"
      className="noise relative overflow-hidden px-6 py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, var(--graphite) 0%, var(--charcoal) 48%, var(--navy) 100%)",
      }}
    >
      <div
        className="blob drift"
        style={{
          width: 560,
          height: 560,
          top: "25%",
          left: "-14%",
          background: "var(--glow)",
        }}
      />
      <div
        className="blob drift"
        style={{
          width: 460,
          height: 460,
          bottom: "5%",
          right: "-12%",
          background: "color-mix(in srgb, var(--lava) 22%, transparent)",
          animationDelay: "-10s",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="03 / WORK"
          title="Selected Projects"
          subtitle="Two projects that describe how I work — one in software, one in silicon."
        />
        <div className="space-y-32 md:space-y-44">
          {PROJECTS.map((p, i) => (
            <Project key={p.id} p={p} flip={i % 2 === 1} n={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Project({
  p,
  flip,
  n,
}: {
  p: (typeof PROJECTS)[number];
  flip: boolean;
  n: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <div
      ref={ref}
      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      {/* image */}
      <motion.div style={{ y }} className={flip ? "lg:order-2" : ""}>
        <Tilt className="group" max={6}>
          <div
            data-cursor="image"
            data-cursor-label="View"
            className="relative overflow-hidden rounded-[28px]"
            style={{
              border: "1px solid var(--border-strong)",
              boxShadow: "var(--shadow)",
            }}
          >
            <motion.img
              src={p.image}
              alt={`${p.title} preview`}
              loading="lazy"
              style={{ scale: imgScale }}
              className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-30"
              style={{
                background:
                  "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.75))",
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-syne text-xl font-extrabold text-white">
                {p.title}
              </span>
            </div>
            <span
              className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ boxShadow: "inset 0 0 60px -18px var(--accent)" }}
            />
          </div>
        </Tilt>
      </motion.div>

      {/* content */}
      <div className={flip ? "lg:order-1" : ""}>
        <Reveal>
          <div className="mb-4 flex items-center gap-3">
            <span className="font-syne text-5xl font-extrabold leading-none opacity-15">
              0{n}
            </span>
            <span
              className="rounded-full px-3 py-1 font-mono2 text-[9.5px] uppercase tracking-[0.2em]"
              style={{
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              {p.status}
            </span>
          </div>
          <h3 className="font-syne text-[clamp(1.9rem,4.6vw,3rem)] font-extrabold leading-[0.95] tracking-tight">
            {p.title}
          </h3>
          <p
            className="mt-5 text-[13.5px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            {p.overview}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-7 space-y-4">
            {[
              ["Problem", p.problem],
              ["Solution", p.solution],
            ].map(([k, v]) => (
              <div key={k} className="glass rounded-2xl p-4">
                <span
                  className="font-mono2 text-[9.5px] uppercase tracking-[0.25em]"
                  style={{ color: "var(--accent)" }}
                >
                  {k}
                </span>
                <p
                  className="mt-1.5 text-[12.5px] leading-relaxed"
                  style={{ color: "var(--text-dim)" }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <Detail title="My Contribution" items={p.contribution} bullets />
          <Detail title="Key Features" items={p.features} />
          <div className="mt-7">
            <span
              className="font-mono2 text-[9.5px] uppercase tracking-[0.25em]"
              style={{ color: "var(--text-dim)" }}
            >
              Technologies
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md px-2.5 py-1 font-mono2 text-[10.5px] transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Btn
              href={p.demo ?? undefined}
              newTab
              disabled={!p.demo}
              icon={<ArrowUpRight size={14} />}
            >
              Live Demo
            </Btn>
            <Btn
              href={p.repo ?? undefined}
              newTab
              variant="ghost"
              disabled={!p.repo}
              icon={<GH size={14} />}
            >
              GitHub
            </Btn>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Detail({
  title,
  items,
  bullets = false,
}: {
  title: string;
  items: string[];
  bullets?: boolean;
}) {
  return (
    <div className="mt-7">
      <span
        className="font-mono2 text-[9.5px] uppercase tracking-[0.25em]"
        style={{ color: "var(--text-dim)" }}
      >
        {title}
      </span>
      <ul
        className={`mt-3 ${bullets ? "space-y-1.5" : "flex flex-wrap gap-2"}`}
      >
        {items.map((it) => (
          <li
            key={it}
            className={
              bullets
                ? "flex items-start gap-2.5 text-[12.5px]"
                : "rounded-full px-3 py-1.5 font-mono2 text-[10.5px] transition-transform duration-300 hover:-translate-y-0.5"
            }
            style={
              bullets
                ? { color: "var(--text-dim)" }
                : {
                    border: "1px solid var(--border)",
                    color: "var(--text-dim)",
                  }
            }
          >
            {bullets && <span style={{ color: "var(--accent)" }}>—</span>}
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
