import { Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Membership", href: "/membership" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org" },
    { label: "IEEE Student Activities", href: "#" },
    { label: "IEEE Sri Lanka", href: "#" },
    { label: "Newsletter", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-lg">
                  I
                </span>
              </div>
              <span className="font-display font-semibold text-lg">
                IEEE Curtin Colombo
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Advancing technology for humanity through innovation, education,
              and community.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ieee@curtin.edu.lk</li>
              <li>Curtin Colombo</li>
              <li>Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} IEEE Curtin Colombo Student Branch. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
