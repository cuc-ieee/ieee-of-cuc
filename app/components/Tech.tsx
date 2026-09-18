"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export const ACCENT = "#2667FF";
export const INK = "#111214";
export const PAPER = "#E4E4E0";

/** Flat-cut (chamfered) corners instead of sharp 90° ones. */
export const CHAMFER =
  "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)";

export function Kicker({ index, label, className = "" }: { index: string; label: string; className?: string }) {
  return (
    <div className={`font-mono text-[10px] uppercase tracking-[0.28em] text-black/70 ${className}`}>
      <span style={{ color: ACCENT }}>■</span> {index} / {label}
    </div>
  );
}

export type TypePart = { t: string; accent?: boolean };

/** Typewriter entrance: text types itself out on scroll into view. */
export function Typewriter({
  parts,
  className = "",
  speed = 28,
  delay = 0,
  caret = true,
  onDone,
}: {
  parts: TypePart[];
  className?: string;
  speed?: number;
  delay?: number;
  caret?: boolean;
  onDone?: () => void;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const full = parts.map((p) => p.t).join("");
  const [n, setN] = useState(0);

  const onDoneRef = useRef<(() => void) | undefined>(undefined);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setN(full.length);
      onDoneRef.current?.();
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= full.length && interval) {
          clearInterval(interval);
          onDoneRef.current?.();
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduced, full, speed, delay]);

  let remaining = n;

  return (
    <span ref={ref} className={className}>
      {/* Non-breaking-space placeholder while empty: a zero-size box is never
          reported as "in view", so without this the typing would never start. */}
      {n === 0 && !caret ? String.fromCharCode(160) : null}
      {parts.map((p, pi) => {
        if (remaining <= 0) return null;
        const take = Math.min(remaining, p.t.length);
        remaining -= take;
        const slice = p.t.slice(0, take);
        return p.accent ? (
          <span key={pi} style={{ color: ACCENT }}>
            {slice}
          </span>
        ) : (
          <span key={pi}>{slice}</span>
        );
      })}
      {caret && (
        <span
          aria-hidden="true"
          className="ml-[0.08em] inline-block animate-pulse"
          style={{ width: "0.055em", height: "0.78em", background: ACCENT, verticalAlign: "-0.06em" }}
        />
      )}
    </span>
  );
}

/** Slide entrance from the side (alternating directions). */
export function SlideIn({
  children,
  from = "left",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: from === "left" ? -56 : 56 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Materialize from pixels: block slices wipe away to reveal content. */
export function PixelIn({
  children,
  className = "",
  delay = 0,
  tone = PAPER,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-10"
          style={{
            left: `${i * 20}%`,
            width: "20.5%",
            background: tone,
            transformOrigin: "top",
          }}
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.35, delay: delay + i * 0.07, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

/** 0 → 1 scroll progress of the whole document. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return p;
}
