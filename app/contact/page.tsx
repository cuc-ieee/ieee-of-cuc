import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with IEEE Curtin University Colombo Student Branch. Send us a message or find our contact information.",
};

// This page is statically generated at build time (SSG)
export default function ContactPage() {
  return <ContactContent />;
}
