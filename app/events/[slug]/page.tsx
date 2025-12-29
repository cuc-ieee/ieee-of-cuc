import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allEvents } from "@/data/events";
import EventDetailContent from "./EventDetailContent";

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static pages for all events at build time (SSG)
export async function generateStaticParams() {
  return allEvents.map((event) => ({
    slug: event.slug,
  }));
}

// Generate metadata for each event page (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = allEvents.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = allEvents.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}
