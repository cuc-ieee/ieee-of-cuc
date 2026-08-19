import type { Metadata } from "next";
import CommitteeContent from "./CommitteeContent";

export const metadata: Metadata = {
  title: "Committee",
  description:
    "Meet the leadership team of IEEE Student Branch of Curtin Colombo - dedicated students driving innovation and excellence.",
};

// This page is statically generated at build time (SSG)
export default function CommitteePage() {
  return <CommitteeContent />;
}
