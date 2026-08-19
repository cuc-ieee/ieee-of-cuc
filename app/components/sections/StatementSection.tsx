import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export function StatementSection() {
  return (
    <section className="border-t border-line-soft bg-background">
      <Container className="py-20 sm:py-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <span className="font-mono text-[0.6875rem] text-blue">02</span>
            <span className="eyebrow">Statement</span>
            <span className="rule max-w-12" aria-hidden />
          </div>
          <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-ink-strong sm:text-4xl lg:text-5xl">
            Advancing technology for humanity —{" "}
            <span className="font-serif italic text-blue">from Colombo.</span>
          </p>
          <p className="mx-auto mt-7 max-w-[46ch] text-base leading-relaxed text-ink-muted">
            The IEEE mission, practiced locally: give students real tools, real
            problems, and real industry exposure — then let them run.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}