import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Sparkles, BookOpen, Network, Award, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: BookOpen, text: "Access to IEEE Xplore digital library" },
  { icon: Network, text: "Global networking opportunities" },
  { icon: Award, text: "Industry-recognized certifications" },
  { icon: Rocket, text: "Exclusive workshops & training" },
  { icon: Sparkles, text: "Competition participation" },
  { icon: Check, text: "Career development resources" },
];

export function MembershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="membership"
      ref={ref}
      className="relative flex items-center py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
              Join Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Become an <span className="gradient-text">IEEE Member</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Unlock exclusive benefits and join a global community of over
              400,000 professionals advancing technology.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative rounded-2xl p-8 md:p-12 bg-gradient-to-br from-card to-secondary/50 border border-border/50 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Join IEEE today and gain access to a world of opportunities,
                resources, and a community of innovators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl">
                  Register Now
                </Button>
                <Button variant="glass" size="xl">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
