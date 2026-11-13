import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Btn, Counter } from "../components/ui";
import { LINKS, ROLES, STATS } from "../lib/data";

/* ---------- typing loop ---------- */
function Typing() {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = ROLES[i % ROLES.length];
    const done = txt === full;
    const speed = del ? 28 : done ? 1500 : 55;
    const t = setTimeout(() => {
      if (!del && done) return setDel(true);
      if (del && txt === "") {
        setDel(false);
        return setI((v) => v + 1);
      }
      setTxt(
        del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1),
      );
    }, speed);
    return () => clearTimeout(t);
  }, [txt, del, i]);

  return (
    <span
      className="font-mono2 text-[clamp(0.8rem,2.2vw,1.05rem)]"
      style={{ color: "var(--text-dim)" }}
    >
      <span style={{ color: "var(--accent)" }}>&gt;</span> {txt}
      <span className="caret" style={{ color: "var(--accent)" }}>
        _
      </span>
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  /* diamond -> circle */

  const scale = useTransform(p, [0, 0.55], [0.92, 1]);
  const innerRotate = useTransform(p, [0, 0.55], [-45, 0]);
  const yText = useTransform(p, [0, 1], [0, 120]);
  const fade = useTransform(p, [0, 0.75], [1, 0]);

  /* mouse parallax */
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set((e.clientX / innerWidth - 0.5) * 2);
      my.set((e.clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, [mx, my]);
  const bx = useTransform(mx, (v) => v * -26);
  const by = useTransform(my, (v) => v * -26);
  const px = useTransform(mx, (v) => v * 16);
  const py = useTransform(my, (v) => v * 16);

  const [ripple, setRipple] = useState(0);
  const name = "P KARTHI".split(" ");

  return (
    <section
      id="home"
      ref={ref}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-32 pb-20"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, var(--navy) 0%, var(--bg) 62%)",
      }}
    >
      {/* backdrop */}
      <motion.div className="absolute inset-0" style={{ x: bx, y: by }}>
        <div className="absolute inset-0 grid-bg" />
        <div
          className="blob drift"
          style={{
            width: 620,
            height: 620,
            top: "-14%",
            left: "-8%",
            background: "color-mix(in srgb, var(--glow) 20%, transparent)",
          }}
        />
        <div
          className="blob drift"
          style={{
            width: 520,
            height: 520,
            bottom: "-18%",
            right: "-6%",
            background: "color-mix(in srgb, var(--lava) 25%, transparent)",
            animationDelay: "-8s",
          }}
        />
      </motion.div>
      <Particles />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-[1.15fr_0.85fr]">
        {/* text */}
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 glass"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>
            <span
              className="font-mono2 text-[10px] uppercase tracking-[0.25em]"
              style={{ color: "var(--text-dim)" }}
            >
              Available for internships
            </span>
          </motion.div>

          {/* NAME — signature typography, preserved */}
          <h1 className="shimmer font-syne text-[clamp(3rem,12vw,8.5rem)] font-extrabold leading-[0.86] tracking-[-0.045em]">
            <span className="gradient-text">
              {name.map((c, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{
                    opacity: 0,
                    y: "0.75em",
                    rotateX: -70,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 0.45 + i * 0.055,
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {c === " " ? "\u00A0" : c}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            className="mt-6 h-6"
          >
            <Typing />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-lg font-mono2 text-[13px] leading-relaxed"
            style={{ color: "var(--text-dim)" }}
          >
            Second year ECE student at SRM Institute of Science and Technology,
            building at the intersection of circuits, code and interface design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Btn href={LINKS.resume} newTab icon={<Download size={14} />}>
              Download Resume
            </Btn>
            <Btn
              variant="ghost"
              icon={<ArrowUpRight size={14} />}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Btn>
          </motion.div>

          {/* glass stats */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-3"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                data-cursor="card"
                className="glass gradient-border group rounded-2xl px-4 py-4 transition-transform duration-500 hover:-translate-y-1"
              >
                <div
                  className="font-syne text-2xl font-extrabold"
                  style={{ color: "var(--accent)" }}
                >
                  <Counter to={s.value} />
                </div>
                <div
                  className="mt-1 font-mono2 text-[9px] uppercase leading-tight tracking-[0.15em]"
                  style={{ color: "var(--text-dim)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* profile: diamond -> circle */}
        <motion.div
          className="relative flex justify-center"
          style={{ x: px, y: py }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="absolute -inset-10 spin-slow rounded-full"
              style={{
                opacity: 0.15,
                background:
                  "conic-gradient(from 0deg, transparent, var(--accent), transparent 45%)",
                filter: "blur(38px)",
              }}
            />
            <motion.div
              onDoubleClick={() => setRipple((r) => r + 1)}
              data-cursor="image"
              data-cursor-label="KARTHI"
              className="relative h-[clamp(200px,42vw,330px)] w-[clamp(200px,42vw,330px)] overflow-hidden"
              animate={{
                rotate: [45, 225, 405],
                borderRadius: ["22%", "50%", "22%"],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                scale,
                border: "1px solid var(--border-strong)",
                boxShadow:
                  "0 40px 90px -35px var(--glow), inset 0 0 60px -30px var(--accent)",
              }}
            >
              <motion.img
                src="/images/profile.jpg"
                alt="Portrait placeholder of P Karthi"
                loading="eager"
                className="absolute left-1/2 top-1/2 h-[150%] w-[150%] max-w-none object-cover"
                animate={{
                  rotate: [-45, -225, -405],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  x: "-50%",
                  y: "-50%",
                }}
              />
              <motion.span
  key={ripple}
  className="pointer-events-none absolute inset-0"
  initial={{ opacity: 0 }}
  animate={
    ripple
      ? { opacity: 0, scale: 2.2 }
      : { opacity: 0 }
  }
  transition={{ duration: 1 }}
  style={{
    background:
      "radial-gradient(circle, var(--accent), transparent 60%)",
  }}
/>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
      >
        <span
          className="font-mono2 text-[9px] uppercase tracking-[0.35em]"
          style={{ color: "var(--text-dim)" }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} style={{ color: "var(--accent)" }} />
        </motion.span>
      </motion.div>
    </section>
  );
}

/* subtle floating particles */
function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => ({
    x: (i * 37) % 100,
    y: (i * 61) % 100,
    d: 6 + (i % 7) * 1.6,
    s: 1 + (i % 3) * 0.6,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            background: "var(--accent)",
            opacity: 0.5,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{
            duration: d.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
