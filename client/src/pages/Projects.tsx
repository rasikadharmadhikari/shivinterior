import { useState, useEffect, useCallback, useRef } from "react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { ArrowRight, X, ChevronLeft, ChevronRight, Grid2X2, Images } from "lucide-react";
import { clsx } from "clsx";
import { Link } from "wouter";

type Category = "All" | "Residential" | "Commercial";

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const PROJECTS = [
  // ── 2021 ──────────────────────────────────────
  {
    id: 2,
    title: "City Corporation (JW)",
    category: "Commercial" as Category,
    description: "High-end commercial workspace redesign — premium flooring, custom reception wall and fully branded interiors.",
    meta: "Pune · Commercial",
    location: "Pune",
    year: "2021",
    tag: "Commercial",
    tagColor: "dark",
    cover: "/projects/city-corp-3.jpg",
    images: [
      "/projects/city-corp-3.jpg", "/projects/city-corp-4.jpg", "/projects/city-corp-5.jpg",
      "/projects/city-corp-6.jpg", "/projects/city-corp-7.jpg",
    ],
  },
  {
    id: 7,
    title: "CON AIR EQUIP",
    category: "Commercial" as Category,
    description: "Industrial-grade fit-out with durable cladding, organised workstations and utility-first design for heavy-industry use.",
    meta: "Pune · Industrial",
    location: "Pune",
    year: "2021",
    tag: "Industrial",
    tagColor: "dark",
    cover: "/projects/con-air-1.jpg",
    images: [
      "/projects/con-air-1.jpg", "/projects/con-air-2.jpg",
      "/projects/con-air-3.jpg", "/projects/con-air-4.jpg", "/projects/con-air-5.jpg",
    ],
  },
  // ── 2022 ──────────────────────────────────────
  {
    id: 1,
    title: "IAIDC Corporate Office",
    category: "Commercial" as Category,
    description: "Full turnkey office fit-out with bespoke workstations, formal conference room, executive cabins and a grand reception lobby.",
    meta: "Pune · Commercial",
    location: "Pune",
    year: "2022",
    tag: "Featured",
    tagColor: "gold",
    cover: "/projects/iaidc-2.jpg",
    images: [
      "/projects/iaidc-2.jpg", "/projects/iaidc-3.jpg", "/projects/iaidc-4.jpg",
      "/projects/iaidc-5.jpg", "/projects/iaidc-6.jpg",
    ],
  },
  {
    id: 8,
    title: "Adhalrao Residence",
    category: "Residential" as Category,
    description: "Elegant residential interior — premium woodwork, plush upholstery, custom TV unit and sophisticated styling.",
    meta: "Pune · Residential",
    location: "Pune",
    year: "2022",
    tag: "Residential",
    tagColor: "dark",
    cover: "/projects/adhalrao-5.jpg",
    images: [
      "/projects/adhalrao-5.jpg", "/projects/adhalrao-6.jpg", "/projects/adhalrao-7.jpg",
      "/projects/adhalrao-8.jpg", "/projects/adhalrao-3.jpg",
    ],
  },
  // ── 2023 ──────────────────────────────────────
  {
    id: 3,
    title: "Kharadi Residence",
    category: "Residential" as Category,
    description: "Premium 3 BHK — modular kitchen, custom wardrobes, false ceiling with ambient lighting and luxury finishes throughout.",
    meta: "Kharadi, Pune · Residential",
    location: "Kharadi",
    year: "2023",
    tag: "Residential",
    tagColor: "dark",
    cover: "/projects/kharadi-4.jpg",
    images: [
      "/projects/kharadi-4.jpg", "/projects/kharadi-5.jpg", "/projects/kharadi-6.jpg",
      "/projects/kharadi-7.jpg", "/projects/kharadi-8.jpg",
    ],
  },
  {
    id: 5,
    title: "Bhinge Residence",
    category: "Residential" as Category,
    description: "Complete turnkey home interior — sleek modular kitchen, designer wardrobes, decorative panelling and premium tiling.",
    meta: "Pune · Residential",
    location: "Pune",
    year: "2023",
    tag: "Residential",
    tagColor: "dark",
    cover: "/projects/bhinge-7.jpg",
    images: [
      "/projects/bhinge-7.jpg", "/projects/bhinge-8.jpg", "/projects/bhinge-5.jpg",
      "/projects/bhinge-6.jpg", "/projects/bhinge-3.jpg",
    ],
  },
  // ── 2024 ──────────────────────────────────────
  {
    id: 4,
    title: "Ravi Masale Outlet",
    category: "Commercial" as Category,
    description: "Retail outlet for Navi Mumbai Masala Market — vibrant product displays, custom shelving and complete store branding.",
    meta: "Navi Mumbai · Commercial",
    location: "Navi Mumbai",
    year: "2024",
    tag: "Commercial",
    tagColor: "dark",
    cover: "/projects/ravi-outlet-3.jpg",
    images: [
      "/projects/ravi-outlet-3.jpg", "/projects/ravi-outlet-4.jpg",
      "/projects/ravi-outlet-5.jpg", "/projects/ravi-outlet-6.jpg",
      "/projects/ravi-outlet-1.jpg",
    ],
  },
  {
    id: 9,
    title: "Ravi Masale Back Office",
    category: "Commercial" as Category,
    description: "Polished back-office for a leading spice brand — ergonomic layout, brand-aligned aesthetics and efficient workspaces.",
    meta: "Navi Mumbai · Commercial",
    location: "Navi Mumbai",
    year: "2024",
    tag: "Commercial",
    tagColor: "dark",
    cover: "/projects/ravi-backoffice-6.jpg",
    images: [
      "/projects/ravi-backoffice-6.jpg", "/projects/ravi-backoffice-7.jpg",
      "/projects/ravi-backoffice-8.jpg", "/projects/ravi-backoffice-4.jpg",
      "/projects/ravi-backoffice-5.jpg",
    ],
  },
  // ── 2025 ──────────────────────────────────────
  {
    id: 6,
    title: "KKP Dombiwali",
    category: "Commercial" as Category,
    description: "Contemporary commercial interior — sleek wall panelling, signature lighting and refined ceiling details.",
    meta: "Dombiwali · Commercial",
    location: "Dombiwali",
    year: "2025",
    tag: "Commercial",
    tagColor: "dark",
    cover: "/projects/kkp-5.jpg",
    images: [
      "/projects/kkp-5.jpg", "/projects/kkp-6.jpg", "/projects/kkp-7.jpg",
      "/projects/kkp-3.jpg", "/projects/kkp-4.jpg",
    ],
  },
  {
    id: 10,
    title: "Hiremath Office",
    category: "Commercial" as Category,
    description: "Smart office design with open layout, lounge area and partitioned workstations in a refined modern palette.",
    meta: "Pune · Commercial",
    location: "Pune",
    year: "2025",
    tag: "Ongoing",
    tagColor: "amber",
    cover: "/projects/hiremath-1.jpg",
    images: [
      "/projects/hiremath-1.jpg", "/projects/hiremath-2.jpg",
      "/projects/hiremath-3.jpg", "/projects/hiremath-4.jpg", "/projects/hiremath-5.jpg",
    ],
  },
];

