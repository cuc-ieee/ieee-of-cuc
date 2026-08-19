"use client";

import React, { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface CopyToClipboardWrapperProps {
  textToCopy: string;
  children: React.ReactNode;
  label: string; // Used for toast message and tooltip
  className?: string; // Additional classes for the wrapper div
}

export function CopyToClipboardWrapper({
  textToCopy,
  children,
  label,
  className,
}: CopyToClipboardWrapperProps) {
  const { toast } = useToast();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(`Copy ${label}`);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTooltipMessage("Copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      setTooltipMessage("Copy failed");
    } finally {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setTooltipMessage(`Copy ${label}`);
      }, 2000); // Revert tooltip text after 2 seconds
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
    if (tooltipMessage !== "Copied!") { // Don't reset if just copied
        setTooltipMessage(`Copy ${label}`);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    setTooltipMessage(`Copy ${label}`); // Always reset on mouse leave
  };

  return (
    <div
      className={`relative flex items-center gap-4 group cursor-pointer ${className || ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCopy}
    >
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap z-50">
          {tooltipMessage}
        </div>
      )}
      {children}
    </div>
  );
}