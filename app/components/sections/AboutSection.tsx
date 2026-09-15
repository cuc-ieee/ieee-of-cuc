"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Target, Lightbulb, Globe, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const pillars = [
  {
    id: "mission",
    icon: Target,
    title: "Our Mission",
    subtitle: "Empowering Next-Gen Engineers",
    tagline: "Purpose-driven engineering for human progress",
    description:
      "To foster technological innovation and excellence for the benefit of humanity, while creating impactful hands-on opportunities, leadership roles, and technical growth for Curtin students.",
    highlights: [
      "Student-led research and practical technical projects",
      "Direct guidance and alignment with IEEE Sri Lanka Section",
      "Open and inclusive platform for all engineering disciplines",
    ],
    metric: "100+",
    metricLabel: "Active Student Engineers",
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Innovation Hub",
    subtitle: "Idea to Prototype Pipeline",
    tagline: "Where creativity meets modern technology",
    description:
      "A dynamic launchpad where students explore cutting-edge fields like Robotics, AI, IoT, and Cloud Computing through collaborative sprints, build nights, and hackathons.",
    highlights: [
      "Specialized technical workshops and code clinics",
      "Inter-university and national hackathons participation",
      "Access to industry mentors and modern hardware tools",
    ],
    metric: "15+",
    metricLabel: "Workshops & Tech Sessions",
  },
  {
    id: "network",
    icon: Globe,
    title: "Global Network",
    subtitle: "Connected Worldwide",
    tagline: "Opening doors across IEEE Region 10",
    description:
      "Direct integration into the world's largest technical professional community of 400,000+ members, giving students international exposure, cross-border hackathons, and global papers.",
    highlights: [
      "Connection with IEEE Region 10 (Asia-Pacific)",
      "Student exchange and cross-branch collaborations",
      "IEEE Xplore Digital Library access and publication support",
    ],
    metric: "400K+",
    metricLabel: "Global IEEE Community",
  },
  {
    id: "excellence",
    icon: Award,
    title: "Excellence",
    subtitle: "Career & Leadership Readiness",
    tagline: "Bridging campus knowledge with industry standards",
    description:
      "Committed to developing well-rounded professionals who excel technically and commercially through leadership initiatives, corporate networking, and interview clinics.",
    highlights: [
      "Direct access to top industry recruiters and hiring partners",
      "Leadership training and executive committee pathways",
      "Professional certifications and technical skill verification",
    ],
    metric: "100%",
    metricLabel: "Industry Exposure Focus",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const currentPillar = pillars[activeTab];

  return (
    <section id="about" ref={ref} className="relative flex items-center py-24">
      <div className="container mx-auto px-4">
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

        {/* Interactive Pillar Tabs + Dynamic Showcase Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Tab Selectors (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {pillars.map((pillar, index) => {
              const isActive = activeTab === index;
              const Icon = pillar.icon;

              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${
                    isActive
                      ? "bg-secondary/70 border-primary/50 shadow-lg shadow-primary/10"
                      : "bg-card/40 border-border/40 hover:bg-secondary/40 hover:border-border/80"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary/20"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-lg text-foreground truncate">
                        {pillar.title}
                      </h3>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm truncate">
                      {pillar.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Active Pillar Showcase Card (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="h-full"
              >
                <SpotlightCard
                  className="p-8 sm:p-10 h-full flex flex-col justify-between border-primary/30 bg-card/70"
                  spotlightColor="rgba(56, 189, 248, 0.25)"
                >
                  <div>
                    {/* Header Tagline & Metric */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-border/40 pb-6">
                      <div>
                        <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                          Core Pillar
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-1">
                          {currentPillar.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">
                          {currentPillar.metric}
                        </div>
                        <div className="text-muted-foreground text-xs font-medium">
                          {currentPillar.metricLabel}
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground/90 font-medium text-base sm:text-lg mb-4">
                      {currentPillar.tagline}
                    </p>

                    <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                      {currentPillar.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-3 mb-8">
                      {currentPillar.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    <Link href="/about">
                      <Button variant="outline_glow" size="lg" className="group">
                        Discover More About Us
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
