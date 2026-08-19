import type { Metadata, Viewport } from "next";
import {
  Inter,
  Space_Grotesk,
  Instrument_Serif,
  IBM_Plex_Mono,
  Orbitron,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/Footer";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ieeeofcuc.com"),
  icons: {
    icon: [{ url: "/logo/logo-mobile.png", type: "image/png" }],
    shortcut: ["/logo/logo-mobile.png"],
    apple: [{ url: "/logo/logo-mobile.png", type: "image/png" }],
  },
  title: {
    default: "IEEE Student Branch of Curtin Colombo",
    template: "%s | IEEE Student Branch of Curtin Colombo",
  },
  description:
    "The IEEE Student Branch of Curtin Colombo — a student-led engineering community in Sri Lanka running workshops, industry visits, webinars, and national competitions.",
  keywords: [
    "IEEE",
    "Curtin University Colombo",
    "Student Branch",
    "Engineering",
    "Technology",
    "Sri Lanka",
    "Innovation",
    "IEEE Sri Lanka Section",
  ],
  authors: [{ name: "IEEE Student Branch of Curtin Colombo" }],
  creator: "IEEE Student Branch of Curtin Colombo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieeeofcuc.com",
    siteName: "IEEE Student Branch of Curtin Colombo",
    title: "IEEE Student Branch of Curtin Colombo",
    description:
      "A student-led engineering community in Colombo running workshops, industry visits, webinars, and national competitions.",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "IEEE Student Branch of Curtin Colombo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Student Branch of Curtin Colombo",
    description:
      "A student-led engineering community in Colombo running workshops, industry visits, webinars, and national competitions.",
    images: ["/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0d15",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable} ${orbitron.variable}`}
    >
      <body className="min-h-screen bg-background antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-blue focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Providers>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}