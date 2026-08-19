import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLink } from "@/components/ArrowLink";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
  {
    title: "IEEE Xplore",
    detail: "The full technical literature library — millions of papers.",
  },
  {
    title: "Global network",
    detail: "400,000+ members across 160 countries, including IEEE Sri Lanka Section.",
  },
  {
    title: "Career & learning",
    detail: "Certifications, conference discounts, and a curated job board.",
  },
  {
    title: "Branch programmes",
    detail: "Early access to workshops, industry visits, and competitions.",
  },
];

export function MembershipSection() {
  return (
    <section className="border-t border-line-soft bg-surface-deep">
      <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
        <div>
          <SectionHeading
            index="05"
            eyebrow="Membership"
            title={
              <>
                Join the <span className="font-serif italic text-blue">branch.</span>
              </>
            }
            description="Membership means access to IEEE's global resources — and a place in a local community that ships real work."
            rule={false}
          />

          <Stagger className="-mt-2">
            {benefits.map((benefit, i) => (
              <StaggerItem key={benefit.title} className="border-b border-line-soft py-5 first:border-t">
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium tracking-tight text-ink-strong">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-ink-muted">
                      {benefit.detail}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-9">
            <p className="max-w-[52ch] text-sm leading-relaxed text-ink-muted">
              Our branch is part of the IEEE Sri Lanka Section and the worldwide
              IEEE community — the world&rsquo;s largest technical professional
              organization.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Button asChild size="lg">
                <Link href="/membership">Become a member</Link>
              </Button>
              <ArrowLink
                href="/MembershipPage/IEEEStudentMembershipGuide.pdf"
                external
              >
                Student membership guide
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        {/* Composed panel */}
        <Reveal delay={0.15} className="lg:pl-6">
          <div className="relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden border border-line bg-[linear-gradient(150deg,hsl(210_85%_30%/0.55),hsl(224_45%_6%_/0.6))] p-8 sm:p-12">
            <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="relative">
              <p className="eyebrow">Founded 1884 · A global community</p>
              <p className="mt-6 font-orbitron text-[clamp(3.5rem,10vw,6rem)] font-bold leading-none text-blue">
                IEEE
              </p>
            </div>
            <div className="relative mt-10">
              <p className="max-w-[30ch] font-display text-xl font-medium leading-snug text-ink-strong">
                The Institute of Electrical and Electronics Engineers.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                The world&rsquo;s largest technical professional organization,
                advancing technology for humanity — and the network our branch
                belongs to.
              </p>
              <div className="mt-7">
                <ArrowLink href="https://www.ieee.org" external>
                  About IEEE
                </ArrowLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}