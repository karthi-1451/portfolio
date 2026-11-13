import { motion } from "framer-motion";
import { Award, Medal, ArrowRight, Briefcase, Clock } from "lucide-react";
import { Reveal, SectionHeading, Tilt } from "../components/ui";
import { LINKS } from "../lib/data";

const CERTS = [
  {
    title: "Technical Certificates",
    desc: "Programming · Electronics · AI · Courses · Internships",
    icon: Award,
    href: LINKS.certificatesTechnical,
    cta: "Open Technical Certificates",
  },
  {
    title: "Non Technical Certificates",
    desc: "Sports · Karate · Silambam · Leadership · Events",
    icon: Medal,
    href: LINKS.certificatesNonTechnical,
    cta: "Open Non Technical Certificates",
  },
];

export function Certificates() {
  return (
    <section
      id="certificates"
      className="noise relative overflow-hidden px-6 py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-2) 0%, var(--graphite) 55%, var(--bg) 100%)",
      }}
    >
      <div
        className="blob float"
        style={{
          width: 500,
          height: 500,
          top: "20%",
          left: "35%",
          background: "var(--glow)",
          opacity: 0.5,
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="04 / PROOF"
          title="Certificates"
          subtitle="Grouped into two collections. Each opens as a dedicated page."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.12}>
              <Tilt className="group h-full" max={6}>
                <a
                  href={c.href}
                  target="_self"
                  rel="noopener noreferrer"
                  data-cursor="card"
                  className="glass gradient-border relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-9"
                  style={{ boxShadow: "var(--shadow)" }}
                >
                  <span
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                    style={{ background: "var(--glow)" }}
                  />
                  <div className="relative">
                    <c.icon
                      size={44}
                      strokeWidth={1}
                      style={{ color: "var(--accent)" }}
                      className="transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110"
                    />
                    <h3 className="mt-8 font-syne text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-tight tracking-tight">
                      {c.title}
                    </h3>
                    <p
                      className="mt-3 font-mono2 text-[11.5px] leading-relaxed"
                      style={{ color: "var(--text-dim)" }}
                    >
                      {c.desc}
                    </p>
                  </div>
                  <div
                    className="relative mt-12 flex items-center gap-3 font-mono2 text-[10.5px] uppercase tracking-[0.2em]"
                    style={{ color: "var(--accent)" }}
                  >
                    <span className="link-underline">{c.cta}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight size={14} />
                    </motion.span>
                  </div>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Internship() {
  return (
    <section
      id="internship"
      className="noise relative overflow-hidden px-6 py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, var(--charcoal) 0%, var(--navy-deep) 55%, var(--navy) 100%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          index="05 / EXPERIENCE"
          title="Internships & Industrial Experience"
        />
        <Reveal>
          <Tilt className="group" max={4}>
            <div
              data-cursor="card"
              className="glass gradient-border relative overflow-hidden rounded-[32px] px-8 py-16 text-center md:px-16"
              style={{ boxShadow: "var(--shadow)" }}
            >
              <motion.span
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent), transparent)",
                }}
                animate={{ x: ["-40%", "40%", "-40%"] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div
                className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  border: "1px solid var(--border-strong)",
                  color: "var(--accent)",
                }}
              >
                <Briefcase size={24} strokeWidth={1.2} />
              </div>
              <p
                className="mx-auto max-w-2xl text-[14px] leading-[1.9]"
                style={{ color: "var(--text-dim)" }}
              >
                Currently building technical skills and actively seeking
                internship opportunities in Embedded Systems, Electronics, Web
                Development and Software Engineering.
              </p>
              <div
                className="mt-8 inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono2 text-[10px] uppercase tracking-[0.25em]"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--accent)",
                }}
              >
                <Clock size={12} /> More experiences will be added soon
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
