import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import { Certificates, Internship } from "./sections/Extras";
import Contact from "./sections/Contact";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("pk-theme") as "dark" | "light") || "dark",
  );
  const [cursorHue, setCursorHue] = useState<string | null>(null);

  /* theme */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("pk-theme", theme);
  }, [theme]);

  const toggle = () => {
    document.body.classList.add("theme-anim");
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    setTimeout(() => document.body.classList.remove("theme-anim"), 620);
  };

  /* smooth scroll */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  /* konami easter egg -> cursor colour */
  useEffect(() => {
    let idx = 0;
    const h = (e: KeyboardEvent) => {
      idx = e.key === KONAMI[idx] ? idx + 1 : 0;
      if (idx === KONAMI.length) {
        setCursorHue("#C9110B");
        idx = 0;
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const hue = cursorHue ?? (theme === "dark" ? "#ECB914" : "#7A4E2D");

  return (
    <>
      <Cursor hue={hue} />
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <Nav theme={theme} toggle={toggle} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Internship />
          <Contact />
        </main>
      </motion.div>
    </>
  );
}
