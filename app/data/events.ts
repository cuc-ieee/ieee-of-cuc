export interface Event {
  id?: string;
  title: string;
  slug: string;
  description: string;
  fullDescription?: string | string[];
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
  registrationClosingDate?: string;
  outcomes?: string[];
  gallery?: string[];
  participation?: string;
}

export const upcomingEvents: Event[] = [
  {
    id: "U1",
    title: "DetectX - AI and computer vision workshop (Phase 2)",
    slug: "detectx-ai-computer-vision-workshop-2",
    description: "Step into the future of intelligent systems. DetectX Phase 2 takes you beyond theory — tackling a real-world business problem using AI, Computer Vision, and the YOLO model, in an agentic, industry-backed hands-on workshop.",
    fullDescription: [
      "DetectX Phase 2 is an intensive, industry-collaborative workshop where participants move from concept to code — solving a client-oriented business problem using cutting-edge Computer Vision and AI-native engineering practices.",
      "The session kicks off with an introductory pitch on AI Native Engineering and its intersection with Computer Vision, followed by a focused conceptual session covering core AI and CV principles, and a deep dive into the YOLO (You Only Look Once) object detection model — one of the most widely used real-time CV architectures in production systems today.",
      "Participants will then be grouped into clusters of 10, working collaboratively through a structured development phase guided by 4–5 resource persons from Virtusa, a global leader in digital engineering. The development phase features two evaluation checkpoints to track progress and push problem-solving further.",
      "The technical environment is hybrid — VS Code with Agentic mode takes centre stage, with Google Colab available as a cloud fallback to handle the hardware demands of running YOLO models. Expect a session built around real workflows, not toy examples.",
      "As a highlight, DetectX Phase 2 features a special IoT demo integrating Computer Vision with a Dobot robotic arm — a live showcase of how agentic programming bridges the digital and physical world.",
      "Prior to the main event, all registered participants will have access to an online briefing session held 2–3 days before the workshop. This session will walk you through an introduction to AI and Computer Vision, cover all the prerequisites and setup requirements, and ensure you're fully prepared and ready to hit the ground running on the day of the workshop. The session will also be recorded and shared with all participants, so if you miss it, you won't be left behind. No one comes in cold.",
      "Whether you're strengthening your CV foundations or stepping into agentic AI development for the first time, this workshop is built to challenge you, connect you with industry professionals, and give you a taste of what AI engineering looks like in the real world.",
      "Prerequisites: Python and VS Code must be configured on your laptop prior to the session.",
    ],
    date: "16 May 2026",
    time: "10:00 AM onwards",
    participation: "Open to all university students",
    location: "Curtin University Colombo Campus, Room LT201",
    image: "/Events/DetectX/Phase2/hero.jpg",
    featured: false,
    category: ["Workshop", "AI", "Computer Vision"],
    capacity: 100,
    status: "upcoming",
    isPast: false,
    registrationLink: "https://forms.gle/xF7xcCcPd95v5gw59",
    registrationClosingDate: "12 May 2026 at 11:59 PM",
  },
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
    image: "/events/3mrc/hero.jpg",
    category: ["Competition", "Research"],
    status: "past",
    isPast: true,
  },
  {
    id: "P2",
    title: "TechXchange episode 1",
    slug: "techxchange-episode-1",
    description: "Episode 1 of a series exploring how advancements in chips, robotics, and AI are driving the next revolution in modern engineering and real-world technology.",
    fullDescription: "This event explored how advancements in chips, robotics, and artificial intelligence are shaping the future of modern engineering, offering participants a clearer understanding of emerging technologies and their real-world impact. The session was delivered by Ms. Gayani Rathnasekara, who holds a PhD in Electrical and Computing Engineering from Florida International University, USA, and she provided valuable insights into cutting-edge research, industry trends, and the importance of mentorship for aspiring engineers.",
    date: "21 Dec 2025",
    time: "4:00 PM - 5:30 PM",
    participation: "Open to Public",
    location: "Online",
    image: "/events/techxchange/ep1/hero.jpg",
    category: ["Webinar", "Series"],
    status: "past",
    isPast: true,
  },
  {
    id: "P3",
    title: "PLCFI",
    slug: "plcfi",
    description: "A high-level technical workshop by IEEE Curtin Colombo and SLIR that provided hands-on training in Siemens S7-200 PLCs, Ladder Logic programming, and core industrial automation practice.",
    fullDescription: "PLCFI was a high-level technical workshop organised by the IEEE Student Branch of Curtin University, Colombo, in collaboration with the Sri Lanka Institute of Robotics (SLIR). The event provided intensive hands-on training on Siemens S7-200 PLC hardware, with a focus on Ladder Logic programming and industrial automation. With over 80 participants, the workshop equipped students with practical day-one automation skills while offering recognised professional certification, helping bridge the gap between academic learning and real-world industry practice.",
    date: "27 Feb 2026",
    time: "1:30 PM onwards",
    participation: "Curtin University Colombo students",
    location: "Curtin University Colombo, Room LT201",
    image: "/events/plcfi/hero.jpg",
    category: ["Workshop", "PRES hours"],
    status: "past",
    isPast: true,
  },
];

export const allEvents: Event[] = [...upcomingEvents, ...pastEvents];
