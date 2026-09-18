"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Clock,
  Navigation as NavIcon,
  ChevronDown,
  Terminal,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "../components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Typewriter } from "../components/Tech";

const CONTACT_EMAIL = "curtincolombo.ieee@gmail.com";
const WHATSAPP_URL = "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ";
const CAMPUS_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.305911878678!2d79.849452074861!3d6.91863369308097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2598e4891314b%3A0xc54d930bba52fae8!2sCurtin%20University%20Colombo!5e1!3m2!1sen!2slk!4v1769868205900!5m2!1sen!2slk";

const topics = [
  {
    id: "membership",
    label: "Membership Inquiry",
    badge: "Membership",
    placeholder: "Tell us about your year of study, degree program, or any questions about IEEE registration...",
    defaultSubject: "IEEE CUC Membership Inquiry",
  },
  {
    id: "events",
    label: "Events & Hackathons",
    badge: "Events",
    placeholder: "Ask about upcoming competitions, registration deadlines, workshops, or challenge rules...",
    defaultSubject: "IEEE CUC Event Participation Inquiry",
  },
  {
    id: "partnership",
    label: "Partnership & Sponsorship",
    badge: "Partnership",
    placeholder: "Share your company or organization details, collaboration ideas, or sponsorship proposals...",
    defaultSubject: "Partnership & Industry Sponsorship Proposal",
  },
  {
    id: "projects",
    label: "Technical Projects",
    badge: "Projects",
    placeholder: "Inquire about joining technical interest groups, research projects, or hardware labs...",
    defaultSubject: "IEEE CUC Technical Projects Collaboration",
  },
  {
    id: "general",
    label: "General Inquiry",
    badge: "General",
    placeholder: "How can we assist you today? Leave your question or message here...",
    defaultSubject: "General Inquiry for IEEE CUC",
  },
];

const faqs = [
  {
    q: "How quickly does the IEEE CUC team typically respond?",
    a: "Our executive committee monitors inquiries daily. We typically respond to emails and inquiries within 24 hours during standard weekdays.",
  },
  {
    q: "Can students from other universities participate in your events?",
    a: "Yes! While on-campus internal workshops may have limited seating, our major hackathons, competitions (like 3MRC), and public webinars are regularly open to all university students across Sri Lanka.",
  },
  {
    q: "How do industry organizations partner with IEEE Curtin Colombo?",
    a: "We welcome corporate partnerships, workshop sponsorships, and recruiting pipelines (such as our CVBoost initiative). Select 'Partnership & Sponsorship' in the inquiry form or email us directly.",
  },
  {
    q: "Where can I meet the Executive Committee in person?",
    a: "You can find us at Curtin University Colombo campus (No. 80 Nawam Mawatha, Colombo 02), especially during event days, tech talks, or pre-scheduled branch appointments.",
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "IEEE Student Branch of CUC",
    href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all",
    color: "hover:text-[#0A66C2]",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp",
    handle: "Official Community Hub",
    href: WHATSAPP_URL,
    color: "hover:text-[#25D366]",
  },
  {
    icon: Instagram,
    name: "Instagram",
    handle: "@ieee.cuc",
    href: "https://www.instagram.com/ieee.cuc",
    color: "hover:text-[#E4405F]",
  },
  {
    icon: Facebook,
    name: "Facebook",
    handle: "IEEE Student Branch CUC",
    href: "https://www.facebook.com/share/18JZ8M3B7p/",
    color: "hover:text-[#1877F2]",
  },
  {
    icon: Youtube,
    name: "YouTube",
    handle: "@IEEECUC",
    href: "https://www.youtube.com/@IEEECUC",
    color: "hover:text-[#FF0000]",
  },
];

