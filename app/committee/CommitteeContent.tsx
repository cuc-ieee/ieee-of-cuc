"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Footer } from "../components/Footer";
import { committeeMembers } from "@/data/committee";
import { ANIMATION_CONFIG, transitionNormal } from "@/lib/animations";

export default function CommitteeContent() {
  return (
    <div className="min-h-screen w-full bg-background">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionNormal(0)}
            className="text-center max-w-3xl mx-auto"
          >
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {committeeMembers.map((member, index) => (
              <motion.div
                key={`${member.email}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={transitionNormal(index * ANIMATION_CONFIG.stagger.fast)}
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
