import type { Metadata } from "next";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { StatementSection } from "./components/sections/StatementSection";
import { EventsSection } from "./components/sections/EventsSection";
import { GalleryPreview } from "./components/sections/GalleryPreview";
import { MembershipSection } from "./components/sections/MembershipSection";

export const metadata: Metadata = {
  title: "IEEE Curtin University Colombo Student Branch",
  description:
    "A student-led engineering community in Colombo — running workshops, industry visits, webinars, and national competitions under IEEE.",
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatementSection />
      <EventsSection />
      <GalleryPreview />
      <MembershipSection />
    </>
  );
}