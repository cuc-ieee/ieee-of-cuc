"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BookOpen,
  Network,
  Award,
  Rocket,
  Sparkles,
  Globe,
  ExternalLink,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Cpu,
  Layers,
  Check,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "../components/Footer";
import { Typewriter } from "../components/Tech";

const benefitCategories = [
  { id: "all", label: "All Privileges" },
  { id: "academic", label: "Research & Academic" },
  { id: "career", label: "Career & Pipeline" },
  { id: "technical", label: "Labs & Bootcamps" },
];

const allBenefits = [
  {
    category: "academic",
    icon: BookOpen,
    title: "IEEE Xplore Digital Access",
    desc: "Unrestricted search and download access to over 5 million top-tier peer-reviewed research papers, standards, and technical journals worldwide.",
    highlight: "5M+ Papers",
  },
  {
    category: "career",
    icon: Rocket,
    title: "CV Boost & Career Pipeline",
    desc: "Priority on-campus recruiter interviews, professional resume diagnostic clinics, and direct job shortlisting with IEEE CUC partner firms.",
    highlight: "Direct Hiring",
  },
  {
    category: "academic",
    icon: Globe,
    title: "Conference Travel & Grants",
    desc: "Deep discounts on registration fees for regional symposiums, IEEE Sri Lanka Section congresses, and global Region 10 technical summits.",
    highlight: "Up to 50% Off",
  },
  {
    category: "career",
    icon: Award,
    title: "Recognized Credentials",
    desc: "Earn verified IEEE certificates and credentials recognized by top international tech firms, universities, and research institutions.",
    highlight: "Global Standard",
  },
  {
    category: "technical",
    icon: Cpu,
    title: "Applied Hardware & AI Labs",
    desc: "Hands-on robotics sessions, IoT prototyping kits, embedded systems hardware, and cloud workshops hosted directly on our Colombo campus.",
    highlight: "Campus Labs",
  },
  {
    category: "career",
    icon: GraduationCap,
    title: "Branch Leadership Roles",
    desc: "Run for Executive Committee officer and director positions at Curtin University Colombo, gaining proven governance and project leadership experience.",
    highlight: "ExCom Governance",
  },
  {
    category: "academic",
    icon: Network,
    title: "IEEE Collabratec Directory",
    desc: "Direct network access to 400,000+ researchers, engineers, student branches, and IEEE Senior Members spanning over 160 countries.",
    highlight: "160 Countries",
  },
  {
    category: "technical",
    icon: Sparkles,
    title: "Exclusive Hackathon Entries",
    desc: "Fast-tracked team entry and discounted submission fees for premier national hackathons, robotic challenges, and design competitions.",
    highlight: "Priority Entry",
  },
];

const steps = [
  {
    number: "01",
    phase: "Account Setup",
    title: "Create IEEE Account",
    desc: "Navigate to IEEE.org and register using your university student email credentials for institutional linking.",
  },
  {
    number: "02",
    phase: "Membership Tier",
    title: "Select Student Tier",
    desc: "Select 'Student Membership' to claim the subsidized rates for Sri Lanka: $14 USD for Undergraduates, $27 USD for Graduate Students (vs $184 USD standard professional dues).",
  },
  {
    number: "03",
    phase: "Affiliation",
    title: "Choose Curtin Colombo",
    desc: "Select 'Curtin University Colombo' under university affiliation so you are officially registered to our branch.",
  },
  {
    number: "04",
    phase: "Branch Roster",
    title: "Submit Member ID",
    desc: "Provide your generated IEEE Member Number to our Secretary to join active internal project channels and committee teams.",
  },
];

const faqs = [
  {
    q: "Can I join if I am in my first year or studying Computing / IT?",
    a: "Yes! IEEE membership at Curtin University Colombo is open to students across all years and disciplines — including Software Engineering, Information Technology, Computer Systems, Cyber Security, Mechatronics, and Data Science.",
  },
  {
    q: "What payment methods are supported from Sri Lanka?",
    a: "Undergraduate dues in Sri Lanka are subsidized at just $14 USD/year (and $27 USD for graduate students, compared to $184 USD for working professionals). IEEE accepts international debit/credit cards (Visa, MasterCard, Amex) and PayPal online. If you need assistance with foreign currency payments or online checkout, contact our Branch Treasurer for step-by-step guidance.",
  },
  {
    q: "What is the difference between IEEE Global and IEEE Curtin Colombo?",
    a: "Global IEEE membership gives you access to digital libraries (IEEE Xplore), worldwide conferences, standards, and certificates. Being part of IEEE Curtin Colombo gives you the localized campus experience — physical hackathons, hardware bootcamps, committee roles, and local mentor networks.",
  },
  {
    q: "How long is my student membership valid?",
    a: "IEEE student memberships are valid for a full calendar year (January to December). Members who join in the second half of the year receive discounted or extended coverage through the subsequent year.",
  },
];

