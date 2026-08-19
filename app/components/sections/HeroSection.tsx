"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { ArrowLink } from "@/components/ArrowLink";
import { site } from "@/data/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

const statStrip = [
  "Workshops",
  "Industry visits",
  "Webinars",
  "Competitions",
  "Community",
];

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,hsl(var(--blue-bright)/0.08),transparent)]" aria-hidden />

      <Container className="relative pt-20 sm:pt-24 lg:pt-28">
        <div className="grid items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-10">
          {/* Left — masthead */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint"
            >
              <span>IEEE Student Branch</span>
              <span className="h-1 w-1 rounded-full bg-blue" aria-hidden />
              <span>Curtin Colombo</span>
              <span className="hidden sm:inline">6.9186° N · 79.8494° E</span>
            </motion.div>

            <h1 className="font-display leading-[1.02] tracking-tight text-ink-strong">
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
                className="block font-orbitron text-[clamp(2.5rem,9vw,5.5rem)] font-bold text-blue"
              >
                IEEE
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: easeOut }}
                className="mt-1 block text-[clamp(2rem,6vw,3.9rem)] font-medium"
              >
                Student Branch
              </motion.span>
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: easeOut }}
                className="mt-1 block text-[clamp(2rem,6vw,3.9rem)] font-medium"
              >
                of Curtin <span className="font-serif italic text-blue">Colombo</span>
              </motion.span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: easeOut }}
              className="mt-7 max-w-[46ch] text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              A student-led engineering community in Sri Lanka — running hands-on
              workshops, industry visits, webinars, and national competitions
              under the world&rsquo;s largest technical professional organization.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.52, ease: easeOut }}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              <Button asChild size="lg">
                <Link href="/membership">Become a member</Link>
              </Button>
              <ArrowLink href="/events">Explore events</ArrowLink>
            </motion.div>
          </div>

          {/* Right — image composition */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
            className="relative lg:col-span-5"
          >
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                {/* Primary image */}
                <img
                  src={site.home.hero.primary.src}
                  alt={site.home.hero.primary.alt}
                  className="img-duotone absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/80 via-transparent to-transparent" aria-hidden />
              </div>

              {/* Offset secondary image */}
              <div className="absolute -bottom-8 -left-4 w-2/5 overflow-hidden border border-line bg-surface shadow-lift sm:-left-8">
                <img
                  src={site.home.hero.secondary.src}
                  alt={site.home.hero.secondary.alt}
                  className="img-duotone aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 right-4 border border-line/80 bg-background/80 px-3 py-2 backdrop-blur-sm">
                <p className="font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-muted">
                  {site.home.hero.caption}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom strip — hint of what follows */}
        <div className="relative z-10 border-t border-line-soft">
          <div className="flex items-center justify-between gap-6 py-4">
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint sm:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-blue/40" />
                <span className="relative h-2 w-2 rounded-full bg-blue" />
              </span>
              Registering for the coming year
            </motion.div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {statStrip.map((item, i) => (
                <span key={item} className="flex items-center gap-5">
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-blue" aria-hidden />
                  )}
                  <span className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-muted">
                    {item}
                  </span>
                </span>
              ))}
            </div>
            <motion.a
              href="#identity"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint transition-colors hover:text-blue md:flex"
              aria-label="Scroll to next section"
            >
              Scroll
              <ArrowDown className="h-3.5 w-3.5" />
            </motion.a>
          </div>
        </div>
      </Container>
    </section>
  );
}