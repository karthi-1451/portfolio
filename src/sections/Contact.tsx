import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  ArrowUp,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Btn, Reveal, SectionHeading, Tilt, Magnetic } from "../components/ui";
import { Github, Linkedin, Instagram } from "../components/icons";
import { LINKS } from "../lib/data";

const CARDS = [
  {
    label: "Email",
    value: "karthipattabiraman@gmail.com",
    icon: Mail,
    href: "mailto:karthipattabiraman@gmail.com",
    copy: true,
  },
  {
    label: "Phone",
    value: "+91 94426 93282",
    icon: Phone,
    href: "tel:+919442693282",
    copy: true,
  },
  {
    label: "GitHub",
    value: "@pkarthi",
    icon: Github,
    href: "https://github.com/karthi-1451",
    copy: false,
  },
  {
    label: "LinkedIn",
    value: "P Karthi",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/karthi-pattabiraman-13ab17363/",
    copy: false,
  },
  {
    label: "Instagram",
    value: "@pkarthi",
    icon: Instagram,
    href: "https://www.instagram.com/its_not_karthi/",
    copy: false,
  },
  {
    label: "Location",
    value: LINKS.location,
    icon: MapPin,
    href: null,
    copy: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (v: string) => {
    navigator.clipboard?.writeText(v);
    setCopied(v);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <section
      id="contact"
      className="noise relative overflow-hidden px-6 pt-28 md:pt-36"
      style={{
        background:
          "linear-gradient(180deg, var(--navy) 0%, var(--bg) 45%, #000 100%)",
      }}
    >
      <div
        className="blob drift"
        style={{
          width: 620,
          height: 620,
          bottom: "-20%",
          left: "20%",
          background: "var(--glow)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          index="06 / CONTACT"
          title="Let's build something"
          subtitle="Open to internships, project collaborations and conversations about electronics or interfaces."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <Tilt className="group h-full" max={7}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    data-cursor="card"
                    className="glass gradient-border relative flex h-full items-center gap-4 rounded-2xl p-5"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 group-hover:rotate-6"
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--accent)",
                      }}
                    >
                      <c.icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className="font-mono2 text-[9px] uppercase tracking-[0.25em]"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {c.label}
                      </div>

                      <span className="block truncate font-mono2 text-[12px]">
                        {c.value}
                      </span>
                    </div>

                    {c.copy && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          copy(c.value);
                        }}
                        aria-label={`Copy ${c.label}`}
                        className="shrink-0 rounded-lg p-2 transition-colors duration-300"
                        style={{
                          border: "1px solid var(--border)",
                          color:
                            copied === c.value
                              ? "var(--accent)"
                              : "var(--text-dim)",
                        }}
                      >
                        {copied === c.value ? (
                          <Check size={13} />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    )}
                  </a>
                ) : (
                  <div
                    data-cursor="card"
                    className="glass gradient-border relative flex h-full items-center gap-4 rounded-2xl p-5"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-500 group-hover:rotate-6"
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--accent)",
                      }}
                    >
                      <c.icon size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className="font-mono2 text-[9px] uppercase tracking-[0.25em]"
                        style={{ color: "var(--text-dim)" }}
                      >
                        {c.label}
                      </div>

                      <span className="block truncate font-mono2 text-[12px]">
                        {c.value}
                      </span>
                    </div>

                    {c.copy && (
                      <button
                        onClick={() => copy(c.value)}
                        aria-label={`Copy ${c.label}`}
                        className="shrink-0 rounded-lg p-2 transition-colors duration-300"
                        style={{
                          border: "1px solid var(--border)",
                          color:
                            copied === c.value
                              ? "var(--accent)"
                              : "var(--text-dim)",
                        }}
                      >
                        {copied === c.value ? (
                          <Check size={13} />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>
                    )}
                  </div>
                )}
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
            <Btn href={`mailto:${LINKS.email}`} icon={<Mail size={14} />}>
              Contact Me
            </Btn>
            <Btn
              href={LINKS.resume}
              newTab
              variant="ghost"
              icon={<FileText size={14} />}
            >
              Download Resume
            </Btn>
          </div>
        </Reveal>
      </div>

      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mx-auto mt-28 max-w-6xl pb-10">
      <div className="divider" />
      <div className="flex flex-col items-center justify-between gap-8 py-10 md:flex-row md:items-end">
        <div>
          <h3 className="font-syne text-2xl font-extrabold tracking-tight">
            P KARTHI
          </h3>
          <p
            className="mt-2 font-mono2 text-[11px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            Electronics & Communication Engineering
            <br />
            SRM Institute of Science and Technology · 2025–2029
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[
            [LINKS.github, Github, "GitHub"],
            [LINKS.linkedin, Linkedin, "LinkedIn"],
            [LINKS.instagram, Instagram, "Instagram"],
          ].map(([href, Icon, label]: any) => (
            <Magnetic key={label} strength={0.35}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 hover:scale-110"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-dim)",
                }}
              >
                <Icon size={15} />
              </a>
            </Magnetic>
          ))}
          <Magnetic strength={0.35}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="group ml-2 flex h-10 items-center gap-2 rounded-full px-5 font-mono2 text-[10px] uppercase tracking-[0.2em]"
              style={{
                border: "1px solid var(--border-strong)",
                color: "var(--accent)",
              }}
            >
              Top
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowUp size={13} />
              </motion.span>
            </button>
          </Magnetic>
        </div>
      </div>
      <p
        className="pb-2 text-center font-mono2 text-[10px] tracking-[0.15em]"
        style={{ color: "var(--text-dim)" }}
      >
        © {new Date().getFullYear()} P Karthi — Designed & built with attention
        to detail.
      </p>
    </footer>
  );
}
