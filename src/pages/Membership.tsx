import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Check, BookOpen, Network, Award, Rocket, Sparkles, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const membershipBenefits = [
  {
    icon: BookOpen,
    title: "IEEE Xplore Access",
    description: "Full access to the world's largest technical literature database with over 5 million documents.",
  },
  {
    icon: Network,
    title: "Global Networking",
    description: "Connect with 400,000+ members across 160 countries and access exclusive events.",
  },
  {
    icon: Award,
    title: "Certifications",
    description: "Earn industry-recognized certifications and showcase your skills to employers.",
  },
  {
    icon: Rocket,
    title: "Career Resources",
    description: "Access job boards, resume reviews, interview prep, and career development tools.",
  },
  {
    icon: Sparkles,
    title: "Competitions",
    description: "Participate in hackathons, robotics competitions, and innovation challenges.",
  },
  {
    icon: Globe,
    title: "Conferences",
    description: "Discounted access to IEEE conferences, workshops, and technical symposiums.",
  },
];

const steps = [
  {
    number: "01",
    title: "Visit IEEE.org",
    description: "Go to ieee.org/membership and click on 'Join IEEE'.",
  },
  {
    number: "02",
    title: "Select Student Membership",
    description: "Choose the student membership option with discounted rates.",
  },
  {
    number: "03",
    title: "Complete Registration",
    description: "Fill in your details and select Curtin Colombo as your institution.",
  },
  {
    number: "04",
    title: "Join Our Branch",
    description: "Contact us to be added to our local student branch activities.",
  },
];

const Membership = () => {
  return (
    <>
      <Helmet>
        <title>Membership | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Join IEEE Curtin Colombo Student Branch and unlock exclusive benefits including IEEE Xplore access, networking, and career resources."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                Join Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Become an <span className="gradient-text">IEEE Member</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl mb-8">
                Unlock exclusive benefits and join a global community of over
                400,000 professionals advancing technology for humanity.
              </p>
              <Button variant="hero" size="xl" className="group">
                Join Now
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Member <span className="gradient-text">Benefits</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover the exclusive advantages of IEEE membership.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {membershipBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Join Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                How to <span className="gradient-text">Join</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Follow these simple steps to become an IEEE member.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-card border border-border/50">
                    <span className="font-display text-4xl font-bold gradient-text">
                      {step.number}
                    </span>
                    <h3 className="font-display font-semibold text-lg mt-4 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center rounded-2xl p-8 md:p-12 bg-gradient-to-br from-primary/20 to-card border border-primary/30"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of students worldwide who are advancing their
                careers through IEEE membership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl">
                  Register Now
                </Button>
                <Button variant="glass" size="xl">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Membership;
