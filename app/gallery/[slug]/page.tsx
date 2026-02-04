import { galleryEvents } from "@/data/gallery";
import { notFound } from "next/navigation";
import EventGalleryContent from "./EventGalleryContent";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = galleryEvents.find((e) => e.slug === params.slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} - Gallery`,
    description: `Browse photos from the ${event.title} event.`,
  };
}

export default function EventGalleryPage({ params }: { params: { slug: string } }) {
  const event = galleryEvents.find((e) => e.slug === params.slug);

  if (!event) {
    notFound();
  }

  return <EventGalleryContent event={event} />;
}

export async function generateStaticParams() {
  return galleryEvents.map((event) => ({
    slug: event.slug,
  }));
}
