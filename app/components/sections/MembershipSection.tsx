"use client";

import Link from "next/link";
import { ArrowUpRight, BookOpen, Network, Award, Rocket, Check } from "lucide-react";
import { Typewriter, SlideIn, PixelIn, CHAMFER } from "../Tech";

const ACCENT = "#2667FF";
const INK = "#111214";

const perks = [
  { icon: BookOpen, title: "IEEE Xplore Access", desc: "5M+ research papers, standards, and technical articles." },
  { icon: Network, title: "Global Student Network", desc: "Connect across 160 countries and regional conferences." },
  { icon: Rocket, title: "Workshops & Competitions", desc: "Hackathons, robotics challenges, and lab sessions." },
  { icon: Award, title: "Career & Certifications", desc: "Credentials, mentorship, and leadership roles." },
];

const checklist = [
  "Discounted student rates available",
  "Immediate access to branch activities",
  "Eligibility for committee leadership roles",
];

export function MembershipSection() {
  return (
    <section id="membership" className="relative border-b-2 border-[#111214] bg-[#E4E4E0] text-[#111214] scroll-mt-[84px]">
      <div className="grid md:grid-cols-12 border-b border-black/20">
        <div className="px-4 md:px-8 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-black/70 md:col-span-3 border-b md:border-b-0 md:border-r border-black/20">
          <span style={{ color: ACCENT }}>■</span> 03 / Membership
        </div>
        <h2 className="px-4 md:px-8 py-8 md:py-12 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight md:col-span-9">
          <Typewriter parts={[{ t: "Become an " }, { t: "IEEE Member", accent: true }]} speed={26} />
        </h2>
      </div>

      <div className="grid md:grid-cols-12 items-start">
        {/* left — perks ledger */}
        <SlideIn
          from="left"
          className="md:col-span-7 px-4 md:px-8 py-10 md:py-14 border-b md:border-b-0 md:border-r border-black/20"
        >
          <p className="max-w-xl text-base md:text-lg leading-relaxed text-black/70 mb-8">
            Unlock the resources of the world&apos;s largest technical professional
            organization — peer mentorship, premier research databases, and a faster
            engineering career at Curtin Colombo.
          </p>
          <div className="border-t border-black/20">
            {perks.map((perk, i) => (
              <div key={perk.title} className="grid grid-cols-[auto_1fr] gap-4 py-5 border-b border-black/20">
                <span className="font-mono text-[11px] text-black/40 pt-1">P.0{i + 1}</span>
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center border border-black/40" style={{ color: ACCENT }}>
                    <perk.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[15px]">{perk.title}</h3>
                    <p className="text-sm text-black/75 leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/membership"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold hover:underline underline-offset-4"
            style={{ color: ACCENT }}
          >
            Read detailed student membership benefits
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </SlideIn>

        {/* right — blue action panel */}
        <PixelIn
          delay={0.1}
          tone={ACCENT}
          className="md:col-span-5 p-4 md:p-8 md:mt-14"
        >
          <div
            className="text-white p-6 md:p-8 h-full flex flex-col"
            style={{ background: ACCENT, clipPath: CHAMFER, filter: `drop-shadow(8px 8px 0 ${INK})` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              Student Chapter
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold mt-1 mb-6">
              Start Your Membership
            </h3>
            <ul className="space-y-3 mb-8 text-sm">
              {checklist.map((c) => (
                <li key={c} className="flex items-center gap-2.5 border-b border-white/25 pb-3">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-3">
              <Link
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white px-6 py-4 font-display text-sm font-bold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
                style={{ color: INK }}
              >
                Register on IEEE.org
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/membership"
                className="flex items-center justify-center border-2 border-white px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                How to Register — Step by Step
              </Link>
            </div>
            <div className="mt-6 pt-4 border-t border-white/25 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">
              <span>Curtin Colombo</span>
              <span>IEEE Region 10</span>
            </div>
          </div>
        </PixelIn>
      </div>
    </section>
  );
}
