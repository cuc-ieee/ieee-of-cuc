import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ArrowRight, Cpu, Brain, Wifi, Wrench, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const projects = [
  {
    id: 1,
    title: "Smart Campus IoT Network",
    category: "IoT",
    status: "Ongoing",
    icon: Wifi,
    description:
      "Developing a comprehensive IoT network for campus-wide environmental monitoring, including temperature, humidity, and air quality sensors.",
    technologies: ["Arduino", "Raspberry Pi", "MQTT", "Python"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "AI-Powered Study Assistant",
    category: "Artificial Intelligence",
    status: "Ongoing",
    icon: Brain,
    description:
      "Creating an intelligent study companion using natural language processing to help students with course materials and exam preparation.",
    technologies: ["Python", "TensorFlow", "NLP", "React"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Autonomous Line-Following Robot",
    category: "Robotics",
    status: "Completed",
    icon: Cpu,
    description:
      "Built a robot capable of navigating complex paths using computer vision and sensor fusion for the national robotics competition.",
    technologies: ["Arduino", "OpenCV", "C++", "3D Printing"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
  },
];

const initiatives = [
  {
    icon: Code,
    title: "Code for Community",
    description: "Building software solutions for local NGOs and community organizations.",
  },
  {
    icon: Lightbulb,
    title: "STEM Outreach",
    description: "Conducting workshops at schools to inspire the next generation of engineers.",
  },
  {
    icon: Wrench,
    title: "Tech Repair Clinic",
    description: "Free tech support and device repair services for the campus community.",
  },
];

const Projects = () => {
  return (
    <>
      <Helmet>
        <title>Projects & Initiatives | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Explore ongoing student projects and community initiatives at IEEE Curtin Colombo - from IoT to AI to robotics."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                Projects
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Discover innovative student projects and community initiatives
                making a real-world impact.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Explore our latest technical projects spanning IoT, AI, and robotics.
              </p>
            </motion.div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl bg-card border border-border/50 overflow-hidden card-hover"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <project.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                          {project.category}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Ongoing"
                              ? "bg-primary/20 text-primary"
                              : "bg-accent/20 text-accent"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-2xl mb-3">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-lg bg-secondary/50 border border-border/50 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Button variant="outline_glow" className="w-fit group">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Initiatives */}
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
                Community <span className="gradient-text">Initiatives</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Giving back to the community through technology and education.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-card border border-border/50"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                    <initiative.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {initiative.description}
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

export default Projects;
