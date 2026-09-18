"use client";

import Link from "next/link";
import { ArrowRight, UserPlus, MessageSquare, Instagram, Linkedin, Facebook, Youtube, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/ieee.cuc", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/18JZ8M3B7p/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "YouTube" },
  { icon: Send, href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ", label: "WhatsApp" },
];

export function ConnectGatewaySection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-primary tracking-widest uppercase mb-2 inline-block">
            Next Steps
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Connect with <span className="text-primary">Our Community</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Whether you are an aspiring student ready to join or an organization looking to collaborate, we are here to connect.
          </p>
        </div>

        {/* Dual Gateway Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14">
          
          {/* Card 1: Membership Portal */}
          <div className="group relative rounded-2xl border border-border/60 bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <UserPlus className="w-6 h-6" />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Explore Membership
              </h3>
              
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Discover all membership perks, eligibility, chapter activities, and step-by-step registration instructions with our downloadable student guide.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-between">
              <Button variant="hero" size="lg" asChild className="group/btn">
                <Link href="/membership" className="inline-flex items-center gap-2">
                  <span>Membership Details</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <span className="text-xs text-muted-foreground hidden sm:inline">Guide & Benefits</span>
            </div>
          </div>

          {/* Card 2: Contact Portal */}
          <div className="group relative rounded-2xl border border-border/60 bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-sky-500/20 transition-colors" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>

              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Get in Touch
              </h3>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Have questions regarding upcoming workshops, sponsorships, or general inquiries? Send a message to our branch committee or locate our campus branch.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-between">
              <Button variant="outline_glow" size="lg" asChild className="group/btn">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <span className="text-xs text-muted-foreground hidden sm:inline">Inquiries & Campus</span>
            </div>
          </div>

        </div>

        {/* Social Connect Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Follow IEEE Curtin Colombo:
          </span>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-border/50 bg-card/40 hover:bg-primary/15 hover:border-primary/50 hover:text-primary text-muted-foreground flex items-center justify-center transition-all duration-200"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
