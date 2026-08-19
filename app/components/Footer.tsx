import { Instagram, Linkedin, Facebook, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/ieee.cuc", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-of-cuc/posts/?feedView=all", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/share/18JZ8M3B7p/", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@IEEECUC", label: "YouTube" },
  { icon: MessageCircle, href: "https://chat.whatsapp.com/BU6hIOWUhXLILTp0DaFPYZ", label: "WhatsApp" },
];

const columns = [
  {
    title: "Branch",
    links: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Committee", href: "/committee" },
      { label: "Gallery", href: "/gallery" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    title: "IEEE",
    links: [
      { label: "IEEE.org", href: "https://www.ieee.org" },
      { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org" },
      { label: "IEEE Sri Lanka Section", href: "https://ieee.lk" },
      { label: "Membership Guide", href: "/MembershipPage/IEEEStudentMembershipGuide.pdf" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-surface-deep">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Identity */}
          <div>
            <Link href="/" className="inline-block" aria-label="IEEE Curtin University Colombo">
              <Image
                src="/logo/logo.png"
                alt=""
                width={560}
                height={76}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ink-muted">
              The IEEE Student Branch of Curtin University Colombo — a student-led
              engineering community working across Sri Lanka.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center border border-line bg-surface text-ink-muted transition-colors duration-300 hover:border-blue hover:text-blue"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const external = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      {external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-line text-sm text-ink-muted hover:text-ink-strong"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="link-line text-sm text-ink-muted hover:text-ink-strong"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-5">Contact</h3>
            <ul className="space-y-4 text-sm text-ink-muted">
              <li>
                <a
                  href="mailto:curtincolombo.ieee@gmail.com"
                  className="link-line hover:text-ink-strong"
                >
                  curtincolombo.ieee@gmail.com
                </a>
              </li>
              <li>
                IEEE Student Branch
                <br />
                Curtin University Colombo
                <br />
                No. 80 Nawam Mawatha, Colombo 02, Sri Lanka
              </li>
            </ul>
            <Link
              href="/membership"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue transition-colors hover:text-blue-bright"
            >
              Become a member
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-faint">
            © {new Date().getFullYear()} IEEE Student Branch of Curtin University Colombo
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-widest text-ink-faint">
            Advancing technology for humanity
          </p>
        </div>
      </Container>
    </footer>
  );
}