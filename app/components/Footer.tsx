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
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Branch", href: "/about" },
    { label: "Upcoming Events", href: "/events" },
    { label: "Executive Committee", href: "/committee" },
    { label: "Event Gallery", href: "/gallery" },
    { label: "Membership Benefits", href: "/membership" },
  ],
  resources: [
    { label: "IEEE Xplore Digital Library", href: "https://ieeexplore.ieee.org", external: true },
    { label: "IEEE Sri Lanka Section", href: "https://ieee.lk", external: true },
    { label: "IEEE Region 10 (Asia-Pacific)", href: "https://ieeer10.org", external: true },
    { label: "IEEE Student Activities (SAC)", href: "https://students.ieee.org", external: true },
    { label: "Curtin University Colombo", href: "https://curtincolombo.lk", external: true },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ieee.cuc", label: "Instagram", hoverColor: "hover:text-pink-400" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all", label: "LinkedIn", hoverColor: "hover:text-sky-400" },
  { icon: Facebook, href: "https://www.facebook.com/share/18JZ8M3B7p/", label: "Facebook", hoverColor: "hover:text-blue-400" },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "Youtube", hoverColor: "hover:text-red-400" },
  { icon: MessageCircle, href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ", label: "WhatsApp", hoverColor: "hover:text-emerald-400" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-card/25 border-t border-border/40 pt-16 pb-12 overflow-hidden backdrop-blur-xl select-none">
      {/* Subtle ambient lighting orb */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          {/* Brand & Mission Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-block group cursor-pointer">
              <Image
                src="/logo/logo2.png"
                alt="IEEE Curtin University Colombo"
                width={260}
                height={55}
                className="w-auto h-10 sm:h-12 object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-sm">
              Empowering undergraduates to build next-generation technologies, conduct impact-driven engineering, and foster a thriving innovation culture.
            </p>

            {/* Active Section Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-xs font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>IEEE Student Branch • Region 10 Sri Lanka</span>
            </div>

            {/* Animated Social Icon Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-xl bg-secondary/40 border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:border-white/40 hover:bg-secondary/80 ${social.hoverColor}`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-foreground">
                Navigation
              </h4>
            </div>
            <ul className="space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-primary/60 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Ecosystem (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <h4 className="font-display font-semibold text-sm tracking-wider uppercase text-foreground">
                IEEE Ecosystem
              </h4>
            </div>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Direct Contact Card */}
            <div className="pt-4 mt-2">
              <div className="p-4 rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span>curtincolombo.ieee@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>Curtin Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back-To-Top and Copyright */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} IEEE Student Branch of Curtin University Colombo. Advancing Technology for Humanity.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/40 border border-border/50 hover:border-white/40 hover:bg-secondary/80 text-foreground/90 transition-all duration-300 cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-primary group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
