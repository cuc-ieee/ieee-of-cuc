import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ArrowLink } from "@/components/ArrowLink";
import { Reveal } from "@/components/Reveal";
import { getCloudinaryUrl } from "@/lib/cloudinary";
import { galleryEvents } from "@/data/gallery";

const tiles = [
  {
    src: getCloudinaryUrl("IMG_5468_ugcalo", { width: 900 }),
    label: "DetectX — AI & Computer Vision",
    meta: "Workshop · 2026",
    className: "col-span-2 row-span-2",
  },
  {
    src: getCloudinaryUrl("1_wawox1", { width: 900 }),
    label: "3 Minute Research Challenge",
    meta: "Inter-university",
    className: "aspect-[4/3]",
  },
  {
    src: getCloudinaryUrl("1_z9ktxf", { width: 900 }),
    label: "PLCFI — Industrial Automation",
    meta: "With SLIR",
    className: "aspect-[4/3]",
  },
];

export function GalleryPreview() {
  return (
    <section className="border-t border-line-soft bg-background">
      <Container className="py-20 sm:py-28 lg:py-32">
        <SectionHeading
          index="04"
          eyebrow="Archive"
          title={
            <>
              The branch, <span className="font-serif italic text-blue">in frames.</span>
            </>
          }
          description="Photographs from our workshops, competitions, and gatherings — the actual work, documented."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <Reveal
              key={tile.label}
              delay={i * 0.08}
              className={`group relative overflow-hidden ${tile.className}`}
            >
              <a href="/gallery" className="block h-full" aria-label={`Open gallery — ${tile.label}`}>
                <img
                  src={tile.src}
                  alt={`${tile.label} — photograph from IEEE Curtin University Colombo`}
                  className="img-duotone h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/85 via-surface-deep/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-mono text-[0.625rem] uppercase tracking-widest2 text-ink-faint">
                    {tile.meta}
                  </p>
                  <p className="mt-1 font-display text-sm font-medium text-ink-strong sm:text-base">
                    {tile.label}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.24} className="relative col-span-2 flex items-center justify-center border border-line-soft bg-surface lg:col-span-2">
            <a href="/gallery" className="group flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-blue">
                Full archive
              </span>
              <span className="font-display text-4xl font-medium tracking-tight text-ink-strong transition-colors group-hover:text-blue">
                {galleryEvents.length}
              </span>
              <span className="text-xs text-ink-muted">
                events · {galleryEvents.reduce((n, e) => n + e.images.length, 0)}{" "}
                photographs
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex justify-end">
          <ArrowLink href="/gallery">Visit the gallery</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}