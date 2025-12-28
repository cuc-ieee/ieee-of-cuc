import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { upcomingEvents, pastEvents } from "@/data/events";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <>
      <Helmet>
        <title>Events | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Discover upcoming workshops, competitions, and networking events at IEEE Curtin Colombo Student Branch."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                Events
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Events</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Join our workshops, competitions, and networking sessions to enhance
                your skills and connect with fellow innovators.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "upcoming"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "past"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Past Events
              </button>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {activeTab === "upcoming" ? (
              <div className="space-y-8">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`rounded-2xl overflow-hidden border card-hover ${
                      event.featured
                        ? "bg-gradient-to-br from-primary/10 to-card border-primary/30"
                        : "bg-card border-border/50"
                    }`}
                  >
                    <div className="grid md:grid-cols-3 gap-0">
                      <div className="aspect-video md:aspect-auto overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
                        {event.featured && (
                          <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-3">
                            Featured Event
                          </span>
                        )}
                        <span className="inline-block w-fit px-3 py-1 rounded-full bg-secondary text-xs font-medium mb-3">
                          {event.type}
                        </span>
                        <h3 className="font-display font-semibold text-2xl mb-3">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        <Link to={`/events/${event.slug}`}>
                          <Button variant="outline_glow" className="w-fit group">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="rounded-2xl bg-card border border-border/50 overflow-hidden card-hover"
                  >
                    <Link to={`/events/${event.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                            {event.type}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {event.date}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {event.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Events;
