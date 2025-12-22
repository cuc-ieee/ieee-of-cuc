import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Calendar, MapPin, Clock, ArrowLeft, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { allEvents } from "@/data/events";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = allEvents.find((e) => e.slug === slug);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{event.title} | IEEE Curtin Colombo Student Branch</title>
        <meta name="description" content={event.description} />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  {event.type}
                </span>
                {event.featured && (
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                    Featured Event
                  </span>
                )}
                {event.isPast && (
                  <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    Past Event
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{event.time}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Event Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="rounded-2xl overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full aspect-video object-cover"
                  />
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="prose prose-invert max-w-none"
                >
                  <h2 className="font-display text-2xl font-semibold mb-4">About This Event</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {event.fullDescription || event.description}
                  </p>
                </motion.div>

                {/* Agenda */}
                {event.agenda && event.agenda.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="font-display text-2xl font-semibold mb-6">Event Agenda</h2>
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 rounded-xl bg-card border border-border/50"
                        >
                          <div className="flex-shrink-0 w-24 text-primary font-medium">
                            {item.time}
                          </div>
                          <div className="text-foreground">{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Outcomes (for past events) */}
                {event.outcomes && event.outcomes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="font-display text-2xl font-semibold mb-6">Event Outcomes</h2>
                    <div className="space-y-3">
                      {event.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Gallery (for past events) */}
                {event.gallery && event.gallery.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h2 className="font-display text-2xl font-semibold mb-6">Event Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.gallery.map((img, index) => (
                        <div key={index} className="rounded-xl overflow-hidden aspect-video">
                          <img
                            src={img}
                            alt={`${event.title} gallery ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Registration Card (for upcoming events) */}
                {!event.isPast && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl bg-card border border-border/50 p-6"
                  >
                    <h3 className="font-display text-xl font-semibold mb-4">Register Now</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Secure your spot for this exciting event. Limited seats available!
                    </p>
                    <Button variant="glow" className="w-full">
                      Register for Event
                    </Button>
                  </motion.div>
                )}

                {/* Speakers */}
                {event.speakers && event.speakers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="rounded-2xl bg-card border border-border/50 p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-xl font-semibold">Speakers</h3>
                    </div>
                    <div className="space-y-4">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {speaker.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{speaker.name}</div>
                            <div className="text-muted-foreground text-xs">{speaker.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Event Details Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="rounded-2xl bg-card border border-border/50 p-6"
                >
                  <h3 className="font-display text-xl font-semibold mb-4">Event Details</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">{event.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time</span>
                        <span className="font-medium">{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Venue</span>
                        <span className="font-medium text-right">{event.location}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default EventDetail;
