import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Tech Innovation Summit 2025",
    date: "Jan 15, 2025",
    time: "9:00 AM",
    location: "Main Auditorium",
    type: "Conference",
    featured: true,
    description:
      "Join us for an inspiring day of tech talks, networking, and innovation showcases.",
  },
  {
    title: "AI & Machine Learning Workshop",
    date: "Jan 22, 2025",
    time: "2:00 PM",
    location: "Lab 302",
    type: "Workshop",
    featured: false,
    description: "Hands-on workshop covering neural networks and deep learning fundamentals.",
  },
  {
    title: "Robotics Competition",
    date: "Feb 5, 2025",
    time: "10:00 AM",
    location: "Engineering Block",
    type: "Competition",
    featured: false,
    description: "Annual robotics challenge with teams competing in autonomous navigation.",
  },
];

export function EventsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="events"
      ref={ref}
      className="snap-section relative flex items-center py-20 lg:py-0"
    >
      {/* Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-l from-primary/5 to-transparent rounded-l-full" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
            Events
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join our workshops, competitions, and networking sessions to enhance
            your skills and connect with fellow innovators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group rounded-2xl overflow-hidden card-hover ${
                event.featured
                  ? "md:col-span-2 lg:col-span-1 bg-gradient-to-br from-primary/20 to-card border-primary/30"
                  : "bg-card border-border/50"
              } border`}
            >
              {event.featured && (
                <div className="px-4 py-2 bg-primary/20 border-b border-primary/30">
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    Featured Event
                  </span>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                    {event.type}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
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
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="outline_glow" size="lg" className="group">
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
