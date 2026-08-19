import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export type PageHeroMedia = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
};

export function PageHero({
  eyebrow,
  index,
  title,
  lede,
  meta,
  media,
  children,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  meta?: React.ReactNode;
  media?: PageHeroMedia;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[76rem] px-5 pb-14 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pb-20 lg:pt-28">
        <div className={cn("grid items-end gap-12 lg:gap-16", media && "lg:grid-cols-12")}>
          <div className={cn(media && "lg:col-span-7")}>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                {index && (
                  <span className="font-mono text-[0.6875rem] text-blue">{index}</span>
                )}
                <span className="eyebrow">{eyebrow}</span>
              </div>
              <h1 className="max-w-[18ch] font-display text-[2.5rem] font-medium leading-[1.05] tracking-tight text-ink-strong sm:text-5xl lg:text-[4rem]">
                {title}
              </h1>
              {lede && (
                <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-ink-muted sm:text-lg">
                  {lede}
                </p>
              )}
              {meta && (
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
                  {meta}
                </div>
              )}
              {children}
            </Reveal>
          </div>

          {media && (
            <Reveal className="lg:col-span-5" delay={0.15}>
              <figure className="relative overflow-hidden border border-line bg-surface">
                <img
                  src={media.src}
                  alt={media.alt}
                  className={cn(
                    "img-duotone h-full w-full object-cover",
                    media.aspect ?? "aspect-[4/3]",
                  )}
                  loading="eager"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-surface-deep/70 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center border border-ink/20 bg-background/80 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 bg-blue" />
                </div>
                {media.caption && (
                  <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
                    <span className="font-mono text-[0.625rem] uppercase leading-relaxed tracking-widest text-ink-strong/90">
                      {media.caption}
                    </span>
                    <span className="h-px flex-1 bg-ink/25" aria-hidden />
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}