export default function MembershipContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 3D Tilt Spring Physics for Centered Pricing Card
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 160, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle natural 3D tilt angles: -4.5deg to +4.5deg
  const rotateX = useTransform(smoothMouseY, [0, 1], [4.5, -4.5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-4.5, 4.5]);

  // Coordinates for delicate, subtle shine overlay
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [shineOpacity, setShineOpacity] = useState(0);

  const displayedBenefits = allBenefits.filter((b) =>
    activeTab === "all" ? true : b.category === activeTab
  );

  const handlePricingMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
    setShinePos({ x: Math.round(x * 100), y: Math.round(y * 100) });
    setShineOpacity(1);
  };

  const handlePricingMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setShineOpacity(0);
  };

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      {/* =================================================================
          1. HERO SECTION
          ================================================================= */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
              <span className="text-primary">■</span> Membership — Join IEEE
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              <Typewriter parts={[{ t: "IEEE " }, { t: "Membership", accent: true }]} speed={45} />
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Join over 400,000 technology innovators across 160 countries. Gain immediate access
              to world-class research libraries, industry mentorship, and recognized leadership credentials.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Button variant="hero" size="xl" asChild>
                <Link
                  href="https://www.ieee.org/membership/join/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <span>Register on IEEE.org</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>

              <Button variant="outline_glow" size="xl" asChild>
                <Link
                  href="/MembershipPage/IEEEStudentMembershipGuide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Download Guide (PDF)</span>
                </Link>
              </Button>
            </div>

            {/* High-Impact Metric Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 sm:p-5 rounded-none border border-border/50 bg-card/40 backdrop-blur-md text-center shadow-lg">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">400K+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Global Engineers</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">160+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Countries Linked</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">5M+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Xplore Publications</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">$14/yr</div>
                <div className="text-xs text-muted-foreground mt-0.5">Undergrad Rate (Sri Lanka)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. 3D TILT SUBSIDIZED PRICING BENTO (CENTERED)
          ================================================================= */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl mx-auto [perspective:1200px]">
            <motion.div
              onMouseMove={handlePricingMouseMove}
              onMouseLeave={handlePricingMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative border border-border/60 bg-card/50 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[6px_6px_0_#111214] overflow-hidden group will-change-transform"
            >
              {/* Subtle Delicate Shine Overlay - soft and not overpowering */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-none"
                style={{
                  opacity: shineOpacity,
                  background: `radial-gradient(850px circle at ${shinePos.x}% ${shinePos.y}%, rgba(56, 189, 248, 0.06), transparent 60%)`,
                }}
              />

              {/* Pricing Card Content */}
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                      Financial Advantage
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      Massive Student Rate Subsidy
                    </h2>
                  </div>
                  <div className="self-start sm:self-center px-4 py-1.5 rounded-none text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700">
                    Save Over 92%
                  </div>
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
                  IEEE heavily subsidizes student dues in Sri Lanka so undergraduates receive full
                  unrestricted access to global engineering archives at a fraction of standard professional dues.
                </p>

                {/* 3-Tier Comparative Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {/* Tier 1: Undergraduate (Featured) */}
                  <div className="p-6 rounded-none border border-primary/50 bg-primary/10 relative overflow-hidden flex flex-col justify-between shadow-[0_0_24px_rgba(0,128,255,0.15)] group/undergrad hover:border-primary transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold uppercase text-primary tracking-wider">
                          Undergraduate
                        </span>
                        <span className="px-2 py-0.5 rounded-none text-[9px] font-mono bg-primary/20 text-primary border border-primary/30">
                          Curtin Undergrads
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-4">
                        <span className="font-display text-4xl sm:text-5xl font-extrabold text-foreground">
                          $14
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">USD / year</span>
                      </div>

                      <ul className="space-y-2 text-xs text-foreground/90 font-medium">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" /> Full IEEE Xplore access
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" /> CV Boost recruiter pipeline
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" /> Campus hackathons & labs
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" /> Region 10 student discounts
                        </li>
                      </ul>
                    </div>

                    <div className="mt-5 pt-3 border-t border-primary/20 text-[11px] text-primary font-semibold text-center">
                      Sri Lanka Subsidized Rate
                    </div>
                  </div>

                  {/* Tier 2: Graduate Student */}
                  <div className="p-6 rounded-none border border-border/50 bg-secondary/30 flex flex-col justify-between hover:border-border transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground tracking-wider">
                          Graduate
                        </span>
                        <span className="px-2 py-0.5 rounded-none text-[9px] font-mono bg-secondary text-muted-foreground border border-border/40">
                          Postgrad & Research
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-4">
                        <span className="font-display text-4xl sm:text-5xl font-bold text-foreground">
                          $27
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">USD / year</span>
                      </div>

                      <ul className="space-y-2 text-xs text-muted-foreground font-medium">
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> Master&apos;s & PhD researchers
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> Conference paper discounts
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> Collabratec global network
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> Technical society chapters
                        </li>
                      </ul>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border/30 text-[11px] text-muted-foreground text-center">
                      Subsidized for Postgraduates
                    </div>
                  </div>

                  {/* Tier 3: Professional */}
                  <div className="p-6 rounded-none border border-border/40 bg-secondary/20 flex flex-col justify-between hover:border-border transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold uppercase text-muted-foreground tracking-wider">
                          Professional
                        </span>
                        <span className="px-2 py-0.5 rounded-none text-[9px] font-mono bg-secondary text-muted-foreground border border-border/40">
                          Working Engineers
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-4">
                        <span className="font-display text-4xl sm:text-5xl font-bold text-muted-foreground">
                          $184
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">USD / year</span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Standard global dues for industry practitioners. Joining as a student locks in your
                        discounted Future50 alumni transition after graduation.
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border/30 text-[11px] text-muted-foreground text-center">
                      Standard Global Industry Rate
                    </div>
                  </div>
                </div>

                {/* Value Summary Strip */}
                <div className="p-4 rounded-none border border-border/40 bg-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-700" />
                    Estimated annual research & certification value: <strong className="text-foreground">$500+ USD</strong>
                  </span>
                  <span className="text-primary font-semibold">Undergrads Save ~$170 USD/yr</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. CATEGORIZED PRIVILEGES BENTO MATRIX
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Privileges & Perks
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Unlock as a Member
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explore how IEEE membership advances your technical portfolio, academic papers, and leadership credentials.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {benefitCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-none text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === cat.id
                      ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(210_100%_50%/0.35)]"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {displayedBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-none border border-border/50 bg-card/40 hover:bg-card/75 hover:border-primary/50 hover:shadow-[0_12px_32px_-8px_hsl(210_100%_50%/0.25)] transition-all duration-300 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-12 h-12 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono font-semibold uppercase bg-secondary text-primary border border-border/50">
                      {benefit.highlight}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          4. REGISTRATION ROADMAP (4 STEPS)
          ================================================================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Activation Roadmap
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How to Register in 4 Simple Steps
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Follow this verified path to activate your official IEEE Student Member status today.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="relative rounded-none border border-border/50 bg-card/40 p-6 sm:p-7 flex flex-col justify-between hover:border-primary/40 transition-all shadow-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-extrabold text-primary">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-0.5 rounded-none bg-secondary/60">
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className={`absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none ${
                      idx === 0 || idx === 2 ? "hidden sm:flex" : "hidden lg:flex"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-none bg-card/95 border border-primary/40 backdrop-blur-md flex items-center justify-center text-primary shadow-[0_0_12px_rgba(0,128,255,0.25)] group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(0,128,255,0.5)] transition-all duration-300">
                      <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Official Guide PDF Card */}
          <div className="max-w-4xl mx-auto rounded-none border border-primary/30 bg-gradient-to-r from-primary/10 via-card/50 to-primary/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-none bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-foreground">
                  Official Registration Screenshot Walkthrough
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                  Visual step-by-step PDF guide detailing each form screen on IEEE.org.
                </p>
              </div>
            </div>

            <Button variant="hero" size="lg" asChild className="whitespace-nowrap">
              <Link
                href="/MembershipPage/IEEEStudentMembershipGuide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <span>Download PDF Guide</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. FAQS ACCORDION
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Common Questions from Students
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Everything you need to know about dues, branch affiliations, and eligibility.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className="rounded-none border border-border/50 bg-card/40 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-secondary/20 transition-colors"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-foreground">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          6. FINAL CTA BANNER
          ================================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-none border border-primary/30 bg-gradient-to-br from-card to-secondary/50 backdrop-blur-xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-none blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="px-3.5 py-1 rounded-none text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 mb-4 inline-block">
                Start Your Journey
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to Join Curtin Colombo&apos;s Flagship Tech Society?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                Become part of an elite cohort of student innovators and start participating in cutting-edge projects,
                hackathons, and global IEEE summits.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link
                    href="https://www.ieee.org/membership/join/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <span>Register on IEEE.org</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline_glow" size="xl" asChild>
                  <Link href="/contact">Ask a Question / Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
