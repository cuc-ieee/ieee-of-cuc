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
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
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
