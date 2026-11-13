import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X, Sun, Moon } from "lucide-react";
import { Github, Linkedin } from "./icons";
import { useEffect, useState } from "react";
import { Magnetic } from "./ui";
import { LINKS } from "../lib/data";

const SECTIONS = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["certificates", "Certificates"],
  ["internship", "Internship"],
  ["contact", "Contact"],
];

export default function Nav({
  theme,
  toggle,
}: {
  theme: "dark" | "light";
  toggle: () => void;
}) {
  const [active, setActive] = useState("home");
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setShrunk(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left"
        style={{
          scaleX: bar,
          background: "linear-gradient(90deg, var(--accent), var(--accent-soft), var(--lava))",
        }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[9990] flex justify-center px-4"
        style={{ paddingTop: shrunk ? 10 : 20, transition: "padding 500ms cubic-bezier(.16,1,.3,1)" }}
      >
        <nav
          className="glass flex w-full max-w-6xl items-center justify-between rounded-full"
          style={{
            padding: shrunk ? "8px 10px 8px 20px" : "12px 14px 12px 24px",
            boxShadow: shrunk ? "var(--shadow)" : "none",
            transition: "padding 500ms cubic-bezier(.16,1,.3,1), box-shadow 500ms",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-syne text-sm font-extrabold tracking-[0.2em]"
            aria-label="Back to top"
          >
            P<span style={{ color: "var(--accent)" }}>K</span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {SECTIONS.map(([id, label]) => (
              <li key={id}>
                <Magnetic strength={0.2}>
                  <button
                    onClick={() => go(id)}
                    className="relative rounded-full px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300"
                    style={{ color: active === id ? "var(--bg)" : "var(--text-dim)" }}
                  >
                    {active === id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(120deg, var(--accent), var(--accent-soft))",
                        }}
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <ThemeToggle theme={theme} toggle={toggle} />
            {[
              [LINKS.github, Github, "GitHub"],
              [LINKS.linkedin, Linkedin, "LinkedIn"],
              [LINKS.resume, FileText, "Resume"],
            ].map(([href, Icon, label]: any) => (
              <Magnetic key={label} strength={0.3}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-400 hover:scale-110"
                  style={{ border: "1px solid var(--border)", color: "var(--text-dim)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                >
                  <Icon size={15} strokeWidth={1.6} />
                </a>
              </Magnetic>
            ))}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col justify-center px-8 lg:hidden"
            style={{ background: "var(--bg)" }}
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(140% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 grid-bg opacity-60" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full"
              style={{ border: "1px solid var(--border)" }}
            >
              <X size={18} />
            </button>
            <ul className="relative space-y-1">
              {SECTIONS.map(([id, label], i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => go(id)}
                    className="font-syne text-4xl font-extrabold tracking-tight"
                    style={{ color: active === id ? "var(--accent)" : "var(--text)" }}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle({ theme, toggle }: { theme: "dark" | "light"; toggle: () => void }) {
  const dark = theme === "dark";
  return (
    <Magnetic strength={0.3}>
      <button
        onClick={toggle}
        aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
        className="relative mr-1 flex h-9 w-[62px] items-center rounded-full px-1"
        style={{
          border: "1px solid var(--border)",
          background:
            "linear-gradient(120deg, var(--card), transparent)",
        }}
      >
        <motion.span
          className="flex h-7 w-7 items-center justify-center rounded-full"
          animate={{ x: dark ? 0 : 28, rotate: dark ? 0 : 180 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          style={{
            background: "linear-gradient(140deg, var(--accent), var(--accent-soft))",
            color: "var(--bg)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {dark ? (
              <motion.span
                key="m"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
              >
                <Moon size={14} strokeWidth={1.8} />
              </motion.span>
            ) : (
              <motion.span
                key="s"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
              >
                <Sun size={14} strokeWidth={1.8} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </button>
    </Magnetic>
  );
}
