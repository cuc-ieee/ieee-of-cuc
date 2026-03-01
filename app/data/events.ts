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
  category?: string[];
  capacity?: number;
  status?: "upcoming" | "past" | "ongoing";
  isPast?: boolean;
  speakers?: { name: string; role: string; avatar?: string }[];
  registrationLink?: string;
  outcomes?: string[];
  gallery?: string[];
  participation?: string;
}

export const upcomingEvents: Event[] = [
  // {
  //   id: "U1",
  //   title: "AI & Machine Learning Workshop",
  //   slug: "ai-ml-workshop",
  //   description: "Dive deep into the world of artificial intelligence and machine learning. Learn practical applications and hands-on implementation of ML algorithms.",
  //   fullDescription: "This workshop offers a comprehensive introduction to the exciting fields of Artificial Intelligence (AI) and Machine Learning (ML). Participants will gain a solid understanding of fundamental concepts, explore real-world applications, and get hands-on experience with popular ML frameworks like TensorFlow. The session is designed for beginners and intermediate learners who want to build a strong foundation in AI/ML. By the end of the workshop, you will be able to understand the entire machine learning workflow, from data preprocessing to model deployment, and you'll have built your first predictive model. Join us to demystify AI and unlock its potential.",
  //   date: "15 Jan 2026",
  //   time: "2:00 PM - 5:00 PM",
  //   participation: "Open to all Curtin University Colombo students",
  //   location: "Curtin University Colombo Campus, Room 301",
  //   image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
  //   featured: true,
  //   category: ["Workshop", "AI/ML"],
  //   capacity: 50,
  //   status: "upcoming",
  //   isPast: false,
  //   registrationLink: "#",
  // },
  // {
  //   id: "2",
  //   title: "IoT Hackathon 2026",
  //   slug: "iot-hackathon-2026",
  //   description: "24-hour hackathon focused on building innovative IoT solutions. Compete with teams to create smart devices and win exciting prizes.",
  //   date: "22 Jan 2026",
  //   time: "9:00 AM - 9:00 AM (Next Day)",
  //   location: "Curtin University Colombo Innovation Lab",
  //   image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
  //   category: ["Hackathon", "IoT"],
  //   capacity: 80,
  //   status: "upcoming",
  //   isPast: false,
  //   registrationLink: "#",
  // },
  // {
  //   id: "U3",
  //   title: "Career Networking Night",
  //   slug: "career-networking-night",
  //   description: "Connect with industry professionals, alumni, and potential employers. Learn about career opportunities in tech and engineering.",
  //   date: "30 Jan 2026",
  //   time: "6:00 PM - 9:00 PM",
  //   location: "Curtin University Colombo Auditorium",
  //   image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80",
  //   category: ["Networking", "Career"],
  //   capacity: 100,
  //   status: "upcoming",
  //   isPast: false,
  //   registrationLink: "#",
  // },
];

export const pastEvents: Event[] = [
  {
    id: "P1",
    title: "3-minute research challenge (3MRC)",
    slug: "3mrc",
    description: "An inter-university competition where students present their research in a 3-minute pitch to an audience of academics, industry leaders, and peers.",
    fullDescription: "This research challenge was an inter-university event where students presented their research in 3 minutes to an audience of academics, industry leaders, and peers, helping them strengthen impactful communication and build professional networks. The event also included two workshops—an introductory session and another led by an academic guest speaker—to support participants in refining their presentations. The final competition was judged by five experts from both industrial and academic fields, and cash prizes were awarded to the top three winners.",
    date: "17 Jan 2026",
    time: "8:30 PM onwards",
    participation: "Inter-university",
    location: "Curtin University Colombo, Room LT105",
    image: "/Events/3mrc/Hero.JPG",
    category: ["Competition", "Workshop"],
    status: "past",
    isPast: true,
  },
  {
    id: "P2",
    title: "TechXchange episode 1",
    slug: "techxchange-episode-1",
    description: "Episode 1 of a series exploring ho advancements in chips, robotics, and AI are driving the next revolution in modern engineering and real-world technology.",
    fullDescription: "This event explored how advancements in chips, robotics, and artificial intelligence are shaping the future of modern engineering, offering participants a clearer understanding of emerging technologies and their real-world impact. The session was delivered by Ms. Gayani Rathnasekara, who holds a PhD in Electrical and Computing Engineering from Florida International University, USA, and she provided valuable insights into cutting-edge research, industry trends, and the importance of mentorship for aspiring engineers.",
    date: "21 Dec 2025",
    time: "4:00 PM - 5:30 PM",
    location: "Online",
    image: "/Events/techxChange/ep1/hero.jpg",
    category: ["Series"],
    status: "past",
    isPast: true,
  },
];

export const allEvents: Event[] = [...upcomingEvents, ...pastEvents];
