import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Globe, Award } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To foster technological innovation and excellence for the benefit of humanity, while creating meaningful opportunities for students.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Hub",
    description:
      "A platform where creativity meets technology, enabling students to explore cutting-edge solutions and push boundaries.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connected to IEEE Sri Lanka Section and the worldwide IEEE community, opening doors to international opportunities.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Committed to developing well-rounded professionals through workshops, competitions, and real-world project experience.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="snap-section relative flex items-center py-20 lg:py-0"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
              About Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Shaping the{" "}
              <span className="gradient-text">Future of Technology</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              IEEE Curtin Colombo Student Branch is a vibrant community of
              passionate students dedicated to advancing technology and
              fostering innovation. As part of the world's largest technical
              professional organization, we provide unparalleled opportunities
              for growth, learning, and networking.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Affiliated with IEEE Sri Lanka Section and Curtin Colombo
              University, we bridge the gap between academic knowledge and
              real-world application through hands-on workshops, industry
              connections, and collaborative projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                <span className="text-sm">IEEE Sri Lanka Section</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50">
                <div className="w-2 h-2 rounded-full bg-accent pulse-glow" />
                <span className="text-sm">Curtin Colombo</span>
              </div>
            </div>
          </motion.div>

          {/* Right - Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group p-6 rounded-2xl bg-card border border-border/50 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
