import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://ieee.curtin.edu.lk"),
  title: {
    default: "IEEE Curtin Colombo Student Branch | Advancing Technology for Humanity",
    template: "%s | IEEE Curtin Colombo",
  },
  description:
    "IEEE Curtin Colombo Student Branch - Empowering the next generation of engineers and innovators through technology, collaboration, and excellence in Sri Lanka.",
  keywords: [
    "IEEE",
    "Curtin Colombo",
    "Student Branch",
    "Engineering",
    "Technology",
    "Sri Lanka",
    "Innovation",
  ],
  authors: [{ name: "IEEE Curtin Colombo Student Branch" }],
  creator: "IEEE Curtin Colombo Student Branch",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieee.curtin.edu.lk",
    siteName: "IEEE Curtin Colombo Student Branch",
    title: "IEEE Curtin Colombo Student Branch",
    description:
      "Empowering the next generation of engineers and innovators through technology, collaboration, and excellence in Sri Lanka.",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "IEEE Curtin Colombo Student Branch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Curtin Colombo Student Branch",
    description:
      "Empowering the next generation of engineers and innovators through technology, collaboration, and excellence in Sri Lanka.",
    images: ["/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
