import { useState, useEffect, useCallback } from "react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { ArrowRight, Images } from "lucide-react";
import { clsx } from "clsx";
import { Link } from "wouter";
import { ProjectDetailModal } from "@/pages/ProjectDetailModal";

type Category = "All" | "Residential" | "Commercial";
interface ProjectCardData {
  _id: string;
  title: string;
  projectType: string;
  location: string;
  description: string;
  thumbnail: string;
  year?: number;
  createdAt?: string;
}

interface ProjectDetails extends ProjectCardData {
  beforeImages: string[];
  afterImages: string[];
}



/* ═══════════════════════════════════════════
   PROJECT CARD  (uniform 4:3 aspect, click opens gallery)
═══════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: ProjectCardData;
  index: number;
  onOpen: (projectId: string) => void;
}) {
  const tagCls = "bg-black/55 text-white backdrop-blur-sm";
  const year = project.year || (project.createdAt ? new Date(project.createdAt).getFullYear() : "-");

  return (
    <div
      className="group relative overflow-hidden bg-zinc-900 cursor-pointer"
      onClick={() => onOpen(project._id)}
    >
      {/* Cover image — fixed 16:9 aspect, uniform across all cards */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <img
          src={project.thumbnail}
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
          View
        </span>
      </div>

      {/* Index */}
      <span className="absolute top-3 left-3 z-10 text-xs font-mono tracking-widest text-white/60">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tag */}
      <span className={clsx("absolute top-3 right-3 z-10 text-xs font-bold uppercase tracking-widest px-2.5 py-1", tagCls)}>
        {project.projectType}
      </span>

      {/* Rest-state label */}
      <div className="absolute bottom-0 inset-x-0 px-5 py-5 group-hover:opacity-0 transition-opacity duration-250 z-10">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-1.5">{project.location} · {year}</p>
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
          <span className="text-xs uppercase tracking-wider text-primary font-medium">{project.location} · {project.projectType}</span>
          <span className="text-xs text-white/60 uppercase tracking-wider flex items-center gap-1 font-medium">
            Open Details
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
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/projects");
        if (!response.ok) throw new Error("Failed to fetch projects");
        const data = (await response.json()) as ProjectCardData[];
        setProjects(data);
      } catch (err) {
        console.error(err);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjects();
  }, []);

  const openProjectModal = useCallback(async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch project details");
      const data = (await response.json()) as ProjectDetails;
      setSelectedProject({
        ...data,
        beforeImages: data.beforeImages || [],
        afterImages: data.afterImages || [],
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const closeProjectModal = useCallback(() => setSelectedProject(null), []);

  const handleNavigateProject = useCallback((projectId: string) => {
    const found = projects.find(p => p._id === projectId);
    if (found) {
      openProjectModal(projectId);
    }
  }, [projects, openProjectModal]);

  const visible = projects.filter(
    p => activeCategory === "All" || p.projectType === activeCategory
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
                  ({cat === "All" ? projects.length : projects.filter(p => p.projectType === cat).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ PROJECT GRID ══ */}
      <section className="bg-[#0f0f0f] px-2 md:px-3 pt-3 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center h-56">
            <p className="text-white/30 text-sm uppercase tracking-widest">Loading projects...</p>
          </div>
        ) : visible.length === 0 ? (
          <div className="flex items-center justify-center h-56">
            <p className="text-white/20 text-sm uppercase tracking-widest">No projects in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
            {visible.map((project, i) => (
              <GSAPReveal key={project._id} delay={(i % 4) * 0.05}>
                <ProjectCard project={project} index={i} onOpen={openProjectModal} />
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

      {/* ══ PROJECT MODAL ══ */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projects={projects}
          onClose={closeProjectModal}
          onNavigate={handleNavigateProject}
        />
      )}
    </div>
  );
}
