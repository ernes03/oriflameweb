import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <nav className="footer-nav">
          <a href="#about">Acerca de</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
        </nav>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