export default function ContactContent() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    customSubject: "",
    message: "",
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      toast({
        title: "Copied to clipboard",
        description: text,
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please manually copy the text.",
        variant: "destructive",
      });
    }
  };

  const activeSubject = formData.customSubject.trim() || selectedTopic.defaultSubject;

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    activeSubject
  )}&body=${encodeURIComponent(
    `Name: ${formData.name || "[Your Name]"}\nEmail: ${formData.email || "[Your Email]"}\nTopic: ${
      selectedTopic.label
    }\n\nMessage:\n${formData.message || "[Your Message]"}`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Incomplete details",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // If backend endpoint is configured, submit via API
    const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_API_URL;
    if (contactEndpoint && !contactEndpoint.includes("YOUR_PROJECT_ID")) {
      try {
        const res = await fetch(contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            topic: selectedTopic.id,
            subject: activeSubject,
            message: formData.message,
          }),
        });
        if (!res.ok) throw new Error("Failed to send message");
        toast({
          title: "Message Transmitted!",
          description: "Thank you for contacting IEEE CUC. We'll be in touch soon!",
        });
        setFormData({ name: "", email: "", customSubject: "", message: "" });
      } catch {
        toast({
          title: "Dispatch Fallback",
          description: "Opening your email app to transmit directly to our inbox.",
        });
        window.location.href = mailtoHref;
      } finally {
        setLoading(false);
      }
    } else {
      // Direct reliable transmission via mailto
      setTimeout(() => {
        setLoading(false);
        window.location.href = mailtoHref;
        toast({
          title: "Opening Email Client",
          description: "Your message has been formatted and loaded into your email app.",
        });
      }, 400);
    }
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
              <span className="text-primary">■</span> Contact — Dispatch & inbox
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              <Typewriter parts={[{ t: "Contact " }, { t: "Us", accent: true }]} speed={45} />
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-8">
              Have questions, technical ideas, or looking to partner? Route your inquiry directly to
              our leadership team or visit our Colombo campus innovation hub.
            </p>

            {/* Live Operational Status Ribbon */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-none border border-primary/25 bg-card/60 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-600 opacity-75" />
                <span className="relative inline-flex rounded-none h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-foreground">
                Inquiries Open
              </span>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-primary" />
                Avg. response under 24 hrs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          2. DIRECT DISPATCH BENTO GRID
          ================================================================= */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Bento Card 1: Direct Email Hub (Spans 2 on large screens) */}
            <div className="lg:col-span-2 rounded-none border border-primary/30 bg-gradient-to-br from-card/80 to-secondary/30 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex flex-col justify-between group">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"
              />

              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-none bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-none text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    Primary Dispatch
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Email Dispatch Hub
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  Send your official communications, event sponsorship packets, or general queries directly
                  to our student branch inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-border/40">
                <div className="flex-1 px-4 py-2.5 rounded-none bg-background/80 border border-border/60 text-sm font-mono text-foreground flex items-center justify-between">
                  <span className="truncate">{CONTACT_EMAIL}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(CONTACT_EMAIL, "email")}
                    className="p-1 text-muted-foreground hover:text-primary transition-colors ml-2"
                    aria-label="Copy Email"
                  >
                    {copiedKey === "email" ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <Button variant="hero" size="default" asChild className="whitespace-nowrap">
                  <a href={`mailto:${CONTACT_EMAIL}`}>
                    <span>Compose Email</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Bento Card 2: Executive Hotline */}
            <div className="rounded-none border border-border/50 bg-card/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-lg group">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-none bg-secondary/70 border border-border/60 flex items-center justify-center text-primary shadow-sm group-hover:border-primary/40 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">Direct Line</span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Executive Secretary
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                  For time-sensitive campus coordination and urgent event inquiries.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-border/30">
                <div className="px-3.5 py-2 rounded-none bg-secondary/50 border border-border/40 text-sm font-mono text-foreground flex items-center justify-between">
                  <span>+94 72 792 2261</span>
                  <button
                    type="button"
                    onClick={() => handleCopy("+94 72 792 2261", "phone")}
                    className="p-1 text-muted-foreground hover:text-primary transition-colors ml-2"
                    aria-label="Copy Phone Number"
                  >
                    {copiedKey === "phone" ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <a
                  href="tel:+94727922261"
                  className="w-full inline-flex items-center justify-center text-xs font-medium text-primary hover:underline pt-1"
                >
                  Call Now &rarr;
                </a>
              </div>
            </div>

            {/* Bento Card 3: Campus Coordinates */}
            <div className="rounded-none border border-border/50 bg-card/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 shadow-lg group">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-12 h-12 rounded-none bg-secondary/70 border border-border/60 flex items-center justify-center text-primary shadow-sm group-hover:border-primary/40 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">GPS: 6.9186, 79.8495</span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Colombo Campus HQ
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                  Curtin University Colombo Campus <br />
                  No. 80 Nawam Mawatha, Colombo 02, Sri Lanka
                </p>
              </div>

              <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() =>
                    handleCopy("Curtin University Colombo, No. 80 Nawam Mawatha, Colombo 02", "addr")
                  }
                  className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === "addr" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Address</span>
                </button>

                <a
                  href="https://maps.google.com/?q=Curtin+University+Colombo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Bento Card 4: Community Channels (Spans 2 on lg) */}
            <div className="lg:col-span-2 rounded-none border border-border/50 bg-card/40 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-none bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Social & Community Streams
                    </span>
                  </div>
                  <span className="text-xs text-primary font-mono">5 Active Networks</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Connect Across Global Platforms
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-none border border-border/40 bg-secondary/30 hover:bg-secondary/70 hover:border-primary/40 transition-all flex flex-col items-center text-center group"
                  >
                    <social.icon className={`w-5 h-5 text-muted-foreground ${social.color} transition-colors mb-2`} />
                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      {social.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate w-full mt-0.5">
                      Join &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          3. SMART INQUIRY STUDIO (Interactive Builder + Live Preview)
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/10 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Interactive Dispatch Studio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Send a Direct Transmission
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Select your topic of interest. Our system adapts your subject line and prepares your message payload.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 rounded-none border border-border/60 bg-card/50 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              {/* Topic Selectors */}
              <div className="mb-8">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  1. Select Inquiry Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => {
                    const isSelected = selectedTopic.id === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTopic(t)}
                        className={`px-3.5 py-2 rounded-none text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(210_100%_50%/0.35)]"
                            : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/40"
                        }`}
                      >
                        {isSelected && <Zap className="w-3.5 h-3.5 fill-current" />}
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Elements */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Your Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-none bg-secondary/40 border border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@university.edu"
                      className="w-full px-4 py-3 rounded-none bg-secondary/40 border border-border/60 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center justify-between">
                    <span>Subject</span>
                    <span className="text-[11px] text-muted-foreground font-normal">
                      Auto-filled from topic
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.customSubject || selectedTopic.defaultSubject}
                    onChange={(e) => setFormData({ ...formData, customSubject: e.target.value })}
                    className="w-full px-4 py-3 rounded-none bg-secondary/40 border border-border/60 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Your Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={selectedTopic.placeholder}
                    rows={5}
                    className="w-full px-4 py-3 rounded-none bg-secondary/40 border border-border/60 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Button type="submit" variant="hero" size="lg" className="w-full sm:flex-1 group" disabled={loading}>
                    <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    <span>{loading ? "Transmitting..." : "Send Message"}</span>
                  </Button>

                  <Button variant="outline_glow" size="lg" asChild className="w-full sm:w-auto">
                    <a href={mailtoHref}>
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      <span>Open in Mail App</span>
                    </a>
                  </Button>
                </div>
              </form>
            </div>

            {/* Real-Time Payload / Dispatch Ticket Preview (5 Cols) */}
            <div className="lg:col-span-5 rounded-none border border-border/60 bg-gradient-to-b from-card/90 to-card/50 backdrop-blur-xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                    Dispatch Inspector
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono bg-primary/10 text-primary border border-primary/20">
                  Ready
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs text-muted-foreground leading-relaxed">
                <div>
                  <span className="text-foreground/70">DESTINATION:</span>
                  <div className="text-primary mt-0.5">{CONTACT_EMAIL}</div>
                </div>

                <div>
                  <span className="text-foreground/70">TOPIC ROUTE:</span>
                  <div className="text-foreground mt-0.5">{selectedTopic.label}</div>
                </div>

                <div>
                  <span className="text-foreground/70">RESOLVED SUBJECT:</span>
                  <div className="text-foreground/90 mt-0.5 truncate">{activeSubject}</div>
                </div>

                <div>
                  <span className="text-foreground/70">TRANSMITTER:</span>
                  <div className="text-foreground/90 mt-0.5">
                    {formData.name || "[Unspecified Name]"} &lt;{formData.email || "[Unspecified Email]"}&gt;
                  </div>
                </div>

                <div>
                  <span className="text-foreground/70">PAYLOAD LENGTH:</span>
                  <div className="text-foreground/90 mt-0.5">
                    {formData.message.length} characters ({formData.message.trim().split(/\s+/).filter(Boolean).length} words)
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="mt-8 p-4 rounded-none border border-emerald-500/25 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-none bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground">
                      Prefer Instant Messaging?
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      Join our verified WhatsApp Student Community group to talk directly with members.
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <span>Join WhatsApp Community</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          4. CAMPUS RADAR & EMBEDDED MAP FRAME
          ================================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto rounded-none border border-border/60 bg-card/40 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-border/40">
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                  On-Campus Navigation
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Find Us in Colombo 02
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                  Located near the Beira Lake commercial hub, accessible via Nawam Mawatha and R.A. De Mel Mawatha.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline_glow" size="sm" asChild>
                  <a
                    href="https://maps.google.com/?q=Curtin+University+Colombo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                  >
                    <NavIcon className="w-3.5 h-3.5 text-primary" />
                    <span>Get Directions</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Radar Map Frame */}
            <div className="w-full h-[360px] sm:h-[440px] rounded-none overflow-hidden border border-border/60 shadow-inner relative">
              <iframe
                src={CAMPUS_MAP_URL}
                title="Curtin University Colombo Campus Map"
                className="w-full h-full filter invert-[0.88] hue-rotate-[185deg] contrast-[1.15]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================
          5. FAQ ACCORDION
          ================================================================= */}
      <section className="py-20 border-t border-border/40 bg-card/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
              Immediate Clarifications
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Common Questions
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Quick answers regarding response timelines, campus visits, and external collaborations.
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

      <Footer />
    </div>
  );
}
