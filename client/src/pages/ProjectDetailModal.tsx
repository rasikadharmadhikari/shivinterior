import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { SlidingCarouselViewer } from '@/components/SlidingCarouselViewer';

interface ProjectDetailModalProps {
  project: any;
  projects: any[];
  onClose: () => void;
  onNavigate: (projectId: string) => void;
}

export function ProjectDetailModal({ project, projects, onClose, onNavigate }: ProjectDetailModalProps) {
  const [galleryOpen, setGalleryOpen] = useState<'before' | 'after' | null>(null);
  const [closeRotation, setCloseRotation] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const currentIndex = projects.findIndex(p => p._id === project._id);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const year = new Date(project.createdAt).getFullYear();
  const beforeImageCount = (project.beforeImages || []).length;
  const afterImageCount = (project.afterImages || []).length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.animation = 'modalEnter 500ms cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
    }
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleCloseHover = (isHovering: boolean) => {
    setCloseRotation(isHovering ? 90 : 0);
  };

  return createPortal(
    <>
      <div
        ref={backdropRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(4,2,1,0.94)',
          backdropFilter: 'blur(14px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box',
        }}
        onClick={handleOverlayClick}
      >
        {/* Modal Panel */}
        <div
          ref={modalRef}
          style={{
            width: '92vw',
            maxWidth: '1160px',
            maxHeight: '92vh',
            overflowY: 'auto',
            background: '#F8F4EE',
            borderRadius: '24px',
            position: 'relative',
            margin: 'auto',
            animation: 'modalEnter 550ms cubic-bezier(0.16,1,0.3,1) forwards',
            scrollbarWidth: 'thin',
            scrollbarColor: '#7B5E2A #F0E9DF',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HERO SECTION - 380px */}
          <div
            style={{
              position: 'relative',
              height: '380px',
              overflow: 'hidden',
              borderRadius: '24px 24px 0 0',
              background: '#1a1a1a',
            }}
          >
            {/* Background Image with Zoom */}
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                animation: 'heroZoomOut 7s ease-out forwards',
              }}
            />

            {/* Double Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(10,6,2,0.6) 0%, transparent 50%, rgba(10,6,2,0.7) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(6,3,1,0.98) 0%, transparent 65%)',
              }}
            />

            {/* Floating Gold Particles */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: 'rgba(123,94,42,0.6)',
                  borderRadius: '50%',
                  left: `${10 + i * 15}%`,
                  bottom: `${10 + i * 12}%`,
                  animation: `floatUp 4s ease-in infinite`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}

            {/* Glass Morphism Badges - Top Left */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '28px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                zIndex: 5,
              }}
            >
              <span
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '20px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  color: '#F5EDD8',
                  textTransform: 'uppercase',
                  animation: 'fade-up 500ms ease-out 200ms both',
                }}
              >
                {project.projectType || 'PROJECT'}
              </span>
              {project.location && (
                <span
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    color: '#F5EDD8',
                    textTransform: 'uppercase',
                    animation: 'fade-up 500ms ease-out 250ms both',
                  }}
                >
                  {project.location}
                </span>
              )}
              {year && (
                <span
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '20px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    color: '#F5EDD8',
                    animation: 'fade-up 500ms ease-out 300ms both',
                  }}
                >
                  {year}
                </span>
              )}
            </div>

            {/* Close Button - Top Right */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
                transition: 'all 200ms ease-out',
                zIndex: 10,
                transform: `rotate(${closeRotation}deg)`,
              }}
              onMouseEnter={(e) => {
                handleCloseHover(true);
                e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                handleCloseHover(false);
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              }}
            >
              <X size={20} />
            </button>

            {/* Hero Content - Bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px 32px 40px',
                zIndex: 5,
                animation: 'fade-up 600ms ease-out 400ms both',
              }}
            >
              <h1
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '42px',
                  color: 'white',
                  fontWeight: 400,
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                {project.title}
              </h1>
              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                {project.description.substring(0, 120)}
                {project.description.length > 120 ? '...' : ''}
              </p>
            </div>

            {/* Grain Texture */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.04,
                pointerEvents: 'none',
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />
          </div>

          {/* DESCRIPTION SECTION */}
          <div
            style={{
              background: '#FFFFFF',
              padding: '28px 40px',
              borderLeft: '4px solid #7B5E2A',
              borderBottom: '1px solid #E0D5C5',
              animation: 'fade-up 500ms ease-out 300ms both',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#7B5E2A',
                fontWeight: 600,
                margin: 0,
                marginBottom: '12px',
              }}
            >
              Project Overview
            </p>
            <p
              style={{
                fontSize: '15px',
                color: '#5C4A32',
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* BEFORE & AFTER SECTIONS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '40px',
              padding: '36px 40px',
              background: '#F8F4EE',
            }}
          >
            {/* BEFORE COLUMN */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  paddingLeft: '16px',
                  borderLeft: '3px solid #C0856A',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C0856A' }} />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#C0856A',
                  }}
                >
                  Before
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    background: '#C0856A20',
                    color: '#C0856A',
                    borderRadius: '12px',
                    padding: '2px 8px',
                  }}
                >
                  {beforeImageCount}
                </span>
              </div>

              {project.beforeImages && project.beforeImages.length > 0 && (
                <>
                  {/* Preview Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      marginBottom: '16px',
                    }}
                    onClick={() => setGalleryOpen('before')}
                    onMouseEnter={(e) => {
                      const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                      if (overlay) overlay.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                      if (overlay) overlay.style.opacity = '0';
                    }}
                  >
                    <img
                      src={project.beforeImages[0]}
                      alt="Before preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      data-overlay
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 300ms ease',
                      }}
                    >
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                        View all {beforeImageCount} photos
                      </span>
                    </div>
                  </div>

                  {/* Circular Dot Indicators */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.beforeImages.map((_: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: index === 0 ? '#C0856A' : 'transparent',
                          border: `2px solid ${index === 0 ? '#C0856A' : 'rgba(192, 133, 106, 0.4)'}`,
                          cursor: 'pointer',
                          transition: 'all 200ms ease',
                        }}
                        onClick={() => setGalleryOpen('before')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#C0856A';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = index === 0 ? '#C0856A' : 'transparent';
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* AFTER COLUMN */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px',
                  paddingLeft: '16px',
                  borderLeft: '3px solid #6A9E7A',
                }}
              >
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6A9E7A' }} />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#6A9E7A',
                  }}
                >
                  After
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    background: '#6A9E7A20',
                    color: '#6A9E7A',
                    borderRadius: '12px',
                    padding: '2px 8px',
                  }}
                >
                  {afterImageCount}
                </span>
              </div>

              {project.afterImages && project.afterImages.length > 0 && (
                <>
                  {/* Preview Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      marginBottom: '16px',
                    }}
                    onClick={() => setGalleryOpen('after')}
                    onMouseEnter={(e) => {
                      const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                      if (overlay) overlay.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                      if (overlay) overlay.style.opacity = '0';
                    }}
                  >
                    <img
                      src={project.afterImages[0]}
                      alt="After preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      data-overlay
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 300ms ease',
                      }}
                    >
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: 600 }}>
                        View all {afterImageCount} photos
                      </span>
                    </div>
                  </div>

                  {/* Circular Dot Indicators */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.afterImages.map((_: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: index === 0 ? '#6A9E7A' : 'transparent',
                          border: `2px solid ${index === 0 ? '#6A9E7A' : 'rgba(106, 158, 122, 0.4)'}`,
                          cursor: 'pointer',
                          transition: 'all 200ms ease',
                        }}
                        onClick={() => setGalleryOpen('after')}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#6A9E7A';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = index === 0 ? '#6A9E7A' : 'transparent';
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div
            style={{
              background: '#EDE5D8',
              borderTop: '1px solid #E0D5C5',
              padding: '20px 40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ fontSize: '13px', color: 'rgba(92,74,50,0.65)', fontWeight: 500 }}>
              {beforeImageCount} before · {afterImageCount} after · {year}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => previousProject && onNavigate(previousProject._id)}
                disabled={!previousProject}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: previousProject ? 'pointer' : 'not-allowed',
                  background: 'transparent',
                  border: `1px solid ${previousProject ? '#7B5E2A' : 'rgba(123,94,42,0.3)'}`,
                  color: previousProject ? '#7B5E2A' : 'rgba(123,94,42,0.3)',
                  transition: 'all 300ms ease-out',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (previousProject) {
                    e.currentTarget.style.background = 'rgba(123,94,42,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                ← Previous
              </button>
              <button
                onClick={() => nextProject && onNavigate(nextProject._id)}
                disabled={!nextProject}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: nextProject ? 'pointer' : 'not-allowed',
                  background: nextProject ? '#7B5E2A' : 'rgba(123,94,42,0.3)',
                  border: `1px solid ${nextProject ? '#7B5E2A' : 'rgba(123,94,42,0.3)'}`,
                  color: '#F5EDD8',
                  transition: 'all 300ms ease-out',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (nextProject) {
                    e.currentTarget.style.background = '#5C4420';
                  }
                }}
                onMouseLeave={(e) => {
                  if (nextProject) {
                    e.currentTarget.style.background = '#7B5E2A';
                  }
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Viewer Overlay */}
      {galleryOpen === 'before' && project.beforeImages && project.beforeImages.length > 0 && (
        <SlidingCarouselViewer
          images={project.beforeImages}
          title="Before Photos"
          accentColor="#C0856A"
          onClose={() => setGalleryOpen(null)}
        />
      )}

      {galleryOpen === 'after' && project.afterImages && project.afterImages.length > 0 && (
        <SlidingCarouselViewer
          images={project.afterImages}
          title="After Photos"
          accentColor="#6A9E7A"
          onClose={() => setGalleryOpen(null)}
        />
      )}
    </>,
    document.body
  );
}
