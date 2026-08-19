"use client";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLink } from "@/components/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const benefits = [
  {
    title: "IEEE Xplore",
    detail:
      "Full access to the world's largest technical literature database — over 5 million documents.",
  },
  {
    title: "Global network",
    detail:
      "Connect with 400,000+ members across 160 countries and access exclusive events.",
  },
  {
    title: "Certifications",
    detail:
      "Earn industry-recognized certifications and showcase your skills to employers.",
  },
  {
    title: "Career resources",
    detail:
      "Job boards, resume reviews, interview preparation, and career development tools, curated for you.",
  },
  {
    title: "Competitions",
    detail:
      "Hackathons, robotics competitions, and innovation challenges — members get early access.",
  },
  {
    title: "Conferences",
    detail:
      "Discounted access to IEEE conferences, workshops, and symposiums, locally and globally.",
  },
];

const steps = [
  {
    number: "01",
    title: "Visit IEEE.org",
    detail: "Go to ieee.org/membership and select “Join IEEE”.",
  },
  {
    number: "02",
    title: "Choose student membership",
    detail: "Pick the student rate — heavily discounted for full-time students.",
  },
  {
    number: "03",
    title: "Complete registration",
    detail: "Enter your details and select Curtin University Colombo as your institution.",
  },
  {
    number: "04",
    title: "Join the branch",
    detail: "Contact us and we'll add you to local branch activities and events.",
  },
];

export default function MembershipContent() {
  return (
    <>
      <PageHero
        index="00"
        eyebrow="Membership"
        title={
          <>
            Join the <span className="font-serif italic text-blue">branch.</span>
          </>
        }
        lede="IEEE membership opens the world's largest technical community — the branch turns that into workshops, industry visits, and competitions you can actually attend in Colombo."
        meta={
          <>
            <span>IEEE Student rate</span>
            <span>400,000+ members worldwide</span>
            <span>Curtin University Colombo</span>
          </>
        }
      />

      {/* Benefits */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="grid gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-blue">01</span>
                <span className="eyebrow">The value</span>
              </div>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink-strong sm:text-4xl">
                One membership, <br />
                <span className="font-serif italic text-blue">every door.</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-ink-muted">
                Membership is held with IEEE itself — the branch is where that
                membership becomes a community, a schedule of events, and
                hands-on projects.
              </p>
              <div className="mt-8">
                <Button asChild>
                  <Link href="https://www.ieee.org/membership" target="_blank" rel="noopener noreferrer">
                    Apply on IEEE.org
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Stagger className="lg:col-span-8 lg:pt-10">
            <div className="grid gap-x-12 sm:grid-cols-2">
              {benefits.map((benefit, i) => (
                <StaggerItem
                  key={benefit.title}
                  className="border-t border-line py-6 sm:pr-4"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-blue">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-lg font-medium tracking-tight text-ink-strong">
                        {benefit.title}
                      </h3>
                      <p className="mt-1.5 max-w-[42ch] text-sm leading-relaxed text-ink-muted">
                        {benefit.detail}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </Stagger>
        </Container>
      </section>

      {/* How to join */}
      <section className="border-b border-line-soft bg-background">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            index="02"
            eyebrow="Process"
            title={
              <>
                How to <span className="font-serif italic text-blue">join.</span>
              </>
            }
            description="Four steps, about ten minutes. Registration happens on IEEE.org — joining the branch afterwards is just an email."
            rule={false}
          />

          <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 0.08}
                className={cn(
                  "border-t border-line py-7 md:pr-8",
                  i % 2 === 0 ? "md:border-r" : "md:border-r-0",
                  i % 4 !== 3 ? "lg:border-r" : "lg:border-r-0",
                )}
              >
                <p className="font-display text-5xl font-medium text-blue/70">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink-strong">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-ink-muted">
                  {step.detail}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center gap-6 border-t border-line pt-8">
            <p className="max-w-[42ch] text-sm leading-relaxed text-ink-muted">
              Prefer to read it? The branch keeps a printable student membership
              guide.
            </p>
            <Button asChild variant="secondary">
              <Link
                href="/MembershipPage/IEEEStudentMembershipGuide.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the membership guide
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <div className="relative overflow-hidden border border-line bg-[linear-gradient(150deg,hsl(210_85%_28%/0.5),hsl(224_45%_5%/0.7))] px-8 py-14 sm:px-14 sm:py-20">
              <div className="blueprint pointer-events-none absolute inset-0 opacity-50" aria-hidden />
              <div className="relative">
                <p className="eyebrow">Ready when you are</p>
                <h2 className="mt-5 max-w-[22ch] font-display text-3xl font-medium leading-tight tracking-tight text-ink-strong sm:text-5xl">
                  Come build the next year of the branch with us.
                </h2>
                <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-ink-muted">
                  Apply through IEEE.org, then write to us so we can add you to
                  the community. Questions first? The committee inbox is always
                  open.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Button asChild size="lg">
                    <Link href="https://www.ieee.org/membership" target="_blank" rel="noopener noreferrer">
                      Register on IEEE.org
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                  <ArrowLink href="/contact">Talk to the committee</ArrowLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}