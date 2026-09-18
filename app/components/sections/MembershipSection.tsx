"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Network, Award, Rocket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const corePerks = [
  {
    icon: BookOpen,
    title: "IEEE Xplore Access",
    desc: "Over 5M top-tier research papers, standards, and technical articles.",
  },
  {
    icon: Network,
    title: "Global Student Network",
    desc: "Connect across 160 countries and attend regional conferences.",
  },
  {
    icon: Rocket,
    title: "Hands-on Workshops & Competitions",
    desc: "Exclusive access to hackathons, robotics challenges, and lab sessions.",
  },
  {
    icon: Award,
    title: "Career & Certifications",
    desc: "Industry-recognized credentials, mentorship, and leadership roles.",
  },
];

export function MembershipSection() {
  return (
    <section id="membership" className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* =================================================================
              LEFT COLUMN: Left-Aligned Content with Animated Morphing Oval 1
              ================================================================= */}
          <div className="lg:col-span-7 relative">
            {/* Animated Oval 1 (Wide horizontal ellipse) */}
            <motion.div
              animate={{
                scale: [1, 1.08, 0.96, 1],
                rotate: [0, 8, -6, 0],
                borderRadius: [
                  "60% 40% 50% 50% / 50% 60% 40% 50%",
                  "50% 50% 60% 40% / 60% 40% 50% 50%",
                  "40% 60% 40% 60% / 50% 50% 60% 40%",
                  "60% 40% 50% 50% / 50% 60% 40% 50%",
                ],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-16 -left-16 w-[480px] sm:w-[560px] h-[340px] pointer-events-none -z-10 blur-3xl opacity-25"
              style={{
                background:
                  "radial-gradient(ellipse at 40% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(14, 116, 144, 0.25) 50%, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Global Community & Student Branch
            </div>

            {/* Title */}
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5 text-left leading-[1.18]">
              Become an <span className="text-primary">IEEE Member</span>
            </h2>

            {/* Concise description */}
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mb-8 text-left">
              Unlock the resources of the world&apos;s largest technical professional organization.
              Gain peer mentorship, access premier research databases, and accelerate your engineering career at Curtin Colombo.
            </p>

            {/* 4 Core Perks Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
              {corePerks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl border border-border/40 bg-card/25 backdrop-blur-sm hover:border-primary/40 hover:bg-card/40 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                    <perk.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-0.5">
                      {perk.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link to full membership page */}
            <div className="text-left">
              <Link
                href="/membership"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-sky-300 transition-colors group"
              >
                <span>Read detailed student membership benefits</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: CTA Action Card with Animated Morphing Oval 2
              ================================================================= */}
          <div className="lg:col-span-5 relative">
            {/* Animated Oval 2 (Taller, distinct size and timing) */}
            <motion.div
              animate={{
                scale: [1, 1.12, 0.92, 1],
                rotate: [0, -12, 10, 0],
                borderRadius: [
                  "40% 60% 60% 40% / 60% 30% 70% 40%",
                  "55% 45% 40% 60% / 40% 60% 40% 60%",
                  "35% 65% 55% 45% / 50% 40% 60% 50%",
                  "40% 60% 60% 40% / 60% 30% 70% 40%",
                ],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-10 -right-10 w-[380px] sm:w-[440px] h-[480px] pointer-events-none -z-10 blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 60% 45%, rgba(14, 165, 233, 0.5) 0%, rgba(30, 58, 138, 0.3) 55%, transparent 80%)",
              }}
              aria-hidden="true"
            />

            {/* High-Impact Glass Action Card */}
            <div className="relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-border/40">
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Student Chapter
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                    Start Your Membership
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-bold text-lg font-display">
                  IEEE
                </div>
              </div>

              {/* Quick checklist */}
              <ul className="space-y-3 mb-8 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Discounted student rates available</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Immediate access to Curtin Colombo branch activities</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Eligibility for IEEE committee leadership roles</span>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button variant="hero" size="xl" className="w-full" asChild>
                  <Link
                    href="https://www.ieee.org/membership/join/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Register on IEEE.org</span>
                    <ArrowUpRight className="w-4 h-4 ml-1.5" />
                  </Link>
                </Button>

                <Button variant="outline_glow" size="lg" className="w-full" asChild>
                  <Link href="/membership">
                    <span>How to Register (Step-by-Step)</span>
                  </Link>
                </Button>
              </div>

              {/* Micro proof counter */}
              <div className="mt-6 pt-5 border-t border-border/30 flex items-center justify-between text-xs text-muted-foreground">
                <span>Curtin University Colombo</span>
                <span className="text-foreground/80 font-medium">IEEE Region 10</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
