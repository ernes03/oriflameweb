import React, { memo } from 'react';
import NavBar from './NavBar';
import HeroShot from './HeroShot';
import Footer from './Footer';
import ContactForm from './ContactForm';
import Catalogs from './Catalogs';
import ImageSlider from './ImageSlider';
import SocialMedia from './SocialMedia';
import AboutQuote from './AboutQuote';

// Secciones memoizadas para evitar re-renders innecesarios en scroll
const HeroSection = memo(() => (
  <section id="inicio">
    <HeroShot/>
  </section>
));
HeroSection.displayName = 'HeroSection';

const AboutSection = memo(() => (
  <section id="acerca">
    <AboutQuote/>
  </section>
));
AboutSection.displayName = 'AboutSection';

const ProductsSection = memo(() => (
  <section id="productos">
    <ImageSlider/>
  </section>
));
ProductsSection.displayName = 'ProductsSection';

const CatalogsSection = memo(() => (
  <section id="catalogos">
    <Catalogs/>
  </section>
));
CatalogsSection.displayName = 'CatalogsSection';

const SocialSection = memo(() => (
  <section id="redes">
    <SocialMedia/>
  </section>
));
SocialSection.displayName = 'SocialSection';

const ContactSection = memo(() => (
  <section id="contacto">
    <ContactForm/>
  </section>
));
ContactSection.displayName = 'ContactSection';

// Contenedor principal memoizado
const MainContent = memo(() => (
  <div className="app-container">
    <AboutSection />
    <ProductsSection />
    <CatalogsSection />
    <SocialSection />
  </div>
));
MainContent.displayName = 'MainContent';

const AppWrapper = memo(() => {
  return (
    <>
      <NavBar/>
      <main>
        <HeroSection />
        <MainContent />
        <ContactSection />
      </main>
      <Footer/>
    </>
  );
});

AppWrapper.displayName = 'AppWrapper';

export default AppWrapper;