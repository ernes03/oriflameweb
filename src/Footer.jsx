import React, { memo } from 'react';
import './Footer.css';
import data from './data/footer.json';
import socialMediaData from './data/socialMedia.json';

const Footer = () => {
  // Iconos SVG para redes sociales
  const FacebookIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.451.742.967 1.201.664.59 1.024.77 1.187.856.173.087.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087.158.059.817.385 1.039.455.231.087.346.173.375.202.028.087.028.405-.116.810z"/>
    </svg>
  );

  // Funciones para manejar clics
  const handleFacebookClick = () => {
    if (socialMediaData.facebook.enabled) {
      window.open(socialMediaData.facebook.url, socialMediaData.facebook.target);
    }
  };

  const handleWhatsAppClick = () => {
    if (socialMediaData.whatsapp.enabled) {
      const { phoneNumber, countryCode, message } = socialMediaData.whatsapp;
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        window.location.href = whatsappUrl;
      } else {
        window.open(whatsappUrl, '_blank');
      }
    }
  };
  return (
    <footer className="footer" aria-labelledby="footer-title">
      <div className="footer-content">
        <h2 id="footer-title" className="sr-only">Pie de página</h2>
        
        {/* Iconos de redes sociales */}
        <div className="footer-social">
          {socialMediaData.facebook.enabled && (
            <button 
              className="footer-social-icon facebook"
              onClick={handleFacebookClick}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </button>
          )}
          
          {socialMediaData.whatsapp.enabled && (
            <button 
              className="footer-social-icon whatsapp"
              onClick={handleWhatsAppClick}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </button>
          )}
        </div>

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

export default memo(Footer);
