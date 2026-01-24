"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Committee", href: "/committee" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const isNavItemActive = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

export function DesktopNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-3"
      >
        <img
          src="/logo/logo.png"
          alt="IEEE Curtin Colombo"
          className="w-auto h-10 rounded-lg"
        />
      </button>

      <div className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-sm font-medium tracking-wide relative group transition-colors duration-300 ${
              isNavItemActive(pathname, item.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
        <Link
          href="/membership"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium text-sm hover:shadow-[0_0_20px_hsl(210_100%_50%/0.4)] transition-all duration-300"
        >
          Join IEEE
        </Link>
      </div>
    </motion.nav>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-4 py-4 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo/logo-mobile.png"
            alt="IEEE Curtin Colombo"
            className="w-auto h-8 rounded-lg"
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden bg-background"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-lg font-medium transition-colors ${
                    isNavItemActive(pathname, item.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/membership"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:shadow-[0_0_20px_hsl(210_100%_50%/0.4)] transition-all duration-300 mt-4"
              >
                Join IEEE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
