"use client";

import React from "react";
import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowUp,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { CHAMFER } from "./Tech";

const ACCENT = "#2667FF";
const INK = "#111214";
const PAPER = "#E4E4E0";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About Branch", href: "/about" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Executive Committee", href: "/committee" },
  { label: "Event Gallery", href: "/gallery" },
  { label: "Membership Benefits", href: "/membership" },
];

const resources = [
  { label: "IEEE Xplore Digital Library", href: "https://ieeexplore.ieee.org" },
  { label: "IEEE Sri Lanka Section", href: "https://ieee.lk" },
  { label: "IEEE Region 10 (Asia-Pacific)", href: "https://ieeer10.org" },
  { label: "IEEE Student Activities (SAC)", href: "https://students.ieee.org" },
  { label: "Curtin University Colombo", href: "https://curtincolombo.lk" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/ieee.cuc", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/18JZ8M3B7p/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "YouTube" },
  { icon: MessageCircle, href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ", label: "WhatsApp" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative text-white select-none" style={{ background: ACCENT }}>
      {/* ledger head */}
      <div className="grid md:grid-cols-12 border-b border-white/25 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
        <div className="px-4 md:px-8 py-3 md:col-span-6">
          <span className="text-white">■</span> 05 / Colophon & index
        </div>
        <div className="hidden md:block px-8 py-3 md:col-span-6 text-right border-l border-white/25">
          IEEE CUC — End of sheet
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-px bg-white/25">
        {/* brand cell */}
        <div className="p-6 md:p-10 md:col-span-5" style={{ background: ACCENT }}>
          <Link href="/" className="inline-flex items-center gap-3">
            <img
              src="/logo/logo-mobile.png"
              alt="IEEE student branch mark"
              className="w-auto h-11"
            />
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold leading-tight text-white">
                Curtin University Colombo
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.24em] text-white/75">
                IEEE Student Branch
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/85">
            Empowering undergraduates to build next-generation technologies,
            conduct impact-driven engineering, and foster a thriving innovation culture.
          </p>
          <p className="mt-5 inline-flex items-center gap-2.5 border border-white/40 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
            <span className="h-2 w-2 animate-pulse bg-white" />
            IEEE Student Branch • Region 10 Sri Lanka
          </p>
          <div className="mt-5 flex items-center">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`grid h-10 w-10 place-items-center border border-white/40 text-white/80 transition-colors ${i > 0 ? "border-l-0" : ""}`}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = PAPER;
                  e.currentTarget.style.borderColor = PAPER;
                  e.currentTarget.style.color = ACCENT;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.color = "";
                }}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* navigation cell */}
        <div className="p-6 md:p-10 md:col-span-3" style={{ background: ACCENT }}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 mb-5">
            <span className="mr-2 inline-block h-2 w-2 bg-white" />
            Navigation
          </h4>
          <ul>
            {navigation.map((link, i) => (
              <li key={link.label} className="border-b border-white/25">
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-2.5 py-2.5 text-sm font-medium text-white hover:font-bold transition-all"
                >
                  <span className="font-mono text-[10px] text-white/55">0{i + 1}</span>
                  <span className="group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4 decoration-white">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* resources cell */}
        <div className="p-6 md:p-10 md:col-span-4" style={{ background: ACCENT }}>
          <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 mb-5">
            <span className="mr-2 inline-block h-2 w-2 bg-white" />
            IEEE Ecosystem
          </h4>
          <ul>
            {resources.map((link) => (
              <li key={link.label} className="border-b border-white/25">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 py-2.5 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 border border-white/40 p-4 space-y-2.5" style={{ background: INK, clipPath: CHAMFER }}>
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/85">
              <Mail className="h-3.5 w-3.5 text-white" />
              <span>curtincolombo.ieee@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/85">
              <MapPin className="h-3.5 w-3.5 text-white" />
              <span>Curtin Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 md:px-8 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
        <p>© {new Date().getFullYear()} IEEE Student Branch of Curtin University Colombo</p>
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 border-2 border-white px-4 py-2 font-bold text-white transition-colors"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = PAPER;
            e.currentTarget.style.color = INK;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "";
          }}
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
