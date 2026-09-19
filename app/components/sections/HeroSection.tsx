"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TechGlobe } from "@/components/TechGlobe";
import { DiamondShineText } from "@/components/ui/DiamondShineText";
import { MemberFacepile } from "@/components/ui/MemberFacepile";
import { ANIMATION_CONFIG, transitionNormal } from "@/lib/animations";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-[92vh] relative flex flex-col justify-center py-20 md:py-28 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-6 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 xl:col-span-7 text-left">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionNormal(0)}
              className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-5xl font-bold mb-6 leading-[1.15] text-left tracking-tight"
            >
              <span className="whitespace-nowrap">
                <span className="text-foreground">IEEE</span>{" "}
                <DiamondShineText>Curtin University Colombo</DiamondShineText>
              </span>
              <br />
              <span className="text-foreground">Student Branch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionNormal(ANIMATION_CONFIG.stagger.normal * 1)}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 text-left leading-relaxed"
            >
              Empowering the next generation of engineers and innovators through
              technology, collaboration, and excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionNormal(ANIMATION_CONFIG.stagger.normal * 2)}
              className="flex flex-col sm:flex-row gap-4 justify-start mb-8"
            >
              <Button variant="hero" size="xl" asChild>
                <Link href="/membership">Become a Member</Link>
              </Button>
              <Button variant="outline_glow" size="xl" asChild>
                <Link href="/events">Explore Events</Link>
              </Button>
            </motion.div>

            {/* Member Facepile Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transitionNormal(ANIMATION_CONFIG.stagger.normal * 3)}
            >
              <MemberFacepile />
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Tech Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: ANIMATION_CONFIG.duration.globe,
              delay: ANIMATION_CONFIG.stagger.normal,
              ease: ANIMATION_CONFIG.ease.out,
            }}
            className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative mt-6 lg:mt-0"
          >
            <TechGlobe />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
