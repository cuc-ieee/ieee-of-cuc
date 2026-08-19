"use client";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { galleryEvents } from "@/data/gallery";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GalleryContent() {
  return (
    <>
      <PageHero
        index="00"
        eyebrow="Archive"
        title={
          <>
            The gallery, <span className="font-serif italic text-blue">on record.</span>
          </>
        }
        lede="Photographs from the branch's events — competitions, workshops, and gatherings. Every image is from a real IEEE Curtin University Colombo event."
        meta={
          <>
            <span>{galleryEvents.length} event archives</span>
            <span>
              {galleryEvents.reduce((n, e) => n + e.images.length, 0)} photographs
            </span>
          </>
        }
      />

      <section className="border-t border-line-soft bg-surface-deep">
        <Container className="py-16 sm:py-24">
          <Stagger>
            {galleryEvents.map((event, eventIndex) => {
              const images = event.images.slice(0, 3);
              const flip = eventIndex % 2 === 1;
              return (
                <StaggerItem
                  key={event.slug}
                  className="border-b border-line py-10 first:border-t sm:py-14"
                >
                  <a
                    href={`/gallery/${event.slug}`}
                    className={cn(
                      "group grid gap-8 lg:grid-cols-12 lg:gap-14",
                      flip && "lg:[&>*:first-child]:order-2",
                    )}
                  >
                    {/* Collage */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-8 overflow-hidden border border-line bg-surface">
                          <img
                            src={
                              event.heroImage?.startsWith("/")
                                ? event.heroImage
                                : getCloudinaryUrl(images[0] ?? event.images[0], { width: 1000 })
                            }
                            alt={`${event.title} — lead photograph`}
                            className="img-duotone aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        </div>
                        <div className="col-span-4 grid grid-rows-2 gap-3">
                          {(images[1] || images[0]) && (
                            <div className="overflow-hidden border border-line bg-surface">
                              <img
                                src={getCloudinaryUrl(images[1] ?? images[0], { width: 600 })}
                                alt={`${event.title} — photograph two`}
                                className="img-duotone aspect-square h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                loading="lazy"
                              />
                            </div>
                          )}
                          {(images[2] || images[0]) && (
                            <div className="overflow-hidden border border-line bg-surface">
                              <img
                                src={getCloudinaryUrl(images[2] ?? images[0], { width: 600 })}
                                alt={`${event.title} — photograph three`}
                                className="img-duotone aspect-square h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="flex flex-col justify-center lg:col-span-5">
                      <p className="font-mono text-xs text-blue">
                        Archive 0{eventIndex + 1}
                      </p>
                      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink-strong transition-colors group-hover:text-blue sm:text-4xl">
                        {event.title}
                      </h2>
                      <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-wider text-ink-faint">
                        {event.images.length} photographs
                      </p>
                      <span className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-medium text-blue">
                        Open gallery
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>
    </>
  );
}