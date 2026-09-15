"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/data/events";

import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ANIMATION_CONFIG, transitionNormal } from "@/lib/animations";

function getEventStatus(dateStr: string, statusOverride?: "upcoming" | "past" | "ongoing"): {
  label: string;
  variant: "ongoing" | "upcoming" | "past";
} {
  if (statusOverride === "ongoing") {
    return { label: "Live Now", variant: "ongoing" };
  }
  if (statusOverride === "past") {
    return { label: "Past Event", variant: "past" };
  }

  const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");
  const eventDate = new Date(cleaned);

  if (isNaN(eventDate.getTime())) {
    return { label: "Upcoming", variant: "upcoming" };
  }

  const now = new Date();
  const isSameDay =
    eventDate.getFullYear() === now.getFullYear() &&
    eventDate.getMonth() === now.getMonth() &&
    eventDate.getDate() === now.getDate();

  if (isSameDay) {
    return { label: "Live Now", variant: "ongoing" };
  }

  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const eventMidnight = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

  if (eventMidnight < todayMidnight) {
    return { label: "Past Event", variant: "past" };
  }

  return { label: "Upcoming", variant: "upcoming" };
}

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" ref={ref} className="relative flex items-center py-20">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transitionNormal(0)}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join our workshops, competitions, and networking sessions to enhance
            your skills and connect with fellow innovators.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {upcomingEvents.slice(0, 3).map((event, index) => {
            const status = getEventStatus(event.date, event.status);

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={transitionNormal(ANIMATION_CONFIG.stagger.normal * (index + 1))}
                className="w-full sm:w-[380px] md:w-[410px] flex-shrink-0"
              >
                <SpotlightCard
                  className={`group rounded-2xl overflow-hidden card-hover h-full flex flex-col justify-between ${
                    event.featured
                      ? "border-primary/40 bg-gradient-to-br from-primary/15 to-card"
                      : "bg-card/70 border-border/50"
                  }`}
                  spotlightColor="rgba(56, 189, 248, 0.22)"
                >
                  <Link href={`/events/${event.slug}`} className="block p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Status and Category Row */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {event.category?.map((cat, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-0.5 rounded-full bg-secondary/80 border border-border/40 text-xs font-medium text-foreground"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

                        {/* Dynamic Status Badge */}
                        {status.variant === "ongoing" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            {status.label}
                          </span>
                        )}
                        {status.variant === "upcoming" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            {status.label}
                          </span>
                        )}
                        {status.variant === "past" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/60 text-muted-foreground text-xs font-medium">
                            {status.label}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="space-y-2.5 text-sm text-muted-foreground border-t border-border/40 pt-4 mt-auto">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-foreground/90 font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={transitionNormal(ANIMATION_CONFIG.stagger.normal * 4)}
          className="text-center"
        >
          <Link href="/events">
            <Button variant="outline_glow" size="lg" className="group">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
