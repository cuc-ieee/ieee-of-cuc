import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="vignette pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto w-full max-w-[76rem] px-5 sm:px-8 lg:px-10">
        <p className="eyebrow">404 — Not found</p>
        <h1 className="mt-6 font-orbitron text-[clamp(5rem,20vw,12rem)] font-bold leading-none text-blue">
          404
        </h1>
        <h2 className="mt-6 max-w-[22ch] font-display text-2xl font-medium leading-tight tracking-tight text-ink-strong sm:text-3xl">
          This page isn&rsquo;t part of the branch archive.
        </h2>
        <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-ink-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Head
          back to the homepage, or browse the events and gallery.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
          </Button>
          <Link href="/events" className="text-sm font-medium text-blue hover:text-blue-bright">
            Explore events
          </Link>
        </div>
      </div>
    </section>
  );
}