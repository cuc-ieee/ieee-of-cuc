import { getCloudinaryUrl } from "@/lib/cloudinary";

/**
 * Site content — images, captions and layout options live here so the
 * pictures (and the containers that hold them) can be swapped in one place.
 *
 * Cloudinary helper: use `cloud("publicId", width)` for gallery images.
 * Local files: use a path like "/events/3mrc/hero.jpg".
 */
const cloud = (id: string, w = 1000) => getCloudinaryUrl(id, { width: w });

export const site = {
  /* ------------------------------------------------------------------ */
  /* Organisation                                                       */
  /* ------------------------------------------------------------------ */
  org: {
    name: "IEEE Student Branch of Curtin Colombo",
    shortName: "IEEE · CUC",
    coordinates: "6.9186° N · 79.8494° E",
    location: "No. 80 Nawam Mawatha, Colombo 02, Sri Lanka",
    campus: "Curtin University Colombo Campus",
    email: "curtincolombo.ieee@gmail.com",
    phone: "+94 72 792 2261",
    phoneNote: "Secretary of the branch",
  },

  social: [
    { label: "Instagram", href: "https://www.instagram.com/ieee.cuc" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all" },
    { label: "Facebook", href: "https://www.facebook.com/share/18JZ8M3B7p/" },
    { label: "YouTube", href: "https://www.youtube.com/@IEEECUC" },
    { label: "WhatsApp", href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ" },
  ],

  /* ------------------------------------------------------------------ */
  /* Page hero media — the image panel on the right of each page intro.  */
  /* Swap the `src`, `alt` and `caption`; tweak `aspect` for the frame.  */
  /* ------------------------------------------------------------------ */
  pageHero: {
    about: {
      src: cloud("2_sbi9nw"),
      alt: "Students and judges during the 3 Minute Research Challenge",
      caption: "3MRC — the inter-university research pitch",
      aspect: "aspect-[4/3] lg:aspect-[4/3]",
    },
    events: {
      src: "/Events/plcfi/hero.jpg",
      alt: "Students working with Siemens PLC hardware at the PLCFI workshop",
      caption: "PLCFI — hands-on with industrial automation",
      aspect: "aspect-[4/3] lg:aspect-[4/3]",
    },
    gallery: {
      src: cloud("1_wawox1"),
      alt: "Photographs from the 3 Minute Research Challenge",
      caption: "From the 3MRC archive",
      aspect: "aspect-[4/3] lg:aspect-[4/3]",
    },
    committee: {
      src: "/Aboutus/Excom.jpg",
      alt: "The executive committee of IEEE Student Branch of Curtin Colombo together",
      caption: "The executive committee · 2026",
      aspect: "aspect-[4/3] lg:aspect-[4/3]",
    },
    contact: {
      src: cloud("1_grretx"),
      alt: "Members gathered at the Annual General Meeting",
      caption: "Annual General Meeting, November 2025",
      aspect: "aspect-[4/3] lg:aspect-[4/3]",
    },
    membership: {
      src: cloud("IMG_5468_ugcalo"),
      alt: "Participants working during the DetectX computer vision workshop",
      caption: "DetectX — AI & computer vision in practice",
      aspect: "aspect-[4/3] lg:aspect-[4/3]",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Homepage                                                             */
  /* ------------------------------------------------------------------ */
  home: {
    hero: {
      primary: {
        src: "/events/3mrc/hero.jpg",
        alt: "Students presenting at the 3 Minute Research Challenge hosted by IEEE Student Branch of Curtin Colombo",
      },
      secondary: {
        src: "/Events/plcfi/hero.jpg",
        alt: "Hands-on PLC industrial automation workshop at Curtin University Colombo",
      },
      caption: "3MRC · Jan 2026",
    },
    gallery: {
      tiles: [
        {
          src: cloud("IMG_5468_ugcalo", 900),
          label: "DetectX — AI & Computer Vision",
          meta: "Workshop · 2026",
          tall: true,
        },
        {
          src: cloud("1_wawox1", 900),
          label: "3 Minute Research Challenge",
          meta: "Inter-university",
        },
        {
          src: cloud("1_z9ktxf", 900),
          label: "PLCFI — Industrial Automation",
          meta: "With SLIR",
        },
      ],
    },
  },
};