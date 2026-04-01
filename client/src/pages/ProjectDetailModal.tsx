import { useState, useEffect } from 'react';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: any;
  projects: any[];
  onClose: () => void;
  onNavigate: (projectId: string) => void;
}

export function ProjectDetailModal({ project, projects, onClose, onNavigate }: ProjectDetailModalProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxSection, setLightboxSection] = useState<'before' | 'after' | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Colors
  const colors = {
    cream: '#F8F4EE',
    gold: '#7B5E2A',
    lightGold: '#F5EDD8',
    warmBorder: '#E8DFD0',
    beforeAccent: '#C0856A',
    afterAccent: '#6A9E7A',
    textDark: '#5C4A32',
    overlay: 'rgba(20,15,10,0.85)',
  };

  // Get current project index
  const currentIndex = projects.findIndex(p => p._id === project._id);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImage) {
        if (e.key === 'Escape') {
          setLightboxImage(null);
        } else if (e.key === 'ArrowLeft') {
          navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
          navigateLightbox(1);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, lightboxSection, lightboxIndex]);

  const openLightbox = (imageUrl: string, section: 'before' | 'after', index: number) => {
    setLightboxImage(imageUrl);
    setLightboxSection(section);
    setLightboxIndex(index);
  };

  const navigateLightbox = (direction: number) => {
    if (!lightboxSection) return;

    const images = lightboxSection === 'before' ? project.beforeImages : project.afterImages;
    let newIndex = lightboxIndex + direction;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setLightboxIndex(newIndex);
    setLightboxImage(images[newIndex]);
  };

  const handlePreviousProject = () => {
    if (previousProject) {
      onNavigate(previousProject._id);
    }
  };

  const handleNextProject = () => {
    if (nextProject) {
      onNavigate(nextProject._id);
    }
  };

  const year = new Date(project.createdAt).getFullYear();
  const beforeImageCount = (project.beforeImages || []).length;
  const afterImageCount = (project.afterImages || []).length;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10,8,6,0.88)',
          backdropFilter: 'blur(6px)',
          zIndex: 1000,
        }}
      />

      {/* Modal Container */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '860px',
          width: '95vw',
          maxHeight: '95vh',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: colors.cream,
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeInUp 0.3s ease-out',
        }}
      >
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate(-50%, calc(-50% + 20px));
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%);
            }
          }
          @media (max-width: 640px) {
            .modal-container {
              width: 100vw !important;
              height: 100vh !important;
              max-height: 100vh !important;
              border-radius: 0 !important;
              top: 0 !important;
              left: 0 !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Hero Section */}
        <div
          style={{
            position: 'relative',
            height: '280px',
            backgroundImage: `url(${project.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px 28px 32px',
            background: `linear-gradient(to top, rgba(20,15,10,0.95), rgba(20,15,10,0.7) 50%, rgba(20,15,10,0.3)), url(${project.thumbnail}) center / cover`,
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(20,15,10,0.7)',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(20,15,10,0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(20,15,10,0.7)';
            }}
          >
            ✕
          </button>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span
              style={{
                backgroundColor: colors.gold,
                color: colors.lightGold,
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '0.5px',
              }}
            >
              {project.projectType || 'PROJECT'}
            </span>
            {project.location && (
              <span
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#F5EDD8',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {project.location.toUpperCase()}
              </span>
            )}
            {project.year && (
              <span
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  color: '#F5EDD8',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                {project.year}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(24px, 5vw, 32px)',
                color: 'white',
                margin: '0 0 6px 0',
                fontWeight: '600',
                letterSpacing: '-0.5px',
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.75)',
                margin: 0,
                fontWeight: '400',
              }}
            >
              Interior Design Project
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Description Section */}
          <div
            style={{
              padding: '32px 28px',
              borderBottom: `1px solid ${colors.warmBorder}`,
              backgroundColor: 'white',
            }}
          >
            <p
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '15px',
                color: colors.textDark,
                lineHeight: '1.8',
                margin: 0,
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Before/After Images Section */}
          <div
            style={{
              padding: 'clamp(24px, 5vw, 32px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(20px, 5vw, 32px)',
              backgroundColor: colors.cream,
            }}
          >
            {/* Before Column */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: colors.beforeAccent,
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1.2px',
                    color: colors.beforeAccent,
                  }}
                >
                  BEFORE
                </span>
              </div>

              {beforeImageCount > 0 ? (
                <div
                  style={{
                    borderLeft: `3px solid ${colors.beforeAccent}`,
                    paddingLeft: '16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  {(project.beforeImages || []).map((imageUrl: string, index: number) => (
                    <div
                      key={`before-${index}`}
                      onClick={() => openLightbox(imageUrl, 'before', index)}
                      style={{
                        position: 'relative',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        aspectRatio: '4/3',
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                        ...(index === 0 && { gridColumn: '1 / -1' }),
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`Before ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLImageElement).style.transform = 'scale(1)';
                        }}
                      />
                      {/* Hover overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,0,0,0)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0)';
                        }}
                      >
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                          className="hover-icon"
                        >
                          <span style={{ fontSize: '20px', color: 'white' }}>+</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    borderLeft: `3px solid ${colors.beforeAccent}`,
                    paddingLeft: '16px',
                    border: `2px dashed ${colors.warmBorder}`,
                    borderRadius: '6px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: 'rgba(92,74,50,0.4)',
                    fontSize: '14px',
                  }}
                >
                  No before images added
                </div>
              )}
            </div>

            {/* After Column */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: colors.afterAccent,
                  }}
                />
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1.2px',
                    color: colors.afterAccent,
                  }}
                >
                  AFTER
                </span>
              </div>

              {afterImageCount > 0 ? (
                <div
                  style={{
                    borderLeft: `3px solid ${colors.afterAccent}`,
                    paddingLeft: '16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                  }}
                >
                  {(project.afterImages || []).map((imageUrl: string, index: number) => (
                    <div
                      key={`after-${index}`}
                      onClick={() => openLightbox(imageUrl, 'after', index)}
                      style={{
                        position: 'relative',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        aspectRatio: '4/3',
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                        ...(index === 0 && { gridColumn: '1 / -1' }),
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={`After ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLImageElement).style.transform = 'scale(1)';
                        }}
                      />
                      {/* Hover overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,0,0,0)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(0,0,0,0)';
                        }}
                      >
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                          className="hover-icon"
                        >
                          <span style={{ fontSize: '20px', color: 'white' }}>+</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    borderLeft: `3px solid ${colors.afterAccent}`,
                    paddingLeft: '16px',
                    border: `2px dashed ${colors.warmBorder}`,
                    borderRadius: '6px',
                    padding: '40px 20px',
                    textAlign: 'center',
                    color: 'rgba(106,158,122,0.4)',
                    fontSize: '14px',
                  }}
                >
                  No after images added
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#F0E9DF',
            borderTop: `1px solid ${colors.warmBorder}`,
            padding: '18px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              color: 'rgba(92,74,50,0.65)',
              fontWeight: '500',
            }}
          >
            {beforeImageCount} before · {afterImageCount} after · {project.year} · Shiv Interiors
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <button
              onClick={handlePreviousProject}
              disabled={!previousProject}
              style={{
                padding: '10px 18px',
                border: `1.5px solid ${previousProject ? colors.gold : 'rgba(123,94,42,0.3)'}`,
                color: previousProject ? colors.gold : 'rgba(123,94,42,0.3)',
                backgroundColor: 'transparent',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: previousProject ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (previousProject) {
                  e.currentTarget.style.backgroundColor = 'rgba(123,94,42,0.08)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNextProject}
              disabled={!nextProject}
              style={{
                padding: '10px 18px',
                backgroundColor: nextProject ? colors.gold : 'rgba(123,94,42,0.3)',
                color: colors.cream,
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: nextProject ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (nextProject) {
                  e.currentTarget.style.backgroundColor = '#6B5325';
                }
              }}
              onMouseLeave={(e) => {
                if (nextProject) {
                  e.currentTarget.style.backgroundColor = colors.gold;
                }
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeInUp 0.2s ease-out',
            padding: '20px',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxImage(null);
            }}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              zIndex: 2001,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
            }}
          >
            ✕
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={lightboxImage}
              alt="Full size view"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />

            {/* Navigation Arrows */}
            {lightboxSection && (
              <>
                <button
                  onClick={() => navigateLightbox(-1)}
                  style={{
                    position: 'absolute',
                    left: '-70px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() => navigateLightbox(1)}
                  style={{
                    position: 'absolute',
                    right: '-70px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
