"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLink } from "@/components/ArrowLink";
import { EventMeta } from "@/components/EventMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { upcomingEvents, pastEvents, type Event } from "@/data/events";
import { ArrowUpRight } from "lucide-react";

const parseDate = (date: string) => {
  const m = date.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (!m) return 0;
  const d = new Date(`${m[3]} ${m[2]} ${m[1]}`);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
};

function pickProgramme(): Event[] {
  const upcoming = [...upcomingEvents].sort(
    (a, b) => parseDate(a.date) - parseDate(b.date),
  );
  if (upcoming.length > 0) return upcoming;
  const sorted = [...pastEvents].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date),
  );
  const featured =
    sorted.find((e) => !e.image.includes("placeholder")) ?? sorted[0];
  return [featured, ...sorted.filter((e) => e !== featured)];
}

export function EventsSection() {
  const programme = pickProgramme();
  const [featured, ...rest] = programme;
  const showUpcoming = upcomingEvents.length > 0;

  if (!featured) return null;

  return (
    <section className="border-t border-line-soft bg-surface-deep">
      <Container className="py-20 sm:py-28 lg:py-32">
        <SectionHeading
          index="03"
          eyebrow="Programme"
          title={
            <>
              {showUpcoming ? "Upcoming" : "Recent"} events,
              <br />
              <span className="font-serif italic text-blue">in the field.</span>
            </>
          }
          description={
            showUpcoming
              ? "What we have planned next — workshops, competitions and industry sessions across the branch."
              : "A look at the latest from the branch — workshops, industry visits and national competitions."
          }
        />

        {/* Featured */}
        <Reveal>
          <article className="group grid overflow-hidden border border-line bg-surface lg:grid-cols-12">
            <div className="relative overflow-hidden lg:col-span-7">
              <div className="aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[26rem]">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="img-duotone h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/70 via-transparent to-transparent lg:bg-gradient-to-r" aria-hidden />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
              <p className="eyebrow mb-4 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" aria-hidden />
                Featured
              </p>
              <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-ink-strong sm:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                {featured.description}
              </p>
              <EventMeta event={featured} className="mt-6" />
              <div className="mt-8">
                <ArrowLink href={`/events/${featured.slug}`}>Read more</ArrowLink>
              </div>
            </div>
          </article>
        </Reveal>

        {/* List */}
        {rest.length > 0 && (
          <Stagger className="mt-4 border-t border-line-soft">
            {rest.slice(0, 3).map((event) => (
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
                  <ArrowUpRight className="hidden h-5 w-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue sm:block" aria-hidden />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <Reveal className="mt-10 flex items-center justify-between gap-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint">
            {programme.length} events in the archive
          </p>
          <ArrowLink href="/events">View all events</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}