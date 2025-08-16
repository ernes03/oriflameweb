import React from 'react';
import './Footer.css';
import data from './data/footer.json';

const Footer = () => {
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <div className="footer-content">
        <h2 id="footer-title" className="sr-only">Pie de página</h2>
        <nav className="footer-nav" aria-label="Enlaces de pie">
          {data.links.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <div className="footer-info">
          <p>
            &copy; {new Date().getFullYear()} {data.copyright}. {data.note}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
