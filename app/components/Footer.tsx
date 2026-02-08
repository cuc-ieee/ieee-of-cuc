import { Instagram, Linkedin, Facebook, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

// Updated social links
const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ieee.cuc", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all", label: "LinkedIn" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "Youtube" },
  { icon: MessageCircle, href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ", label: "Whatsapp" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/logo/logo2.png" alt="IEEE Curtin University Colombo" width={250} height={50} />
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Advancing technology for humanity through innovation, education,
              and community.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              <li>Curtin University Colombo</li>
              <li>Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} IEEE Student Branch of Curtin University Colombo. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
