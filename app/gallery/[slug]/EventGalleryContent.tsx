"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { GalleryEvent } from "@/data/gallery";
import Link from "next/link";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

const ratios = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]"];

export default function EventGalleryContent({ event }: { event: GalleryEvent }) {
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const images = useMemo(() => event.images, [event.images]);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(
    () => setSelected((s) => (s === null ? s : (s - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setSelected((s) => (s === null ? s : (s + 1) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, prev, next]);

  return (
    <>
      {/* Header */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="pb-12 pt-28 sm:pt-36">
          <Reveal>
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink-strong"
            >
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to gallery
            </Link>
            <h1 className="mt-8 font-display text-3xl font-medium leading-[1.05] tracking-tight text-ink-strong sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-wider text-ink-faint">
              {images.length} photographs · IEEE Curtin University Colombo
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Masonry */}
      <section className="border-t border-line-soft bg-background">
        <Container className="py-14 sm:py-20">
          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
            {images.map((image, index) => (
              <button
                key={image}
                onClick={() => setSelected(index)}
                className="group relative mb-3 block w-full overflow-hidden border border-line bg-surface focus-visible:outline-2 focus-visible:outline-blue sm:mb-4"
                aria-label={`Open photograph ${index + 1} of ${images.length}: ${event.title}`}
              >
                <div className={cn(ratios[index % ratios.length], "w-full")}>
                  <img
                    src={getCloudinaryUrl(image, { width: 800 })}
                    alt={`${event.title} — photograph ${index + 1}`}
                    className="img-duotone h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span
                  className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-surface-deep/70 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden
                >
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-strong">
                    0{index + 1}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${event.title} — photograph ${selected + 1} of ${images.length}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md"
            onClick={close}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-muted">
                {event.title}
              </p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint">
                  {selected + 1} / {images.length}
                </p>
                <button
                  ref={closeButtonRef}
                  onClick={close}
                  aria-label="Close lightbox"
                  className="flex h-10 w-10 items-center justify-center text-ink-muted transition-colors hover:text-ink-strong"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-4 sm:px-16">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-surface/80 text-ink-muted transition-colors hover:text-blue sm:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selected}
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  src={getCloudinaryUrl(images[selected], { width: 1920 })}
                  alt={`${event.title} — photograph ${selected + 1} enlarged`}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-line bg-surface/80 text-ink-muted transition-colors hover:text-blue sm:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}