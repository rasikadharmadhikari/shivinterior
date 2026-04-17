import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, CheckCircle, Award, Clock, Users, Home as HomeIcon, MoveDown, ExternalLink } from "lucide-react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useProjects } from "@/hooks/use-projects";
import { LandingConsultationModal } from "@/components/LandingConsultationModal";
import { ProjectDetailModal } from "@/pages/ProjectDetailModal";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { data: projects = [], isLoading } = useProjects();

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
      <LandingConsultationModal />

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
          <div className="absolute top-[18%] right-[25%] w-40 sm:w-56 md:w-80 h-40 sm:h-56 md:h-80 rounded-full bg-primary/10 blur-[90px] animate-blob" />
          <div className="absolute bottom-[20%] right-[10%] w-32 sm:w-52 md:w-[26rem] h-32 sm:h-52 md:h-[26rem] rounded-full bg-amber-950/12 blur-[110px] animate-blob" style={{animationDelay:'4.5s'}} />
          <div className="absolute top-[48%] left-[8%] w-32 sm:w-40 md:w-52 h-32 sm:h-40 md:h-52 rounded-full bg-primary/7 blur-[70px] animate-float" style={{animationDelay:'2s'}} />
        </div>

        {/* scroll indicator */}
        <div className="absolute right-4 sm:right-8 md:right-14 bottom-16 sm:bottom-20 md:bottom-24 z-10 hidden md:flex flex-col items-center gap-3">
          <span className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.3em] uppercase" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          <MoveDown className="w-4 h-4 text-primary animate-bounce" />
        </div>

        {/* hero text */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-28 w-full">
         
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display text-white leading-[0.9] mb-4 sm:mb-6 tracking-tight">
            Spaces<br />
            <span className="italic text-primary/90 pl-2 sm:pl-8 md:pl-16 lg:pl-24">Inspire.</span>
          </h1>
          <div ref={lineRef} className="w-full max-w-lg h-px bg-white/15 mb-6 sm:mb-8" />
          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl text-white/90 max-w-md mb-8 sm:mb-10 leading-relaxed font-light">
            Turnkey Interior Solutions for Residential &amp; Commercial Spaces —
            crafted with 20+ years of excellence across Pune &amp; beyond.
          </p>
          <GSAPReveal delay={1.1}>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/projects"
                className="btn-shimmer inline-flex items-center justify-center sm:justify-start gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground uppercase tracking-widest text-xs sm:text-sm font-semibold hover:bg-primary/85 transition group w-full sm:w-auto"
              >
                View Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center sm:justify-start gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white/90 uppercase tracking-widest text-xs sm:text-sm hover:border-white hover:text-white transition w-full sm:w-auto"
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
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: 20,  suffix: "+", label: "Years Experience",   icon: Award },
              { num: 200, suffix: "+", label: "Projects Delivered",  icon: HomeIcon },
              { num: 6,   suffix: "+", label: "Cities Served",       icon: Users },
              { num: 100, suffix: "%", label: "Turnkey Delivery",    icon: Clock },
            ].map((stat, i) => (
              <GSAPReveal key={i} delay={i * 0.1}>
                <div className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-10 text-center border-r border-background/10 last:border-r-0 group">
                  <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-primary mx-auto mb-2 sm:mb-3 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <AnimatedCounter value={stat.num} suffix={stat.suffix} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-primary mb-1 leading-none block" />
                  <div className="w-6 sm:w-7 h-px bg-primary/30 mx-auto my-1.5 sm:my-2 group-hover:w-10 sm:group-hover:w-12 transition-all duration-500" />
                  <p className="text-xs sm:text-xs md:text-sm uppercase tracking-[0.1em] sm:tracking-[0.15em] text-background/85">{stat.label}</p>
                </div>
              </GSAPReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
            <GSAPReveal>
              <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary mb-2 sm:mb-3 flex items-center gap-3">
                <span className="w-4 sm:w-5 h-px bg-primary" />What We Do
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display leading-tight">Our Expertise</h2>
            </GSAPReveal>
            <GSAPReveal delay={0.2}>
              <Link href="/about" className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest text-primary hover:underline whitespace-nowrap mt-2 md:mt-0">
                About Us <ArrowUpRight className="w-3 sm:w-3 sm:h-3 md:w-4 md:h-4" />
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
                <div className="group relative overflow-hidden border-r border-b sm:border-r border-border last:border-r-0 sm:last:border-r-0 cursor-default">
                  {/* image behind */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={s.img} alt={s.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition duration-700 opacity-0 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-foreground/85" />
                  </div>
                  <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 min-h-[240px] sm:min-h-[260px] md:min-h-[280px] lg:min-h-[300px] flex flex-col justify-between">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-display text-white/20 group-hover:text-primary/50 transition leading-none">{s.num}</span>
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display mb-2 sm:mb-3 text-white/90 group-hover:text-primary transition">{s.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-white/65 leading-relaxed group-hover:text-white/85 transition">{s.desc}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-auto lg:min-h-[600px]">
          {/* image left — full height */}
          <GSAPReveal>
            <div className="relative h-56 sm:h-72 md:h-80 lg:h-auto overflow-hidden">
              <img
                src="/site-photos/kkp-room1.jpg"
                alt="KKP Dombivali – completed by Shiv Interiors"
                className="w-full h-full object-cover"
              />
              {/* strong bottom gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8">
                <p className="text-white font-display text-sm sm:text-base md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">KKP Dombivali</p>
                <p className="text-primary text-xs sm:text-xs md:text-sm uppercase tracking-widest mt-0.5 sm:mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Residential · Completed 2025</p>
              </div>
            </div>
          </GSAPReveal>

          {/* text right */}
          <GSAPReveal delay={0.2}>
            <div className="flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-10 sm:py-14 md:py-16 lg:py-20 xl:py-0">
              <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary mb-3 sm:mb-4 flex items-center gap-3">
                <span className="w-4 sm:w-5 h-px bg-primary" />About Us
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl font-display leading-snug mb-4 sm:mb-6">
                Two Decades of<br />Crafting <span className="italic text-primary">Dream</span><br />Spaces
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm md:text-base lg:text-lg">
                SHIV INTERIORS is a turnkey interior design firm based in Pune with 20+ years of
                delivering residential and commercial spaces across Maharashtra, Navi Mumbai and Secunderabad.
                Concept to completion — under one roof.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-8 sm:mb-10">
                {[
                  { label: "Budget Friendly", sub: "Quality within your budget" },
                  { label: "Turnkey Execution", sub: "Everything under one roof" },
                  { label: "On-Time Delivery", sub: "Committed timelines" },
                  { label: "Personal Supervision", sub: "Hands-on oversight" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 py-2 sm:py-3 border-b border-border group">
                    <CheckCircle className="w-3 sm:w-4 sm:h-4 text-primary mt-0.5 shrink-0 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-xs sm:text-sm mb-0.5">{item.label}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-widest text-primary group w-fit">
                Our Full Story <ArrowRight className="w-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* ── SELECTED PROJECTS ───────────────────────────────────── */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-card">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Heading with Animated Underline */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <GSAPReveal>
              <p className="text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary mb-2 sm:mb-3 flex items-center gap-3">
                <span className="w-4 sm:w-5 h-px bg-primary" />Our Work
              </p>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display">Selected Projects</h2>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: 0,
                    height: '3px',
                    backgroundColor: '#7B5E2A',
                    animation: 'heading-underline-draw 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}
                />
              </div>
            </GSAPReveal>
          </div>

          {/* 3-Project Grid with Featured Card Design */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-7 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-[16px]" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 sm:py-10 md:py-12 lg:py-16">
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">No projects added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-7 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
              {projects.slice(0, 3).map((project, index) => (
                <FeaturedProjectCard
                  key={project._id || index}
                  project={project}
                  index={index}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}

          {/* View All Projects Button */}
          <div className="flex justify-center">
            <GSAPReveal delay={0.5}>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase tracking-widest text-xs sm:text-sm font-semibold transition-all duration-300 group rounded-lg w-full sm:w-auto"
                style={{
                  animation: 'card-enter 600ms ease-out 500ms both',
                }}
              >
                View All Projects
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </GSAPReveal>
          </div>
        </div>
      </section>




      {/* ── CTA BANNER ──────────────────────────────────────────── */}
      <section className="relative py-12 sm:py-20 md:py-28 lg:py-36 overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img src="/site-photos/kkp-room3.jpg" alt="Interior" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 text-center">
          <GSAPReveal>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display text-white leading-tight mb-4 sm:mb-6 md:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Let's Build Something<br /><span className="italic text-primary drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">Beautiful Together</span>
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg leading-relaxed font-light px-2">
              Share your vision with us — we'll handle everything from design to delivery.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center px-3">
              <Link href="/contact" className="btn-shimmer inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-primary text-primary-foreground uppercase tracking-widest text-xs sm:text-sm font-semibold hover:bg-primary/85 transition group w-full sm:w-auto">
                Reach With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/projects" className="inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-3 sm:py-4 border border-white/40 text-white/90 uppercase tracking-widest text-xs sm:text-sm hover:border-white hover:text-white transition w-full sm:w-auto">
                Browse Projects
              </Link>
            </div>
          </GSAPReveal>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projects={projects}
          onClose={() => setSelectedProject(null)}
          onNavigate={(projectId) => {
            const foundProject = projects.find((p) => p._id === projectId);
            if (foundProject) setSelectedProject(foundProject);
          }}
        />
      )}
    </div>
  );
}

/* Featured Project Card Component */
function FeaturedProjectCard({
  project,
  index,
  onOpen,
}: {
  project: any;
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    cardRef.current.style.animation = `card-enter 500ms ease-out ${80 * index}ms forwards`;
  }, [index]);

  const year = project.year || (project.createdAt ? new Date(project.createdAt).getFullYear() : "-");
  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={cardRef}
      className="project-card"
      data-card
      data-index={index}
      style={{
        aspectRatio: "4/3",
        opacity: 0,
        transform: 'translateY(40px)',
      }}
      onClick={onOpen}
    >
      {/* Thumbnail with zoom effect */}
      <img
        src={project.thumbnail}
        alt={project.title}
        loading="lazy"
        className="thumbnail"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Overlay Animation */}
      <div className="card-overlay" />

      {/* Card Content */}
      <div className="card-content">
        {/* Top left: Project number + Location & year */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          zIndex: 5,
        }}>
          <span style={{
            display: 'block',
            fontSize: '8px',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            color: '#7B5E2A',
            fontWeight: 600,
            marginBottom: '2px',
          }}>
            {number}
          </span>
          <p style={{
            fontSize: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: '#7B5E2A',
            fontWeight: 600,
            margin: 0,
          }}>
            {project.location}·{year}
          </p>
        </div>

        {/* Center: Title with animation */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '8px',
          right: '8px',
          transform: 'translateY(-50%)',
          zIndex: 5,
        }}>
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '14px',
            color: 'white',
            fontWeight: 400,
            margin: 0,
            lineHeight: '1.2',
            wordWrap: 'break-word',
            overflow: 'hidden',
          }}>
            {project.title}
          </h3>
          <div className="card-gold-line" style={{ marginTop: '8px' }} />
        </div>

        {/* Bottom: Button (left) and Badge (right) */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          right: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 5,
          gap: '6px',
          flexWrap: 'wrap',
        }}>
          {/* View Button */}
          <button
            className="card-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            style={{ fontSize: '11px' }}
          >
            View Project →
          </button>

          {/* Project type badge - bottom right */}
          <div style={{
            padding: '4px 8px',
            borderRadius: '12px',
            background: 'rgba(123, 94, 42, 0.9)',
            border: '1px solid rgba(245, 237, 216, 0.3)',
            fontSize: '7px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            color: '#F5EDD8',
            flexShrink: 0,
          }}>
            {project.projectType}
          </div>
        </div>
      </div>
    </div>
  );
}
