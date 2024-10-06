import React from 'react';
import './NavBar.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Oriflame Emma Mora</div>
      <ul className="navbar-links">
        <li className="navbar-item"><a href="/">Inicio</a></li>
        <li className="navbar-item"><a href="/about">Acerca de</a></li>
        <li className="navbar-item"><a href="/services">Servicios</a></li>
        <li className="navbar-item"><a href="/services">Productos</a></li>
        <li className="navbar-item"><a href="/contact">Contacto</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;