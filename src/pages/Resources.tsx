import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Download, FileText, BookOpen, ExternalLink, Video, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const resources = [
  {
    id: 1,
    title: "Arduino Starter Guide",
    category: "Tutorial",
    type: "PDF",
    icon: FileText,
    description: "Complete beginner's guide to Arduino programming and electronics basics.",
    downloadLink: "#",
  },
  {
    id: 2,
    title: "Python for AI",
    category: "Course Material",
    type: "Slides",
    icon: File,
    description: "Workshop slides covering Python fundamentals for machine learning applications.",
    downloadLink: "#",
  },
  {
    id: 3,
    title: "IoT Project Templates",
    category: "Templates",
    type: "Code",
    icon: FileText,
    description: "Ready-to-use code templates for common IoT projects and sensor integrations.",
    downloadLink: "#",
  },
  {
    id: 4,
    title: "Web Development Basics",
    category: "Tutorial",
    type: "Video",
    icon: Video,
    description: "Video series on HTML, CSS, and JavaScript for beginners.",
    downloadLink: "#",
  },
];

const usefulLinks = [
  {
    title: "IEEE Xplore",
    description: "Access the world's largest technical literature database.",
    url: "https://ieeexplore.ieee.org",
    icon: BookOpen,
  },
  {
    title: "IEEE Student Activities",
    description: "Resources and programs specifically for IEEE student members.",
    url: "https://students.ieee.org",
    icon: ExternalLink,
  },
  {
    title: "IEEE Sri Lanka Section",
    description: "Connect with the local IEEE community in Sri Lanka.",
    url: "#",
    icon: ExternalLink,
  },
];

const Resources = () => {
  return (
    <>
      <Helmet>
        <title>Resources | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Access downloadable materials, tutorials, and useful IEEE links at IEEE Curtin Colombo Student Branch."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                Resources
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Learning <span className="gradient-text">Resources</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Access tutorials, guides, and materials to enhance your technical skills.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Downloadable Resources */}
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
                Downloadable <span className="gradient-text">Materials</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Free resources created by our members for students.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 card-hover flex gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-secondary text-xs font-medium">
                        {resource.category}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {resource.description}
                    </p>
                    <Button variant="outline_glow" size="sm" className="group">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Useful Links */}
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
                Useful <span className="gradient-text">Links</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Essential IEEE resources and external links.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {usefulLinks.map((link, index) => (
                <motion.a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-6 rounded-2xl bg-card border border-border/50 text-center card-hover"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <link.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {link.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Resources;
