import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://ieeeofcuc.com"),
  icons: {
    icon: [{ url: "/logo/logo-mobile.png", type: "image/png" }],
    shortcut: ["/logo/logo-mobile.png"],
    apple: [{ url: "/logo/logo-mobile.png", type: "image/png" }],
  },
  title: {
    default:
      "IEEE Curtin University Colombo Student Branch | Advancing Technology for Humanity",
    template: "%s | IEEE Curtin University Colombo",
  },
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
  authors: [{ name: "IEEE Curtin University Colombo Student Branch" }],
  creator: "IEEE Curtin University Colombo Student Branch",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieeeofcuc.com",
    siteName: "IEEE Curtin University Colombo Student Branch",
    title: "IEEE Curtin University Colombo Student Branch",
    description:
      "Empowering the next generation of engineers and innovators through technology, collaboration, and excellence in Sri Lanka.",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "IEEE Curtin University Colombo Student Branch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Curtin University Colombo Student Branch",
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
