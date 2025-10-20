import React, { memo } from 'react';
import './AboutQuote.css';
import aboutQuoteData from './data/aboutQuote.json';

const AboutQuote = () => {
  const { title, quote, image, author, position } = aboutQuoteData;

  return (
    <section className="about-quote-container">
      <div className="about-quote-content">
        <div className="about-quote-image">
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        </div>
        
        <div className="about-quote-text">
          <h2 className="about-quote-title">{title}</h2>
          
          <blockquote className="about-quote">
            <p>"{quote}"</p>
            {author && (
              <footer className="about-quote-author">
                <cite>
                  {author}
                  {position && <span className="author-position">, {position}</span>}
                </cite>
              </footer>
            )}
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutQuote);