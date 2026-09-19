"use client";

import React from "react";

interface DiamondShineTextProps {
  children: React.ReactNode;
  className?: string;
}

export function DiamondShineText({ children, className = "" }: DiamondShineTextProps) {
  return (
    <span className={`diamond-shine-container ${className}`}>
      {/* Base Layer: Crisp IEEE gradient text */}
      <span className="diamond-shine-base">{children}</span>

      {/* Moving diamond-pixel text blur highlight that sweeps from letter to letter */}
      <span className="diamond-shine-overlay" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
