"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GalleryEvent } from "@/data/gallery";
import Link from "next/link";
import { getCloudinaryUrl } from "@/lib/cloudinary";

export default function EventGalleryContent({
  event,
}: {
  event: GalleryEvent;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Preload adjacent images when viewing lightbox
  useEffect(() => {
    if (selectedImage === null) return;

    const currentIndex = event.images.indexOf(selectedImage);
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : event.images.length - 1;
    const nextIndex =
      currentIndex < event.images.length - 1 ? currentIndex + 1 : 0;

    // Preload previous and next images
    const preloadPrev = new Image();
    preloadPrev.src = getCloudinaryUrl(event.images[prevIndex], {
      width: 2000,
    });

    const preloadNext = new Image();
    preloadNext.src = getCloudinaryUrl(event.images[nextIndex], {
      width: 2000,
    });
  }, [selectedImage, event.images]);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = event.images.indexOf(selectedImage);
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : event.images.length - 1;
    setSelectedImage(event.images[prevIndex]);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = event.images.indexOf(selectedImage);
    const nextIndex =
      currentIndex < event.images.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(event.images[nextIndex]);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopNav />
      <MobileNav />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden grid-pattern">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              event.heroImage && event.heroImage.startsWith("/")
                ? event.heroImage
                : getCloudinaryUrl(event.images[0], { width: 1920 })
            })`,
            filter: "blur(7px)",
          }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="mb-6">
              <Link
                href="/gallery"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                &larr; Back to Gallery
              </Link>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">{event.title}</span> Gallery
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {event.images.map((image, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(image)}
                  className="group rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
                >
                  <img
                    src={getCloudinaryUrl(image, { width: 800 })}
                    alt={`${event.title} image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-secondary/80 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.img
              layout
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              src={getCloudinaryUrl(selectedImage, { width: 2000 })}
              alt="Enlarged gallery view"
              className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
