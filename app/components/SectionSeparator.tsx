import React from "react";
import { Globe } from "lucide-react";

export function SectionSeparator() {
  return (
    <div className="relative w-full flex items-center justify-center py-6 pointer-events-none select-none">
      <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent to-border/60" />
      <div className="mx-3 flex items-center justify-center w-6 h-6 rounded-full bg-card/60 border border-border/60 text-primary/70 backdrop-blur-sm shadow-sm">
        <Globe className="w-3 h-3 text-primary/80" />
      </div>
      <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent to-border/60" />
    </div>
  );
}
