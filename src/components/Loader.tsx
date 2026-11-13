import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1900);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 380);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const name = "P KARTHI".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div
        className="blob drift"
        style={{
          width: 520,
          height: 520,
          background: "var(--glow)",
          top: "20%",
          left: "40%",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-60" />

      <h1 className="relative font-syne text-[clamp(2.2rem,10vw,6rem)] font-extrabold tracking-[-0.03em]">
        {name.map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: "0.6em", rotateX: -80 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </h1>

      <motion.div
        className="relative mt-8 h-px w-[min(360px,60vw)] overflow-hidden"
        style={{ background: "var(--border)" }}
      >
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, var(--accent), var(--lava))",
          }}
        />
      </motion.div>
      <div
        className="mt-4 font-mono2 text-[11px] tracking-[0.4em]"
        style={{ color: "var(--text-dim)" }}
      >
        {String(pct).padStart(3, "0")}
      </div>
    </motion.div>
  );
}
