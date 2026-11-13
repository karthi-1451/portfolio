import { motion } from "framer-motion";
import { Cpu, Code2, Globe, Wrench, Sparkles } from "lucide-react";
import { Reveal, SectionHeading, Tilt } from "../components/ui";
import { SKILLS } from "../lib/data";

const ICONS = [Code2, Cpu, Globe, Wrench, Sparkles];

export default function Skills() {
  return (
    <section
      id="skills"
      className="noise relative overflow-hidden px-6 py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, var(--navy-deep) 0%, var(--bg-2) 45%, var(--bg) 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="02 / SKILLS"
          title="Toolkit"
          subtitle="Hardware, software and the tools in between — grouped the way I actually use them."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <Tilt className="group h-full" max={6}>
                  <div
                    data-cursor="card"
                    className="glass gradient-border relative h-full overflow-hidden rounded-3xl p-7"
                  >
                    {/* animated corners */}
                    {[
                      "left-3 top-3 border-l border-t",
                      "right-3 top-3 border-r border-t",
                      "left-3 bottom-3 border-l border-b",
                      "right-3 bottom-3 border-r border-b",
                    ].map((c) => (
                      <span
                        key={c}
                        className={`absolute h-4 w-4 opacity-0 transition-all duration-500 group-hover:opacity-100 ${c}`}
                        style={{ borderColor: "var(--accent)" }}
                      />
                    ))}
                    <div
                      className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-500 group-hover:rotate-6"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--accent)",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-syne text-xl font-bold tracking-tight">
                      {g.title}
                    </h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {g.items.map((it, k) => (
                        <motion.span
                          key={it}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + k * 0.04, duration: 0.5 }}
                          whileHover={{ y: -3 }}
                          className="rounded-full px-3 py-1.5 font-mono2 text-[10.5px] transition-colors duration-300"
                          style={{
                            border: "1px solid var(--border)",
                            color: "var(--text-dim)",
                          }}
                        >
                          {it}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
