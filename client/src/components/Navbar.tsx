import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ];

  const isDarkBackground = !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5",
        isDarkBackground ? "text-white" : "text-foreground"
      )}
    >
      {/* Top gradient strip for readability over hero */}
      {isDarkBackground && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      )}
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center gap-3 z-50 relative group"
        >
          {/* Logo mark */}
          <img
            src="/logo.png"
            alt="Shiv Interiors"
            className={cn(
              "h-10 w-10 md:h-11 md:w-11 object-contain flex-shrink-0 rounded-sm transition-all duration-300 group-hover:scale-105",
              isDarkBackground ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] brightness-110" : ""
            )}
          />
          {/* Brand name */}
          <span
            className={cn(
              "text-xl md:text-2xl tracking-[0.18em] uppercase font-display font-semibold leading-none transition-all",
              isDarkBackground ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" : "text-foreground"
            )}
          >
            SHIV INTERIORS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm lg:text-base font-semibold tracking-[0.2em] uppercase transition-all duration-300 link-underline",
                isDarkBackground ? "drop-shadow-[0_1px_6px_rgba(0,0,0,1)]" : "",
                location === link.href
                  ? "opacity-100 text-primary"
                  : "opacity-80 hover:opacity-100 hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className={cn("w-6 h-6", isDarkBackground && !mobileMenuOpen ? "text-white" : "text-foreground")} />
          ) : (
            <Menu className={cn("w-6 h-6", isDarkBackground ? "text-white" : "text-foreground")} />
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8">
          {/* Logo in mobile menu */}
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Shiv Interiors" className="h-12 w-12 object-contain" />
            <span className="text-xl tracking-[0.18em] uppercase font-display font-semibold text-foreground">SHIV INTERIORS</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-3xl font-display transition-colors duration-300",
                location === link.href ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
