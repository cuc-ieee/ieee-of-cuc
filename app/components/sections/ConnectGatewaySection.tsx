"use client";

import { Typewriter, SlideIn } from "../Tech";
import Link from "next/link";
import {
  ArrowRight,
  UserPlus,
  MessageSquare,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Send,
} from "lucide-react";

const ACCENT = "#2667FF";
const INK = "#111214";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/ieee.cuc", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/18JZ8M3B7p/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "YouTube" },
  { icon: Send, href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ", label: "WhatsApp" },
];

const gateways = [
  {
    no: "G.01",
    icon: UserPlus,
    title: "Explore Membership",
    desc: "Perks, eligibility, chapter activities, and step-by-step registration with the student guide.",
    cta: "Membership Details",
    href: "/membership",
    meta: "Guide & Benefits",
    primary: true,
  },
  {
    no: "G.02",
    icon: MessageSquare,
    title: "Get in Touch",
    desc: "Questions on workshops, sponsorships, or general inquiries — message the committee.",
    cta: "Contact Our Team",
    href: "/contact",
    meta: "Inquiries & Campus",
    primary: false,
  },
];

export function ConnectGatewaySection() {
  return (
    <section className="relative border-b-2 border-[#111214] bg-[#E4E4E0] text-[#111214] scroll-mt-[84px]">
      <div className="grid md:grid-cols-12 border-b border-black/20">
        <div className="px-4 md:px-8 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-black/70 md:col-span-3 border-b md:border-b-0 md:border-r border-black/20">
          <span style={{ color: ACCENT }}>■</span> 04 / Next steps
        </div>
        <div className="px-4 md:px-8 py-8 md:py-12 md:col-span-9">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">
            <Typewriter parts={[{ t: "Connect with " }, { t: "Our Community", accent: true }]} speed={26} />
          </h2>
          <p className="mt-4 max-w-xl text-black/75 leading-relaxed">
            Aspiring member or future collaborator — pick a gateway, we reply fast.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-px bg-black/20">
        {gateways.map((g, i) => (
          <SlideIn
            key={g.no}
            from={i === 0 ? "left" : "right"}
            delay={i * 0.08}
            className={`bg-[#E4E4E0] p-6 md:p-12 flex flex-col ${i === 0 ? "md:col-span-7" : "md:col-span-5"}`}
          >
            <div className="flex items-center justify-between mb-8">
              <span
                className="grid h-12 w-12 place-items-center border border-black/40"
                style={{ background: g.primary ? ACCENT : "transparent", color: g.primary ? "#fff" : ACCENT, borderColor: g.primary ? ACCENT : undefined }}
              >
                <g.icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/65">{g.no}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">{g.title}</h3>
            <p className="text-sm md:text-[15px] text-black/75 leading-relaxed mb-8">{g.desc}</p>
            <div className="mt-auto flex items-center justify-between border-t border-black/20 pt-5">
              <Link
                href={g.href}
                className="group inline-flex items-center gap-2 px-6 py-3 font-display text-sm font-bold uppercase tracking-wider transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
                style={
                  g.primary
                    ? { background: ACCENT, color: "#fff", boxShadow: `4px 4px 0 ${INK}` }
                    : { border: `2px solid ${INK}`, color: INK }
                }
              >
                {g.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-black/65">
                {g.meta}
              </span>
            </div>
          </SlideIn>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center items-start gap-4 px-4 md:px-8 py-10">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-black/70">
          Follow IEEE Curtin Colombo
        </span>
        <div className="flex items-center">
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`grid h-11 w-11 place-items-center border border-black/40 text-black/70 hover:text-white transition-colors ${i > 0 ? "border-l-0" : ""}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.borderColor = ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <s.icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
