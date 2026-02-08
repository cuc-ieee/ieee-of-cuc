import type { Metadata } from "next";
import EventsContent from "./EventsContent";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover upcoming workshops, competitions, and networking events at IEEE Curtin University Colombo Student Branch.",
};

// This page is statically generated at build time (SSG)
export default function EventsPage() {
  return <EventsContent />;
}
