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
  // {
  //   id: "U1",
  //   title: "DetectX - AI and computer vision workshop (Phase 2)",
  //   slug: "detectx-ai-computer-vision-workshop-2",
  //   description: "Step into the future of intelligent systems. DetectX Phase 2 takes you beyond theory — tackling a real-world business problem using AI, Computer Vision, and the YOLO model, in an agentic, industry-backed hands-on workshop.",
  //   fullDescription: [
  //     "DetectX Phase 2 is an intensive, industry-collaborative workshop where participants move from concept to code — solving a client-oriented business problem using cutting-edge Computer Vision and AI-native engineering practices.",
  //     "The session kicks off with an introductory pitch on AI Native Engineering and its intersection with Computer Vision, followed by a focused conceptual session covering core AI and CV principles, and a deep dive into the YOLO (You Only Look Once) object detection model — one of the most widely used real-time CV architectures in production systems today.",
  //     "Participants will then be grouped into clusters of 10, working collaboratively through a structured development phase guided by 4-5 resource persons from Virtusa, a global leader in digital engineering. The development phase features two evaluation checkpoints to track progress and push problem-solving further.",
  //     "The technical environment is hybrid — VS Code with Agentic mode takes centre stage, with Google Colab available as a cloud fallback to handle the hardware demands of running YOLO models. Expect a session built around real workflows, not toy examples.",
  //     "As a highlight, DetectX Phase 2 features a special IoT demo integrating Computer Vision with a Dobot robotic arm — a live showcase of how agentic programming bridges the digital and physical world.",
  //     "Prior to the main event, all registered participants will have access to an online briefing session held 2-3 days before the workshop. This session will walk you through an introduction to AI and Computer Vision, cover all the prerequisites and setup requirements, and ensure you're fully prepared and ready to hit the ground running on the day of the workshop. The session will also be recorded and shared with all participants, so if you miss it, you won't be left behind. No one comes in cold.",
  //     "Whether you're strengthening your CV foundations or stepping into agentic AI development for the first time, this workshop is built to challenge you, connect you with industry professionals, and give you a taste of what AI engineering looks like in the real world.",
  //     "Prerequisites: Python and VS Code must be configured on your laptop prior to the session.",
  //   ],
  //   date: "16 May 2026",
  //   time: "10:00 AM onwards",
  //   participation: "Open to all university students",
  //   location: "Curtin University Colombo Campus, Room LT201",
  //   image: "/Events/DetectX/Phase2/hero.jpg",
  //   featured: false,
  //   category: ["Workshop", "AI", "Computer Vision"],
  //   capacity: 100,
  //   status: "upcoming",
  //   isPast: false,
  //   registrationLink: "https://forms.gle/xF7xcCcPd95v5gw59",
  //   registrationClosingDate: "12 May 2026 at 11:59 PM",
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
    description:
      "An inter-university competition where students present their research in a 3-minute pitch to an audience of academics, industry leaders, and peers.",
    fullDescription:
      "This research challenge was an inter-university event where students presented their research in 3 minutes to an audience of academics, industry leaders, and peers, helping them strengthen impactful communication and build professional networks. The event also included two workshops—an introductory session and another led by an academic guest speaker—to support participants in refining their presentations. The final competition was judged by five experts from both industrial and academic fields, and cash prizes were awarded to the top three winners.",
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
    description:
      "Episode 1 of a series exploring how advancements in chips, robotics, and AI are driving the next revolution in modern engineering and real-world technology.",
    fullDescription:
      "This event explored how advancements in chips, robotics, and artificial intelligence are shaping the future of modern engineering, offering participants a clearer understanding of emerging technologies and their real-world impact. The session was delivered by Ms. Gayani Rathnasekara, who holds a PhD in Electrical and Computing Engineering from Florida International University, USA, and she provided valuable insights into cutting-edge research, industry trends, and the importance of mentorship for aspiring engineers.",
    date: "21 Dec 2025",
    time: "4:00 PM - 5:30 PM (IST)",
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
    description:
      "A high-level technical workshop by IEEE Curtin Colombo and SLIR that provided hands-on training in Siemens S7-200 PLCs, Ladder Logic programming, and core industrial automation practice.",
    fullDescription:
      "PLCFI was a high-level technical workshop organised by the IEEE Student Branch of Curtin Colombo, in collaboration with the Sri Lanka Institute of Robotics (SLIR). The event provided intensive hands-on training on Siemens S7-200 PLC hardware, with a focus on Ladder Logic programming and industrial automation. With over 80 participants, the workshop equipped students with practical day-one automation skills while offering recognised professional certification, helping bridge the gap between academic learning and real-world industry practice.",
    date: "27 Feb 2026",
    time: "1:30 PM onwards",
    participation: "Curtin University Colombo students",
    location: "Curtin University Colombo, Room LT201",
    image: "/Events/plcfi/hero.jpg",
    category: ["Workshop", "PRES hours"],
    status: "past",
    isPast: true,
  },
  {
    id: "P4",
    title: "TechXchange episode 2: Soft Robotics, From Lab to Life",
    slug: "techxchange-episode-2",
    description:
      "A TechXChange session exploring embodied intelligence, soft robotics, and how controllable stiffness enables robots to adapt, sense, and interact with dynamic real-world environments.",
    fullDescription: [
      "TechXChange is an educational initiative by the IEEE Student Branch of Curtin Colombo, designed to bridge the gap between academia and industry by connecting students with leading experts in emerging technologies.",
      "In this session, we were honoured to host Professor Thrishantha Nanayakkara, Director of the Morph Lab and Professor of Robotics at Imperial College London. He shared his insights on embodied intelligence in robotics, exploring how controllable stiffness and physical mechanisms enable robots to perceive, adapt, and interact with dynamic environments.",
      "Participants were introduced to modern approaches in bio-inspired robotics, soft robotics, and adaptive mechanisms, showing how these concepts are shaping the next generation of intelligent robotic systems. The discussion also covered real-world applications and current research directions in robotics, providing students with insights into how mechanical design, sensing, and AI can work together to build more capable and responsive robotic platforms.",
      "Professor Nanayakkara's talk highlighted the importance of mechanical intelligence in creating robots that can operate naturally and effectively in complex, real-world settings.",
    ],
    date: "7 Mar 2026",
    time: "4:00 PM - 6:00 PM (IST)",
    participation: "Open to public",
    location: "Online",
    image: "/Events/placeholderhero.png",
    category: ["Webinar", "Robotics", "Soft Robotics"],
    status: "past",
    isPast: true,
  },
  {
    id: "P5",
    title: "Convergence Episode 1: Simulation Engineering",
    slug: "convergence-episode-1",
    description:
      "A collaborative international webinar focused on secure simulation engineering, AI, cybersecurity, and the future of digital engineering practice.",
    fullDescription: [
      "The Convergence webinar series is a collaborative international initiative aimed at bridging academic knowledge with industry expertise. The first session focused on secure simulation engineering and its future, providing participants with insights into emerging technologies, real-world applications, and evolving trends in simulation, artificial intelligence, and cybersecurity.",
      "The event commenced with an introductory session on IEEE, delivered by Dr. Thilina Thanthriwatta, Committee Member - Membership Development of the IEEE Sri Lanka Section. His session provided attendees with a comprehensive overview of IEEE, its global impact, and the opportunities available for students and young professionals.",
      "The technical sessions featured Ashen Fernando and Dr. Anwar F.A. Dafa-Alla, whose presentations combined industry and academic perspectives on simulation engineering, embedded systems, and secure digital transformation.",
      "Conducted on 8 April 2026, the webinar attracted a diverse audience of undergraduate students and young professionals and concluded with a panel discussion and Q&A session.",
      "This event was jointly organized by the IEEE Student Branch of Curtin Colombo and the IEEE Student Branch of Curtin University Dubai, with support from the IEEE Sri Lanka Section, IEEE UAE Section, and the IEEE Sri Lanka Section Student Activities Committee.",
    ],
    date: "8 Apr 2026",
    time: "2:30 PM - 4:30 PM (IST)",
    participation: "Undergraduate students and young professionals",
    location: "Online",
    image: "/Events/placeholderhero.png",
    category: ["Webinar", "Simulation", "Collaboration"],
    status: "past",
    isPast: true,
  },
  {
    id: "P6",
    title: "Gear Up Episode 1 - Atlas Labs",
    slug: "gear-up-episode-1",
    description:
      "An industry visit that gave students a first-hand look at innovation, product development, and the day-to-day operations of a modern technology hub.",
    fullDescription: [
      "The first episode of the Gear Up Series kicked off with an exciting industry visit to Atlas Labs, organized by the IEEE Student Branch of Curtin Colombo. This visit gave students a valuable opportunity to explore a real-world innovation environment, interact with industry professionals, and gain insights into emerging technologies, product development, and workplace practices within the tech industry.",
      "Participants were able to experience the day-to-day operations of a fast-paced innovation hub while learning about current industry trends, engineering workflows, and the importance of collaboration and creativity in modern technological solutions. The session also encouraged students to bridge the gap between academic learning and practical industry applications.",
      "Gear Up Episode 01 marked the beginning of a series focused on empowering students through industry exposure, networking opportunities, and professional development experiences.",
    ],
    date: "9 Apr 2026",
    time: "9:30 AM - 2:30 PM",
    participation: "Curtin University Colombo students",
    location: "The Wavertree, 141/11 Vauxhall St, Colombo",
    image: "/Events/placeholderhero.png",
    category: ["Industry Visit", "IEEE"],
    status: "past",
    isPast: true,
  },
  {
    id: "P7",
    title: "Gear Up Episode 2 - Dockyard",
    slug: "gear-up-episode-2",
    description:
      "An industry visit offering students a firsthand look into shipbuilding, heavy engineering, industrial safety, and modern maritime operations.",
    fullDescription: [
      "Episode 02 of the Gear Up Series continued with an engaging industry visit to Dockyard PLC. The visit provided students with a rare opportunity to experience one of Sri Lanka's largest and most advanced engineering and maritime facilities firsthand.",
      "Throughout the session, participants were introduced to the large-scale operations involved in shipbuilding, ship repair, heavy engineering, and industrial project management. Students explored how multiple engineering disciplines come together in real-world applications while gaining valuable insights into industrial safety practices, engineering workflows, precision manufacturing, and modern maritime technologies.",
    ],
    date: "6 May 2026",
    time: "7:45 AM - 12:30 PM",
    participation: "Curtin University Colombo students",
    location: "Dockyard PLC, Port of Colombo",
    image: "/Events/placeholderhero.png",
    category: ["Industry Visit", "IEEE"],
    status: "past",
    isPast: true,
  },
  {
    id: "P8",
    title: "IEEE Challenge Sphere: Chips Challenge 2026 Awareness Session",
    slug: "ieee-challenge-sphere-chips-challenge-2026-awareness-session",
    description:
      "An awareness session where Rajinthan Rameshkumar shared his journey to the International Microelectronics Olympiad and practical guidance for preparing for the Chips Challenge.",
    fullDescription: [
      "Join Rajinthan Rameshkumar as he shares his inspiring journey to the International Microelectronics Olympiad, the challenges he overcame, his experience representing Sri Lanka on the global stage, and valuable insights to help you prepare for your own Chips Challenge journey.",
      "Rajinthan is an Electronics and Telecommunication Engineering undergraduate at the University of Moratuwa and a Bronze Medalist at the 20th International Microelectronics Olympiad. In the session, he discussed how his international experience shaped his technical growth and what students can do to prepare for similar opportunities.",
      "He also highlighted the importance of persistence, structured preparation, and practical learning in building a strong foundation for the Chips Challenge and future work in electronics and semiconductor technology.",
    ],
    date: "27 Jun 2026",
    time: "7:00 PM - 8:00 PM (IST)",
    participation: "Open to students and young professionals",
    location: "Google Meet",
    image: "/Events/placeholderhero.png",
    category: ["Webinar", "IEEE", "Competition"],
    status: "past",
    isPast: true,
  },
  {
    id: "P9",
    title: "IEEE Challenge Sphere: Chips Challenge 2026 Workshop 2: An Introduction to Digital Electronics & C++",
    slug: "ieee-challenge-sphere-chips-challenge-2026-workshop-2",
    description:
      "A technical workshop introducing participants to digital electronics fundamentals, C++, and semiconductor concepts with insights from industry professionals.",
    fullDescription: [
      "A technical workshop introducing participants to the fundamentals of digital electronics and C++, featuring industry professionals from Synopsys Lanka. The session provided insights into semiconductor technologies, digital systems, and programming concepts relevant to the electronics industry.",
      "Mr. Pramod Marasinghe, an experienced semiconductor industry professional with more than 17 years of experience, shared a practical introduction to digital electronics and C++, helping participants understand how core engineering principles connect to real-world semiconductor work and modern electronics design.",
      "Mohan Ilankoon, an R&D engineer at Synopsys Lanka with over six years of experience in the semiconductor industry, guided participants through practice questions closely related to the Chips Challenge 2026, giving them a clearer idea of the types of technical reasoning and problem-solving expected in the competition.",
      "The session blended industry insight with exam-oriented preparation and helped students build both conceptual understanding and confidence in tackling digital electronics problems.",
    ],
    date: "3 Jul 2026",
    time: "7:00 PM - 8:15 PM (IST)",
    participation: "Open to students and young professionals",
    location: "Microsoft Teams",
    image: "/Events/placeholderhero.png",
    category: ["Workshop", "Electronics", "C++"],
    status: "past",
    isPast: true,
  },
  {
    id: "P10",
    title: "IEEE Challenge Sphere: Chips Challenge 2026 Workshop Series 3, The Story of the Silicon Chip",
    slug: "ieee-challenge-sphere-chips-challenge-2026-workshop-series-3",
    description:
      "A technical session exploring the evolution of silicon chip technology, transistor scaling, materials, and the future of semiconductor innovation.",
    fullDescription: [
      "A technical session exploring the evolution of silicon chip technology, covering transistor scaling, material innovation, and advancements in semiconductor technology. The session provided participants with insights into the development of modern microelectronics and the future of the semiconductor industry.",
      "Dr. Luckshitha Suriyasena Liyanage, a semiconductor technology expert and academic with extensive experience in semiconductor engineering and research, shared a detailed look at how silicon chips evolved from early transistor technology to modern high-performance microelectronics.",
      "He discussed key innovations in transistor scaling, semiconductor materials, and the engineering challenges driving the next generation of chip technologies, giving students a richer understanding of the foundations behind modern electronics and the future of the industry.",
    ],
    date: "14 Jul 2026",
    time: "6:00 PM - 8:00 PM (IST)",
    participation: "Open to students and young professionals",
    location: "Microsoft Teams",
    image: "/Events/placeholderhero.png",
    category: ["Workshop", "Semiconductors", "Microelectronics"],
    status: "past",
    isPast: true,
  },
  {
    id: "P11",
    title: "IEEE Challenge Sphere: Chips Challenge 2026 Workshop 4, Final Practice Session",
    slug: "ieee-challenge-sphere-chips-challenge-2026-workshop-4",
    description:
      "A final practice session focused on solving example questions directly related to the IEEE Chips Challenge and helping participants prepare for the competition.",
    fullDescription: [
      "This final practice session was held to support the participants of the IEEE Chips Challenge 2026. The instructor worked through example questions directly related to the IEEE Chips Challenge, helping students strengthen their problem-solving techniques and confidence before the main challenge.",
      "Avishka Herath, a graduate from the Department of Electronic and Telecommunication Engineering at the University of Moratuwa and a Junior Lecturer there, shared practical insight based on his academic and research work in ASIC design, biosignal processing, and electronics-focused interdisciplinary projects.",
      "His session gave participants a focused and applied understanding of how to approach challenge-style questions in a structured and effective way.",
    ],
    date: "22 Jul 2026",
    time: "7:00 PM - 8:30 PM (IST)",
    participation: "Open to Chips Challenge participants",
    location: "Microsoft Teams",
    image: "/Events/placeholderhero.png",
    category: ["Workshop", "Practice", "IEEE"],
    status: "past",
    isPast: true,
  },
  {
    id: "P12",
    title: "IEEE Challenge Sphere: Chips Challenge 2026 Final Examination",
    slug: "ieee-challenge-sphere-chips-challenge-2026-final-examination",
    description:
      "The national selection examination identifying Sri Lanka's representative for the International Microelectronics Olympiad, focused on microelectronics and EDA problem-solving.",
    fullDescription: [
      "The IEEE Challenge Sphere - Chips Challenge Final Examination served as the national selection examination to identify Sri Lanka's representative for the International Microelectronics Olympiad in Armenia. Organized under the IEEE Challenge Sphere initiative, the examination assessed participants' knowledge and problem-solving skills in microelectronics and electronic design automation through a rigorous closed-book assessment.",
      "The national winner earned the opportunity to represent Sri Lanka on the global stage, competing against top young engineers from around the world.",
      "The event was hosted by the IEEE Student Branch of Curtin Colombo in collaboration with the IEEE Circuits and Systems Society and the IEEE CEDA Sri Lanka Joint Chapter, providing a professional examination environment for undergraduate participants.",
    ],
    date: "24 Jul 2026",
    time: "9:00 AM - 10:00 AM (IST)",
    participation: "Open to Chips Challenge participants",
    location: "Curtin University Colombo, LT207",
    image: "/Events/placeholderhero.png",
    category: ["Examination", "Microelectronics", "IEEE"],
    status: "past",
    isPast: true,
  },
  {
    id: "P13",
    title: "SDG Sprints: Technical session on SDG 12",
    slug: "sdg-sprints-technical-session-sdg-12",
    description:
      "A technical webinar on actionable pathways toward UN Sustainable Development Goal 12, linking global engineering frameworks with local implementation strategies in Sri Lanka.",
    fullDescription: [
      "This technical session webinar explored actionable pathways toward UN Sustainable Development Goal 12 by bridging advanced global engineering frameworks with practical, localized implementation strategies in Sri Lanka.",
      "The session featured Professor Wahidul Biswas and Dr. Manoj Ranaweera, who discussed resource efficiency, circular economy models, and sustainable management practices from both international and national perspectives.",
      "Professor Wahidul Biswas, the Deputy Director of the Sustainable Engineering Group at Curtin University, brought a global view of LCA, industrial symbiosis, and sustainable manufacturing. Dr. Manoj Ranaweera, a Senior Lecturer at the University of Moratuwa, connected these frameworks to Sri Lanka's industrial landscape, renewable energy priorities, and national sustainability challenges.",
      "The event included a moderated Q&A and focused on how engineering, policy, and industry can work together to drive measurable, long-term impact.",
    ],
    date: "24 Jul 2026",
    time: "5:00 PM - 6:30 PM (IST)",
    participation: "Open to all students",
    location: "Microsoft Teams",
    image: "/Events/placeholderhero.png",
    category: ["Webinar", "Sustainability", "IEEE"],
    status: "past",
    isPast: true,
  },
  {
    id: "P14",
    title: "IEEE Curtin ASPIRE 26: Opening Ceremony & Ice Breaker",
    slug: "ieee-curtin-aspire-26-opening-ceremony-ice-breaker",
    description:
      "The official launch of the IEEE Curtin ASPIRE 2026 challenge, bringing together students from multiple Curtin campuses for an international collaboration and innovation kickoff.",
    fullDescription: [
      "IEEE Curtin ASPIRE 2026 officially commenced with a successful inaugural opening ceremony, marking the launch of an international innovation and sustainability challenge that united students across the Curtin global network.",
      "The session welcomed participants from all four campuses and featured an introduction to IEEE, sponsor acknowledgements, student branch introductions, an overview of the competition format, team allocations, interactive cross-campus icebreaker sessions, and the official launch of the competition.",
      "Over the coming weeks, participants worked across diverse international teams to develop innovative solutions aligned with the United Nations Sustainable Development Goals, building collaboration across culture, discipline, and geography.",
      "The opening ceremony celebrated international partnership, student leadership, and a shared commitment to advancing innovation for the benefit of society.",
      "Speaker highlights included Sandy Dhliwayo on IEEE, Dr. Sonny Pham on the EECMS sponsor and Curtin Perth IEEE Student Branch, Professor Chithirai Pon Selvan on Curtin Dubai, Mr. Pang Po Ken on Curtin Malaysia, Ms. Anjalie Gamage on Curtin Colombo, Mr. Mohammed Sahal Shaikh on the competition overview, and Mr. Rovindu Tharin on the official launch and closing remarks.",
    ],
    date: "27 Jul 2026",
    time: "12:30 PM - 2:00 PM (IST)",
    participation: "Curtin global network students",
    location: "Zoom",
    image: "/Events/placeholderhero.png",
    category: ["Event", "International Collaboration", "Leadership"],
    status: "past",
    isPast: true,
  },
  {
    id: "P15",
    title: "IEEE Curtin ASPIRE 26 Workshop 1: Finding the Right Problem; User Empathy and Challenge Definition",
    slug: "ieee-curtin-aspire-26-workshop-1-finding-the-right-problem-user-empathy-and-challenge-definition",
    description:
      "A pre-recorded workshop introducing user empathy and challenge definition as the foundations for meaningful innovation and problem-driven solution design.",
    fullDescription: [
      "Every impactful innovation begins with identifying the right problem. This introductory workshop in the IEEE Curtin ASPIRE 2026 learning series explored the fundamentals of user empathy and challenge definition, two essential pillars of design thinking and innovation.",
      "Mr. Aloka Gunasekara guided participants through practical approaches to understanding users, identifying genuine pain points, and framing problem statements that lead to meaningful and sustainable solutions. He emphasized validating assumptions, engaging with stakeholders, and building a deep understanding of user needs before proposing solutions.",
      "The session was designed to prepare participants for the Week 1 deliverables of the IEEE Curtin ASPIRE 2026 competition, including the Problem Statement and Lean Canvas, while developing the mindset needed to move from observation to action.",
      "Mr. Aloka Gunasekara is the Co-Founder of Localflow, a Business Transformation Consultant, Startup Mentor, and Venture Architect. With experience across startups, corporates, and entrepreneurs, he helps teams design user-centric solutions and turn ideas into scalable, impactful ventures.",
    ],
    date: "27 Jul 2026",
    time: "10:48 PM - 11:50 PM (IST)",
    participation: "Open to ASPIRE participants",
    location: "Virtual",
    image: "/Events/placeholderhero.png",
    category: ["Workshop", "Entrepreneurship", "Innovation"],
    status: "past",
    isPast: true,
  },
  {
    id: "P16",
    title: "IEEE Curtin ASPIRE 26 Workshop 2: From Idea to Business Model and Beyond",
    slug: "ieee-curtin-aspire-26-workshop-2-from-idea-to-business-model-and-beyond",
    description:
      "A virtual workshop on transforming innovative ideas into sustainable business models through value creation, customer validation, and Lean Canvas thinking.",
    fullDescription: [
      "As part of the IEEE Curtin ASPIRE 2026 Workshop Series, this session guided participants through the process of transforming innovative ideas into sustainable business models.",
      "The workshop focused on understanding value creation, validating solutions, developing a Lean Canvas, and considering the commercial and entrepreneurial aspects of innovation. Participants gained practical insights into refining their ideas, identifying key stakeholders, and building a strong foundation for their Week 1 ASPIRE submission, particularly the Problem Statement and Lean Canvas.",
      "This session was designed to help participants move beyond idea generation and toward a stronger, more commercially grounded understanding of how innovation becomes a viable venture.",
      "Ms. Anna Lee is the Coordinator of Entrepreneurship Curious at Curtin University and the Co-Founder of Wisetalker. Her work bridges entrepreneurship education, startup development, and commercialisation, helping aspiring innovators connect research, innovation, and industry in meaningful ways.",
    ],
    date: "29 Jul 2026",
    time: "7:37 PM - 8:35 PM (IST)",
    participation: "Open to ASPIRE participants",
    location: "Virtual",
    image: "/Events/placeholderhero.png",
    category: ["Workshop", "Business Model", "Innovation"],
    status: "past",
    isPast: true,
  },
];

export const allEvents: Event[] = [...upcomingEvents, ...pastEvents];
