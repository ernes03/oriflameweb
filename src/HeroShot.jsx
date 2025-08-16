import React, { useEffect, useMemo, useState } from 'react';
import data from './data/heroshot.json';
import './HeroShot.css';
import HeroImage1 from './media/HeroImage1.jpg';
import HeroImage2 from './media/HeroImage2.jpg';
import HeroImage3 from './media/HeroImage3.jpg';

const imageMap = {
  'HeroImage1.jpg': HeroImage1,
  'HeroImage2.jpg': HeroImage2,
  'HeroImage3.jpg': HeroImage3,
};

const SLIDE_INTERVAL_MS = 10000;
const FADE_DURATION_MS = 2500;

const HeroShot = () => {
  const slides = useMemo(() => data.slides || [], []);
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeIn(false);
      
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        
        setTimeout(() => {
          setFadeIn(true);
        }, 100); // Aumenté el delay para evitar overlap
      }, FADE_DURATION_MS);
      
    }, SLIDE_INTERVAL_MS);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const current = slides[index];
  // Maneja tanto URLs externas como imágenes locales
  const imageSrc = current.image.startsWith('http') 
    ? current.image 
    : (imageMap[current.image] ?? HeroImage1);
  const contentStyle = { '--fade-duration': `${FADE_DURATION_MS}ms` };
  const isReversed = Boolean(current.reverse);
  const textAlign = current.textAlign === 'left' ? 'left' : current.textAlign === 'right' ? 'right' : undefined;
  const stackClass = current.stack === 'image-top' ? 'is-imageTop' : '';
  const spacedClass = current.spaced === false ? 'is-close' : '';

  return (
    <section className="hero-shot" aria-label="Hero principal">
      <div className="hero-shot__stage">
        <div
        className={`hero-shot__content ${isReversed ? 'is-reversed' : ''} ${stackClass} ${spacedClass} fade ${fadeIn ? 'in' : 'out'}`}
          style={contentStyle}
        >
          <div className="hero-shot__messages" style={textAlign ? { textAlign } : undefined}>
            <div className="hero-shot__text-container">
              <h1 className="hero-shot__headline">{current.headline}</h1>
              <p className="hero-shot__subheadline">{current.subheadline}</p>
              <ul className="hero-shot__bullets">
                {current.messages.map((message, messageIndex) => (
                  <li key={messageIndex}>{message}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero-shot__imageWrapper">
            <img
              className="hero-shot__image"
              src={imageSrc}
              alt={current.imageAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroShot;


