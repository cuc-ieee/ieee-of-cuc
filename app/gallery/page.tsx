import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse photos and videos from IEEE Student Branch of Curtin Colombo events, workshops, and behind-the-scenes moments.",
};

// This page uses client-side rendering for interactive features
export default function GalleryPage() {
  return <GalleryContent />;
}
