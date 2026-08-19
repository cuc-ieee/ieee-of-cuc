"use client";

import { Container } from "@/components/Container";
import { ArrowLink } from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";

const stats = [
  { value: "2025", label: "Branch established at Curtin Colombo" },
  { value: "50+", label: "Active student members" },
  { value: "15+", label: "Events organised in the first year" },
  { value: "3", label: "Programme series — TechXChange, Gear Up, Challenge Sphere" },
];

export function AboutSection() {
  return (
    <section id="identity" className="relative scroll-mt-20 border-t border-line-soft bg-surface-deep">
      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — label */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-blue">01</span>
                <span className="eyebrow">Identity</span>
              </div>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-ink-strong sm:text-4xl">
                A student branch,
                <br />
                <span className="font-serif italic text-blue">built in Colombo.</span>
              </h2>
            </Reveal>
          </div>

          {/* Right — narrative */}
          <div className="lg:col-span-8 lg:pl-10">
            <Reveal delay={0.1}>
              <p className="max-w-[58ch] text-lg leading-relaxed text-ink-strong sm:text-xl">
                We are the IEEE Student Branch of Curtin Colombo —
                a group of engineering students who believe the best way to learn
                technology is to build it, break it, and share it.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-ink-muted">
                Affiliated with the IEEE Sri Lanka Section and the global IEEE
                network, we run workshops in AI, robotics, and industrial
                automation; take students inside Sri Lankan industry; and host
                webinars with researchers and engineers from around the world —
                from Imperial College London to Synopsys Lanka.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <blockquote className="mt-9 border-l-2 border-blue pl-6">
                <p className="font-display text-xl font-medium leading-snug text-ink-strong sm:text-2xl">
                  &ldquo;Between the classroom and the industry floor is a gap —
                  we exist to close it.&rdquo;
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="mt-10">
                <ArrowLink href="/about">The full story</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
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
  );
}