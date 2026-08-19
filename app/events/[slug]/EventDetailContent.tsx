"use client";

import { Container } from "@/components/Container";
import { EventMeta } from "@/components/EventMeta";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { Event } from "@/data/events";
import { pastEvents, upcomingEvents } from "@/data/events";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Props {
  event: Event;
}

export default function EventDetailContent({ event }: Props) {
  const descriptionParagraphs = Array.isArray(event.fullDescription)
    ? event.fullDescription
    : [event.fullDescription || event.description];

  const related = [...upcomingEvents, ...pastEvents]
    .filter((e) => e.slug !== event.slug)
    .filter((e) => (e.category ?? []).some((c) => (event.category ?? []).includes(c)))
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <div className="relative h-[42vh] min-h-[20rem] w-full sm:h-[54vh]">
          <img
            src={event.image}
            alt=""
            className="img-duotone absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" aria-hidden />
        </div>

        <Container className="relative -mt-16 pb-14 sm:-mt-24 sm:pb-20">
          <Reveal>
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink-strong"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to events
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              {event.category?.map((cat) => (
                <span
                  key={cat}
                  className="font-mono text-[0.6875rem] uppercase tracking-widest text-blue"
                >
                  {cat}
                </span>
              ))}
              {event.isPast && (
                <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-faint">
                  Past event
                </span>
              )}
            </div>

            <h1 className="mt-4 max-w-[22ch] font-display text-3xl font-medium leading-[1.05] tracking-tight text-ink-strong sm:text-5xl">
              {event.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-6">
              <EventMeta event={event} />
              {event.participation && (
                <p className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-faint">
                  For: {event.participation}
                </p>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-surface-deep">
        <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
          {/* Description */}
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-6">About this event</p>
            </Reveal>
            <div className="space-y-5">
              {descriptionParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.06}>
                  <p className="max-w-[62ch] text-base leading-relaxed text-ink-muted sm:text-lg sm:leading-[1.75]">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {event.outcomes && event.outcomes.length > 0 && (
              <div className="mt-12 border-t border-line pt-10">
                <Reveal>
                  <p className="eyebrow mb-6">Outcomes</p>
                </Reveal>
                <ul className="space-y-4">
                  {event.outcomes.map((outcome, index) => (
                    <Reveal key={index} delay={index * 0.05}>
                      <li className="flex items-start gap-3">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-blue" aria-hidden />
                        <span className="text-base leading-relaxed text-ink-strong">
                          {outcome}
                        </span>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {!event.isPast && (
                <Reveal>
                  <div className="border border-line bg-surface p-7">
                    <p className="eyebrow mb-3">Registration</p>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      Reserve a place before seats fill.
                    </p>
                    {event.registrationLink ? (
                      <Button asChild className="mt-6 w-full" size="lg">
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Register for event
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button size="lg" className="mt-6 w-full" disabled>
                        Registration opens soon
                      </Button>
                    )}
                    {event.registrationClosingDate && (
                      <p className="mt-4 text-xs text-ink-faint">
                        Closes {event.registrationClosingDate}
                      </p>
                    )}
                  </div>
                </Reveal>
              )}

              <Reveal delay={0.1}>
                <dl className="mt-6 border-t border-line">
                  {event.date && (
                    <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                      <dt className="eyebrow">Date</dt>
                      <dd className="text-right text-sm font-medium text-ink-strong">
                        {event.date}
                      </dd>
                    </div>
                  )}
                  {event.time && (
                    <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                      <dt className="eyebrow">Time</dt>
                      <dd className="text-right text-sm font-medium text-ink-strong">
                        {event.time}
                      </dd>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                      <dt className="eyebrow">Venue</dt>
                      <dd className="text-right text-sm font-medium text-ink-strong">
                        {event.location}
                      </dd>
                    </div>
                  )}
                  {event.participation && (
                    <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                      <dt className="eyebrow">Audience</dt>
                      <dd className="text-right text-sm font-medium text-ink-strong">
                        {event.participation}
                      </dd>
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                      <dt className="eyebrow">Capacity</dt>
                      <dd className="text-right text-sm font-medium text-ink-strong">
                        {event.capacity} seats
                      </dd>
                    </div>
                  )}
                </dl>
              </Reveal>

              {event.speakers && event.speakers.length > 0 && (
                <Reveal delay={0.18}>
                  <div className="mt-6 border-t border-line pt-6">
                    <p className="eyebrow mb-5">Speakers</p>
                    <ul className="space-y-5">
                      {event.speakers.map((speaker) => (
                        <li key={speaker.name} className="flex items-start gap-4">
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue/40 bg-blue/10 font-display text-base font-medium text-blue">
                            {speaker.name.charAt(0)}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-ink-strong">
                              {speaker.name}
                            </p>
                            <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                              {speaker.role}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </aside>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line-soft bg-background">
          <Container className="py-16 sm:py-20">
            <Reveal className="mb-8 flex items-end justify-between gap-6">
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink-strong sm:text-3xl">
                Related <span className="font-serif italic text-blue">events</span>
              </h2>
              <Link
                href="/events"
                className="hidden items-center gap-1.5 text-sm font-medium text-blue transition-colors hover:text-blue-bright sm:inline-flex"
              >
                All events
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
            <Stagger className="border-t border-line-soft">
              {related.map((item) => (
                <StaggerItem key={item.slug}>
                  <a
                    href={`/events/${item.slug}`}
                    className="group grid grid-cols-1 items-center gap-2 border-b border-line-soft py-6 transition-colors duration-300 hover:bg-surface sm:grid-cols-[11rem_1fr_auto] sm:gap-6"
                  >
                    <span className="font-mono text-[0.75rem] uppercase tracking-wider text-ink-faint">
                      {item.date}
                    </span>
                    <span className="font-display text-lg font-medium tracking-tight text-ink-strong transition-colors group-hover:text-blue sm:text-xl">
                      {item.title}
                    </span>
                    <ArrowUpRight
                      className="hidden h-5 w-5 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue sm:block"
                      aria-hidden
                    />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}
    </>
  );
}