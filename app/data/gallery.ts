export interface GalleryEvent {
  id: string;
  title: string;
  slug: string;
  images: string[];
}

export const galleryEvents: GalleryEvent[] = [
  {
    id: "1",
    title: "3 Minute Research Challenge",
    slug: "3-minute-research-challenge",
    images: [
      "3_vvbw8x",
      "3mrc/2",
      "3mrc/3",
    ],
  },
  {
    id: "2",
    title: "Annual Greet Meet",
    slug: "annual-greet-meet",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    ],
  },
];
