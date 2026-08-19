import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  rule = true,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  rule?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3",
          align === "center" && "justify-center",
        )}
      >
        {index && <span className="font-mono text-[0.6875rem] text-blue">{index}</span>}
        <span className="eyebrow">{eyebrow}</span>
        <span className={cn("rule max-w-16 flex-1", align === "center" && "max-w-12")} aria-hidden />
      </div>
      <h2 className="font-display text-3xl font-medium tracking-tight text-ink-strong sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-[52ch] text-base leading-relaxed text-ink-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
      {rule && <span className="mt-8 block h-px w-full bg-line-soft" aria-hidden />}
    </Reveal>
  );
}