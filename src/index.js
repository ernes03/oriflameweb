import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Container.css';
// App from './App';
import NavBar from './NavBar';
import reportWebVitals from './reportWebVitals';
import HeroShot from './HeroShot';
import Footer from './Footer';
import ContactForm from './ContactForm';
import Catalogs from './Catalogs';
import ImageSlider from './ImageSlider';
import SocialMedia from './SocialMedia';
import AboutQuote from './AboutQuote';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar/>
    <main>
      <section id="inicio">
        <HeroShot/>
      </section>
      <div className="app-container">
        <section id="acerca">
          <AboutQuote/>
        </section>
        <section id="productos">
          <ImageSlider/>
        </section>
        <section id="catalogos">
          <Catalogs/>
        </section>
        <section id="redes">
          <SocialMedia/>
        </section>
      </div>
      <section id="contacto">
        <ContactForm/>
      </section>
    </main>
    <Footer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
