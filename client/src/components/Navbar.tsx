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

  // On desktop: transparent when at top; on mobile: always solid for readability
  const isDesktopTransparent = !isScrolled && !mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        // Mobile always solid; desktop transparent at top
        isScrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border py-3"
          : "bg-background/95 backdrop-blur-md border-b border-border py-3 md:bg-transparent md:backdrop-blur-none md:border-none md:py-5",
        isDesktopTransparent ? "text-foreground md:text-white" : "text-foreground"
      )}
    >
      {/* Top gradient strip for readability over hero — desktop only */}
      {isDesktopTransparent && (
        <div className="absolute inset-0 hidden md:block bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      )}
      <div className="container mx-auto px-4 md:px-12 flex items-center justify-between relative">
        <Link
          href="/"
          className="flex items-center z-50 relative group flex-1 min-w-0 mr-3 md:flex-none md:mr-0"
        >
          {/* Brand name */}
          <span
            className={cn(
              "text-sm sm:text-base md:text-2xl tracking-[0.1em] sm:tracking-[0.14em] md:tracking-[0.18em] uppercase font-display font-semibold leading-none transition-all truncate",
              isDesktopTransparent ? "text-foreground md:text-white md:drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" : "text-foreground"
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
                isDesktopTransparent ? "drop-shadow-[0_1px_6px_rgba(0,0,0,1)]" : "",
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
          className="md:hidden z-50 relative flex-shrink-0 p-1 -mr-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-500 ease-in-out md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Semi-transparent background backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <nav
          className={cn(
            "absolute top-0 right-0 h-screen w-[85%] max-w-xs bg-gradient-to-b from-foreground to-foreground/95 text-white px-6 pt-32 pb-10 flex flex-col items-end gap-8 transition-transform duration-500 ease-in-out shadow-2xl",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-2xl sm:text-3xl font-display transition-colors duration-300 text-right w-full py-2",
                location === link.href ? "text-primary font-bold" : "text-white hover:text-primary"
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
