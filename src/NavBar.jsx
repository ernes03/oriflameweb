import React, { useEffect, useState } from 'react';
import './NavBar.css';
import data from './data/navbar.json';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="navbar__brand">{data.brand}</div>
        <nav className="navbar__nav" aria-label="Navegación principal">
          <ul className="navbar__links">
            {data.links.map((link, index) => (
              <li className="navbar__item" key={index}>
                <a className="navbar__link" href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


