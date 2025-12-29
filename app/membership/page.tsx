import type { Metadata } from "next";
import MembershipContent from "./MembershipContent";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join IEEE Curtin Colombo Student Branch and unlock exclusive benefits including IEEE Xplore access, networking, and career resources.",
};

// This page is statically generated at build time (SSG)
export default function MembershipPage() {
  return <MembershipContent />;
}
