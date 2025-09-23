import React, { useEffect, useState } from 'react';
import './NavBar.css';
import data from './data/navbar.json';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 20);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__brand">
          <img
            src={process.env.PUBLIC_URL + '/logovertical.png'}
            alt="Emma Mora Oriflame"
            style={{ height: 130, width: 'auto', display: 'block' }}
          />
        </div>
        <div
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <span />
          <span />
          <span />
        </div>
        <nav className="navbar__nav" aria-label="Navegación principal">
          <ul className={`navbar__links${menuOpen ? " open" : ""}`}>
            {data.links.map((link, index) => (
              <li className="navbar__item" key={index}>
                <a
                  className="navbar__link"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


