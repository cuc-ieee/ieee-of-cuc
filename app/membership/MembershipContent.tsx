"use client";

import { useState } from "react";
import Link from "next/link";
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
  ArrowRight,
  HelpCircle,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "../components/Footer";

const benefitCategories = [
  {
    id: "all",
    label: "All Benefits",
  },
  {
    id: "academic",
    label: "Research & Academic",
  },
  {
    id: "career",
    label: "Career & Leadership",
  },
  {
    id: "competitions",
    label: "Events & Competitions",
  },
];

const allBenefits = [
  {
    category: "academic",
    icon: BookOpen,
    title: "IEEE Xplore Digital Library",
    desc: "Unrestricted access to over 5 million top-tier peer-reviewed research papers, technical standards, and journal publications worldwide.",
  },
  {
    category: "career",
    icon: Award,
    title: "Recognized Certifications & Credentials",
    desc: "Earn global industry certifications that set your resume apart for top-tier internships and engineering positions.",
  },
  {
    category: "competitions",
    icon: Rocket,
    title: "Exclusive Hackathons & Challenges",
    desc: "Early bird entry and discounted registration for national and international IEEE competitions, robotics events, and tech expos.",
  },
  {
    category: "career",
    icon: GraduationCap,
    title: "Branch Leadership Opportunities",
    desc: "Run for Executive Committee and Director positions at Curtin University Colombo, honing governance and project management skills.",
  },
  {
    category: "academic",
    icon: Globe,
    title: "IEEE Conference Discounts",
    desc: "Significant discounts on registration fees for regional conferences, symposiums, and IEEE Region 10 technical summits.",
  },
  {
    category: "competitions",
    icon: Sparkles,
    title: "Hands-on Technical Bootcamps",
    desc: "Hands-on hardware labs, AI workshops, and embedded systems crash courses hosted right on our Colombo campus.",
  },
  {
    category: "career",
    icon: Network,
    title: "Worldwide Professional Network",
    desc: "Connect with 400,000+ members across 160 countries through IEEE Collabratec and national Sri Lanka Section assemblies.",
  },
  {
    category: "academic",
    icon: CreditCard,
    title: "Student Discounted Pricing",
    desc: "Pay a fraction of professional dues while enjoying full access to all standard IEEE technical society perks.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create IEEE Account",
    desc: "Visit IEEE.org and click 'Join IEEE' as a Student Member with your university student email.",
  },
  {
    number: "02",
    title: "Select Student Membership",
    desc: "Choose Student Membership to unlock discounted annual dues (~$16 USD vs standard professional fees).",
  },
  {
    number: "03",
    title: "Select Curtin Colombo",
    desc: "During registration, select 'Curtin University Colombo' as your institution to link with our branch.",
  },
  {
    number: "04",
    title: "Join Branch Activities",
    desc: "Share your IEEE Member ID with our branch secretary to be added to active project teams and committees.",
  },
];

const faqs = [
  {
    q: "Can I join if I am a first-year student or studying Computing / IT?",
    a: "Absolutely! IEEE membership is open to all students across Information Technology, Computer Systems, Software Engineering, Mechatronics, and related disciplines at Curtin University Colombo.",
  },
  {
    q: "What payment methods are supported for registration?",
    a: "IEEE accepts international credit/debit cards (Visa, Mastercard, Amex) and PayPal online. If you need assistance with international payments from Sri Lanka, reach out to our branch Treasurer for guidance.",
  },
  {
    q: "What is the difference between global IEEE and our local branch?",
    a: "Your global IEEE membership gives you access to digital libraries (IEEE Xplore), global conference discounts, and certified credentials. Branch affiliation at Curtin Colombo connects you to on-campus workshops, competitions, local projects, and social networking.",
  },
  {
    q: "Is there a step-by-step PDF guide with screenshots?",
    a: "Yes! You can download our official branch PDF guide below which walks through each screen of the IEEE.org registration form.",
  },
];

export default function MembershipContent() {
  const [activeTab, setActiveTab] = useState("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayedBenefits = allBenefits.filter((b) =>
    activeTab === "all" ? true : b.category === activeTab
  );

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      
      {/* =================================================================
          1. HERO SECTION
          ================================================================= */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Ambient Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              IEEE <span className="text-primary">Membership</span>
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Join over 400,000 technology professionals and student innovators across 160 countries. Access world-class research, mentorship, and leadership credentials.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
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

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md text-center">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">400K+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Global Members</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">160+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Countries Represented</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-foreground">5M+</div>
                <div className="text-xs text-muted-foreground mt-0.5">IEEE Xplore Papers</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-primary">Student Rate</div>
                <div className="text-xs text-muted-foreground mt-0.5">Discounted Annual Dues</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =================================================================
          2. CATEGORIZED BENEFITS MATRIX
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Perks & Advantages
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Gain as a Member
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Explore how IEEE membership unlocks practical advantages for engineering and technology undergraduates.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {benefitCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeTab === cat.id
                      ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(210_100%_50%/0.35)]"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/70 border border-border/40"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Benefits Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {displayedBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-border/50 bg-card/40 hover:bg-card/75 hover:border-primary/40 transition-all duration-300 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
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
          3. REGISTRATION ROADMAP (4 STEPS)
          ================================================================= */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Registration Guide
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How to Register in 4 Simple Steps
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Follow this step-by-step roadmap to activate your student membership today.
            </p>
          </div>

          {/* Steps Timeline Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="relative rounded-2xl border border-border/50 bg-card/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl font-bold text-primary/80 mb-3 block">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/60">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Official Guide PDF Card */}
          <div className="max-w-4xl mx-auto rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-foreground">
                  IEEE Student Membership Registration Guide
                </h4>
                <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                  Visual PDF with step-by-step screenshots and institutional affiliation details.
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
          4. STUDENT FAQS ACCORDION
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Frequently Asked Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Common Questions from Students
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Everything you need to know about dues, branch activities, and eligibility.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden transition-colors"
                >
                  <button
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
          5. FINAL CTA BANNER
          ================================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-3xl border border-border/60 bg-gradient-to-br from-card to-secondary/40 backdrop-blur-xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to Join Curtin Colombo&apos;s Flagship Tech Society?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                Become part of an elite cohort of student innovators and start participating in cutting-edge projects, hackathons, and global IEEE events.
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
