import type { Metadata } from "next";
import { DesktopNav, MobileNav } from "./components/Navigation";
import { HeroSection } from "./components/sections/HeroSection";
import { DomainMarquee } from "./components/DomainMarquee";
import { SectionSeparator } from "./components/SectionSeparator";
import { AboutSection } from "./components/sections/AboutSection";
import { EventsSection } from "./components/sections/EventsSection";
import { MembershipSection } from "./components/sections/MembershipSection";
import { ContactSection } from "./components/sections/ContactSection";
import { DotGridBackground } from "./components/DotGridBackground";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "IEEE Curtin University Colombo Student Branch | Advancing Technology for Humanity",
  description:
    "IEEE Curtin University Colombo Student Branch - Empowering the next generation of engineers and innovators through technology, collaboration, and excellence in Sri Lanka.",
  keywords: [
    "IEEE",
    "Curtin University Colombo",
    "Student Branch",
    "Engineering",
    "Technology",
    "Sri Lanka",
    "Innovation",
  ],
};

// This page is statically generated at build time (SSG)
export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden relative">
      <DotGridBackground />
      <DesktopNav />
      <MobileNav />

      <main>
        <HeroSection />
        <DomainMarquee />
        <SectionSeparator />
        <AboutSection />
        <SectionSeparator />
        <EventsSection />
        <SectionSeparator />
        <MembershipSection />
        <SectionSeparator />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
