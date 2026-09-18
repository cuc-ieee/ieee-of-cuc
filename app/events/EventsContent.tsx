"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkeletonImage } from "@/components/ui/SkeletonImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Footer } from "../components/Footer";
import { Typewriter } from "../components/Tech";
import { upcomingEvents, pastEvents } from "@/data/events";
import { ANIMATION_CONFIG, transitionNormal } from "@/lib/animations";

type SortOption = "newest" | "oldest" | "az" | "za";

const parseEventDate = (date: string) => {
  if (!date) return 0;

  // Clean ordinal indicators (e.g. "4th September 2026" -> "4 September 2026")
  const cleaned = date.replace(/(\d+)(st|nd|rd|th)/gi, "$1").trim();

  // Standard Date parsing handles "4 September 2026", "29 Jul 2026", etc.
  const parsedTime = new Date(cleaned).getTime();
  if (!Number.isNaN(parsedTime)) {
    return parsedTime;
  }

  // Fallback: parse "DD Month YYYY" with short or long month names
  const match = cleaned.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (match) {
    const fallbackTime = new Date(`${match[2]} ${match[1]}, ${match[3]}`).getTime();
    if (!Number.isNaN(fallbackTime)) {
      return fallbackTime;
    }
  }

  return 0;
};

const sortEvents = <T extends { title: string; date: string }>(
  items: T[],
  sortBy: SortOption,
) => {
  const sorted = [...items];

  if (sortBy === "newest") {
    return sorted.sort(
      (a, b) => parseEventDate(b.date) - parseEventDate(a.date),
    );
  }

  if (sortBy === "oldest") {
    return sorted.sort(
      (a, b) => parseEventDate(a.date) - parseEventDate(b.date),
    );
  }

  if (sortBy === "az") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sorted.sort((a, b) => b.title.localeCompare(a.title));
};

export default function EventsContent() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const visibleEvents = useMemo(() => {
    const events = activeTab === "upcoming" ? upcomingEvents : pastEvents;
    return sortEvents(events, sortBy);
  }, [activeTab, sortBy]);

  return (
    <div className="min-h-screen w-full bg-background">

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground mb-4">
              <span className="text-primary">■</span> Events — Workshops & meetups
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              <Typewriter parts={[{ t: "Our " }, { t: "Events", accent: true }]} speed={45} />
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              Join our workshops, competitions, and networking sessions to
              enhance your skills and connect with fellow innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-3 rounded-none font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-3 rounded-none font-medium transition-all ${
                  activeTab === "past"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Past Events
              </button>
            </div>

            <div className="md:ml-auto md:w-[220px]">
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="h-12 rounded-none border border-border/60 bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/20 focus:ring-offset-2">
                  <SelectValue placeholder="Sort events" />
                </SelectTrigger>
                <SelectContent className="rounded-none border border-border bg-popover shadow-lg">
                  <SelectItem value="newest">Newest to oldest</SelectItem>
                  <SelectItem value="oldest">Oldest to newest</SelectItem>
                  <SelectItem value="az">A to Z</SelectItem>
                  <SelectItem value="za">Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === "upcoming" ? (
            visibleEvents.length > 0 ? (
              <div className="space-y-8">
                {visibleEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    whileHover={{
                      y: -6,
                      transition: { type: "spring", stiffness: 400, damping: 25 },
                    }}
                    whileTap={{ scale: 0.99 }}
                    className={`group rounded-none overflow-hidden border transition-all duration-300 hover:shadow-[0_16px_36px_-10px_hsl(210_100%_50%/0.25)] hover:border-primary/50 ${
                      event.featured
                        ? "bg-gradient-to-br from-primary/10 to-card border-primary/30"
                        : "bg-card border-border/50"
                    }`}
                  >
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="aspect-video md:aspect-auto overflow-hidden relative min-h-[220px]">
                        <SkeletonImage
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                        {event.featured && (
                          <span className="inline-block w-fit px-3 py-1 rounded-none bg-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-3">
                            Featured Event
                          </span>
                        )}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.category?.map((cat, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 rounded-none bg-secondary text-xs font-medium"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-display font-semibold text-2xl mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                          {event.participation && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-primary" />
                              <span>{event.participation}</span>
                            </div>
                          )}
                        </div>
                        {event.fullDescription && (
                          <Link href={`/events/${event.slug}`}>
                            <Button
                              variant="outline_glow"
                              className="w-fit group"
                            >
                              View Details
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-2xl mb-2">
                  No upcoming events at the moment
                </p>
                <p className="text-muted-foreground text-base">
                  Check back soon for new events!
                </p>
              </div>
            )
          ) : visibleEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="group rounded-none bg-card/60 border border-border/50 overflow-hidden hover:border-primary/50 hover:shadow-[0_12px_32px_-8px_hsl(210_100%_50%/0.28)] transition-all duration-300"
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="aspect-video overflow-hidden relative">
                      <SkeletonImage
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {event.category?.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-none bg-secondary text-xs font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <span className="text-muted-foreground text-sm block mb-3">
                        {event.date}
                      </span>
                      <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {event.description}
                      </p>
                      {event.participation && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{event.participation}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-2xl mb-2">
                No past events to display
              </p>
              <p className="text-muted-foreground text-base">
                Past events will appear here once they conclude
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
