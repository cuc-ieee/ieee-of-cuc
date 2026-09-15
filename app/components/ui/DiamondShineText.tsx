"use client";

import React, { useEffect, useRef, useState } from "react";

interface DiamondShineTextProps {
  children: string;
  className?: string;
}

export function DiamondShineText({ children, className = "" }: DiamondShineTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.ceil(rect.width),
          height: Math.ceil(rect.height),
        });
      }
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Add extra padding around text for diamond blur fringe
    const paddingX = 24;
    const paddingY = 16;
    const totalW = dimensions.width + paddingX * 2;
    const totalH = dimensions.height + paddingY * 2;

    canvas.width = totalW * dpr;
    canvas.height = totalH * dpr;
    canvas.style.width = `${totalW}px`;
    canvas.style.height = `${totalH}px`;
    canvas.style.left = `-${paddingX}px`;
    canvas.style.top = `-${paddingY}px`;

    ctx.scale(dpr, dpr);

    // Precompute diamond grid
    const diamondSpacing = 12; // Distance between diamond centers
    const diamonds: { x: number; y: number; seed: number; baseSize: number }[] = [];

    const cols = Math.ceil(totalW / diamondSpacing) + 2;
    const rows = Math.ceil(totalH / diamondSpacing) + 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Offset alternate rows for isometric diamond brick alignment
        const offsetX = (r % 2) * (diamondSpacing * 0.5);
        const x = c * diamondSpacing + offsetX;
        const y = r * diamondSpacing;

        // Deterministic pseudo-random seed based on position
        const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        const baseSize = 5.2 + (Math.abs(seed) % 3.0); // 5.2px to 8.2px diamonds

        diamonds.push({ x, y, seed, baseSize });
      }
    }

    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;

    // Intersection observer to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const drawDiamond = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      radius: number,
      fillColor: string,
      blur: number,
      blurColor: string
    ) => {
      context.save();
      if (blur > 0) {
        context.shadowColor = blurColor;
        context.shadowBlur = blur;
      }
      context.fillStyle = fillColor;
      context.beginPath();
      context.moveTo(cx, cy - radius); // Top point
      context.lineTo(cx + radius, cy); // Right point
      context.lineTo(cx, cy + radius); // Bottom point
      context.lineTo(cx - radius, cy); // Left point
      context.closePath();
      context.fill();
      context.restore();
    };

    const loop = (now: number) => {
      animationFrameId = requestAnimationFrame(loop);
      if (!isVisible) return;

      ctx.clearRect(0, 0, totalW, totalH);

      // Total sweep cycle: 3.8s (1.6s sweep across, 2.2s resting delay)
      const cycleDuration = 3800;
      const elapsed = (now - startTime) % cycleDuration;
      const sweepProgress = Math.min(elapsed / 1600, 1.0); // 0 to 1 during sweep, 1 during rest

      if (sweepProgress >= 1.0) {
        // In rest period - draw nothing or faint idle shimmer
        return;
      }

      // Smooth custom ease across the text
      // Sweeping beam x-position with slant
      const beamStart = -80;
      const beamEnd = totalW + 80;
      const beamX = beamStart + (beamEnd - beamStart) * sweepProgress;
      const beamWidth = 95; // Width of the passing shine zone
      const slantAngle = 0.28; // ~16 deg slant for dynamic sweep

      for (let i = 0; i < diamonds.length; i++) {
        const d = diamonds[i];

        // Slanted distance from diamond to current beam position
        const slantedDist = (d.x - (beamX + (d.y - totalH / 2) * slantAngle));
        const absDist = Math.abs(slantedDist);

        if (absDist < beamWidth) {
          const norm = 1 - absDist / beamWidth;
          // Smooth bell-curve brightness
          const intensity = Math.pow(norm, 2.2);

          // Subtle organic sparkle / glint variation
          const sparkle = 0.8 + 0.35 * Math.sin(d.seed * 50 + now * 0.008);
          const alpha = Math.min(intensity * sparkle, 1.0);

          if (alpha > 0.04) {
            // Layer 1: Pixel Blur Diamond Halo (Outer blurred diamond)
            const blurRadius = d.baseSize * 1.3;
            const blurAmount = 8 + alpha * 10;
            drawDiamond(
              ctx,
              d.x,
              d.y,
              blurRadius,
              `rgba(56, 189, 248, ${alpha * 0.65})`, // Radiant electric sky blue
              blurAmount,
              `rgba(56, 189, 248, ${alpha * 0.85})`
            );

            // Layer 2: Intermediate Diamond Glow
            drawDiamond(
              ctx,
              d.x,
              d.y,
              d.baseSize,
              `rgba(186, 230, 253, ${alpha * 0.85})`, // Crisp ice cyan
              3,
              `rgba(255, 255, 255, ${alpha * 0.7})`
            );

            // Layer 3: Ultra-bright Intense Diamond Core (when close to center of beam)
            if (alpha > 0.45) {
              const coreAlpha = (alpha - 0.45) / 0.55;
              drawDiamond(
                ctx,
                d.x,
                d.y,
                d.baseSize * 0.65,
                `rgba(255, 255, 255, ${coreAlpha * 0.95})`, // Pure brilliant white diamond
                1,
                "rgba(255, 255, 255, 0.9)"
              );
            }
          }
        }
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [dimensions]);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Canvas shine overlay with diamond pixel blur */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-20 mix-blend-screen"
      />
      {/* Base text content */}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
