"use client";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLink } from "@/components/ArrowLink";
import { Stat } from "@/components/Stat";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pastEvents } from "@/data/events";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { value: "2025", label: "Branch founded at Curtin University Colombo" },
  { value: "16", label: "Events in the first year of operation" },
  { value: "3", label: "Flagship series — TechXChange, Gear Up, Challenge Sphere" },
  { value: "400K+", label: "Engineers in the IEEE network worldwide" },
];

const values = [
  {
    title: "Global network",
    detail:
      "Affiliated with the IEEE Sri Lanka Section and the worldwide IEEE community of 400,000+ professionals across 160 countries.",
  },
  {
    title: "Practice over theory",
    detail:
      "Hands-on workshops in AI, robotics, IoT, and industrial automation — learning by building, not by watching.",
  },
  {
    title: "Excellence",
    detail:
      "Developing well-rounded professionals through workshops, competitions, and real-world project experience.",
  },
  {
    title: "Community",
    detail:
      "Connecting students with industry professionals, researchers, and each other — in Colombo and beyond.",
  },
];

function milestoneDate(m: { date: string }) {
  const match = m.date.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (!match) return "";
  return `${match[2]} ${match[1]} ${match[3]}`;
}

export default function AboutContent() {
  const timeline = [...pastEvents]
    .sort(
      (a, b) =>
        new Date(milestoneDate(a)).getTime() - new Date(milestoneDate(b)).getTime(),
    )
    .slice(0, 8);

  return (
    <>
      <PageHero
        index="00"
        eyebrow="About the branch"
        title={
          <>
            A student branch,
            <br />
            <span className="font-serif italic text-blue">built in Colombo.</span>
          </>
        }
        lede="The IEEE Student Branch of Curtin University Colombo is a student-led engineering community that runs workshops, industry visits, webinars, and national competitions — grounded in Sri Lanka and connected to the world."
        meta={
          <>
            <span>Founded 2025</span>
            <span>IEEE Sri Lanka Section</span>
            <span>Curtin University Colombo</span>
          </>
        }
      />

      {/* Story */}
      <section className="border-b border-line-soft bg-background">
        <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-blue">01</span>
                <span className="eyebrow">Origins</span>
              </div>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink-strong sm:text-4xl">
                Between the classroom and the industry floor.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 lg:pl-10">
            <Reveal delay={0.1}>
              <p className="max-w-[58ch] text-lg leading-relaxed text-ink-strong sm:text-xl">
                We are the IEEE student branch at Curtin University Colombo.
                We formed in 2025 with a simple conviction: engineering students
                learn fastest when they work on real machines, real problems,
                and real projects — with real engineers in the room.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-6 grid max-w-[58ch] gap-6">
                <p className="text-base leading-relaxed text-ink-muted">
                  Since then, members have programmed Siemens PLCs in a workshop
                  with the Sri Lanka Institute of Robotics, pitched research in
                  an inter-university competition, visited the country&rsquo;s
                  largest shipyard, and joined webinars with researchers from
                  Imperial College London — all organised by students, for
                  students.
                </p>
                <p className="text-base leading-relaxed text-ink-muted">
                  Our three flagship series carry the branch:{" "}
                  <span className="text-ink-strong">TechXChange</span> (expert
                  talks), <span className="text-ink-strong">Gear Up</span>{" "}
                  (industry visits), and{" "}
                  <span className="text-ink-strong">Challenge Sphere</span>{" "}
                  (national competitions such as the Chips Challenge).
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <blockquote className="mt-9 border-l-2 border-blue pl-6">
                <p className="font-display text-xl font-medium leading-snug text-ink-strong sm:text-2xl">
                  &ldquo;A serious student technology organization doesn&rsquo;t
                  wait to be taught — it builds the classroom it wants.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Purpose — mission & vision */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            index="02"
            eyebrow="Purpose"
            title="Why the branch exists"
            rule={false}
          />
          <div className="grid gap-0 lg:grid-cols-2">
            <Reveal className="border-t border-line py-8 lg:pr-12">
              <p className="eyebrow mb-4">Mission</p>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink-strong sm:text-3xl">
                To foster technological innovation and excellence for the benefit
                of humanity, while creating meaningful opportunities for students
                at Curtin University Colombo.
              </p>
            </Reveal>
            <Reveal delay={0.12} className="border-t border-line py-8 lg:border-l lg:pl-12">
              <p className="eyebrow mb-4">Vision</p>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink-strong sm:text-3xl">
                To become one of Sri Lanka&rsquo;s leading student technical
                organizations — nurturing future leaders in engineering and
                technology.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="border-b border-line-soft bg-background">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Stat
                key={stat.label}
                index={`0${i + 1}`}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            index="04"
            eyebrow="Timeline"
            title={
              <>
                The first year, <span className="font-serif italic text-blue">in order.</span>
              </>
            }
            description="Eight milestones from the branch's opening year — drawn from the events archive."
          />
          <ol className="relative border-l border-line pl-8 sm:pl-12">
            {timeline.map((event) => (
              <li key={event.slug} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-8 top-1.5 flex h-3 w-3 items-center justify-center sm:-left-12"
                  aria-hidden
                >
                  <span className="h-2.5 w-2.5 rounded-full border border-blue bg-background" />
                </span>
                <Reveal>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
                    <span className="w-28 shrink-0 font-mono text-[0.75rem] uppercase tracking-wider text-blue">
                      {milestoneDate(event)}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-medium tracking-tight text-ink-strong">
                        {event.title}
                      </h3>
                      <p className="mt-1 max-w-[58ch] text-sm leading-relaxed text-ink-muted">
                        {event.description}
                      </p>
                      {event.category && event.category.length > 0 && (
                        <p className="mt-2 text-[0.6875rem] uppercase tracking-widest text-ink-faint">
                          {event.category.join(" · ")}
                        </p>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Committee preview */}
      <section className="border-b border-line-soft bg-background">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <div className="relative overflow-hidden border border-line bg-surface">
              <img
                src="/Aboutus/Excom.jpg"
                alt="The executive committee of IEEE Curtin University Colombo together"
                className="img-duotone aspect-[16/9] w-full object-cover sm:aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute bottom-3 right-3 border border-line/80 bg-background/80 px-3 py-2 backdrop-blur-sm">
                <p className="font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-muted">
                  Executive Committee · 2026
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-blue">05</span>
                <span className="eyebrow">People</span>
              </div>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink-strong sm:text-4xl">
                Run by students, <span className="font-serif italic text-blue">led by students.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink-muted">
                The branch is run by a twelve-person executive committee —
                mechatronics and electrical & electronic engineering students —
                who organise every event, secure every industry partner, and
                keep the community running.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/committee">
                    Meet the committee
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <ArrowLink href="/events">See what we run</ArrowLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            index="06"
            eyebrow="Values"
            title="What we work by"
            rule={false}
          />
          <Stagger className="grid gap-0 sm:grid-cols-2">
            {values.map((value, i) => (
              <StaggerItem
                key={value.title}
                className="border-t border-line py-7 pr-6 sm:odd:pr-10"
              >
                <span className="font-mono text-xs text-blue">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-ink-strong">
                  {value.title}
                </h3>
                <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-ink-muted">
                  {value.detail}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}