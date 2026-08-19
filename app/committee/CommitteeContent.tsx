"use client";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { committeeMembers } from "@/data/committee";
import { site } from "@/data/site";
import { Linkedin, Mail } from "lucide-react";

const leads = committeeMembers.filter((m) =>
  ["Chair", "Vice Chair"].includes(m.role),
);
const officers = committeeMembers.filter(
  (m) => !["Chair", "Vice Chair"].includes(m.role),
);

export default function CommitteeContent() {
  return (
    <>
      <PageHero
        index="00"
        eyebrow="Leadership"
        title={
          <>
            The executive <span className="font-serif italic text-blue">committee.</span>
          </>
        }
        lede="Twelve engineering students run the branch — every workshop, industry visit, and competition is organised by this team, for the membership."
        meta={
          <>
            <span>{committeeMembers.length} committee members</span>
            <span>Mechatronics · Electrical & Electronic Engineering</span>
          </>
        }
        media={site.pageHero.committee}
      />

      {/* Leadership */}
      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="py-16 sm:py-24">
          <Reveal className="mb-10 flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] text-blue">01</span>
            <span className="eyebrow">At the helm</span>
          </Reveal>

          <Stagger className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {leads.map((member) => (
              <StaggerItem key={member.email}>
                <div className="group grid overflow-hidden border border-line bg-surface sm:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role} of IEEE Student Branch of Curtin Colombo`}
                      className="img-duotone aspect-[4/5] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-between p-7 sm:p-8">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-blue">
                        {member.role}
                      </p>
                      <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink-strong sm:text-3xl">
                        {member.name}
                      </h2>
                      <p className="mt-2 text-sm text-ink-muted">{member.department}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s LinkedIn`}
                          className="flex h-10 w-10 items-center justify-center border border-line text-ink-muted transition-colors hover:border-blue hover:text-blue"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        className="flex h-10 w-10 items-center justify-center border border-line text-ink-muted transition-colors hover:border-blue hover:text-blue"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Officers */}
      <section className="border-b border-line-soft bg-background">
        <Container className="py-16 sm:py-24">
          <Reveal className="mb-10 flex items-center gap-3">
            <span className="font-mono text-[0.6875rem] text-blue">02</span>
            <span className="eyebrow">Officers</span>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
            {officers.map((member) => (
              <StaggerItem key={member.email}>
                <a
                  href={member.linkedin || `mailto:${member.email}`}
                  target={member.linkedin ? "_blank" : undefined}
                  rel={member.linkedin ? "noopener noreferrer" : undefined}
                  className="group block"
                  aria-label={`${member.name}, ${member.role} — open profile`}
                >
                  <div className="relative overflow-hidden border border-line bg-surface">
                    <img
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      className="img-duotone aspect-[4/5] w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                  </div>
                  <div className="mt-4">
                    <p className="font-display text-base font-medium tracking-tight text-ink-strong transition-colors group-hover:text-blue sm:text-lg">
                      {member.name}
                    </p>
                    <p className="mt-0.5 text-[0.8125rem] text-blue">{member.role}</p>
                    <p className="mt-1 text-xs text-ink-muted">{member.department}</p>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}