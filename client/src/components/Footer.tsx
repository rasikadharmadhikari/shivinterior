import { Link } from "wouter";
import { Phone, MapPin, Facebook, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { useState } from "react";

export function Footer() {
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <footer className="relative bg-foreground text-background overflow-hidden">

      {/* Animated gold top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Decorative spinning rings */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-primary/8 animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full border-dashed border border-primary/6 animate-spin-reverse pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 pt-16 md:pt-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12 pb-12 border-b border-background/10">
          
          {/* LEFT SECTION - Profile */}
          <GSAPReveal delay={0} className="flex flex-col items-center md:items-start">
            <div className="text-center md:text-left">
              {/* Profile Image with Border Ring */}
              <div 
                className="mb-6 cursor-pointer group inline-block"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
                onClick={() => window.open('/admin', '_blank')}
                role="button"
                tabIndex={0}
                aria-label="Open Admin Panel"
              >
                <div className="relative">
                  {/* Outer decorative ring */}
                  <div 
                    className="absolute -inset-2 rounded-full border-2 border-primary/40 transition-all duration-500"
                    style={{
                      transform: isImageHovered ? 'scale(1.15)' : 'scale(1)',
                      opacity: isImageHovered ? 1 : 0.5
                    }}
                  />
                  
                  {/* Main circular image */}
                  <div className="relative overflow-hidden rounded-full border-4 border-primary/60 w-32 h-32 md:w-40 md:h-40 shadow-2xl flex-shrink-0 bg-gradient-to-br from-secondary/50 to-secondary/20 flex items-center justify-center transition-all duration-500 group-hover:shadow-primary/40 group-hover:shadow-xl">
                    <img 
                      src="/site-photos/shivphotomodified.png" 
                      alt="Shiv Interior Design" 
                      className="w-full h-full object-contain p-2 transition-all duration-500 ease-out group-hover:scale-105"
                      style={{
                        filter: isImageHovered ? 'brightness(1.05) contrast(1.1)' : 'brightness(1) contrast(1)',
                        transform: isImageHovered ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Name and Title */}
              <h3 className="text-xl md:text-2xl font-display tracking-wider text-background mb-1 hover:text-primary transition-colors duration-300">
                Founder & CEO
              </h3>
              <p className="text-sm text-background/60 mb-6 font-light">SHIV INTERIORS</p>

              {/* Social Icons */}
              <div className="flex justify-center md:justify-start gap-4">
                {[
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Facebook, href: "https://www.facebook.com/share/16yjiLwBC4/", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" }
                ].map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredSocial(social.label)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="group relative w-12 h-12 rounded-full border-2 border-background/30 hover:border-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30 bg-background/5 hover:bg-primary/10"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-background/70 group-hover:text-primary transition-all duration-300 group-hover:rotate-12" />
                    </a>
                  );
                })}
              </div>
            </div>
          </GSAPReveal>

          {/* MIDDLE SECTION - Quick Links */}
          <GSAPReveal delay={0.15}>
            <div>
              <h3 className="text-lg md:text-xl font-display tracking-wider text-background mb-8">
                Quick Links
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/40 mb-6" />
              
              <ul className="flex flex-col gap-4">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Us", href: "/about" },
                  { label: "Projects", href: "/projects" },
                  { label: "Testimonials", href: "/testimonials" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li 
                    key={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="group"
                  >
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-primary transition-all duration-300 flex items-center gap-3 text-sm font-light"
                    >
                      <span 
                        className="w-0 h-1 bg-primary transition-all duration-300 group-hover:w-4"
                      />
                      <span className="relative overflow-hidden">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </GSAPReveal>

          {/* RIGHT SECTION - Contact Us */}
          <GSAPReveal delay={0.25}>
            <div>
              <h3 className="text-lg md:text-xl font-display tracking-wider text-background mb-8">
                Contact Us
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/40 mb-6" />
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="group cursor-pointer">
                  <a 
                    href="tel:09370455666"
                    className="flex items-start gap-3 text-background/70 hover:text-primary transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs font-semibold text-background/60 uppercase tracking-wider mb-1">Phone</p>
                      <span className="text-sm font-light group-hover:underline underline-offset-2">09370455666</span>
                    </div>
                  </a>
                </div>

                {/* Email */}
                <div className="group cursor-pointer">
                  <a 
                    href="mailto:info@shivinteriors.com"
                    className="flex items-start gap-3 text-background/70 hover:text-primary transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs font-semibold text-background/60 uppercase tracking-wider mb-1">Email</p>
                      <span className="text-sm font-light break-all">info@shivinteriors.com</span>
                    </div>
                  </a>
                </div>

                {/* Address */}
                <div className="group cursor-pointer">
                  <div className="flex items-start gap-3 text-background/70 hover:text-primary transition-all duration-300">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xs font-semibold text-background/60 uppercase tracking-wider mb-1">Address</p>
                      <span className="text-sm font-light">
                        21 Prasad Chambers<br />
                        Karve Road, Pune – 411004
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GSAPReveal>

        </div>

        {/* BOTTOM BAR - Copyright & Disclaimer */}
        <div className="py-8">
          <div className="mb-6 pb-6 border-t border-background/8">
            <p className="text-xs text-background/50 leading-relaxed animate-fade-in">
              Disclaimer: Logos and images used in this portfolio are sourced from their respective company websites and remain the property of their original owners. They are shown here for illustrative and reference purposes only.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-background/40">
            <p className="hover:text-background/60 transition-colors duration-300">
              &copy; {new Date().getFullYear()} SHIV INTERIORS. All Rights Reserved.
            </p>
            <div className="flex gap-4">
              <span className="hover:text-background/60 transition-colors duration-300">Interior Designer & Consultant</span>
              <span>·</span>
              <span className="hover:text-background/60 transition-colors duration-300">Turnkey Interior Solutions</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}