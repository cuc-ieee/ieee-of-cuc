"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FloatingBubbles() {
  const { scrollY } = useScroll();

  // Parallax transforms: move at a fraction of the scroll speed
  // Page scrolls at 1.0x, bubble 1 scrolls at ~0.35x, bubble 2 at ~0.22x
  const y1 = useTransform(scrollY, (value) => -value * 0.35);
  const y2 = useTransform(scrollY, (value) => -value * 0.22);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* Primary subtle dark morphing oval bubble */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[18%] right-[6%] w-[580px] h-[480px] sm:w-[680px] sm:h-[560px] md:w-[760px] md:h-[620px]"
      >
        <div
          className="w-full h-full morph-oval-1 opacity-25 blur-3xl transition-all"
          style={{
            background:
              "radial-gradient(ellipse at 45% 45%, rgba(14, 116, 144, 0.18) 0%, rgba(30, 58, 138, 0.12) 45%, rgba(15, 23, 42, 0.05) 70%, transparent 85%)",
            boxShadow:
              "inset 0 0 60px rgba(56, 189, 248, 0.06), 0 0 80px rgba(14, 116, 144, 0.08)",
          }}
        />
      </motion.div>

      {/* Secondary subtle dark morphing oval bubble for lower page sections */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[65%] left-[4%] w-[520px] h-[440px] sm:w-[640px] sm:h-[520px] md:w-[720px] md:h-[580px]"
      >
        <div
          className="w-full h-full morph-oval-2 opacity-20 blur-3xl transition-all"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.15) 0%, rgba(30, 27, 75, 0.10) 45%, rgba(15, 23, 42, 0.04) 70%, transparent 85%)",
            boxShadow:
              "inset 0 0 50px rgba(37, 99, 235, 0.05), 0 0 70px rgba(30, 58, 138, 0.06)",
          }}
        />
      </motion.div>
    </div>
  );
}
