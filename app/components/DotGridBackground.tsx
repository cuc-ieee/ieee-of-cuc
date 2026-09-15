"use client";

import React, { useEffect, useRef } from "react";

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let isRunning = false;

    let width = 0;
    let height = 0;

    const SPACING = 38; // Distance between dots in px
    const INFLUENCE_RADIUS = 135; // Proximity radius where dots get restless

    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseMoveTime = 0;

    // Seeds for pseudo-random phase jitter
    let seeds: Float32Array = new Float32Array(0);
    let cols = 0;
    let rows = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;

      // Initialize deterministic random seeds for each grid dot
      const totalDots = cols * rows;
      seeds = new Float32Array(totalDots);
      for (let i = 0; i < totalDots; i++) {
        seeds[i] = Math.random() * Math.PI * 2;
      }

      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const time = now * 0.022; // High-frequency restlessness speed
      const isMouseActive = now - lastMouseMoveTime < 600;

      // Single batched path for resting (tranquil) dots
      const tranquilPath = new Path2D();

      // Bounding box of dots influenced by mouse (spatial partitioning for O(1) performance)
      let minCol = -1;
      let maxCol = -1;
      let minRow = -1;
      let maxRow = -1;

      if (isMouseActive && mouseX >= -INFLUENCE_RADIUS && mouseX <= width + INFLUENCE_RADIUS) {
        minCol = Math.max(0, Math.floor((mouseX - INFLUENCE_RADIUS) / SPACING));
        maxCol = Math.min(cols - 1, Math.ceil((mouseX + INFLUENCE_RADIUS) / SPACING));
        minRow = Math.max(0, Math.floor((mouseY - INFLUENCE_RADIUS) / SPACING));
        maxRow = Math.min(rows - 1, Math.ceil((mouseY + INFLUENCE_RADIUS) / SPACING));
      }

      // Restless dots collection for individual active rendering
      const restlessDots: {
        x: number;
        y: number;
        radius: number;
        alpha: number;
        glowAlpha: number;
      }[] = [];

      for (let c = 0; c < cols; c++) {
        const baseX = c * SPACING;

        for (let r = 0; r < rows; r++) {
          const baseY = r * SPACING;
          const idx = c * rows + r;

          // Check if within the restless zone
          if (c >= minCol && c <= maxCol && r >= minRow && r <= maxRow) {
            const dx = mouseX - baseX;
            const dy = mouseY - baseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < INFLUENCE_RADIUS) {
              const factor = Math.pow(1 - dist / INFLUENCE_RADIUS, 1.4);
              const seed = seeds[idx];

              // High-frequency subtle vibration offset (restlessness)
              const jitterMagnitude = factor * 2.8;
              const jx = (Math.sin(time * 2.2 + seed) + Math.cos(time * 3.1 + seed * 1.5)) * jitterMagnitude;
              const jy = (Math.cos(time * 2.6 + seed * 0.8) + Math.sin(time * 2.1 + seed * 1.2)) * jitterMagnitude;

              restlessDots.push({
                x: baseX + jx,
                y: baseY + jy,
                radius: 1.3 + factor * 1.2,
                alpha: 0.18 + factor * 0.65,
                glowAlpha: factor * 0.35,
              });
              continue;
            }
          }

          // Outside restless zone: add to tranquil batch at exact resting position
          tranquilPath.moveTo(baseX + 1.2, baseY);
          tranquilPath.arc(baseX, baseY, 1.2, 0, Math.PI * 2);
        }
      }

      // 1. Draw all tranquil dots in 1 single GPU draw call
      ctx.fillStyle = "rgba(148, 163, 184, 0.14)";
      ctx.fill(tranquilPath);

      // 2. Draw energized restless dots
      if (restlessDots.length > 0) {
        for (let i = 0; i < restlessDots.length; i++) {
          const dot = restlessDots[i];

          // Soft outer electric blue halo
          if (dot.glowAlpha > 0.08) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius * 2.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${dot.glowAlpha * 0.4})`;
            ctx.fill();
          }

          // Crisp restless core
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${dot.alpha})`;
          ctx.fill();
        }
      }
    };

    const loop = () => {
      const now = performance.now();
      draw();

      // Only continue animating if the cursor was moved recently (decays to sleep)
      if (now - lastMouseMoveTime < 700) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        // Draw one final static resting frame and sleep at 0% CPU/GPU
        draw();
        isRunning = false;
        animationFrameId = null;
      }
    };

    const wakeUp = () => {
      lastMouseMoveTime = performance.now();
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      wakeUp();
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{
        contain: "strict",
        willChange: "contents",
      }}
    />
  );
}
