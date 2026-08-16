"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DesktopNav, MobileNav } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { upcomingEvents, pastEvents } from "@/data/events";

type SortOption = "newest" | "oldest" | "az" | "za";

const parseEventDate = (date: string) => {
  const match = date.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (!match) return 0;

  const parsed = new Date(`${match[3]} ${match[2]} ${match[1]}`);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
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
      <DesktopNav />
      <MobileNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pb-20 overflow-hidden grid-pattern">
        <div className="absolute inset-0">
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
              Events
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Events</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Join our workshops, competitions, and networking sessions to
              enhance your skills and connect with fellow innovators.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section>
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
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
                <SelectTrigger className="h-12 rounded-xl border border-border/60 bg-background text-foreground shadow-sm focus:ring-2 focus:ring-primary/20 focus:ring-offset-2">
                  <SelectValue placeholder="Sort events" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border bg-popover shadow-lg">
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
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`rounded-2xl overflow-hidden border card-hover ${
                      event.featured
                        ? "bg-gradient-to-br from-primary/10 to-card border-primary/30"
                        : "bg-card border-border/50"
                    }`}
                  >
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                        {event.featured && (
                          <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-3">
                            Featured Event
                          </span>
                        )}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {event.category?.map((cat, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium"
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl bg-card border border-border/50 overflow-hidden card-hover"
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {event.category?.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-secondary text-xs font-medium"
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
