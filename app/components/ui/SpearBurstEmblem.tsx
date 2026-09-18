"use client";

import { useEffect, useRef } from "react";

interface SpearBurstEmblemProps {
  className?: string;
}

// Low-resolution pixel grid configuration for crisp square pixel effect
const GRID_SIZE = 80;
const CENTER = GRID_SIZE / 2;

// Radii on the 80x80 pixel grid: two concentric circles positioned close together
const R_INNER = 28; // Inner circle radius
const R_OUTER = 35; // Outer circle radius (close by, 7px gap)
const ZIGZAG_TEETH = 12; // Lax zigzag with generous distance between turns

export function SpearBurstEmblem({ className = "" }: SpearBurstEmblemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let lastTime = performance.now();

    const totalPoints = ZIGZAG_TEETH * 2;
    const angleStep = (2 * Math.PI) / totalPoints;

    const render = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Smooth slow ambient rotation (1 rotation every 75 seconds)
      rotation += (delta * (2 * Math.PI)) / 75;

      // Clear previous frame
      ctx.clearRect(0, 0, GRID_SIZE, GRID_SIZE);

      ctx.save();
      ctx.translate(CENTER, CENTER);
      ctx.rotate(rotation);

      // 1. Inner Circle
      ctx.beginPath();
      ctx.arc(0, 0, R_INNER, 0, 2 * Math.PI);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Outer Circle (close by)
      ctx.beginPath();
      ctx.arc(0, 0, R_OUTER, 0, 2 * Math.PI);
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 3. Continuous Lax Zigzag fully confined between inner and outer circles
      ctx.beginPath();
      for (let i = 0; i <= totalPoints; i++) {
        const theta = i * angleStep;
        // Even points touch inner circle, odd points touch outer circle
        const r = i % 2 === 0 ? R_INNER : R_OUTER;
        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 flex items-center justify-center select-none ${className}`}
    >
      {/* Low-res canvas scaled up with pixelated rendering for genuine square pixel effect */}
      <canvas
        ref={canvasRef}
        width={GRID_SIZE}
        height={GRID_SIZE}
        className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] opacity-85 sm:opacity-95 will-change-transform"
        style={{
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
