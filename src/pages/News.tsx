import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Calendar, Award, Users, ExternalLink } from "lucide-react";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const news = [
  {
    id: 1,
    title: "IEEE Curtin Colombo Wins Best Student Branch Award",
    date: "Dec 15, 2024",
    category: "Achievement",
    icon: Award,
    excerpt:
      "Our student branch has been recognized as the Best Student Branch at the IEEE Sri Lanka Section Annual Awards for outstanding contributions to technical education.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Partnership with Tech Giants for Summer Internships",
    date: "Dec 10, 2024",
    category: "Collaboration",
    icon: Users,
    excerpt:
      "We've established partnerships with leading tech companies to provide exclusive internship opportunities for our members starting summer 2025.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "IEEE Student Scholarship Applications Now Open",
    date: "Dec 5, 2024",
    category: "Opportunity",
    icon: Calendar,
    excerpt:
      "Apply for the IEEE Student Scholarship Program offering financial support and mentorship for exceptional engineering students.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Hackathon Team Advances to National Finals",
    date: "Nov 28, 2024",
    category: "Competition",
    icon: Award,
    excerpt:
      "Our hackathon team 'CodeBreakers' has qualified for the national finals after an impressive performance at the regional competition.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
  },
];

const announcements = [
  {
    title: "New Member Orientation",
    date: "Jan 5, 2025",
    description: "Join us for the new member orientation session to learn about IEEE benefits and activities.",
  },
  {
    title: "Workshop Registration Open",
    date: "Jan 8, 2025",
    description: "Registration is now open for the upcoming Python for Data Science workshop series.",
  },
  {
    title: "Annual General Meeting",
    date: "Jan 20, 2025",
    description: "All members are invited to attend the Annual General Meeting for committee elections.",
  },
];

const News = () => {
  return (
    <>
      <Helmet>
        <title>News & Announcements | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Stay updated with the latest news, achievements, and announcements from IEEE Curtin Colombo Student Branch."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                News
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                News & <span className="gradient-text">Updates</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Stay informed about our achievements, announcements, and upcoming opportunities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main News */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Latest <span className="gradient-text">News</span>
                </h2>
                {news.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="rounded-2xl bg-card border border-border/50 overflow-hidden card-hover"
                  >
                    <div className="grid sm:grid-cols-3 gap-0">
                      <div className="aspect-video sm:aspect-auto overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:col-span-2 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="px-2 py-1 rounded bg-secondary text-xs font-medium">
                            {item.category}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Sidebar - Announcements */}
              <div>
                <h2 className="font-display text-2xl font-bold mb-6">
                  <span className="gradient-text">Announcements</span>
                </h2>
                <div className="space-y-4">
                  {announcements.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-card border border-border/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-primary text-sm font-medium">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-card border border-primary/30">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      IEEE Sri Lanka Updates
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Scholarship Portal
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Event Calendar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default News;
