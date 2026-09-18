"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollProgress } from "./Tech";

const ACCENT = "#2667FF";
const INK = "#111214";
const PAPER = "#E4E4E0";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Committee", href: "/committee" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const isNavItemActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === href;
  return pathname.startsWith(href);
};

function Brand({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <Link href="/" onClick={() => onNavigate("/")} className="flex items-center gap-3 group">
      <img
        src="/logo/logo-mobile.png"
        alt="IEEE Curtin University Colombo"
        className="w-auto h-9 transition-transform group-hover:-translate-y-px"
      />
      <span className="leading-none">
        <span className="block font-display text-lg font-bold lowercase tracking-tighter text-white">
          ieee<span className="text-white">*</span>cuc
        </span>
        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.28em] text-white/75">
          Student Branch — LK
        </span>
      </span>
    </Link>
  );
}

export function DesktopNav() {
  const pathname = usePathname();
  const progress = useScrollProgress();
  const [activeHref, setActiveHref] = useState(pathname);

  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 hidden lg:block text-white"
      style={{ background: ACCENT }}
    >
      <div className="flex items-center justify-between h-16 px-8 border-b-2" style={{ borderColor: INK }}>
        <Brand onNavigate={setActiveHref} />

        <nav className="flex items-center gap-7">
          {navItems.map((item, i) => {
            const isActive = isNavItemActive(activeHref, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                className={`font-mono text-[12px] font-bold uppercase tracking-[0.18em] py-1 border-b-[3px] transition-colors ${
                  isActive ? "border-transparent text-white" : "text-white/75 hover:text-white border-transparent"
                }`}
                style={isActive ? { borderColor: "#fff" } : undefined}
              >
                <span className="mr-1.5 text-white/60">0{i + 1}</span>
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/membership"
            onClick={() => setActiveHref("/membership")}
            className="font-display text-xs font-bold uppercase tracking-wider text-white px-5 py-2.5 transition-all hover:translate-x-[2px] hover:translate-y-[2px]"
            style={{ background: INK, boxShadow: `3px 3px 0 ${PAPER}` }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `1px 1px 0 ${PAPER}`)}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `3px 3px 0 ${PAPER}`)}
          >
            Join IEEE
          </Link>
        </nav>
      </div>
      {/* scroll progress rule */}
      <div className="h-[3px] w-full bg-black/25">
        <div
          className="h-full transition-[width] duration-150 ease-out"
          style={{ width: `${Math.round(progress * 100)}%`, background: "#fff" }}
        />
      </div>
    </motion.header>
  );
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useScrollProgress();
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState(pathname);

  useEffect(() => {
    setActiveHref(pathname);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 lg:hidden text-white"
        style={{ background: ACCENT }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b-2" style={{ borderColor: INK }}>
          <Brand onNavigate={setActiveHref} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-white/40 hover:text-white transition-colors"
            style={{ color: "inherit" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = INK;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "inherit";
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* scroll progress rule */}
        <div className="h-[3px] w-full bg-black/25">
          <div
            className="h-full transition-[width] duration-150 ease-out"
            style={{ width: `${Math.round(progress * 100)}%`, background: "#fff" }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden text-white flex flex-col pt-[91px]"
            style={{ background: ACCENT }}
          >
            <p className="px-6 pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              Index — IEEE CUC
            </p>
            <div className="flex flex-col px-6 mt-2">
              {navItems.map((item, index) => {
                const isActive = isNavItemActive(activeHref, item.href);
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/25"
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveHref(item.href);
                        setIsOpen(false);
                      }}
                      className="flex items-baseline gap-3 py-3 font-display text-3xl font-bold"
                      style={isActive ? { color: "#fff" } : { color: "rgba(255,255,255,0.8)" }}
                    >
                      <span className="font-mono text-xs text-white/60">0{index + 1}</span>
                      {item.label}
                      {isActive && (
                        <span className="ml-auto h-2.5 w-2.5 bg-white" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-auto p-6">
              <Link
                href="/membership"
                onClick={() => {
                  setActiveHref("/membership");
                  setIsOpen(false);
                }}
                className="block text-center text-white font-display font-bold text-sm uppercase tracking-wider py-4"
                style={{ background: INK, boxShadow: `4px 4px 0 ${PAPER}` }}
              >
                Join IEEE Student Branch
              </Link>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
                Region 10 — Sri Lanka
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
