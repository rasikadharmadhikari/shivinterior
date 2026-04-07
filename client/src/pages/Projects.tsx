import { useState, useEffect, useRef, useCallback } from "react";
import { GSAPReveal } from "@/components/GSAPReveal";
import { clsx } from "clsx";
import { ProjectDetailModal } from "@/pages/ProjectDetailModal";

type Category = "ALL" | "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL";

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
   PROJECT CARD WITH ANIMATIONS
═══════════════════════════════════════════ */
function ProjectCard({
  project,
  index,
  isVisible,
  onOpen,
  staggerDelay,
}: {
  project: ProjectCardData;
  index: number;
  isVisible: boolean;
  onOpen: (projectId: string) => void;
  staggerDelay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!cardRef.current) return;

    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      cardRef.current.style.opacity = '1';
      cardRef.current.style.animation = `card-enter 600ms ease-out ${staggerDelay}ms forwards`;
      cardRef.current.classList.add('card-animate-in');
    }
  }, [isVisible, staggerDelay]);

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
      onClick={() => onOpen(project._id)}
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
        {/* Project number - top left */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#7B5E2A',
          fontWeight: 600,
        }}>
          {number}
        </span>

        {/* Project type badge - top right */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          padding: '6px 12px',
          borderRadius: '20px',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.2)',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: 'white',
        }}>
          {project.projectType}
        </div>

        {/* Bottom info section */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px',
        }}>
          {/* Location and year */}
          <p style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: '#7B5E2A',
            fontWeight: 600,
            margin: '0 0 8px 0',
          }}>
            {project.location}·{year}
          </p>

          {/* Title with underline animation */}
          <h3 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            color: 'white',
            fontWeight: 400,
            margin: 0,
            marginBottom: '8px',
          }}>
            {project.title}
          </h3>
          <div className="card-gold-line" />

          {/* View Button */}
          <button
            className="card-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project._id);
            }}
          >
            View Project →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PROJECTS PAGE
═══════════════════════════════════════════ */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>("ALL");
  const [projects, setProjects] = useState<ProjectCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [visibleCardIndices, setVisibleCardIndices] = useState<Set<number>>(new Set());
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const filters: Category[] = ["ALL", "RESIDENTIAL", "COMMERCIAL", "INDUSTRIAL"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Intersection Observer for card animations
  useEffect(() => {
    if (!cardsContainerRef.current || projects.length === 0) return;

    const cards = cardsContainerRef.current.querySelectorAll("[data-card]");
    if (cards.length === 0) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: make all cards visible immediately
      cards.forEach((card, index) => {
        setVisibleCardIndices((prev) => new Set([...prev, index]));
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index || "0", 10);
            setVisibleCardIndices((prev) => new Set([...prev, index]));
            // Stop observing once visible to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      observer.disconnect();
    };
  }, [projects.length, activeFilter]);

  const filteredProjects =
    activeFilter === "ALL"
      ? projects
      : projects.filter((p) => p.projectType.toUpperCase() === activeFilter);

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

  const handleFilterChange = (filter: Category) => {
    setActiveFilter(filter);
    setVisibleCardIndices(new Set());
  };

  const handleNavigateProject = useCallback(
    (projectId: string) => {
      openProjectModal(projectId);
    },
    [openProjectModal]
  );

  return (
    <div className="w-full min-h-screen bg-[#0F0F0F] text-white">
      {/* ══ HERO SECTION ══ */}
      <section className="relative flex items-center overflow-hidden min-h-[92vh]">
        <img
          src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#7B5E2A]/70 to-transparent" />

        <div className="relative z-10 px-8 md:px-14 lg:px-20 py-28 max-w-2xl">
          <GSAPReveal>
            <h1 className="font-serif leading-[0.88] mb-8">
              <span className="block text-white text-7xl md:text-8xl lg:text-[100px] xl:text-[120px]">
                Our
              </span>
              <span className="block italic text-[#7B5E2A] text-8xl md:text-9xl lg:text-[112px] xl:text-[136px]">
                Work
              </span>
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

      {/* ══ PROJECTS SECTION ══ */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading with Count Badge */}
          <div className="mb-16 flex items-center gap-4">
            <h2 className="font-serif text-4xl md:text-5xl text-white">Our Projects</h2>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#7B5E2A] text-white text-sm font-bold">
              {filteredProjects.length}
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-[#7B5E2A] to-transparent" />
          </div>

          {/* Filter Buttons */}
          <div className="mb-16 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={clsx(
                  "px-6 py-2.5 rounded-full uppercase text-xs font-bold tracking-wider transition-all duration-300 ease-out",
                  activeFilter === filter
                    ? "bg-[#7B5E2A] text-[#F5EDD8]"
                    : "bg-transparent border border-[#7B5E2A] text-[#7B5E2A] hover:bg-[#7B5E2A]/10"
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="text-center py-20 text-white/50">Loading projects...</div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-white/50">No projects found</div>
          ) : (
            <div
              ref={cardsContainerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filteredProjects.map((project, index) => {
                const rowIndex = Math.floor(index / 3);
                const colIndex = index % 3;
                const staggerDelay = (rowIndex === 0 ? colIndex : colIndex) * 100;
                const isVisible = visibleCardIndices.has(index);

                return (
                  <div
                    key={project._id}
                    data-card
                    data-index={index}
                  >
                    <ProjectCard
                      project={project}
                      index={index}
                      isVisible={isVisible}
                      onOpen={openProjectModal}
                      staggerDelay={staggerDelay}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          projects={filteredProjects}
          onClose={closeProjectModal}
          onNavigate={handleNavigateProject}
        />
      )}
    </div>
  );
}
