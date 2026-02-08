import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about IEEE Curtin University Colombo Student Branch - our mission, vision, and what we bring to students in Sri Lanka.",
};

// This page is statically generated at build time (SSG)
export default function AboutPage() {
  return <AboutContent />;
}
