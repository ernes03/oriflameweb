import React, { useState, memo } from 'react';
import './SocialMedia.css';
import socialMediaData from './data/socialMedia.json';

const SocialMedia = () => {
  const { facebook, whatsapp, settings, title } = socialMediaData;
  const [isVisible, setIsVisible] = useState(true);

  // Función para toggle la visibilidad
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Iconos SVG oficiales
  const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.51 3.488"/>
    </svg>
  );

  const getIcon = (iconType) => {
    switch(iconType) {
      case 'facebook':
        return <FacebookIcon />;
      case 'whatsapp':
        return <WhatsAppIcon />;
      default:
        return null;
    }
  };

  // Función para abrir Facebook
  const handleFacebookClick = () => {
    if (facebook.enabled) {
      window.open(facebook.url, facebook.target);
    }
  };

  // Función para abrir WhatsApp
  const handleWhatsAppClick = () => {
    if (whatsapp.enabled) {
      const { phoneNumber, countryCode, message } = whatsapp;
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${fullPhoneNumber}?text=${encodedMessage}`;
      
      // Detectar si es dispositivo móvil
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // En móviles, abrir la app de WhatsApp directamente
        window.location.href = whatsappUrl;
      } else {
        // En escritorio, abrir en nueva pestaña
        window.open(whatsappUrl, '_blank');
      }
    }
  };

  return (
    <div className={`social-media-container ${settings.position} ${settings.buttonStyle} ${!isVisible ? 'closed' : ''}`}>
      {/* Botón toggle */}
      <button 
        className="toggle-button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Ocultar redes sociales" : "Mostrar redes sociales"}
      >
        {isVisible ? "−" : "+"}
      </button>

      {/* Contenido que se puede mostrar/ocultar */}
      {isVisible && (
        <div className="social-content">
          {settings.showTitle && (
            <h2 className="social-media-title">{title}</h2>
          )}
          
          <div className={`social-media-buttons spacing-${settings.spacing}`}>
            {facebook.enabled && (
              <button 
                className="social-button facebook-button"
                onClick={handleFacebookClick}
                aria-label={facebook.label}
              >
                <span className="social-icon">{getIcon(facebook.icon)}</span>
                <span className="social-label">{facebook.label}</span>
              </button>
            )}
            
            {whatsapp.enabled && (
              <button 
                className="social-button whatsapp-button"
                onClick={handleWhatsAppClick}
                aria-label={whatsapp.label}
              >
                <span className="social-icon">{getIcon(whatsapp.icon)}</span>
                <span className="social-label">{whatsapp.label}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SocialMedia);