"use client";

import Link from "next/link";
import { Typewriter, SlideIn } from "../Tech";
import {
  Target,
  Award,
  Lightbulb,
  Globe,
  ArrowUpRight,
  Check,
  Cpu,
  Bot,
  Cloud,
  Layers,
} from "lucide-react";

const ACCENT = "#2667FF";

const cells = [
  {
    no: "A",
    icon: Target,
    tag: "Core Mission",
    title: "Empowering Next-Gen Engineers",
    desc: "To foster technological innovation and excellence for the benefit of humanity, while creating hands-on opportunities and leadership roles for Curtin students.",
    points: [
      "Student-led research and practical technical projects",
      "Direct alignment with IEEE Sri Lanka Section",
      "Open platform for all engineering disciplines",
    ],
  },
  {
    no: "B",
    icon: Award,
    tag: "Excellence",
    title: "100+ Active Student Engineers",
    desc: "Bridging campus knowledge with industry standards through recruiter networking, leadership pathways, and technical verification.",
    points: ["Industry Exposure — 100% focused", "Executive Pathways — active committee"],
  },
];

const domains = [
  { icon: Bot, label: "Robotics & AI" },
  { icon: Cpu, label: "IoT & Hardware" },
  { icon: Cloud, label: "Cloud & Dev" },
  { icon: Layers, label: "Code Clinics" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative border-b-2 border-[#111214] bg-[#E4E4E0] text-[#111214] scroll-mt-[84px]">
      {/* section header */}
      <div className="grid md:grid-cols-12 border-b border-black/20">
        <div className="px-4 md:px-8 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-black/70 md:col-span-3 border-b md:border-b-0 md:border-r border-black/20">
          <span style={{ color: ACCENT }}>■</span> 01 / Who we are
        </div>
        <h2 className="px-4 md:px-8 py-8 md:py-12 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight md:col-span-9">
          <Typewriter parts={[{ t: "Shaping the " }, { t: "Future of Technology", accent: true }]} speed={26} />
        </h2>
      </div>

      <p className="px-4 md:px-8 py-8 max-w-3xl text-base md:text-lg leading-relaxed text-black/75 border-b border-black/20">
        IEEE Curtin University Colombo Student Branch bridges the gap between academic
        concepts and real-world technology through collaborative builds, industry
        networks, and global initiatives.
      </p>

      {/* spec cells */}
      <div className="grid md:grid-cols-12 gap-px bg-black/20 border-b border-black/20">
        {cells.map((cell, ci) => (
          <SlideIn
            key={cell.no}
            from={ci === 0 ? "left" : "right"}
            delay={ci * 0.08}
            className={`bg-[#E4E4E0] p-6 md:p-12 ${ci === 0 ? "md:col-span-7" : "md:col-span-5"}`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="grid h-11 w-11 place-items-center border border-black/40" style={{ color: ACCENT }}>
                <cell.icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] border border-black/40 px-3 py-1.5">
                {cell.no} — {cell.tag}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-[1.7rem] font-bold leading-tight mb-3">
              {cell.title}
            </h3>
            <p className="text-sm md:text-[15px] leading-relaxed text-black/75 mb-6">{cell.desc}</p>
            <ul className="border-t border-black/20">
              {cell.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 py-2.5 border-b border-black/20 text-sm">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: ACCENT }} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </SlideIn>
        ))}

        {/* cell C — innovation hub */}
        <SlideIn
          from="left"
          delay={0.1}
          className="bg-[#E4E4E0] p-6 md:p-12 md:col-span-5"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="grid h-11 w-11 place-items-center border border-black/40" style={{ color: ACCENT }}>
              <Lightbulb className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold" style={{ color: ACCENT }}>
              15+ Workshops
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-[1.7rem] font-bold leading-tight mb-2">
            Innovation Hub
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: ACCENT }}>
            Idea to prototype pipeline
          </p>
          <p className="text-sm md:text-[15px] leading-relaxed text-black/75 mb-6">
            A launchpad where students explore cutting-edge fields through collaborative
            sprints, build nights, and national hackathons.
          </p>
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <span key={d.label} className="inline-flex items-center gap-1.5 border border-black/40 bg-black/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider">
                <d.icon className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                {d.label}
              </span>
            ))}
          </div>
        </SlideIn>

        {/* cell D — global network */}
        <SlideIn
          from="right"
          delay={0.16}
          className="bg-[#E4E4E0] p-6 md:p-12 md:col-span-7"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="grid h-11 w-11 place-items-center border border-black/40" style={{ color: ACCENT }}>
              <Globe className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold" style={{ color: ACCENT }}>
              400K+ Global
            </span>
          </div>
          <h3 className="font-display text-2xl md:text-[1.7rem] font-bold leading-tight mb-2">
            Global Network
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-4" style={{ color: ACCENT }}>
            IEEE Region 10 — Asia-Pacific
          </p>
          <p className="text-sm md:text-[15px] leading-relaxed text-black/75 mb-6">
            Direct integration into the world&apos;s largest technical professional community —
            international exposure, cross-border hackathons, IEEE Xplore support.
          </p>
          <div className="grid grid-cols-2 gap-px bg-black/25 border border-black/20">
            {[
              ["IEEE Xplore", "Digital Library"],
              ["Region 10", "APAC Integration"],
            ].map(([t, s]) => (
              <div key={t} className="bg-[#E4E4E0] p-3">
                <p className="text-xs font-bold">{t}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/70">{s}</p>
              </div>
            ))}
          </div>
        </SlideIn>
      </div>

      <div className="px-4 md:px-8 pb-12">
        <div className="relative z-10 -mt-7 inline-block">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-[#111214] text-white px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{ boxShadow: `4px 4px 0 ${ACCENT}` }}
          >
            Discover More About Us
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-black/70">
          Curtin University Colombo • Region 10
        </p>
      </div>
    </section>
  );
}
