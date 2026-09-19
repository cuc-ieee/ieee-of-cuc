"use client";

import React, { useRef, useEffect } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  spotlightColor?: string;
  proximityRadius?: number;
}

// Global registry entry for each mounted SpotlightCard
interface CardEntry {
  el: HTMLDivElement;
  proximityRadius: number;
  rect: DOMRect | null;
  isVisible: boolean;
}

const registeredCards = new Set<CardEntry>();
let mouseX = -9999;
let mouseY = -9999;
let rafId: number | null = null;
let listenersAttached = false;
let scrollTimeoutId: any = null;

// Batch-update cached bounding client rects
function updateVisibleRects() {
  for (const card of registeredCards) {
    if (card.isVisible) {
      card.rect = card.el.getBoundingClientRect();
    }
  }
}

// Global pointer movement handler (Single listener for the entire app)
function onPointerMove(e: PointerEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (rafId === null) {
    rafId = requestAnimationFrame(processActiveCards);
  }
}

// Single RAF loop: zero layout thrashing, reads cached rects
function processActiveCards() {
  rafId = null;

  for (const card of registeredCards) {
    if (!card.isVisible) continue;

    let rect = card.rect;
    if (!rect) {
      rect = card.rect = card.el.getBoundingClientRect();
    }

    const rad = card.proximityRadius;

    // Ultra-fast Axis-Aligned Bounding Box (AABB) culling
    if (
      mouseX < rect.left - rad ||
      mouseX > rect.right + rad ||
      mouseY < rect.top - rad ||
      mouseY > rect.bottom + rad
    ) {
      if (card.el.dataset.spotlightActive === "true") {
        card.el.style.setProperty("--spotlight-opacity", "0");
        card.el.dataset.spotlightActive = "false";
      }
      continue;
    }

    // Clamp cursor to card boundaries to calculate shortest distance
    const clampedX = Math.max(rect.left, Math.min(mouseX, rect.right));
    const clampedY = Math.max(rect.top, Math.min(mouseY, rect.bottom));

    const dx = mouseX - clampedX;
    const dy = mouseY - clampedY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= rad) {
      const intensity = distance === 0 ? 1 : Math.pow(1 - distance / rad, 1.25);
      const localX = mouseX - rect.left;
      const localY = mouseY - rect.top;

      card.el.style.setProperty("--spotlight-x", `${localX.toFixed(1)}px`);
      card.el.style.setProperty("--spotlight-y", `${localY.toFixed(1)}px`);
      card.el.style.setProperty("--spotlight-opacity", intensity.toFixed(2));
      card.el.dataset.spotlightActive = "true";
    } else if (card.el.dataset.spotlightActive === "true") {
      card.el.style.setProperty("--spotlight-opacity", "0");
      card.el.dataset.spotlightActive = "false";
    }
  }
}

function onScrollOrResize() {
  updateVisibleRects();
  // Debounce an extra update once scrolling settles
  clearTimeout(scrollTimeoutId);
  scrollTimeoutId = setTimeout(updateVisibleRects, 100);
}

function ensureListeners() {
  if (listenersAttached || typeof window === "undefined") return;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  listenersAttached = true;
}

function removeListenersIfEmpty() {
  if (registeredCards.size === 0 && listenersAttached && typeof window !== "undefined") {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
    listenersAttached = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}

export function SpotlightCard({
  children,
  className = "",
  borderColor = "rgba(255, 255, 255, 0.85)",
  spotlightColor,
  proximityRadius = 240,
  style,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    ensureListeners();

    const entry: CardEntry = {
      el,
      proximityRadius,
      rect: null,
      isVisible: false,
    };

    registeredCards.add(entry);

    // Viewport visibility culling using native IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const obsEntry of entries) {
          if (obsEntry.target === el) {
            entry.isVisible = obsEntry.isIntersecting;
            if (obsEntry.isIntersecting) {
              entry.rect = obsEntry.boundingClientRect;
            } else {
              entry.rect = null;
              el.style.setProperty("--spotlight-opacity", "0");
              el.dataset.spotlightActive = "false";
            }
          }
        }
      },
      { rootMargin: "150px" } // Preload rects slightly before entering viewport
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      registeredCards.delete(entry);
      removeListenersIfEmpty();
    };
  }, [proximityRadius]);

  return (
    <div
      ref={divRef}
      onFocus={() => {
        if (divRef.current) {
          divRef.current.style.setProperty("--spotlight-opacity", "1");
          divRef.current.style.setProperty("--spotlight-x", "50%");
          divRef.current.style.setProperty("--spotlight-y", "50%");
        }
      }}
      onBlur={() => {
        if (divRef.current) {
          divRef.current.style.setProperty("--spotlight-opacity", "0");
        }
      }}
      className={`relative rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-md ${className}`}
      style={{
        ...style,
        ["--spotlight-x" as any]: "-999px",
        ["--spotlight-y" as any]: "-999px",
        ["--spotlight-opacity" as any]: "0",
        transform: "translateZ(0)",
      }}
      {...props}
    >
      {/* High-performance hardware-accelerated border illumination layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] border-2 z-10"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          borderColor,
          WebkitMaskImage:
            "radial-gradient(240px circle at var(--spotlight-x) var(--spotlight-y), black 20%, transparent 80%)",
          maskImage:
            "radial-gradient(240px circle at var(--spotlight-x) var(--spotlight-y), black 20%, transparent 80%)",
          transform: "translateZ(0)",
          willChange: "opacity",
        }}
      />

      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
