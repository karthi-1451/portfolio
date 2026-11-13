import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------- Reveal: blur + slide in on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section heading with split-letter reveal ---------- */
export function SectionHeading({
  index,
  title,
  subtitle,
  align = "left",
}: {
  index: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const letters = title.split("");
  return (
    <div className={`mb-14 ${align === "center" ? "text-center" : ""}`}>
      <Reveal>
        <div
          className={`mb-4 flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
        >
          <span
            className="font-mono2 text-[11px] tracking-[0.35em]"
            style={{ color: "var(--accent)" }}
          >
            {index}
          </span>
          <span
            className="h-px w-14"
            style={{ background: "var(--border-strong)" }}
          />
        </div>
      </Reveal>
      <h2 className="font-syne text-[clamp(2rem,6vw,4.2rem)] font-extrabold leading-[0.95] tracking-tight">
        {letters.map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: "0.5em", filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.025,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </h2>
      {subtitle && (
        <Reveal delay={0.15}>
          <p
            className="mt-5 max-w-2xl font-mono2 text-sm leading-relaxed"
            style={{
              color: "var(--text-dim)",
              margin: align === "center" ? "1.25rem auto 0" : undefined,
            }}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      <motion.div
        className="mt-7 h-px origin-left"
        style={{
          background:
            "linear-gradient(90deg, var(--accent), var(--lava), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </div>
  );
}

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- 3D tilt card ---------- */
export function Tilt({
  children,
  className = "",
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glareBg = useTransform(
    [sx, sy],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, var(--glow), transparent 65%)`,
  );

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

/* ---------- Animated counter ---------- */
export function Counter({
  to,
  decimals = 2,
  duration = 1.8,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

/* ---------- Premium button ---------- */
export function Btn({
  children,
  href,
  onClick,
  variant = "solid",
  icon,
  newTab = false,
  disabled = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  icon?: ReactNode;
  newTab?: boolean;
  disabled?: boolean;
}) {
  const solid = variant === "solid";
  const cls = `group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 font-mono2 text-[12px] uppercase tracking-[0.18em] transition-all duration-500 ${
    disabled ? "pointer-events-none opacity-40" : ""
  }`;
  const style = solid
    ? {
        background: "linear-gradient(120deg, var(--accent), var(--accent-soft))",
        color: "var(--bg)",
        boxShadow: "0 12px 40px -12px var(--glow)",
      }
    : {
        background: "var(--card)",
        color: "var(--text)",
        border: "1px solid var(--border-strong)",
      };

  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative transition-transform duration-500 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a
          href={href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className={cls}
          style={style}
          data-cursor="button"
        >
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={cls} style={style} data-cursor="button">
          {inner}
        </button>
      )}
    </Magnetic>
  );
}
