import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, CheckCircle, Award, Clock, Users, Home as HomeIcon, MoveDown, ChevronLeft, ChevronRight } from "lucide-react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useProjects } from "@/hooks/use-projects";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  const scrollProjects = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const { data: projects = [], isLoading } = useProjects();
  const featuredProjects = projects.slice(0, 6);

  // Re-check arrow visibility after projects load
  useEffect(() => {
    if (!isLoading) setTimeout(updateScrollState, 50);
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const tl = gsap.timeline();
    if (heroRef.current) {
      gsap.to(heroRef.current, { scale: 1.06, duration: 22, repeat: -1, yoyo: true, ease: "none" });
    }
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "power4.out" });
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6");
    }
    if (lineRef.current) {
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut", transformOrigin: "left" }, "-=0.5");
    }
  }, []);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative flex items-end overflow-hidden" style={{minHeight:'100svh'}}>
        <div
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920')" }}
        />
        {/* layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Floating decorative gold orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[18%] right-[25%] w-80 h-80 rounded-full bg-primary/10 blur-[90px] animate-blob" />
          <div className="absolute bottom-[20%] right-[10%] w-[26rem] h-[26rem] rounded-full bg-amber-950/12 blur-[110px] animate-blob" style={{animationDelay:'4.5s'}} />
          <div className="absolute top-[48%] left-[8%] w-52 h-52 rounded-full bg-primary/7 blur-[70px] animate-float" style={{animationDelay:'2s'}} />
        </div>

        {/* scroll indicator */}
        <div className="absolute right-8 md:right-14 bottom-24 z-10 hidden md:flex flex-col items-center gap-3">
          <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <MoveDown className="w-4 h-4 text-primary animate-bounce" />
        </div>

        {/* hero text */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 pb-16 md:pb-28 w-full">
         
          <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[9rem] font-display text-white leading-[0.9] mb-6 tracking-tight">
            Spaces<br />
            <span className="italic text-primary/90 pl-8 md:pl-24">Inspire.</span>
          </h1>
          <div ref={lineRef} className="w-full max-w-lg h-px bg-white/15 mb-8" />
          <p ref={subtitleRef} className="text-lg md:text-xl text-white/90 max-w-md mb-10 leading-relaxed font-light">
            Turnkey Interior Solutions for Residential &amp; Commercial Spaces —
            crafted with 20+ years of excellence across Pune &amp; beyond.
          </p>
          <GSAPReveal delay={1.1}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="btn-shimmer inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-semibold hover:bg-primary/85 transition group"
              >
                View Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white/90 uppercase tracking-widest text-sm hover:border-white hover:text-white transition"
              >
                Connect With Us
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* ── TICKER / MARQUEE ────────────────────────────────────── */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
        <div className="flex gap-0 animate-[marquee_25s_linear_infinite] whitespace-nowrap w-max">
          {Array(3).fill(["Residential Interiors", "Commercial Spaces", "Turnkey Execution", "Modular Kitchens", "False Ceilings", "Custom Joinery", "Vastu Compliant Design", "On-Time Delivery"]).flat().map((item, i) => (
            <span key={i} className="inline-flex items-center text-sm tracking-[0.25em] uppercase font-medium mx-8">
              {item} <span className="w-1 h-1 rounded-full bg-primary-foreground/40 ml-8" />
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ───────────────────────────────────────────────── */}
      <section className="bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: 20,  suffix: "+", label: "Years Experience",   icon: Award },
              { num: 200, suffix: "+", label: "Projects Delivered",  icon: HomeIcon },
              { num: 6,   suffix: "+", label: "Cities Served",       icon: Users },
              { num: 100, suffix: "%", label: "Turnkey Delivery",    icon: Clock },
            ].map((stat, i) => (
              <GSAPReveal key={i} delay={i * 0.1}>
                <div className="py-10 px-6 md:px-10 text-center border-r border-background/10 last:border-r-0 group">
                  <stat.icon className="w-4 h-4 text-primary mx-auto mb-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <AnimatedCounter value={stat.num} suffix={stat.suffix} className="text-4xl md:text-5xl font-display text-primary mb-1 leading-none block" />
                  <div className="w-8 h-px bg-primary/30 mx-auto my-2 group-hover:w-14 transition-all duration-500" />
                  <p className="text-sm uppercase tracking-[0.15em] text-background/85">{stat.label}</p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <GSAPReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" />What We Do
              </p>
              <h2 className="text-4xl md:text-6xl font-display leading-tight">Our Expertise</h2>
            </GSAPReveal>
            <GSAPReveal delay={0.2}>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:underline">
                About Us <ArrowUpRight className="w-4 h-4" />
              </Link>
            </GSAPReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-border">
            {[
              { num: "01", title: "Residential Interiors", desc: "Bedrooms, living rooms, kitchens, wardrobes — complete home transformation from concept to handover.", img: "/site-photos/kkp-room4.jpg" },
              { num: "02", title: "Commercial Spaces", desc: "Offices, showrooms, hospitality — interiors that project professionalism and elevate brand identity.", img: "/site-photos/cc-33.jpg" },
              { num: "03", title: "Turnkey Execution", desc: "End-to-end project management: design, procurement, fabrication, installation and handover.", img: "/site-photos/kkp-dombivali.jpg" },
              { num: "04", title: "Institutional & Industrial", desc: "Large-scale institutional fit-outs and industrial interiors with durable, purpose-built solutions.", img: "/site-photos/cc-27.jpg" },
            ].map((s, i) => (
              <GSAPReveal key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden border-r border-border last:border-r-0 cursor-default">
                  {/* image behind */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition duration-700 opacity-0 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-foreground/85" />
                  </div>
                  <div className="relative p-8 md:p-10 min-h-[300px] flex flex-col justify-between">
                    <span className="text-5xl font-display text-white/20 group-hover:text-primary/50 transition leading-none">{s.num}</span>
                    <div>
                      <h3 className="text-2xl font-display mb-3 text-white/90 group-hover:text-primary transition">{s.title}</h3>
                      <p className="text-base text-white/65 leading-relaxed group-hover:text-white/85 transition">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SPLIT ─────────────────────────────────────────── */}
      <section className="py-0 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* image left — full height */}
          <GSAPReveal>
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <img
                src="/site-photos/kkp-room1.jpg"
                alt="KKP Dombivali – completed by Shiv Interiors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white/90 font-display text-lg">KKP Dombivali</p>
                <p className="text-primary text-sm uppercase tracking-widest mt-1">Residential · Completed 2025</p>
              </div>
            </div>
          </GSAPReveal>

          {/* text right */}
          <GSAPReveal delay={0.2}>
            <div className="flex flex-col justify-center px-10 md:px-16 lg:px-20 py-20">
              <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" />About Us
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-snug mb-6">
                Two Decades of<br />Crafting <span className="italic text-primary">Dream</span><br />Spaces
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                SHIV INTERIORS is a turnkey interior design firm based in Pune with 20+ years of
                delivering residential and commercial spaces across Maharashtra, Navi Mumbai and Secunderabad.
                Concept to completion — under one roof.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { label: "Budget Friendly", sub: "Quality within your budget" },
                  { label: "Turnkey Execution", sub: "Everything under one roof" },
                  { label: "On-Time Delivery", sub: "Committed timelines" },
                  { label: "Personal Supervision", sub: "Hands-on oversight" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 py-3 border-b border-border group">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-primary group w-fit">
                Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* ── SELECTED PROJECTS ───────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-14">
            <GSAPReveal>
              <p className="text-sm tracking-[0.3em] uppercase text-primary mb-3 flex items-center gap-3">
                <span className="w-6 h-px bg-primary" />Our Work
              </p>
              <h2 className="text-4xl md:text-5xl font-display">Selected Projects</h2>
            </GSAPReveal>
            <GSAPReveal delay={0.2}>
              <Link href="/projects" className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition group">
                View All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </GSAPReveal>
          </div>

          {/* ── ARROW-CONTROLLED SCROLL STRIP ── */}
          <div className="relative">

            {/* left arrow — only when not at start */}
            {canScrollLeft && (
              <button
                onClick={() => scrollProjects("left")}
                className="absolute left-0 top-1/2 -translate-y-8 z-10 w-11 h-11 flex items-center justify-center bg-background border border-border hover:border-primary hover:text-primary transition-all shadow-md -translate-x-5 animate-in fade-in duration-200"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* right arrow — only when more content to the right */}
            {canScrollRight && (
              <button
                onClick={() => scrollProjects("right")}
                className="absolute right-0 top-1/2 -translate-y-8 z-10 w-11 h-11 flex items-center justify-center bg-background border border-border hover:border-primary hover:text-primary transition-all shadow-md translate-x-5 animate-in fade-in duration-200"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* scrollable strip */}
            {isLoading ? (
              <div className="flex gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex-shrink-0 w-72">
                    <div className="aspect-[3/4] bg-muted animate-pulse" />
                    <div className="h-5 bg-muted rounded mt-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={scrollRef}
                onScroll={updateScrollState}
                className="overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex gap-6 min-w-max">
                  {featuredProjects.map((project) => (
                    <div key={project.id} className="flex-shrink-0 w-72 md:w-80 group cursor-pointer">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="pt-4 pb-2 border-b border-border">
                        <h3 className="text-lg md:text-xl font-display leading-snug group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-sm uppercase tracking-[0.15em] text-primary/80 mt-1">{project.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-primary group"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>




      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img src="/site-photos/kkp-room3.jpg" alt="Interior" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <GSAPReveal>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white leading-tight mb-8">
              Let's Build Something<br /><span className="italic text-primary">Beautiful Together</span>
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-10 text-lg md:text-xl leading-relaxed font-light">
              Share your vision with us — we'll handle everything from design to delivery.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-shimmer inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-semibold hover:bg-primary/85 transition group">
                Reach With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-3 px-10 py-4 border border-white/40 text-white/90 uppercase tracking-widest text-sm hover:border-white hover:text-white transition">
                Browse Projects
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

    </div>
  );
}
