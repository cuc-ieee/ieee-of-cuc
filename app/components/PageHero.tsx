import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  index,
  title,
  lede,
  meta,
  children,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  meta?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[76rem] px-5 pb-14 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-40">
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
            <p
              className={cn(
                "mt-6 max-w-[56ch] text-base leading-relaxed text-ink-muted sm:text-lg",
              )}
            >
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
    </section>
  );
}