// Google Analytics 4 - Configuración de Eventos
// Emma Mora Oriflame

// Función helper para enviar eventos a GA4
window.sendGAEvent = function(eventName, parameters = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      custom_parameter_1: 'oriflame_consultant',
      page_title: 'Emma Mora Oriflame',
      ...parameters
    });
    console.log('GA4 Event sent:', eventName, parameters);
  }
};

// Eventos básicos automáticos
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Seguimiento de scroll profundo (75% de la página)
  let scrollTracked = false;
  window.addEventListener('scroll', function() {
    if (!scrollTracked) {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 75) {
        sendGAEvent('scroll', {
          event_category: 'engagement',
          event_label: 'deep_scroll_75_percent',
          value: 75
        });
        scrollTracked = true;
      }
    }
  });

  // 2. Seguimiento de tiempo en página
  let timeOnPageTracked = false;
  setTimeout(() => {
    if (!timeOnPageTracked) {
      sendGAEvent('time_on_page', {
        event_category: 'engagement',
        event_label: '30_seconds',
        value: 30
      });
      timeOnPageTracked = true;
    }
  }, 30000); // 30 segundos

  // 3. Seguimiento de enlaces externos
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href) {
      const url = new URL(link.href);
      const currentDomain = window.location.hostname;
      
      // Si es enlace externo
      if (url.hostname !== currentDomain) {
        sendGAEvent('click', {
          event_category: 'outbound',
          event_label: url.hostname,
          link_url: link.href,
          link_text: link.textContent || 'External Link'
        });
      }
    }
  });

  console.log('Google Analytics 4 events initialized for Emma Mora Oriflame');
});