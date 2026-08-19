"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CopyToClipboardWrapper } from "@/components/CopyToClipboardWrapper";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const socialLinks = site.social.map((link) => ({
  icon:
    link.label === "Instagram"
      ? Instagram
      : link.label === "LinkedIn"
        ? Linkedin
        : link.label === "Facebook"
          ? Facebook
          : link.label === "YouTube"
            ? Youtube
            : MessageCircle,
  ...link,
}));

const contactRows = [
  {
    icon: Mail,
    copy: site.org.email,
    label: "Email",
    detail: "For general enquiries",
  },
  {
    icon: MapPin,
    copy: site.org.location,
    label: "Location",
    detail: site.org.campus,
  },
  {
    icon: Phone,
    copy: site.org.phone,
    label: "Phone",
    detail: site.org.phoneNote,
  },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

type Errors = Partial<Record<keyof typeof initialForm, string>>;

export default function ContactContent() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.firstName.trim()) e.firstName = "Please add your first name.";
    if (!form.lastName.trim()) e.lastName = "Please add your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.subject) e.subject = "Please choose a topic.";
    if (form.message.trim().length < 10)
      e.message = "Your message should be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to send message");
      toast({
        title: "Message sent",
        description: "Thanks — the committee will get back to you shortly.",
      });
      setForm(initialForm);
    } catch {
      toast({
        title: "Something went wrong",
        description: "We couldn't send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        index="00"
        eyebrow="Contact"
        title={
          <>
            Get in <span className="font-serif italic text-blue">touch.</span>
          </>
        }
        lede="Questions, collaborations, or sponsorship — write to the branch. We read everything and reply from the committee inbox."
        meta={
          <>
            <span>Response within a few days</span>
            <span>English · Sinhala · Tamil</span>
          </>
        }
        media={site.pageHero.contact}
      />

      <section className="border-b border-line-soft bg-surface-deep">
        <Container className="grid gap-16 py-16 sm:py-24 lg:grid-cols-12 lg:gap-20">
          {/* Info */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-blue">01</span>
                <span className="eyebrow">Details</span>
              </div>
            </Reveal>

            <div className="border-t border-line">
              {contactRows.map((row) => (
                <Reveal key={row.label}>
                  <CopyToClipboardWrapper
                    textToCopy={row.copy}
                    label={row.label}
                    className="!flex border-b border-line py-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-blue">
                      <row.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="eyebrow block mb-1">{row.label}</span>
                      <span className="block font-display text-base font-medium tracking-tight text-ink-strong sm:text-lg">
                        {row.copy}
                      </span>
                      <span className="mt-1 block text-xs text-ink-faint">{row.detail}</span>
                    </span>
                  </CopyToClipboardWrapper>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-10">
                <p className="eyebrow mb-4">Follow the branch</p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-11 w-11 items-center justify-center border border-line bg-surface text-ink-muted transition-colors duration-300 hover:border-blue hover:text-blue"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="mb-8 flex items-center gap-3">
                <span className="font-mono text-[0.6875rem] text-blue">02</span>
                <span className="eyebrow">Write to us</span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <form onSubmit={handleSubmit} noValidate className="border-t border-line">
                <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label htmlFor="firstName" className="eyebrow block mb-2">
                      First name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      className={cn(
                        "w-full border-b bg-transparent py-2 text-ink-strong placeholder:text-ink-faint focus:border-blue focus:outline-none",
                        errors.firstName ? "border-destructive" : "border-line-strong",
                      )}
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="mt-2 text-xs text-destructive">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="lastName" className="eyebrow block mb-2">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      className={cn(
                        "w-full border-b bg-transparent py-2 text-ink-strong placeholder:text-ink-faint focus:border-blue focus:outline-none",
                        errors.lastName ? "border-destructive" : "border-line-strong",
                      )}
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="mt-2 text-xs text-destructive">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="eyebrow block mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={cn(
                        "w-full border-b bg-transparent py-2 text-ink-strong placeholder:text-ink-faint focus:border-blue focus:outline-none",
                        errors.email ? "border-destructive" : "border-line-strong",
                      )}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="eyebrow block mb-2">
                      Topic
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={cn(
                        "w-full border-b bg-transparent py-2 text-ink-strong focus:border-blue focus:outline-none",
                        !form.subject && "text-ink-faint",
                        errors.subject ? "border-destructive" : "border-line-strong",
                      )}
                    >
                      <option value="" disabled>
                        Choose a topic
                      </option>
                      <option value="membership">Membership inquiry</option>
                      <option value="events">Events & workshops</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="sponsorship">Sponsorship</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p id="subject-error" className="mt-2 text-xs text-destructive">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="eyebrow block mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn(
                        "w-full resize-none border-b bg-transparent py-2 text-ink-strong placeholder:text-ink-faint focus:border-blue focus:outline-none",
                        errors.message ? "border-destructive" : "border-line-strong",
                      )}
                      placeholder="Tell us what you need…"
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? "Sending…" : "Send message"}
                    {!loading && <ArrowUpRight className="h-4 w-4" />}
                  </Button>
                  <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint">
                    Delivered to the committee inbox
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map */}
      <section className="border-b border-line-soft bg-background">
        <Container className="py-16 sm:py-24">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.6875rem] text-blue">03</span>
              <span className="eyebrow">Find us</span>
            </div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-widest2 text-ink-faint">
              No. 80 Nawam Mawatha · Colombo 02
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative h-[24rem] overflow-hidden border border-line bg-surface sm:h-[28rem]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.305911878678!2d79.849452074861!3d6.91863369308097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2598e4891314b%3A0xc54d930bba52fae8!2sCurtin%20University%20Colombo!5e1!3m2!1sen!2slk!4v1769868205900!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.4) brightness(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Curtin University Colombo on Google Maps"
              />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}