"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, Search } from "lucide-react";
import { Footer } from "../components/Footer";
import { committeeMembers } from "@/data/committee";

const categories = [
  { id: "all", label: "All Members" },
  { id: "executive", label: "Executive Board" },
  { id: "leads", label: "Directors & Leads" },
];

export default function CommitteeContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    return committeeMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.department.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === "all") return true;

      const roleLower = member.role.toLowerCase();
      const isExec =
        roleLower.includes("chair") ||
        roleLower.includes("secretary") ||
        roleLower.includes("treasurer");

      if (selectedCategory === "executive") {
        return isExec;
      }
      if (selectedCategory === "leads") {
        return !isExec;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen w-full bg-background overflow-x-hidden">
      
      {/* =================================================================
          HERO SECTION
          ================================================================= */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        {/* Subtle ambient glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[320px] bg-primary/10 rounded-full blur-[110px] pointer-events-none -z-10"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.12]">
              Executive <span className="text-primary">Committee</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Meet the dedicated student leaders driving technical innovation, student empowerment, and community impact at Curtin University Colombo.
            </p>

            {/* Controls: Category Filter + Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto p-2 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-md">
              
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto p-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(210_100%_50%/0.35)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search role or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-secondary/40 border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors placeholder:text-muted-foreground/70"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =================================================================
          COMMITTEE MEMBERS GRID
          ================================================================= */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {filteredMembers.map((member, index) => {
                const hasValidLinkedIn = (() => {
                  const url = member.linkedin?.trim();
                  if (!url || !url.startsWith("http")) return false;
                  try {
                    const parsed = new URL(url);
                    return (
                      parsed.protocol === "http:" ||
                      parsed.protocol === "https:"
                    );
                  } catch {
                    return false;
                  }
                })();

                return (
                  <motion.div
                    layout
                    key={`${member.name}-${member.role}`}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    whileHover={{
                      y: -6,
                      transition: { type: "spring", stiffness: 400, damping: 25 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      type: "spring",
                      stiffness: 340,
                      damping: 26,
                      delay: Math.min(index * 0.035, 0.2),
                    }}
                    className="group relative rounded-2xl border border-border/50 bg-card/40 hover:bg-card/75 hover:border-primary/50 hover:shadow-[0_12px_32px_-8px_hsl(210_100%_50%/0.28)] transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  >
                    {/* Portrait Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden bg-secondary/30">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={400}
                        priority={index < 8}
                        loading={index < 8 ? "eager" : "lazy"}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" />

                      {/* Role Pill Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-background/85 backdrop-blur-md border border-border/60 text-primary shadow-sm">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {member.department}
                        </p>
                      </div>

                      {/* Social Actions */}
                      <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-[11px] font-medium text-muted-foreground/80">
                          Curtin Colombo
                        </span>

                        <div className="flex items-center gap-2">
                          {hasValidLinkedIn && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${member.name}'s LinkedIn`}
                              className="w-8 h-8 rounded-lg border border-border/50 bg-secondary/40 hover:bg-primary/20 hover:border-primary/50 hover:text-primary text-muted-foreground flex items-center justify-center transition-all duration-200"
                            >
                              <Linkedin className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${member.email}`}
                            aria-label={`Email ${member.name}`}
                            className="w-8 h-8 rounded-lg border border-border/50 bg-secondary/40 hover:bg-primary/20 hover:border-primary/50 hover:text-primary text-muted-foreground flex items-center justify-center transition-all duration-200"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredMembers.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No committee members matched your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-sm text-primary hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
