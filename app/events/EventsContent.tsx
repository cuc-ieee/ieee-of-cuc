"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { EventMeta } from "@/components/EventMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upcomingEvents, pastEvents } from "@/data/events";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "upcoming" | "past";
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
  if (sortBy === "newest") return sorted.sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));
  if (sortBy === "oldest") return sorted.sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date));
  if (sortBy === "az") return sorted.sort((a, b) => a.title.localeCompare(b.title));
  return sorted.sort((a, b) => b.title.localeCompare(a.title));
};

const allCategories = Array.from(
  new Set(
    [...upcomingEvents, ...pastEvents].flatMap((e) => e.category ?? []),
  ),
).sort();

export default function EventsContent() {
  const [tab, setTab] = useState<Tab>(
    upcomingEvents.length > 0 ? "upcoming" : "past",
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [category, setCategory] = useState<string>("all");

  const visibleEvents = useMemo(() => {
    const pool = tab === "upcoming" ? upcomingEvents : pastEvents;
    const filtered =
      category === "all"
        ? pool
        : pool.filter((e) => (e.category ?? []).includes(category));
    return sortEvents(filtered, sortBy);
  }, [tab, sortBy, category]);

  const featured = visibleEvents.find((e) => e.featured) ?? visibleEvents[0];
  const rest = visibleEvents.filter((e) => e !== featured);

  return (
    <>
      <PageHero
        index="00"
        eyebrow="Programme"
        title={
          <>
            Events, <span className="font-serif italic text-blue">on record.</span>
          </>
        }
        lede="Workshops, competitions, industry visits, and webinars — the branch's programme, past and present. Every event here actually happened, organised by students."
        meta={
          <>
            <span>{pastEvents.length + upcomingEvents.length} events on record</span>
            <span>Upcoming · Past</span>
          </>
        }
      />

      {/* Controls */}
      <section className="border-b border-line-soft bg-background">
        <Container className="py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Tab toggle */}
            <div
              role="tablist"
              aria-label="Filter events by status"
              className="inline-flex w-fit border border-line bg-surface p-1"
            >
              {(["upcoming", "past"] as Tab[]).map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "px-5 py-2 text-sm font-medium transition-colors duration-300",
                    tab === t
                      ? "bg-blue text-primary-foreground"
                      : "text-ink-muted hover:text-ink-strong",
                  )}
                >
                  {t === "upcoming" ? "Upcoming" : "Past"}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex flex-wrap items-center gap-3">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="h-10 w-full border-line bg-surface text-ink-strong sm:w-[190px]">
                  <SelectValue placeholder="Sort events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="az">A — Z</SelectItem>
                  <SelectItem value="za">Z — A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors duration-300",
                category === "all"
                  ? "border-blue bg-blue/10 text-blue"
                  : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink-strong",
              )}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors duration-300",
                  category === cat
                    ? "border-blue bg-blue/10 text-blue"
                    : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink-strong",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Listings */}
      <section className="bg-surface-deep">
        <Container className="py-16 sm:py-20">
          {visibleEvents.length === 0 ? (
            <div className="mx-auto max-w-xl py-20 text-center">
              <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-blue">
                Empty archive
              </p>
              <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-ink-strong">
                {tab === "upcoming"
                  ? "Nothing scheduled in this category yet."
                  : "No past events here yet."}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-muted">
                {tab === "upcoming"
                  ? "When the next workshop, competition, or industry visit is confirmed, it will appear here. Check the branch's social channels for announcements."
                  : "Events in this category will be archived here once they conclude."}
              </p>
              {category !== "all" && (
                <button
                  onClick={() => setCategory("all")}
                  className="mt-8 border border-line-strong px-5 py-2.5 text-sm text-ink-strong transition-colors hover:border-blue hover:text-blue"
                >
                  Clear category filter
                </button>
              )}
            </div>
          ) : tab === "upcoming" && featured ? (
            <>
              {/* Featured upcoming */}
              <Reveal>
                <article className="group grid overflow-hidden border border-line bg-surface lg:grid-cols-12">
                  <div className="relative overflow-hidden lg:col-span-7">
                    <div className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="img-duotone h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5">
                    <p className="eyebrow mb-4 flex items-center gap-2">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
                      Next up
                    </p>
                    <h2 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink-strong sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {featured.description}
                    </p>
                    <EventMeta event={featured} className="mt-6" />
                    {featured.category && featured.category.length > 0 && (
                      <p className="mt-3 text-[0.6875rem] uppercase tracking-widest text-ink-faint">
                        {featured.category.join(" · ")}
                      </p>
                    )}
                    <div className="mt-8">
                      <a
                        href={`/events/${featured.slug}`}
                        className="group/link inline-flex items-center gap-2 text-sm font-medium text-blue transition-colors hover:text-blue-bright"
                      >
                        Event details
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>

              <Stagger className="mt-6 border-t border-line-soft">
                {rest.map((event) => (
                  <StaggerItem key={event.slug}>
                    <a
                      href={`/events/${event.slug}`}
                      className="group grid grid-cols-1 items-center gap-2 border-b border-line-soft py-6 transition-colors duration-300 hover:bg-surface sm:grid-cols-[11rem_1fr_auto] sm:gap-6"
                    >
                      <span className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-faint">
                        {event.date}
                      </span>
                      <span>
                        <span className="block font-display text-lg font-medium tracking-tight text-ink-strong transition-colors group-hover:text-blue sm:text-xl">
                          {event.title}
                        </span>
                        {event.category && event.category.length > 0 && (
                          <span className="mt-1 block text-xs uppercase tracking-wider text-ink-faint">
                            {event.category.join(" · ")}
                          </span>
                        )}
                      </span>
                      <ArrowUpRight
                        className="hidden h-5 w-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue sm:block"
                        aria-hidden
                      />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </>
          ) : (
            /* Past — editorial list with imagery */
            <Stagger>
              {visibleEvents.map((event) => (
                <StaggerItem key={event.slug}>
                  <a
                    href={`/events/${event.slug}`}
                    className="group grid gap-6 border-b border-line py-8 transition-colors duration-300 hover:bg-surface lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-12 lg:py-10"
                  >
                    <div className="relative overflow-hidden border border-line bg-surface">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="img-duotone aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <span className="font-mono text-[0.75rem] uppercase tracking-wider text-blue">
                          {event.date}
                        </span>
                        {event.category && event.category.length > 0 && (
                          <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-faint">
                            {event.category.join(" · ")}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink-strong transition-colors group-hover:text-blue sm:text-3xl">
                        {event.title}
                      </h2>
                      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-ink-muted sm:text-base">
                        {event.description}
                      </p>
                      <EventMeta event={event} className="mt-5" />
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </section>
    </>
  );
}