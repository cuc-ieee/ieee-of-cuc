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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center pt-4 px-6 pointer-events-none"
    >
      <div
        className={`pointer-events-auto max-w-5xl w-full flex items-center justify-between px-6 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-border/80 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_20px_rgba(56,189,248,0.1)]"
            : "bg-background/60 backdrop-blur-lg border-border/40 shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo/logo.png"
            alt="IEEE Curtin University Colombo"
            className="w-auto h-8 xl:h-9 group-hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Center / Right: Nav Items + Square Join Button */}
        <nav className="flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium tracking-wide relative group transition-colors duration-200 ${
                isNavItemActive(pathname, item.href)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isNavItemActive(pathname, item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          <Link
            href="/membership"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium text-sm hover:shadow-[0_0_24px_hsl(210_100%_50%/0.5)] hover:bg-primary/90 transition-all duration-300"
          >
            Join IEEE
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-3 left-3 right-3 z-50 lg:hidden"
      >
        <div
          className={`flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-300 ${
            scrolled || isOpen
              ? "bg-background/90 backdrop-blur-xl border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              : "bg-background/60 backdrop-blur-md border-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo/logo-mobile.png"
              alt="IEEE Curtin University Colombo"
              className="w-auto h-7"
            />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-foreground hover:text-primary transition-colors rounded-full border border-transparent hover:border-border"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden pt-24 pb-8 px-6 bg-background/95 backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex flex-col items-center justify-center gap-6 my-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link
                    href={item.href}
                    className={`font-display text-2xl font-bold transition-colors ${
                      isNavItemActive(pathname, item.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="w-full max-w-sm mx-auto"
            >
              <Link
                href="/membership"
                className="w-full block text-center bg-primary text-primary-foreground py-3.5 rounded-full font-semibold text-sm hover:shadow-[0_0_25px_hsl(210_100%_50%/0.5)] transition-all"
              >
                Join IEEE Student Branch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
