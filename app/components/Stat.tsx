import { Reveal } from "./Reveal";

export function Stat({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index?: string;
}) {
  return (
    <Reveal className="border-t border-line pt-6">
      {index && (
        <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-widest text-ink-faint">
          {index}
        </p>
      )}
      <p className="font-display text-4xl font-medium tracking-tight text-ink-strong sm:text-5xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-snug text-ink-muted">{label}</p>
    </Reveal>
  );
}