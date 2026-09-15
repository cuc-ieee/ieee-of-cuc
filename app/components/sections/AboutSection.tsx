"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Target,
  Lightbulb,
  Globe,
  Award,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Bot,
  Cloud,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="relative flex items-center py-24">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
          >
            Shaping the <span className="gradient-text">Future of Technology</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            IEEE Curtin University Colombo Student Branch bridges the gap between
            academic concepts and real-world technology through collaborative builds,
            industry networks, and global initiatives.
          </motion.p>
        </div>

        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Our Mission & Leadership (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7"
          >
            <SpotlightCard
              className="p-8 sm:p-10 rounded-3xl border-border/50 bg-card/60 h-full flex flex-col justify-between"
              spotlightColor="rgba(56, 189, 248, 0.22)"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    Core Mission
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Empowering Next-Gen Engineers
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  To foster technological innovation and excellence for the benefit
                  of humanity, while creating impactful hands-on opportunities,
                  leadership roles, and technical growth for Curtin students.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Student-led research and practical technical projects",
                    "Direct alignment with IEEE Sri Lanka Section",
                    "Open and inclusive platform for all engineering disciplines",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                <Link href="/about">
                  <Button variant="outline_glow" size="default" className="group">
                    Discover More About Us
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">
                  Curtin University Colombo • Region 10
                </span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento Card 2: Active Engineers & Career Readiness (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <SpotlightCard
              className="p-8 sm:p-10 rounded-3xl border-border/50 bg-card/60 h-full flex flex-col justify-between"
              spotlightColor="rgba(56, 189, 248, 0.22)"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-secondary/80 text-foreground/90 border border-border/60">
                    Excellence
                  </span>
                </div>

                <div className="mb-4">
                  <div className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-1">
                    100+
                  </div>
                  <div className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Active Student Engineers
                  </div>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Bridging campus knowledge with industry standards through
                  recruiter networking, leadership pathways, and technical verification.
                </p>

                {/* Focus metrics */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/40 text-xs sm:text-sm">
                    <span className="text-muted-foreground font-medium">Industry Exposure</span>
                    <span className="font-bold text-foreground">100% Focused</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/40 text-xs sm:text-sm">
                    <span className="text-muted-foreground font-medium">Executive Pathways</span>
                    <span className="font-bold text-foreground">Active Committee</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>Accredited IEEE Student Branch Chapter</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento Card 3: Innovation Hub & Prototype Pipeline (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-6"
          >
            <SpotlightCard
              className="p-8 sm:p-10 rounded-3xl border-border/50 bg-card/60 h-full flex flex-col justify-between"
              spotlightColor="rgba(56, 189, 248, 0.22)"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div className="font-display text-2xl font-bold gradient-text">
                    15+ Workshops
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Innovation Hub
                </h3>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                  Idea to Prototype Pipeline
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  A dynamic launchpad where students explore cutting-edge fields
                  through collaborative sprints, build nights, and national hackathons.
                </p>

                {/* Domain Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { icon: Bot, label: "Robotics & AI" },
                    { icon: Cpu, label: "IoT & Hardware" },
                    { icon: Cloud, label: "Cloud & Dev" },
                    { icon: Layers, label: "Code Clinics" },
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-xs font-medium text-foreground/90"
                    >
                      <badge.icon className="w-3.5 h-3.5 text-primary" />
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                <span>Hands-on Hardware Labs</span>
                <span className="text-primary font-medium">Inter-University Builds &rarr;</span>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Bento Card 4: Global Network & IEEE Region 10 (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-6"
          >
            <SpotlightCard
              className="p-8 sm:p-10 rounded-3xl border-border/50 bg-card/60 h-full flex flex-col justify-between"
              spotlightColor="rgba(56, 189, 248, 0.22)"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="font-display text-2xl font-bold gradient-text">
                    400K+ Global
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  Global Network
                </h3>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                  Opening Doors across IEEE Region 10
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Direct integration into the world&apos;s largest technical professional
                  community, giving students international exposure, cross-border
                  hackathons, and IEEE Xplore publication support.
                </p>

                {/* Network Perks */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/40 text-xs">
                    <div className="font-semibold text-foreground mb-0.5">IEEE Xplore</div>
                    <div className="text-muted-foreground">Digital Library Access</div>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/40 border border-border/40 text-xs">
                    <div className="font-semibold text-foreground mb-0.5">Region 10</div>
                    <div className="text-muted-foreground">Asia-Pacific Integration</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                <span>Cross-Branch Collaborations</span>
                <span className="text-primary font-medium">Worldwide Recognition &rarr;</span>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
