import { useState, useEffect, useRef } from 'react';

interface CircularImageSliderProps {
  images: string[];
  title: string;
  accentColor: string;
  onImageClick?: (imageUrl: string) => void;
}

export function CircularImageSlider({
  images,
  title,
  accentColor,
  onImageClick,
}: CircularImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<(HTMLDivElement | null)[]>([]);

  if (!images || images.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            border: '2px dashed #E8DFD0',
            background: '#FAF7F2',
            borderRadius: '16px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B0A090',
            fontSize: '14px',
          }}
        >
          No images added
        </div>
      </div>
    );
  }

  const goToImage = (index: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  };

  const goToNext = () => {
    goToImage((currentIndex + 1) % images.length);
  };

  const goToPrev = () => {
    goToImage((currentIndex - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    goToImage(index);
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {/* Image Counter */}
      <div
        style={{
          textAlign: 'right',
          marginBottom: '12px',
          fontSize: '12px',
          color: 'white',
          background: 'rgba(0,0,0,0.5)',
          display: 'inline-block',
          padding: '4px 10px',
          borderRadius: '12px',
          backdropFilter: 'blur(4px)',
        }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '16px',
          overflow: 'hidden',
          background: '#f0f0f0',
          marginBottom: '20px',
        }}
      >
        {/* Main Image */}
        <div
          key={`image-${currentIndex}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            animation: `slideInRight 400ms cubic-bezier(0.4,0,0.2,1) forwards`,
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`${title} ${currentIndex + 1}`}
            onClick={() => onImageClick?.(images[currentIndex])}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: onImageClick ? 'pointer' : 'default',
              transition: 'transform 250ms ease-out',
            }}
            onMouseEnter={(e) => {
              if (onImageClick) {
                (e.target as HTMLImageElement).style.transform = 'scale(1.04)';
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.transform = 'scale(1)';
            }}
          />
          {/* Hover Overlay */}
          {onImageClick && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 250ms ease-out',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.3)';
                const icon = e.currentTarget.querySelector('div');
                if (icon) (icon.style.opacity = '1');
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0)';
                const icon = e.currentTarget.querySelector('div');
                if (icon) (icon.style.opacity = '0');
              }}
            >
              <div
                style={{
                  opacity: 0,
                  transition: 'opacity 250ms ease-out',
                  fontSize: '32px',
                }}
              >
                🔍
              </div>
            </div>
          )}
        </div>

        {/* Left Arrow */}
        <button
          onClick={goToPrev}
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: accentColor,
            color: '#F5EDD8',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 200ms ease-out',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5C4420';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = accentColor;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: accentColor,
            color: '#F5EDD8',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            transition: 'all 200ms ease-out',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5C4420';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = accentColor;
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          ›
        </button>
      </div>

      {/* Circular Thumbnails */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
      >
        {images.map((image, index) => (
          <div
            ref={(el) => {
              thumbsRef.current[index] = el;
            }}
            key={index}
            onClick={() => handleThumbnailClick(index)}
            style={{
              width: '64px',
              minWidth: '64px',
              height: '64px',
              borderRadius: '50%',
              cursor: 'pointer',
              opacity: index === currentIndex ? 1 : 0.55,
              transform: index === currentIndex ? 'scale(1.15)' : 'scale(1)',
              border:
                index === currentIndex
                  ? `3px solid ${accentColor}`
                  : '2px solid rgba(255,255,255,0.2)',
              boxShadow:
                index === currentIndex
                  ? `0 0 0 4px ${accentColor}33`
                  : 'none',
              overflow: 'hidden',
              animation: `thumbnailFadeIn 350ms ease-out ${index * 60}ms both`,
              transition: 'all 300ms ease-out',
            }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
