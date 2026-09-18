"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import {
  Target,
  Globe,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Rocket,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Typewriter } from "../components/Tech";

const pillars = [
  {
    icon: Target,
    title: "Mission & Purpose",
    tagline: "Advancing Technology for Humanity",
    description:
      "Bridging classroom learning with real-world engineering through hands-on technical workshops, international standards, and student-led initiatives.",
  },
  {
    icon: Compass,
    title: "Vision for Sri Lanka",
    tagline: "Nurturing Global Innovators",
    description:
      "Positioning Curtin University Colombo as a leading technological hub in Region 10, empowering students to compete and excel on the global stage.",
  },
  {
    icon: Cpu,
    title: "Technical Excellence",
    tagline: "Applied Skills & Practical Labs",
    description:
      "Immersive bootcamps covering AI/ML, Embedded Systems, Robotics, and Cloud Computing, designed in synergy with industry demands.",
  },
  {
    icon: Globe,
    title: "Global IEEE Ecosystem",
    tagline: "Connected Worldwide",
    description:
      "Direct linkage to IEEE Region 10 and the international community of over 400,000 professionals, research archives, and technical societies.",
  },
];

const highlights = [
  {
    icon: Rocket,
    title: "Real-world Project Experience",
    desc: "Hands-on projects and competitions solving pressing industrial challenges.",
  },
  {
    icon: ShieldCheck,
    title: "Industry Mentorship",
    desc: "Direct guidance from senior researchers, alumni, and IEEE senior members.",
  },
  {
    icon: Sparkles,
    title: "Career & Leadership Growth",
    desc: "Executive committee positions, event organization, and recognized credentials.",
  },
];

export default function AboutContent() {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      
      {/* =================================================================
          1. HERO SECTION
          ================================================================= */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
              <span className="text-primary">■</span> About — Branch profile
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              <Typewriter parts={[{ t: "About " }, { t: "Us", accent: true }]} speed={45} />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
            >
              Engineering curiosity and empowering future leaders. We are a community of passionate student engineers, researchers, and innovators affiliated with the IEEE Sri Lanka Section, advancing technology for humanity.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button variant="hero" size="xl" asChild>
                <Link href="/committee">Meet Our Committee</Link>
              </Button>
              <Button variant="outline_glow" size="xl" asChild>
                <Link href="/events">Explore Our Activities</Link>
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* =================================================================
          2. STORY & MILESTONES BENTO GRID
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Our Journey
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Building a Benchmark Student Branch
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Formed to cultivate technical prowess and leadership excellence in Sri Lanka.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
            
            {/* Bento 1: Primary Narrative (8 cols) */}
            <div className="lg:col-span-8 rounded-none border border-border/60 bg-card/40 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 inline-block">
                  Affiliation & Heritage
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Where Academic Rigor Meets Global Innovation
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-4">
                  IEEE Curtin University Colombo Student Branch serves as the catalyst between university coursework and the rapidly accelerating technological ecosystem. Affiliated with IEEE Sri Lanka Section and Curtin Colombo, our branch operates at the forefront of modern engineering disciplines.
                </p>
                <p className="text-muted-foreground text-base leading-relaxed">
                  From competitive programming and autonomous robotics to community outreach and leadership conferences, we provide students with hands-on exposure, professional credentials, and a collaborative forum to bring visionary ideas to life.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40 grid sm:grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-primary font-bold text-2xl font-display">2025</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Branch Established</div>
                </div>
                <div>
                  <div className="text-primary font-bold text-2xl font-display">Region 10</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Asia-Pacific Section</div>
                </div>
                <div>
                  <div className="text-primary font-bold text-2xl font-display">50+</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Active Student Engineers</div>
                </div>
              </div>
            </div>

            {/* Bento 2: Distinctives & Focus (4 cols) */}
            <div className="lg:col-span-4 rounded-none border border-border/60 bg-card/40 backdrop-blur-md p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 inline-block">
                  Core Highlights
                </span>
                <h3 className="font-display text-xl font-bold text-foreground mb-6">
                  What Drives Our Branch
                </h3>

                <div className="space-y-6">
                  {highlights.map((h) => (
                    <div key={h.title} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary mt-0.5">
                        <h.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">{h.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/40">
                <Link
                  href="/membership"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#1A4FCC] transition-colors group"
                >
                  <span>Join as an IEEE Member</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================================
          3. CORE PILLARS & VALUES
          ================================================================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Strategic Foundation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Our Core Pillars
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              The fundamental principles and operational standards that shape all our programs, workshops, and student initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative rounded-none border border-border/50 bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-primary tracking-wider uppercase mb-1 block">
                    {pillar.tagline}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =================================================================
          4. COMMITTEE SPOTLIGHT TEASER
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-none border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden p-8 sm:p-12">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Image with glass frame */}
              <div className="lg:col-span-6 relative rounded-none overflow-hidden border border-border/60 shadow-xl group">
                <SkeletonImage
                  src="/Aboutus/Excom.jpg"
                  alt="IEEE Curtin University Colombo Executive Committee"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-xs font-medium text-foreground/90 pointer-events-none">
                  Curtin University Colombo Executive Board
                </div>
              </div>

              {/* Information & Action */}
              <div className="lg:col-span-6">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 inline-block">
                  Student Leadership
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Meet the Executive Committee
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  Our branch is steered by an elected committee of student innovators across software engineering, computer systems, and data science disciplines. We are dedicated to delivering impactful programs and representing Curtin Colombo on national and international stages.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild className="group/btn">
                    <Link href="/committee" className="inline-flex items-center gap-2">
                      <span>View Committee Members</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline_glow" size="lg" asChild>
                    <Link href="/contact">Contact Leadership</Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
