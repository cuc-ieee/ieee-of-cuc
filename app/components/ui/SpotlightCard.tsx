"use client";

import React, { useRef, useEffect } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  spotlightColor?: string;
  proximityRadius?: number;
}

export function SpotlightCard({
  children,
  className = "",
  borderColor = "rgba(255, 255, 255, 0.95)",
  spotlightColor,
  proximityRadius = 260,
  style,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        const el = divRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();

        // Viewport culling to conserve GPU
        if (
          rect.bottom < -100 ||
          rect.top > window.innerHeight + 100 ||
          rect.right < -100 ||
          rect.left > window.innerWidth + 100
        ) {
          el.style.setProperty("--spotlight-opacity", "0");
          return;
        }

        // Clamp cursor to card bounds to find closest point on rectangle
        const clampedX = Math.max(rect.left, Math.min(e.clientX, rect.right));
        const clampedY = Math.max(rect.top, Math.min(e.clientY, rect.bottom));

        const dx = e.clientX - clampedX;
        const dy = e.clientY - clampedY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= proximityRadius) {
          // Smooth non-linear falloff: 1 inside card, smooth ease-out to 0 at proximityRadius
          const intensity = distance === 0 ? 1 : Math.pow(1 - distance / proximityRadius, 1.4);
          const localX = e.clientX - rect.left;
          const localY = e.clientY - rect.top;

          el.style.setProperty("--spotlight-x", `${localX}px`);
          el.style.setProperty("--spotlight-y", `${localY}px`);
          el.style.setProperty("--spotlight-opacity", intensity.toFixed(3));
        } else {
          el.style.setProperty("--spotlight-opacity", "0");
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
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
      className={`relative rounded-2xl border border-border/60 bg-card/60 overflow-hidden backdrop-blur-md transition-all duration-300 ${className}`}
      style={{
        ...style,
        ["--spotlight-x" as any]: "-999px",
        ["--spotlight-y" as any]: "-999px",
        ["--spotlight-opacity" as any]: "0",
      }}
      {...props}
    >
      {/* Outer soft ambient bloom/glow along the border */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-[inherit] transition-opacity duration-150 z-0 blur-[4px]"
        style={{
          opacity: "calc(var(--spotlight-opacity, 0) * 0.8)",
          border: "2px solid rgba(255, 255, 255, 0.85)",
          WebkitMaskImage:
            "radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), black 25%, transparent 80%)",
          maskImage:
            "radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), black 25%, transparent 80%)",
        }}
      />

      {/* Crisp high-contrast whitish border stroke */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] border-2 transition-opacity duration-150 z-10"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          borderColor,
          WebkitMaskImage:
            "radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), black 25%, transparent 80%)",
          maskImage:
            "radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), black 25%, transparent 80%)",
        }}
      />

      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
