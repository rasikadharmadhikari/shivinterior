import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SlidingCarouselViewerProps {
  images: string[];
  title: string;
  accentColor: string;
  onClose: () => void;
}

export function SlidingCarouselViewer({
  images,
  title,
  accentColor,
  onClose,
}: SlidingCarouselViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isPausedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Detect mobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!images || images.length === 0) {
    return createPortal(
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(2,1,0,0.96)",
          backdropFilter: "blur(20px)",
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.4)",
            fontSize: "16px",
          }}
        >
          No photos available
        </div>
      </div>,
      document.body
    );
  }

  const getOffset = (index: number, current: number, total: number) => {
    let offset = index - current;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 650);
  };

  const handleArrow = (direction: "next" | "prev") => {
    isPausedRef.current = true;
    direction === "next" ? goToNext() : goToPrev();
    setTimeout(() => {
      isPausedRef.current = false;
    }, 4000);
  };

  const getCardStyle = (index: number) => {
    const total = images.length;
    const offset = getOffset(index, currentIndex, total);

    const cardWidth = isMobile
      ? window.innerWidth * 0.88
      : Math.min(window.innerWidth * 0.52, 580);
    const cardHeight = isMobile
      ? window.innerWidth * 0.62
      : Math.min(window.innerHeight * 0.72, 640);
    const gap = isMobile ? cardWidth * 0.92 : cardWidth * 0.88;

    const translateX = offset * gap;
    const scale =
      offset === 0
        ? 1
        : Math.abs(offset) === 1
          ? 0.82
          : 0.68;
    const opacity =
      offset === 0
        ? 1
        : Math.abs(offset) === 1
          ? 0.55
          : Math.abs(offset) === 2
            ? 0.25
            : 0;
    const zIndex =
      offset === 0 ? 10 : Math.abs(offset) === 1 ? 5 : 1;
    const brightness =
      offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.55 : 0.3;

    return {
      position: "absolute" as const,
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      left: "50%",
      top: "50%",
      marginLeft: `-${cardWidth / 2}px`,
      marginTop: `-${cardHeight / 2}px`,
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity: opacity,
      zIndex: zIndex,
      filter: `brightness(${brightness})`,
      transition: "@media (prefers-reduced-motion: no-preference) { all 600ms cubic-bezier(0.4,0,0.2,1) }",
      borderRadius: "16px",
      overflow: "hidden" as const,
      cursor: "zoom-in",
      boxShadow:
        offset === 0
          ? "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.08)"
          : "0 20px 50px rgba(0,0,0,0.6)",
      userSelect: "none" as const,
    };
  };

  // Auto rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current && !isAnimating) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }, 2800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, isAnimating]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") setSelectedImage(null);
        if (e.key === "ArrowRight") {
          const i = images.indexOf(selectedImage);
          setSelectedImage(images[(i + 1) % images.length]);
        }
        if (e.key === "ArrowLeft") {
          const i = images.indexOf(selectedImage);
          setSelectedImage(images[(i - 1 + images.length) % images.length]);
        }
      } else {
        if (e.key === "ArrowRight") handleArrow("next");
        if (e.key === "ArrowLeft") handleArrow("prev");
        if (e.key === "Escape") onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, selectedImage, images]);

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      handleArrow(delta > 0 ? "next" : "prev");
    }
    touchStartX.current = null;
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return createPortal(
    <>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideCarouselFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: no-preference) {
          .slide-carousel-card {
            transition: transform 600ms cubic-bezier(0.4,0,0.2,1), opacity 600ms ease, filter 600ms ease, scale 600ms ease;
          }
          .slide-carousel-dot {
            transition: all 350ms cubic-bezier(0.34,1.56,0.64,1);
          }
        }
      `}</style>

      {/* Main Overlay Container */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(2,1,0,0.96)",
          backdropFilter: "blur(20px)",
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          animation: "slideCarouselFade 400ms ease forwards",
        }}
        onClick={onClose}
      >
        {/* Header Bar */}
        <div
          style={{
            width: "100%",
            padding: "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              color: "white",
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.25)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Carousel Track Area */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "calc(100vh - 140px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Render all image cards */}
          {images.map((img, index) => {
            const style = getCardStyle(index);
            const offset = getOffset(index, currentIndex, images.length);
            if (style.opacity === 0) return null;

            return (
              <div
                key={index}
                className="slide-carousel-card"
                style={{
                  position: style.position,
                  width: style.width,
                  height: style.height,
                  left: style.left,
                  top: style.top,
                  marginLeft: style.marginLeft,
                  marginTop: style.marginTop,
                  transform: style.transform,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  filter: style.filter,
                  borderRadius: style.borderRadius,
                  overflow: style.overflow,
                  cursor: style.cursor,
                  boxShadow: style.boxShadow,
                  userSelect: style.userSelect,
                }}
                onClick={() => {
                  setSelectedImage(img);
                }}
              >
                <img
                  src={img}
                  alt={`Photo ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    pointerEvents: "none",
                    userSelect: "none" as any,
                  }}
                />
                {/* Gradient overlay on side cards */}
                {offset !== 0 && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.35)",
                      borderRadius: "16px",
                    }}
                  />
                )}
                {/* Click to open hint on all cards */}
                {(
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      background: "rgba(0,0,0,0.55)",
                      color: "white",
                      fontSize: "11px",
                      padding: "5px 12px",
                      borderRadius: "12px",
                      backdropFilter: "blur(4px)",
                      letterSpacing: "0.06em",
                      opacity: 0.85,
                    }}
                  >
                    Click to enlarge
                  </div>
                )}
              </div>
            );
          })}

          {/* Left arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleArrow("prev");
            }}
            style={{
              position: "absolute",
              left: isMobile ? "8px" : "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: isMobile ? "40px" : "52px",
              height: isMobile ? "40px" : "52px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontSize: "26px",
              cursor: "pointer",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            ‹
          </button>

          {/* Right arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleArrow("next");
            }}
            style={{
              position: "absolute",
              right: isMobile ? "8px" : "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: isMobile ? "40px" : "52px",
              height: isMobile ? "40px" : "52px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontSize: "26px",
              cursor: "pointer",
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            ›
          </button>
        </div>

        {/* Dot Indicators */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px 0",
          }}
        >
          {images.map((_, i) => (
            <div
              key={i}
              className="slide-carousel-dot"
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrentIndex(i);
                  setTimeout(() => setIsAnimating(false), 650);
                }
              }}
              style={{
                width: i === currentIndex ? "28px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background:
                  i === currentIndex
                    ? accentColor
                    : "rgba(255,255,255,0.3)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.98)",
            zIndex: 9999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeInScale 280ms ease forwards",
          }}
        >
          <img
            src={selectedImage}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "88vw",
              maxHeight: "86vh",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
            }}
          />

          {/* Left arrow in fullscreen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const i = images.indexOf(selectedImage);
              setSelectedImage(images[(i - 1 + images.length) % images.length]);
            }}
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontSize: "26px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
          >
            ‹
          </button>

          {/* Right arrow in fullscreen */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const i = images.indexOf(selectedImage);
              setSelectedImage(images[(i + 1) % images.length]);
            }}
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "white",
              fontSize: "26px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
          >
            ›
          </button>

          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 250ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>

          {/* Image counter */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.55)",
              color: "white",
              fontSize: "13px",
              padding: "6px 16px",
              borderRadius: "16px",
              backdropFilter: "blur(4px)",
            }}
          >
            {images.indexOf(selectedImage) + 1} / {images.length}
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
