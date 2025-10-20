import React, { memo } from 'react';
import NavBar from './NavBar';
import HeroShot from './HeroShot';
import Footer from './Footer';
import ContactForm from './ContactForm';
import Catalogs from './Catalogs';
import ImageSlider from './ImageSlider';
import SocialMedia from './SocialMedia';
import AboutQuote from './AboutQuote';

const AppWrapper = memo(() => {
  return (
    <>
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
    </>
  );
});

AppWrapper.displayName = 'AppWrapper';

export default AppWrapper;