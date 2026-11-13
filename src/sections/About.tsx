import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { Reveal, SectionHeading, Tilt } from "../components/ui";
import { EDUCATION, INTERESTS, LANGUAGES, PERSONAL } from "../lib/data";

export default function About() {
  return (
    <section
      id="about"
      className="noise relative overflow-hidden px-6 py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, var(--bg) 0%, var(--graphite) 45%, var(--charcoal) 100%)",
      }}
    >
      <div
        className="blob float"
        style={{
          width: 460,
          height: 460,
          top: "10%",
          right: "-10%",
          background: "var(--glow)",
          opacity: 0.6,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading index="01 / ABOUT" title="Who I am" />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div
              className="space-y-5 text-[14px] leading-[1.9]"
              style={{ color: "var(--text-dim)" }}
            >
              <p>
                I am currently pursuing my Bachelor of Technology in Electronics
                and Communication Engineering at SRM Institute of Science and
                Technology, where I am in my second year.
              </p>
              <p>
                Most of my time goes into solving practical engineering problems
                using both software and electronics. I think the best products
                come from hardware and intelligent software working together — a
                clean circuit is only half of the answer, the interface around
                it matters just as much.
              </p>
              <p>
                My work sits across embedded systems, PCB designing, IoT,
                artificial intelligence, robotics, web development, automation
                and user experience. I pick up new tools quickly and prefer
                learning them inside real projects rather than in isolation.
              </p>
              <p style={{ color: "var(--text)" }}>
                What I enjoy most is turning an idea into something that
                actually works.
              </p>
            </div>
          </Reveal>

          {/* personal info card */}
          <Reveal delay={0.1}>
            <Tilt className="group h-full">
              <div
                data-cursor="card"
                className="glass gradient-border h-full rounded-3xl p-7"
                style={{ boxShadow: "var(--shadow)" }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className="font-mono2 text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: "var(--accent)" }}
                  >
                    Profile
                  </span>
                  <GraduationCap
                    size={16}
                    strokeWidth={1.5}
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <dl className="space-y-3.5">
                  {PERSONAL.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-start justify-between gap-6 border-b pb-3.5 last:border-0"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <dt
                        className="font-mono2 text-[10px] uppercase tracking-[0.16em]"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {k}
                      </dt>
                      <dd className="text-right font-mono2 text-[12px]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Tilt>
          </Reveal>
        </div>

        {/* education timeline */}
        <div className="mt-28">
          <Reveal>
            <h3 className="font-syne text-2xl font-bold tracking-tight">
              Education
            </h3>
          </Reveal>
          <div className="relative mt-10 pl-8">
            <motion.span
              className="absolute left-0 top-0 w-px origin-top"
              style={{
                background:
                  "linear-gradient(180deg, var(--accent), var(--lava), transparent)",
                height: "100%",
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="space-y-8">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.place} delay={i * 0.12}>
                  <div className="group relative">
                    <span
                      className="absolute -left-[34px] top-6 h-2.5 w-2.5 rounded-full transition-transform duration-500 group-hover:scale-150"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 18px var(--accent)",
                      }}
                    />
                    <div
                      data-cursor="card"
                      className="glass gradient-border rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1"
                    >
                      <span
                        className="font-mono2 text-[10px] uppercase tracking-[0.25em]"
                        style={{ color: "var(--accent)" }}
                      >
                        {e.period}
                      </span>
                      <h4 className="mt-2 font-syne text-lg font-bold">
                        {e.place}
                      </h4>
                      <p
                        className="font-mono2 text-[11px]"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {e.board}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                        {e.rows.map(([k, v]) => (
                          <div key={k} className="font-mono2 text-[11px]">
                            <span style={{ color: "var(--text-dim)" }}>
                              {k} ·{" "}
                            </span>
                            <span>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* languages */}
        <div className="mt-24 grid gap-4 md:grid-cols-3">
          {LANGUAGES.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.1}>
              <Tilt className="group" max={5}>
                <div
                  data-cursor="card"
                  className="glass gradient-border rounded-2xl p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-syne text-lg font-bold">{l.name}</h4>
                    <span
                      className="font-mono2 text-[10px]"
                      style={{ color: "var(--accent)" }}
                    >
                      {l.pct}%
                    </span>
                  </div>
                  <p
                    className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {l.level}
                  </p>
                  <div
                    className="mt-4 h-[3px] w-full overflow-hidden rounded-full"
                    style={{ background: "var(--border)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--accent), var(--lava))",
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.4,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* interests */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <MapPin size={14} style={{ color: "var(--accent)" }} />
              <h3
                className="font-mono2 text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--text-dim)" }}
              >
                Interests
              </h3>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2.5">
            {INTERESTS.map((t, i) => (
              <motion.span
                key={t}
                data-cursor="button"
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.035,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="glass cursor-default rounded-full px-4 py-2 font-mono2 text-[11px] transition-colors duration-300 hover:border-[var(--accent)]"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
