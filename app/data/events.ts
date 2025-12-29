export interface Event {
  id?: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string;
  date: string;
  time: string;
  location: string;
  image: string;
  featured?: boolean;
  category?: string;
  type?: string;
  capacity?: number;
  status?: "upcoming" | "past" | "ongoing";
  isPast?: boolean;
  highlights?: string[];
  agenda?: { time: string; activity: string; title?: string }[];
  speakers?: { name: string; role: string; avatar?: string }[];
  registrationLink?: string;
  outcomes?: string[];
  gallery?: string[];
}

export const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "AI & Machine Learning Workshop",
    slug: "ai-ml-workshop",
    description: "Dive deep into the world of artificial intelligence and machine learning. Learn practical applications and hands-on implementation of ML algorithms.",
    date: "15 Jan 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Curtin Colombo Campus, Room 301",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    featured: true,
    category: "Workshop",
    type: "Workshop",
    capacity: 50,
    status: "upcoming",
    isPast: false,
    highlights: [
      "Introduction to Machine Learning fundamentals",
      "Hands-on Python programming with TensorFlow",
      "Real-world AI applications and case studies",
      "Q&A session with industry experts",
    ],
    agenda: [
      { time: "2:00 PM", activity: "Registration & Welcome", title: "Registration & Welcome" },
      { time: "2:15 PM", activity: "Introduction to AI & ML", title: "Introduction to AI & ML" },
      { time: "3:00 PM", activity: "Hands-on Workshop", title: "Hands-on Workshop" },
      { time: "4:15 PM", activity: "Case Studies & Applications", title: "Case Studies & Applications" },
      { time: "4:45 PM", activity: "Q&A Session", title: "Q&A Session" },
    ],
    registrationLink: "#",
  },
  {
    id: "2",
    title: "IoT Hackathon 2026",
    slug: "iot-hackathon-2026",
    description: "24-hour hackathon focused on building innovative IoT solutions. Compete with teams to create smart devices and win exciting prizes.",
    date: "22 Jan 2026",
    time: "9:00 AM - 9:00 AM (Next Day)",
    location: "Curtin Colombo Innovation Lab",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    category: "Hackathon",
    type: "Hackathon",
    capacity: 80,
    status: "upcoming",
    isPast: false,
    highlights: [
      "24-hour coding marathon",
      "Mentorship from industry professionals",
      "Hardware kits provided (Arduino, Raspberry Pi)",
      "Prizes worth over $5000",
    ],
    agenda: [
      { time: "9:00 AM", activity: "Opening Ceremony & Team Formation", title: "Opening Ceremony & Team Formation" },
      { time: "10:00 AM", activity: "Hacking Begins", title: "Hacking Begins" },
      { time: "1:00 PM", activity: "Lunch Break", title: "Lunch Break" },
      { time: "6:00 PM", activity: "Dinner Break", title: "Dinner Break" },
      { time: "12:00 AM", activity: "Midnight Snacks", title: "Midnight Snacks" },
      { time: "7:00 AM", activity: "Breakfast & Final Sprint", title: "Breakfast & Final Sprint" },
      { time: "9:00 AM", activity: "Presentations & Judging", title: "Presentations & Judging" },
    ],
    registrationLink: "#",
  },
  {
    id: "3",
    title: "Career Networking Night",
    slug: "career-networking-night",
    description: "Connect with industry professionals, alumni, and potential employers. Learn about career opportunities in tech and engineering.",
    date: "30 Jan 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Curtin Colombo Auditorium",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
    category: "Networking",
    type: "Networking",
    capacity: 100,
    status: "upcoming",
    isPast: false,
    highlights: [
      "Meet recruiters from leading tech companies",
      "Panel discussion on career development",
      "One-on-one resume reviews",
      "Networking dinner included",
    ],
    registrationLink: "#",
  },
];

export const pastEvents: Event[] = [
  {
    id: "4",
    title: "Robotics Competition 2025",
    slug: "robotics-competition-2025",
    description: "Annual robotics competition where teams designed and built autonomous robots to complete various challenges.",
    date: "15 Dec 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Curtin Colombo Sports Complex",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    category: "Competition",
    type: "Competition",
    status: "past",
    isPast: true,
    highlights: [
      "15 teams participated",
      "Line following and obstacle avoidance challenges",
      "Winner: Team TechBots",
      "Great showcase of innovation",
    ],
  },
  {
    id: "5",
    title: "Web Development Bootcamp",
    slug: "web-dev-bootcamp-2025",
    description: "Comprehensive 3-day bootcamp covering modern web development with React, Node.js, and MongoDB.",
    date: "5 Dec 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Curtin Colombo Computer Labs",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    category: "Bootcamp",
    type: "Bootcamp",
    status: "past",
    isPast: true,
    highlights: [
      "60+ participants attended",
      "Built full-stack web applications",
      "Industry guest speakers",
      "Certificates provided to all attendees",
    ],
  },
  {
    id: "6",
    title: "IEEE Day Celebration 2025",
    slug: "ieee-day-2025",
    description: "Annual IEEE Day celebration with tech talks, demonstrations, and cultural activities.",
    date: "5 Oct 2025",
    time: "8:00 AM - 6:00 PM",
    location: "Curtin Colombo Main Hall",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    category: "Celebration",
    type: "Celebration",
    status: "past",
    isPast: true,
    highlights: [
      "Over 200 attendees",
      "Tech exhibition with 20+ projects",
      "Guest lectures from IEEE members",
      "Cultural performances and games",
    ],
  },
  {
    id: "7",
    title: "Cybersecurity Workshop",
    slug: "cybersecurity-workshop-2025",
    description: "Hands-on workshop on ethical hacking, network security, and cyber defense strategies.",
    date: "20 Nov 2025",
    time: "2:00 PM - 6:00 PM",
    location: "Curtin Colombo IT Lab",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    category: "Workshop",
    type: "Workshop",
    status: "past",
    isPast: true,
    highlights: [
      "Practical penetration testing exercises",
      "Network security best practices",
      "Certification guidance",
      "Industry expert speakers",
    ],
  },
];

export const allEvents: Event[] = [...upcomingEvents, ...pastEvents];
