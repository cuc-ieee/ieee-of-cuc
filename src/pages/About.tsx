import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import { Target, Lightbulb, Globe, Award, Users, Cpu, Sparkles, Zap } from "lucide-react";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To foster technological innovation and excellence for the benefit of humanity, while creating meaningful opportunities for students at Curtin Colombo.",
  },
  {
    icon: Lightbulb,
    title: "Vision",
    description:
      "To be the leading student technical organization in Sri Lanka, nurturing future leaders in engineering and technology.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Connected to IEEE Sri Lanka Section and the worldwide IEEE community of 400,000+ professionals across 160 countries.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Committed to developing well-rounded professionals through workshops, competitions, and real-world project experience.",
  },
];

const benefits = [
  {
    icon: Cpu,
    title: "Technical Skills",
    description: "Hands-on workshops in AI, robotics, IoT, and emerging technologies.",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Connect with industry professionals, researchers, and fellow students.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description: "Access to resources, labs, and mentorship for your project ideas.",
  },
  {
    icon: Zap,
    title: "Career Growth",
    description: "Resume building, interview prep, and internship opportunities.",
  },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <Helmet>
        <title>About Us | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Learn about IEEE Curtin Colombo Student Branch - our mission, vision, and what we bring to students in Sri Lanka."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                About Us
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Shaping the <span className="gradient-text">Future</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                IEEE Curtin Colombo Student Branch is a vibrant community dedicated
                to advancing technology and fostering innovation among students.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section ref={ref} className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="gradient-text">Story</span>
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Established as part of the world's largest technical professional
                  organization, IEEE Curtin Colombo Student Branch serves as a bridge
                  between academic knowledge and real-world application.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Affiliated with IEEE Sri Lanka Section and Curtin Colombo University,
                  we provide unparalleled opportunities for growth, learning, and
                  networking through hands-on workshops, industry connections, and
                  collaborative projects.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our community of passionate students works together to push the
                  boundaries of technology while developing the skills needed to become
                  tomorrow's leaders in engineering and innovation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "2018", label: "Founded" },
                  { value: "200+", label: "Members" },
                  { value: "50+", label: "Events" },
                  { value: "10+", label: "Awards" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="p-6 rounded-2xl bg-card border border-border/50 text-center"
                  >
                    <span className="font-display text-3xl font-bold gradient-text">
                      {stat.value}
                    </span>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
                Our <span className="gradient-text">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
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
                What We <span className="gradient-text">Offer</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover the benefits of being part of IEEE Curtin Colombo.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default About;
