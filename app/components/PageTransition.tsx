"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { ACCENT, INK } from "./Tech";

const COLS = 12;
const ROWS = 7;
const STEP = 0.028;
const CELL = 0.28;
const LEAD = 0.1;
// Max diagonal index (top-right cell): bottom-left starts at 0.
const MAX_DIAG = COLS - 1 + (ROWS - 1);
const COVER_TOTAL = LEAD + MAX_DIAG * STEP + CELL;
const REVEAL_TOTAL = LEAD + MAX_DIAG * STEP + CELL;

type Phase = "idle" | "covering" | "revealing";

/**
 * Midpoint page transition.
 *
 * Cover wave sweeps bottom-left → top-right. The instant the wave reaches
 * the far diagonal (full cover = exact middle of the sequence), the route
 * swaps underneath. The reveal wave then dissolves in the same direction.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("revealing");
  const [runId, setRunId] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPath = useRef(pathname);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // Intro reveal settles back to idle.
  useEffect(() => {
    if (reduced) {
      setPhase("idle");
      return;
    }
    timer.current = setTimeout(() => setPhase("idle"), REVEAL_TOTAL * 1000 + 150);
    return clearTimer;
  }, [reduced]);

  const go = useCallback(
    (href: string) => {
      if (reduced) {
        router.push(href);
        return;
      }
      if (phaseRef.current !== "idle") return;
      clearTimer();
      setRunId((r) => r + 1);
      setPhase("covering");
      // Midpoint: wave has reached the far diagonal, screen fully covered.
      timer.current = setTimeout(() => {
        router.push(href);
        setPhase("revealing");
        timer.current = setTimeout(() => setPhase("idle"), REVEAL_TOTAL * 1000 + 150);
      }, COVER_TOTAL * 1000);
    },
    [router, reduced]
  );

  // Intercept in-app link clicks so navigation waits for the midpoint.
  // NOTE: capture phase is required. Next.js <Link> navigates
  // programmatically inside its own (bubble-phase) click handler, so a
  // bubble listener + preventDefault arrives too late and the page swaps
  // instantly. Capturing + stopPropagation keeps Link from ever firing.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      let url: URL;
      try {
        url = new URL(raw, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same-page interactions (tabs, filters, anchors): no transition.
      if (url.pathname === window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      go(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [go]);

  // Browser back/forward buttons: quick reveal-only wave.
  useEffect(() => {
    if (prevPath.current !== pathname) {
      prevPath.current = pathname;
      if (phaseRef.current === "idle" && !reduced) {
        clearTimer();
        setRunId((r) => r + 1);
        setPhase("revealing");
        timer.current = setTimeout(() => setPhase("idle"), REVEAL_TOTAL * 1000 + 150);
      }
    }
  }, [pathname, reduced]);

  useEffect(() => clearTimer, []);

  if (reduced || phase === "idle") return null;

  const covering = phase === "covering";
  return (
    <div
      key={`${runId}-${phase}`}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] grid"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        const fromBottomLeft = ROWS - 1 - r + c;
        return (
          <motion.span
            key={i}
            initial={{ scale: covering ? 0 : 1, opacity: covering ? 0 : 1 }}
            animate={{ scale: covering ? 1 : 0, opacity: covering ? 1 : 0 }}
            transition={{ duration: CELL, delay: LEAD + fromBottomLeft * STEP, ease: "easeInOut" }}
            style={{ background: (c * 7 + r * 3) % 9 === 0 ? INK : ACCENT }}
          />
        );
      })}
    </div>
  );
}
