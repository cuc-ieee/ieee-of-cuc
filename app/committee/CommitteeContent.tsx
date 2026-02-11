"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { DesktopNav, MobileNav } from "../components/Navigation";
import { Footer } from "../components/Footer";

const committeeMembers = [
  {
    name: "Rovindu Tharin",
    role: "Chairperson",
    department: "Mechatronics Engineering",
    image: "/ExoCom/rovindu.jpeg",
    linkedin: "#",
    email: "mrtharinsilva@gmail.com",
  },
  {
    name: "Sanindu Talwaththa",
    role: "Vice Chairperson",
    department: "Electrical and Electronic Engineering",
    image: "/ExoCom/sanidu.jpeg",
    linkedin: "#",
    email: "vicechair@ieee.curtin.edu.lk",
  },
  {
    name: "Yasiru Fernando",
    role: "Secretary",
    department: "Mechatronics Engineering",
    image: "/ExoCom/yasiru.jpeg",
    linkedin: "#",
    email: "secretary@ieee.curtin.edu.lk",
  },
  {
    name: "Rashmitha Fernando",
    role: "Treasurer",
    department: "Electrical and Electronic Engineering",
    image: "/ExoCom/rashmitha.jpeg",
    linkedin: "#",
    email: "treasurer@ieee.curtin.edu.lk",
  },
  {
    name: "Kenolee",
    role: "Assistant Secretary",
    department: "Engineering",
    image: "/ExoCom/kenolee.jpeg",
    linkedin: "#",
    email: "assistantsecretary@ieee.curtin.edu.lk",
  },
  {
    name: "Adithya",
    role: "Assistant Treasurer",
    department: "Mechatronics Engineering",
    image: "/ExoCom/adi.jpeg",
    linkedin: "#",
    email: "assistanttreasurer@ieee.curtin.edu.lk",
  },
  {
    name: "Yameen Shariz",
    role: "Webmaster",
    department: "Mechatronics Engineering",
    image: "/ExoCom/yameen.jpeg",
    linkedin: "#",
    email: "webmaster@ieee.curtin.edu.lk",
  },
  {
    name: "Hashin",
    role: "Treasurer",
    department: "Mechatronics Engineering",
    image: "/ExoCom/hashin.jpeg",
    linkedin: "#",
    email: "treasurer@ieee.curtin.edu.lk",
  },
  {
    name: "Mithil",
    role: "Treasurer",
    department: "Electrical and Electronic Engineering",
    image: "/ExoCom/mithil.jpeg",
    linkedin: "#",
    email: "treasurer@ieee.curtin.edu.lk",
  },
  {
    name: "Chiranga",
    role: "Treasurer",
    department: "Mechatronics Engineering",
    image: "/ExoCom/chiranga.jpeg",
    linkedin: "#",
    email: "treasurer@ieee.curtin.edu.lk",
  },
  {
    name: "Tatiana",
    role: "Treasurer",
    department: "Engineering",
    image: "/ExoCom/tatiana.jpeg",
    linkedin: "#",
    email: "treasurer@ieee.curtin.edu.lk",
  },
  {
    name: "Hirusha",
    role: "Treasurer",
    department: "Electrical and Electronic Engineering",
    image: "/ExoCom/hirusha.jpeg",
    linkedin: "#",
    email: "treasurer@ieee.curtin.edu.lk",
  },
];

export default function CommitteeContent() {
  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopNav />
      <MobileNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
              Leadership
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Executive Committee</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Meet the dedicated team leading IEEE Student Branch of Curtin
              University Colombo towards excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Committee Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((member, index) => (
              <motion.div
                key={`${member.email}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group rounded-2xl bg-card border border-border/50 overflow-hidden card-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-xl mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-1">
                    {member.role}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {member.department}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
