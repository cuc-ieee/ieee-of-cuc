"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DesktopNav, MobileNav } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { galleryEvents } from "../data/gallery";
import { Button } from "@/components/ui/button";

export default function GalleryContent() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopNav />
      <MobileNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
              Gallery
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Relive the moments from our events, workshops, and community
              activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Gallery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {galleryEvents.map((event, eventIndex) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: eventIndex * 0.2 }}
              >
                <h2 className="font-display text-3xl font-bold mb-8 text-center">
                  {event.title} 
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.images.slice(0, 3).map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: imgIndex * 0.1 }}
                      className="group aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer relative"
                    >
                      <img
                        src={image}
                        alt={`${event.title} image ${imgIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link href={`/gallery/${event.slug}`}>
                    <Button variant="outline_glow" size="lg" className="group">
                      View More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
