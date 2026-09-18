"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";
import { Footer } from "../components/Footer";
import { galleryEvents } from "../data/gallery";
import { Button } from "@/components/ui/button";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { SpearBurstEmblem } from "@/components/ui/SpearBurstEmblem";

export default function GalleryContent() {
  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        {/* Subtle ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-primary/10 rounded-full blur-[110px] pointer-events-none -z-10"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              <span className="relative inline-block">
                <SpearBurstEmblem />
                <span className="relative z-10">Photo</span>
              </span>{" "}
              <span className="text-primary">Gallery</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Relive the memorable milestones, technical hackathons, conferences, and student celebrations of the IEEE Curtin University Colombo Student Branch.
            </p>

          </div>
        </div>
      </section>

      {/* =================================================================
          EVENT ALBUMS SHOWCASE
          ================================================================= */}
      <section className="pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 max-w-6xl mx-auto">
            {galleryEvents.map((event, eventIndex) => {
              const previewImages = event.images.slice(0, 3);
              const totalCount = event.images.length;

              return (
                <div
                  key={event.id}
                  className="rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm p-6 sm:p-8 hover:border-primary/30 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                >
                  {/* Event Album Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-border/40">
                    <div>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                        Featured Event Album
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                        {event.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/60 text-muted-foreground border border-border/50">
                        <Images className="w-3.5 h-3.5 text-primary" />
                        <span>{totalCount} Photos</span>
                      </div>

                      <Button variant="hero" size="sm" asChild className="group">
                        <Link href={`/gallery/${event.slug}`} className="inline-flex items-center gap-1.5">
                          <span>View Album</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* 3-Image Preview Grid (Reliable, eager load for row 1) */}
                  <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
                    {previewImages.map((image, imgIndex) => {
                      const imgUrl = getCloudinaryUrl(image, { width: 800, height: 600 });
                      const isFirstRow = eventIndex === 0;

                      return (
                        <Link
                          key={image}
                          href={`/gallery/${event.slug}`}
                          className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/30 border border-border/40 shadow-sm block"
                        >
                          <Image
                            src={imgUrl}
                            alt={`${event.title} - photo ${imgIndex + 1}`}
                            width={800}
                            height={600}
                            priority={isFirstRow}
                            loading={isFirstRow ? "eager" : "lazy"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Subtle hover gradient scrim */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-xs font-medium text-foreground inline-flex items-center gap-1">
                              <span>Open in Album</span>
                              <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
