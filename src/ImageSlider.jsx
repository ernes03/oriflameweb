import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import './ImageSlider.css';
import sliderData from './data/imageSlider.json';

const ImageSlider = memo(() => {
  const { slider } = sliderData;
  
  // Filtrar solo las imágenes activas - memoizado para evitar recálculos
  const activeImages = useMemo(() => 
    slider.images.filter(image => image.active), 
    [slider.images]
  );
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);

  // Intersection Observer para detectar visibilidad
  useEffect(() => {
    const sliderElement = sliderRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sliderElement) {
      observer.observe(sliderElement);
    }

    return () => {
      if (sliderElement) {
        observer.unobserve(sliderElement);
      }
    };
  }, []);

  // Auto-play functionality - optimizado y solo cuando es visible
  useEffect(() => {
    if (!slider.autoPlay || activeImages.length <= 1 || isTouch || !isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
      );
    }, slider.autoPlayInterval);

    return () => clearInterval(interval);
  }, [slider.autoPlay, slider.autoPlayInterval, activeImages.length, isTouch, isVisible]);

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setIsTouch(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      goToPrevious();
    }
    
    setTimeout(() => {
      setIsTouch(false);
    }, 1000);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsTouch(true);
    touchStartX.current = e.clientX;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (touchStartX.current) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (touchStartX.current && touchEndX.current) {
      if (touchStartX.current - touchEndX.current > 50) {
        goToNext();
      }
      if (touchStartX.current - touchEndX.current < -50) {
        goToPrevious();
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
    
    setTimeout(() => {
      setIsTouch(false);
    }, 1000);
  };

  const handleMouseLeave = () => {
    touchStartX.current = 0;
    touchEndX.current = 0;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
    setIsTouch(false);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? activeImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === activeImages.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (activeImages.length === 0) {
    return <div className="image-slider-empty">No hay imágenes disponibles</div>;
  }

  return (
    <div className="image-slider-container">
      {/* Título del slider */}
      <div className="slider-title-section">
        <h2 className="slider-main-title">{slider.title}</h2>
      </div>
      
      {/* Contenedor principal del slider */}
      <div 
        className="slider-wrapper-main"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
      >
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {activeImages.map((image, index) => (
            <div key={image.id} className="slide-item">
              <img 
                src={image.url} 
                alt={image.title}
                className="slide-image"
                loading="lazy"
                decoding="async"
              />
              <div className="slide-overlay">
                <h3 className="slide-title">{image.title}</h3>
                <p className="slide-description">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Solo en desktop */}
        {slider.showArrows && activeImages.length > 1 && (
          <>
            <button 
              className="nav-arrow nav-arrow-left" 
              onClick={goToPrevious}
              aria-label="Imagen anterior"
            >
              &#8249;
            </button>
            <button 
              className="nav-arrow nav-arrow-right" 
              onClick={goToNext}
              aria-label="Siguiente imagen"
            >
              &#8250;
            </button>
          </>
        )}
      </div>

      {/* Dots de navegación */}
      {slider.showDots && activeImages.length > 1 && (
        <div className="slider-dots-container">
          {activeImages.map((image, index) => (
            <button
              key={index}
              className={`dot-button ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
});

ImageSlider.displayName = 'ImageSlider';

export default ImageSlider;