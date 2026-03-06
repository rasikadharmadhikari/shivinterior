import { Link } from "wouter";
import { Phone, MapPin, Facebook } from "lucide-react";
import { GSAPReveal } from "@/components/GSAPReveal";

export function Footer() {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">

      {/* Animated gold top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Decorative spinning rings */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-primary/8 animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full border-dashed border border-primary/6 animate-spin-reverse pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Brand */}
          <GSAPReveal delay={0} className="md:col-span-2">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-primary" />
                <h2 className="text-3xl font-display tracking-wider">SHIV INTERIORS</h2>
              </div>
              <p className="text-background/55 max-w-sm mb-8 font-light leading-relaxed text-sm">
                Interior Designing & Consulting Firm providing complete Turnkey
                Interior Solutions for Residential and Commercial projects with
                budget-friendly designs, timely delivery, and personal supervision.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/share/16yjiLwBC4/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-background/15 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="tel:09370455666"
                  className="w-10 h-10 rounded-full border border-background/15 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="Call SHIV INTERIORS"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </GSAPReveal>

          {/* Navigation */}
          <GSAPReveal delay={0.15}>
            <div>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-7 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/40 inline-block" />Quick Links
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Projects", href: "/projects" },
                  { label: "Testimonials", href: "/testimonials" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/65 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300 inline-block" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </GSAPReveal>

          {/* Address */}
          <GSAPReveal delay={0.25}>
            <div>
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-background/40 mb-7 flex items-center gap-2">
                <span className="w-4 h-px bg-primary/40 inline-block" />Get in Touch
              </h3>
              <ul className="flex flex-col gap-5 text-sm">
                <li className="flex items-start gap-3 text-background/65 leading-relaxed">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>
                    S. No, Ganapati Matha, 44/2,<br />
                    NDA Road, Vitthal Nagar,<br />
                    Warje, Pune – 411058
                  </span>
                </li>
                <li>
                  <a href="tel:09370455666" className="flex items-center gap-3 text-background/65 hover:text-primary transition-colors duration-300">
                    <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                    09370455666
                  </a>
                </li>
              </ul>
            </div>
          </GSAPReveal>

        </div>

        {/* Bottom bar */}
        <GSAPReveal delay={0.3}>
          <div className="mt-16 pt-8 border-t border-background/8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/30">
            <p>&copy; {new Date().getFullYear()} SHIV INTERIORS. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <span>Interior Designer & Consultant</span>
              <span className="text-primary/40">·</span>
              <span>Turnkey Interior Solutions</span>
            </div>
          </div>
        </GSAPReveal>
      </div>

    </footer>
  );
}