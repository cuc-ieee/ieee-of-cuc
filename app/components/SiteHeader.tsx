"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Committee", href: "/committee" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === href : pathname.startsWith(href);

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-line-soft bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[76rem] items-center justify-between px-5 sm:px-8 lg:h-[4.5rem] lg:px-10">
        <Link
          href="/"
          aria-label="IEEE Curtin University Colombo — Home"
          className="group flex items-center gap-3"
        >
          <Image
            src="/logo/logo.png"
            alt=""
            width={560}
            height={76}
            className="hidden h-8 w-auto object-contain lg:block"
            priority
          />
          <Image
            src="/logo/logo-mobile.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-auto object-contain lg:hidden"
            priority
          />
          <span className="hidden font-mono text-[0.625rem] uppercase leading-tight tracking-widest2 text-ink-faint sm:block lg:hidden">
            IEEE · CUC
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-1.5 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300",
                isActive(pathname, item.href)
                  ? "text-ink-strong"
                  : "text-ink-muted hover:text-ink-strong",
              )}
            >
              <span
                className={cn(
                  "h-1 w-1 rounded-full bg-blue transition-opacity duration-300",
                  isActive(pathname, item.href) ? "opacity-100" : "opacity-0",
                )}
                aria-hidden
              />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/membership"
            className="hidden items-center gap-1.5 border border-blue/60 bg-blue/10 px-4 py-2 text-[0.8125rem] font-medium text-blue transition-colors duration-300 hover:bg-blue hover:text-primary-foreground lg:inline-flex"
          >
            Join IEEE
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center text-ink-strong transition-colors hover:text-blue lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto bg-background lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex min-h-full flex-col justify-between px-5 pb-10 pt-6 sm:px-8"
            >
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line-soft"
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between py-5"
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ink-faint">
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-3xl font-medium tracking-tight transition-colors",
                            isActive(pathname, item.href)
                              ? "text-blue"
                              : "text-ink-strong",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.4 }}
                className="flex flex-col gap-4 pt-8"
              >
                <Link
                  href="/membership"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-blue px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-blue-deep"
                >
                  Join IEEE — Become a member
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint">
                  IEEE Student Branch · Curtin University Colombo
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}