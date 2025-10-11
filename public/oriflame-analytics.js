// Google Analytics 4 - Eventos Específicos para Oriflame
// Emma Mora - Consultora Oriflame

// Configuración específica para el negocio de Oriflame
window.OriflameAnalytics = {
  
  // Eventos de WhatsApp
  trackWhatsAppClick: function(source = 'unknown') {
    sendGAEvent('contact_whatsapp', {
      event_category: 'contact',
      event_label: source,
      method: 'whatsapp',
      contact_type: 'instant_message'
    });
  },

  // Eventos de formulario de contacto
  trackFormStart: function() {
    sendGAEvent('form_start', {
      event_category: 'form',
      event_label: 'contact_form',
      form_name: 'contact_form'
    });
  },

  trackFormSubmit: function(success = true) {
    sendGAEvent('form_submit', {
      event_category: 'form',
      event_label: success ? 'contact_form_success' : 'contact_form_error',
      form_name: 'contact_form',
      success: success
    });
  },

  // Eventos de catálogo
  trackCatalogView: function(catalogName) {
    sendGAEvent('catalog_view', {
      event_category: 'catalog',
      event_label: catalogName,
      content_type: 'catalog',
      item_name: catalogName
    });
  },

  trackCatalogDownload: function(catalogName, catalogUrl) {
    sendGAEvent('catalog_download', {
      event_category: 'catalog',
      event_label: catalogName,
      content_type: 'pdf',
      item_name: catalogName,
      file_name: catalogUrl
    });
  },

  // Eventos de productos
  trackProductView: function(productName, category = 'beauty') {
    sendGAEvent('view_item', {
      event_category: 'ecommerce',
      event_label: productName,
      item_name: productName,
      item_category: category,
      item_brand: 'Oriflame'
    });
  },

  // Eventos de navegación
  trackSectionView: function(sectionName) {
    sendGAEvent('section_view', {
      event_category: 'navigation',
      event_label: sectionName,
      section_name: sectionName
    });
  },

  // Eventos de redes sociales
  trackSocialClick: function(platform, action = 'click') {
    sendGAEvent('social_click', {
      event_category: 'social',
      event_label: platform,
      social_platform: platform,
      social_action: action
    });
  }
};

// Auto-configuración cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {

  // 1. Seguimiento automático de WhatsApp
  document.addEventListener('click', function(e) {
    const element = e.target.closest('a, button');
    if (element) {
      const href = element.href || '';
      const text = element.textContent.toLowerCase();
      
      // Detectar clics en WhatsApp
      if (href.includes('wa.me') || href.includes('whatsapp') || text.includes('whatsapp')) {
        const source = element.closest('[id]')?.id || 'button';
        OriflameAnalytics.trackWhatsAppClick(source);
      }
      
      // Detectar clics en redes sociales
      if (href.includes('facebook.com')) {
        OriflameAnalytics.trackSocialClick('facebook');
      }
    }
  });

  // 2. Seguimiento de navegación por secciones (usando intersection observer)
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionName = entry.target.id;
          OriflameAnalytics.trackSectionView(sectionName);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // 3. Seguimiento de formularios
  const contactForm = document.querySelector('form.contact-form, form[class*="contact"]');
  if (contactForm) {
    // Detectar cuando empiezan a llenar el formulario
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    let formStartTracked = false;
    
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        if (!formStartTracked) {
          OriflameAnalytics.trackFormStart();
          formStartTracked = true;
        }
      });
    });

    // Detectar envío del formulario
    contactForm.addEventListener('submit', function(e) {
      OriflameAnalytics.trackFormSubmit(true);
    });
  }

  // 4. Seguimiento de catálogos (links PDF)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href) {
      const href = link.href.toLowerCase();
      if (href.includes('.pdf') || link.textContent.toLowerCase().includes('catálogo')) {
        const catalogName = link.textContent.trim() || 'Catálogo Oriflame';
        if (href.includes('.pdf')) {
          OriflameAnalytics.trackCatalogDownload(catalogName, href);
        } else {
          OriflameAnalytics.trackCatalogView(catalogName);
        }
      }
    }
  });

  console.log('Oriflame Analytics events initialized');
});