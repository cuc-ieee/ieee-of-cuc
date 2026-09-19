"use client";

import React from "react";
import {
  Cpu,
  Bot,
  Sparkles,
  Globe,
  Shield,
  Wifi,
  Terminal,
  Zap,
  Radio,
  Layers,
} from "lucide-react";

const domains = [
  { name: "Computer Society", icon: Terminal, color: "text-sky-400" },
  { name: "Robotics & Automation", icon: Bot, color: "text-blue-400" },
  { name: "Women in Engineering (WIE)", icon: Sparkles, color: "text-cyan-300" },
  { name: "AI & Machine Learning", icon: Cpu, color: "text-sky-400" },
  { name: "IoT & Embedded Systems", icon: Wifi, color: "text-indigo-400" },
  { name: "Cybersecurity & Cloud", icon: Shield, color: "text-blue-400" },
  { name: "Signal Processing & Comms", icon: Radio, color: "text-cyan-400" },
  { name: "Power & Energy Systems", icon: Zap, color: "text-sky-300" },
  { name: "Global Technical Network", icon: Globe, color: "text-blue-300" },
  { name: "Hackathons & Innovation", icon: Layers, color: "text-cyan-400" },
];

export function DomainMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border/40 bg-card/30 backdrop-blur-md py-4 select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex w-max gap-8 animate-marquee hover:[animation-play-state:paused]">
        {[...domains, ...domains].map((domain, index) => (
          <div
            key={`${domain.name}-${index}`}
            className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-secondary/40 border border-border/40 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300 group cursor-default"
          >
            <domain.icon className={`w-4 h-4 ${domain.color} group-hover:scale-110 transition-transform`} />
            <span className="whitespace-nowrap tracking-wide">{domain.name}</span>
            <span className="text-muted-foreground/30 ml-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
