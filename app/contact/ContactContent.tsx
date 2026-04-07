"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav, MobileNav } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CopyToClipboardWrapper } from "@/components/CopyToClipboardWrapper";
import { submitContactForm } from "@/lib/contact";

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/ieee.cuc",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/18JZ8M3B7p/",
    label: "Facebook",
  },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "Youtube" },
  {
    icon: MessageCircle,
    href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ",
    label: "Whatsapp",
  },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContactForm(formData);

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      const description =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";

      toast({
        title: "Error",
        description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <DesktopNav />
      <MobileNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                Contact <span className="gradient-text">Information</span>
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 group">
                  <CopyToClipboardWrapper
                    textToCopy="curtincolombo.ieee@gmail.com"
                    label="Email"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                  </CopyToClipboardWrapper>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">
                      curtincolombo.ieee@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <CopyToClipboardWrapper
                    textToCopy="No. 80 Nawam Mawatha, Colombo 00200"
                    label="Location"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                  </CopyToClipboardWrapper>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      Curtin University Colombo Campus
                      <br />
                      No. 80 Nawam Mawatha,
                      <br />
                      Colombo 02, Sri Lanka
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <CopyToClipboardWrapper
                    textToCopy="+94 72 792 2261"
                    label="Phone Number"
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    <Phone className="w-5 h-5 text-primary" />
                  </CopyToClipboardWrapper>
                  <div>
                    <h3 className="font-semibold mb-1">Phone (secretary)</h3>
                    <p className="text-muted-foreground">+94 72 792 2261</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl p-6 md:p-8 bg-card border border-border/50"
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Send a <span className="gradient-text">Message</span>
              </h2>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="events">Events & Workshops</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full group"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden border border-border/50 h-80 bg-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.305911878678!2d79.849452074861!3d6.91863369308097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2598e4891314b%3A0xc54d930bba52fae8!2sCurtin%20University%20Colombo!5e1!3m2!1sen!2slk!4v1769868205900!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
