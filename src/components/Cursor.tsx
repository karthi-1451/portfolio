import { useEffect, useRef, useState } from "react";

/** Custom interpolated cursor: dot + reactive ring. */
export default function Cursor({ hue }: { hue: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [mode, setMode] = useState<"default" | "button" | "card" | "image" | "text">(
    "default",
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("cursor-none-desktop");

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;

    const move = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor],a,button",
      ) as HTMLElement | null;
      if (el) {
        const m = el.dataset?.cursor;
        setMode((m as any) || "button");
        setLabel(el.dataset?.cursorLabel || null);
      } else {
        setMode("default");
        setLabel(null);
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%,-50%)`;
      if (ring.current)
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none-desktop");
    };
  }, []);

  const size = mode === "default" ? 34 : mode === "text" ? 12 : label ? 60 : 42;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms" }}
    >
      <div
        ref={ring}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          border: `1px solid ${hue}`,
          background: mode === "default" ? "transparent" : `${hue}1f`,
          backdropFilter: mode === "image" ? "invert(1)" : undefined,
          boxShadow: `0 0 26px -6px ${hue}`,
          transition:
            "width 380ms cubic-bezier(.16,1,.3,1), height 380ms cubic-bezier(.16,1,.3,1), background 380ms, border-color 380ms",
        }}
      >
        {label && (
          <span
            className="font-mono2 text-[9px] uppercase tracking-[0.2em]"
            style={{ color: hue }}
          >
            {label}
          </span>
        )}
      </div>
      <div
        ref={dot}
        className="fixed left-0 top-0 rounded-full"
        style={{
          width: 5,
          height: 5,
          background: hue,
          opacity: mode === "default" ? 1 : 0,
          transition: "opacity 300ms",
        }}
      />
    </div>
  );
}
