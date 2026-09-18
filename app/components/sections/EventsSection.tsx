"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { upcomingEvents } from "@/data/events";
import { Typewriter, PixelIn } from "../Tech";

const ACCENT = "#2667FF";

function getEventStatus(dateStr: string, statusOverride?: "upcoming" | "past" | "ongoing") {
  if (statusOverride === "ongoing") return { label: "Live Now", live: true };
  if (statusOverride === "past") return { label: "Past Event", live: false };
  const cleaned = dateStr.replace(/(\d+)(st|nd|rd|th)/i, "$1");
  const eventDate = new Date(cleaned);
  if (isNaN(eventDate.getTime())) return { label: "Upcoming", live: false };
  const now = new Date();
  const sameDay =
    eventDate.getFullYear() === now.getFullYear() &&
    eventDate.getMonth() === now.getMonth() &&
    eventDate.getDate() === now.getDate();
  if (sameDay) return { label: "Live Now", live: true };
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const evt = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
  if (evt < today) return { label: "Past Event", live: false };
  return { label: "Upcoming", live: false };
}

export function EventsSection() {
  const events = upcomingEvents.slice(0, 3);

  return (
    <section id="events" className="relative border-b-2 border-[#111214] bg-[#E4E4E0] text-[#111214] scroll-mt-[84px]">
      <div className="grid md:grid-cols-12 border-b border-black/20">
        <div className="px-4 md:px-8 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-black/70 md:col-span-3 border-b md:border-b-0 md:border-r border-black/20">
          <span style={{ color: ACCENT }}>■</span> 02 / Events
        </div>
        <div className="px-4 md:px-8 py-8 md:py-12 md:col-span-9">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight">
            <Typewriter parts={[{ t: "Upcoming " }, { t: "Events", accent: true }]} speed={30} />
          </h2>
          <p className="mt-4 max-w-xl text-black/75 leading-relaxed">
            Workshops, competitions, and networking sessions to sharpen skills and
            meet fellow innovators.
          </p>
        </div>
      </div>

      {events.length === 0 ? (
        <p className="px-4 md:px-8 py-12 text-black/75">
          No upcoming events at the moment — check back soon or explore past events.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 items-start gap-px bg-black/20 border-b border-black/20">
          {events.map((event, i) => {
            const status = getEventStatus(event.date, event.status);
            return (
              <PixelIn
                key={event.title}
                delay={i * 0.1}
                className={`bg-[#E4E4E0] ${i === 1 ? "md:mt-10" : ""} ${i === 2 ? "md:mt-20" : ""}`}
              >
                <article className="group flex flex-col">
                {event.featured && <div className="h-1.5 w-full" style={{ background: ACCENT }} />}
                <div className="flex items-center justify-between px-5 md:px-6 pt-5 font-mono text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-black/65">E.0{i + 1}</span>
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 border font-bold"
                    style={
                      status.live
                        ? { color: "#047857", borderColor: "#047857", background: "rgba(4,120,87,0.08)" }
                        : { color: ACCENT, borderColor: ACCENT, background: "rgba(38,103,255,0.07)" }
                    }
                  >
                    {status.live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />}
                    {!status.live && <span className="h-1.5 w-1.5" style={{ background: ACCENT }} />}
                    {status.label}
                  </span>
                </div>

                <Link href={`/events/${event.slug}`} className="flex flex-1 flex-col px-5 md:px-6 py-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {event.category?.map((cat) => (
                      <span key={cat} className="font-mono text-[10px] uppercase tracking-wider border border-black/40 px-2 py-0.5 text-black/75">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4" style={{ textDecorationColor: ACCENT }}>
                    {event.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/75 line-clamp-3 mb-5">
                    {event.description}
                  </p>
                  <div className="mt-auto border-t border-black/20 font-mono text-[11px] uppercase tracking-wider">
                    <div className="flex items-center gap-2.5 py-2 border-b border-black/20">
                      <Calendar className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                      <span className="font-bold normal-case tracking-normal text-[13px]">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 py-2 border-b border-black/20 text-black/75">
                      <Clock className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 py-2 text-black/75">
                      <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: ACCENT }} />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </Link>

                <Link
                  href={`/events/${event.slug}`}
                  className="flex items-center justify-between border-t border-black/20 px-5 md:px-6 py-3.5 font-display text-xs font-bold uppercase tracking-wider hover:text-white transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ACCENT;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "inherit";
                  }}
                >
                  Open brief
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                </article>
              </PixelIn>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between px-4 md:px-8 py-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-black/70">
          Full archive on the events index
        </span>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 border-2 border-[#111214] px-6 py-3 font-display text-sm font-bold uppercase tracking-wider hover:bg-black/5 transition-colors"
        >
          View All Events
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
