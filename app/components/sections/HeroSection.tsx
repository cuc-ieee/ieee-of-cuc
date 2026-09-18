"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Cpu, Bot, Zap } from "lucide-react";
import { Typewriter } from "../Tech";

const ACCENT = "#2667FF";
const PAPER = "#E4E4E0";
const INK = "#111214";

const specs: Array<[string, string]> = [
  ["Members", "100+ active"],
  ["Section", "IEEE Sri Lanka"],
  ["Region", "10 — Asia-Pacific"],
  ["Base", "Curtin Colombo"],
];

export function HeroSection() {
  const [titleDone, setTitleDone] = useState(false);
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden border-b-2 min-h-[calc(100svh-67px)]"
      style={{ background: PAPER, color: INK, borderColor: INK }}
    >
      {/* structural blueprint columns */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-2 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`border-black/10 ${i === 0 ? "border-l" : ""} border-r max-md:hidden md:block ${i > 1 ? "max-md:hidden" : ""}`} />
        ))}
      </div>

      {/* meta strip — full bleed */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 border-b border-black/20 font-mono text-[10px] uppercase tracking-[0.24em]">
        {["Student Branch", "Colombo / LK", "Est. 2024", "Fig. 01 — Hero"].map((t, i) => (
          <div
            key={t}
            className={`px-4 md:px-8 py-2.5 ${i > 0 ? "border-l border-black/20" : ""} ${i >= 2 ? "max-md:hidden" : ""} ${i === 1 ? "max-md:border-l" : ""}`}
          >
            <span className="text-black/70">{t}</span>
          </div>
        ))}
      </div>

      {/* giant title — full bleed, typewriter entrance */}
      <div className="relative px-4 md:px-8 pt-10 md:pt-14 pb-14 md:pb-20">
        <div className="flex items-center justify-between font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-[0.24em]">
          <span>
            <span className="mr-2 inline-block" style={{ color: ACCENT }}>✳</span>
            IEEE + Curtin
          </span>
          <span className="hidden sm:inline text-black/70">Advancing technology for humanity</span>
          <span style={{ color: ACCENT }}>✳</span>
        </div>

        <h1 className="font-display font-bold lowercase leading-[0.82] tracking-[-0.045em] whitespace-nowrap text-[21vw] md:text-[19.5vw]">
          <Typewriter parts={[{ t: "ieeecuc" }]} speed={130} onDone={() => setTitleDone(true)} />
        </h1>

        <AnimatePresence>
          {titleDone && (
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 border-l-4 pl-4 md:pl-5"
              style={{ borderColor: ACCENT }}
            >
              <p className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.28em]" style={{ color: ACCENT }}>
                IEEE =
              </p>
              <p className="font-display text-xl md:text-3xl font-bold leading-tight">
                Student Branch of Curtin University Colombo
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-black/70">
          Scroll ↓ — the branch sheet continues
        </p>
      </div>

      {/* bottom block — full bleed, touches viewport edges */}
      <div className="relative mt-auto grid md:grid-cols-12 border-t-2 border-[#111214]">
        {/* overlapping stamp */}
        <div
          className="absolute -top-[17px] left-4 md:left-8 z-10 flex items-center gap-2 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white"
          style={{ background: INK }}
        >
          <span className="h-2 w-2" style={{ background: ACCENT }} />
          Est. 2024 — Colombo
        </div>
        <div className="px-4 md:px-8 py-8 md:col-span-5">
          <p className="max-w-md text-2xl md:text-[1.7rem] font-medium leading-[1.2]">
            The reinvention of engineering through technology as a community.
          </p>
          <p className="mt-3 font-mono text-sm text-black/70">/a student branch experiment/</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{ background: INK, boxShadow: `4px 4px 0 ${ACCENT}` }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `2px 2px 0 ${ACCENT}`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `4px 4px 0 ${ACCENT}`)}
            >
              Become a Member
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider border-2 border-black/80 hover:bg-black/5 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>

        <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-black/20 font-mono text-[11px] uppercase tracking-[0.18em]">
          {specs.map(([k, v], i) => (
            <div
              key={k}
              className={`flex items-center justify-between px-4 md:px-6 py-3.5 ${i > 0 ? "border-t border-black/20" : ""}`}
            >
              <span className="text-black/70">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
        </div>

        <div
          className="md:col-span-3 border-t md:border-t-0 md:border-l border-black/20 flex flex-col"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)" }}
        >
          <div
            className="flex flex-1 items-center justify-around px-6 py-8 text-white"
            style={{ background: ACCENT }}
          >
            <Cpu className="h-9 w-9" strokeWidth={1.4} />
            <Bot className="h-9 w-9" strokeWidth={1.4} />
            <Zap className="h-9 w-9" strokeWidth={1.4} />
          </div>
          <p className="px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-black/70 border-t border-black/20">
            Student / Branch / Integration
          </p>
        </div>
      </div>
    </section>
  );
}