type Project = (typeof PROJECTS)[0];

/* ═══════════════════════════════════════════
   GALLERY MODAL
═══════════════════════════════════════════ */
function GalleryModal({
  project,
  startIndex,
  onClose,
}: {
  project: Project;
  startIndex: number;
  onClose: () => void;
}) {
  const [active, setActive] = useState(startIndex);
  const [view, setView] = useState<"lightbox" | "grid">("lightbox");
  const touchStartX = useRef<number>(0);

  const prev = useCallback(() => setActive(i => (i - 1 + project.images.length) % project.images.length), [project.images.length]);
  const next = useCallback(() => setActive(i => (i + 1) % project.images.length), [project.images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  }, [next, prev]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, prev, next]);

  const tagCls =
    project.tagColor === "gold"  ? "bg-primary text-primary-foreground" :
    project.tagColor === "amber" ? "bg-amber-400 text-black" :
    "bg-white/20 text-white";

  return (
    <div className="fixed inset-0 z-[100] bg-[#060606] flex flex-col">

      {/* ══ HEADER BAR ══ */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 md:px-10 h-16
        bg-[#060606] border-b border-white/[0.08] z-20 relative">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <span className={clsx("text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 flex-shrink-0", tagCls)}>
            {project.tag}
          </span>
          <div className="w-px h-5 bg-white/15 hidden sm:block" />
          <h2 className="font-display text-white text-lg md:text-xl truncate hidden sm:block">{project.title}</h2>
        </div>

        {/* Center — view toggle pills */}
        <div className="flex items-center gap-1 bg-white/[0.06] rounded-full px-1 py-1">
          <button
            onClick={() => setView("lightbox")}
            className={clsx(
              "px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-200",
              view === "lightbox" ? "bg-primary text-primary-foreground shadow" : "text-white/45 hover:text-white"
            )}
          >
            <span className="hidden sm:inline">Lightbox</span>
            <Images className="w-3.5 h-3.5 sm:hidden" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={clsx(
              "px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-200",
              view === "grid" ? "bg-primary text-primary-foreground shadow" : "text-white/45 hover:text-white"
            )}
          >
            <span className="hidden sm:inline">Grid</span>
            <Grid2X2 className="w-3.5 h-3.5 sm:hidden" />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="text-white/35 text-sm font-mono hidden sm:block">
            {String(active + 1).padStart(2,"0")} / {String(project.images.length).padStart(2,"0")}
          </span>
          <button onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10
              text-white/50 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ══ BODY ══ */}
      {view === "lightbox" ? (
        /* ── LIGHTBOX ── */
        <div className="flex flex-1 min-h-0">

          {/* Main stage */}
          <div
            className="flex-1 relative min-w-0 group bg-[#060606]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Active image — uniform cover fill */}
            <img
              key={active}
              src={project.images[active]}
              alt={`${project.title} ${active + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Prev / Next */}
            {project.images.length > 1 && (
              <>
                <button onClick={prev}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10
                    w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center
                    bg-black/40 backdrop-blur-sm border border-white/10
                    text-white hover:bg-primary hover:border-primary transition-all duration-250
                    opacity-90 md:opacity-0 md:group-hover:opacity-100">
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button onClick={next}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10
                    w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center
                    bg-black/40 backdrop-blur-sm border border-white/10
                    text-white hover:bg-primary hover:border-primary transition-all duration-250
                    opacity-90 md:opacity-0 md:group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 inset-x-0 z-10 px-6 md:px-10 py-6
              bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <p className="text-primary text-xs uppercase tracking-[0.25em] mb-1 font-medium">
                {project.location} · {project.year}
              </p>
              <h3 className="font-display text-white text-2xl md:text-3xl leading-tight">{project.title}</h3>
              <p className="text-white/55 text-sm mt-1 max-w-lg leading-relaxed hidden sm:block">{project.description}</p>
            </div>
          </div>

          {/* Right sidebar — desktop only */}
          <div className="hidden lg:flex w-64 xl:w-72 flex-shrink-0 flex-col bg-[#0a0a0a] border-l border-white/[0.06] overflow-y-auto">
            <div className="p-5 border-b border-white/[0.06]">
              <p className="text-xs uppercase tracking-[0.25em] text-primary mb-1 font-medium">Gallery</p>
              <p className="text-white/50 text-sm">{project.images.length} photos</p>
            </div>
            {/* Uniform square thumbs */}
            <div className="grid grid-cols-2 gap-1 p-2">
              {project.images.map((src, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={clsx(
                    "relative aspect-square overflow-hidden transition-all duration-200",
                    i === active
                      ? "ring-2 ring-primary ring-offset-1 ring-offset-[#0a0a0a]"
                      : "opacity-45 hover:opacity-100"
                  )}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── GRID VIEW — all photos, uniform 4:3, 3-col / 4-col ── */
        <div className="flex-1 overflow-y-auto bg-[#060606] p-2 md:p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 md:gap-2">
            {project.images.map((src, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setView("lightbox"); }}
                className={clsx(
                  "relative aspect-[4/3] overflow-hidden group transition-all duration-200",
                  i === active ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-white/30"
                )}
              >
                <img src={src} alt={`${project.title} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {/* Index badge */}
                <span className="absolute top-2 left-2 text-[10px] font-mono text-white/60
                  bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}

/* ═══════════════════════════════════════════
   PROJECT CARD  (uniform 4:3 aspect, click opens gallery)
═══════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project, imgIdx: number) => void;
}) {
  const tagCls =
    project.tagColor === "gold"  ? "bg-primary text-primary-foreground"  :
    project.tagColor === "amber" ? "bg-amber-400 text-black" :
    "bg-black/55 text-white backdrop-blur-sm";

  return (
    <div
      className="group relative overflow-hidden bg-zinc-900 cursor-pointer"
      onClick={() => onOpen(project, 0)}
    >
      {/* Cover image — fixed 16:9 aspect, uniform across all cards */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        {/* Permanent bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

        {/* Photo count pill — bottom right */}
        <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5
          bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full
          opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Images className="w-3 h-3" />
          {project.images.length} photos
        </span>
      </div>

      {/* Index */}
      <span className="absolute top-3 left-3 z-10 text-xs font-mono tracking-widest text-white/60">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tag */}
      <span className={clsx("absolute top-3 right-3 z-10 text-xs font-bold uppercase tracking-widest px-2.5 py-1", tagCls)}>
        {project.tag}
      </span>

      {/* Rest-state label */}
      <div className="absolute bottom-0 inset-x-0 px-5 py-5 group-hover:opacity-0 transition-opacity duration-250 z-10">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-1.5">{project.location} · {project.year}</p>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-white text-2xl md:text-3xl leading-tight">{project.title}</h3>
          <span className="text-xs text-white/50 uppercase tracking-wider flex-shrink-0 md:hidden">
            View <span className="text-primary">↗</span>
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-4 pt-12
          bg-gradient-to-t from-black/95 via-black/60 to-transparent
          opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
          transition-all duration-400 ease-out">
        <div className="w-8 h-[2px] bg-primary mb-3" />
        <h3 className="font-display text-white text-xl md:text-2xl leading-tight mb-2">{project.title}</h3>
        <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-3">{project.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-primary font-medium">{project.meta}</span>
          <span className="text-xs text-white/60 uppercase tracking-wider flex items-center gap-1 font-medium">
            Open Gallery
            <span className="text-primary text-base">↗</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [gallery, setGallery] = useState<{ project: Project; imgIdx: number } | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openGallery = useCallback((project: Project, imgIdx: number) => {
    setGallery({ project, imgIdx });
  }, []);

  const closeGallery = useCallback(() => setGallery(null), []);

  const visible = PROJECTS.filter(
    p => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] text-white">

      {/* ══ HERO ══ */}
      <section className="relative flex items-center overflow-hidden min-h-[92vh]">
        {/* Full-bleed background */}
        <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920" alt=""
          className="absolute inset-0 w-full h-full object-cover" />
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

        {/* Gold vertical accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-primary/70 to-transparent" />

        {/* Text content */}
        <div className="relative z-10 px-8 md:px-14 lg:px-20 py-28 max-w-2xl">
          <GSAPReveal>
           
            <h1 className="font-display leading-[0.88] mb-8">
              <span className="block text-white text-7xl md:text-8xl lg:text-[100px] xl:text-[120px]">Our</span>
              <span className="block italic text-primary text-8xl md:text-9xl lg:text-[112px] xl:text-[136px]">Work</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-sm mb-10">
              Commercial, residential &amp; industrial interiors — crafted with precision and purpose.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-white/45 flex items-center gap-2">
              <span className="w-4 h-px bg-white/30" /> Click any project to open its gallery
            </p>
          </GSAPReveal>
        </div>

      </section>

      {/* ══ STICKY FILTER BAR ══ */}
      <div className="sticky top-0 z-50 bg-[#0f0f0f]/96 backdrop-blur-md border-b border-white/8">
        <div className="container mx-auto px-5 md:px-14 flex items-center justify-between py-3">
          <p className="text-sm uppercase tracking-widest text-white/50 hidden md:block font-medium">
            {visible.length} project{visible.length !== 1 ? "s" : ""}
          </p>
          <div className="flex gap-1 ml-auto">
            {(["All", "Residential", "Commercial"] as Category[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-5 py-2.5 text-sm uppercase tracking-widest font-medium transition-all duration-250",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {cat}
                <span className="ml-1.5 opacity-60">
                  ({cat === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PROJECT GRID ══ */}
      <section className="bg-[#0f0f0f] px-2 md:px-3 pt-3 pb-12">
        {visible.length === 0 ? (
          <div className="flex items-center justify-center h-56">
            <p className="text-white/20 text-sm uppercase tracking-widest">No projects in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
            {visible.map((project, i) => (
              <GSAPReveal key={project.id} delay={(i % 4) * 0.05}>
                <ProjectCard project={project} index={i} onOpen={openGallery} />
              </GSAPReveal>
            ))}
          </div>
        )}
      </section>

      {/* ══ CONTACT CTA STRIP ══ */}
      <section className="relative overflow-hidden min-h-[55vh] flex items-center justify-center text-center">
        {/* Full-bleed background */}
        <img src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-6 md:px-14 py-24 max-w-3xl mx-auto">
          <GSAPReveal>
            <h3 className="font-display leading-[0.92] mb-6">
              <span className="block text-white text-5xl md:text-6xl lg:text-7xl">Let's Build Something</span>
              <span className="block italic text-primary text-6xl md:text-7xl lg:text-8xl">Beautiful Together</span>
            </h3>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              Share your vision with us — we'll handle everything from design to delivery.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-3 px-12 py-4 bg-primary text-primary-foreground
                text-sm uppercase tracking-widest font-semibold
                hover:bg-white hover:text-black transition-all duration-300 group">
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </GSAPReveal>
        </div>
      </section>

      {/* ══ GALLERY MODAL ══ */}
      {gallery && (
        <GalleryModal
          project={gallery.project}
          startIndex={gallery.imgIdx}
          onClose={closeGallery}
        />
      )}
    </div>
  );
}
