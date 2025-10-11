// Google Analytics 4 - Enhanced Ecommerce para Oriflame
// Seguimiento avanzado de productos y conversiones

window.OriflameEcommerce = {
  
  // Configurar información del producto
  createProductItem: function(productName, category = 'Beauty', price = 0, productId = null) {
    return {
      item_id: productId || productName.toLowerCase().replace(/\s+/g, '_'),
      item_name: productName,
      item_category: category,
      item_brand: 'Oriflame',
      price: price,
      quantity: 1
    };
  },

  // Ver lista de productos (ej: en la sección de productos)
  trackViewItemList: function(items, listName = 'Product Gallery') {
    gtag('event', 'view_item_list', {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: items
    });
  },

  // Ver producto individual
  trackViewItem: function(productName, category = 'Beauty', price = 0) {
    const item = this.createProductItem(productName, category, price);
    
    gtag('event', 'view_item', {
      currency: 'CRC', // Costa Rica Colones
      value: price,
      items: [item]
    });
  },

  // Interés en producto (ej: click en imagen, ver detalles)
  trackSelectItem: function(productName, category = 'Beauty', listName = 'Product Gallery') {
    const item = this.createProductItem(productName, category);
    
    gtag('event', 'select_item', {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: [item]
    });
  },

  // Agregar a lista de deseos (si implementas esta función)
  trackAddToWishlist: function(productName, category = 'Beauty', price = 0) {
    const item = this.createProductItem(productName, category, price);
    
    gtag('event', 'add_to_wishlist', {
      currency: 'CRC',
      value: price,
      items: [item]
    });
  },

  // Iniciar checkout (ej: contactar por WhatsApp sobre un producto)
  trackBeginCheckout: function(productName, category = 'Beauty', price = 0) {
    const item = this.createProductItem(productName, category, price);
    
    gtag('event', 'begin_checkout', {
      currency: 'CRC',
      value: price,
      items: [item]
    });
  },

  // Conversión: compra completada
  trackPurchase: function(items, transactionId, totalValue) {
    gtag('event', 'purchase', {
      transaction_id: transactionId,
      currency: 'CRC',
      value: totalValue,
      items: items
    });
  },

  // Conversión: lead generado (formulario completado)
  trackGenerateLead: function(leadSource = 'contact_form', value = 10) {
    gtag('event', 'generate_lead', {
      currency: 'CRC',
      value: value, // Valor estimado del lead
      lead_source: leadSource
    });
  },

  // Búsqueda de productos (si tienes función de búsqueda)
  trackSearch: function(searchTerm, resultsCount = 0) {
    gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    });
  }
};

// Auto-configuración para Enhanced Ecommerce
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Detectar vista de productos en slider/galería
  const productImages = document.querySelectorAll('[class*="slide"], [class*="product"], img[alt*="product"]');
  if (productImages.length > 0) {
    // Crear lista de productos visibles
    const visibleProducts = Array.from(productImages).map((img, index) => {
      const productName = img.alt || img.title || `Producto ${index + 1}`;
      return OriflameEcommerce.createProductItem(productName, 'Beauty', 0);
    }).filter(item => item.item_name !== '');

    if (visibleProducts.length > 0) {
      OriflameEcommerce.trackViewItemList(visibleProducts, 'Galería de Productos');
    }
  }

  // 2. Detectar clics en productos
  document.addEventListener('click', function(e) {
    const productElement = e.target.closest('[class*="slide"], [class*="product"]');
    if (productElement) {
      const img = productElement.querySelector('img');
      const title = productElement.querySelector('h3, h2, .title, [class*="title"]');
      
      if (img || title) {
        const productName = title?.textContent || img?.alt || 'Producto Oriflame';
        OriflameEcommerce.trackSelectItem(productName, 'Beauty', 'Galería de Productos');
      }
    }
  });

  // 3. Enhanced tracking para WhatsApp (considera como begin_checkout)
  const originalWhatsAppTrack = window.OriflameAnalytics?.trackWhatsAppClick;
  if (originalWhatsAppTrack) {
    window.OriflameAnalytics.trackWhatsAppClick = function(source) {
      // Llamar función original
      originalWhatsAppTrack.call(this, source);
      
      // Agregar enhanced ecommerce si hay contexto de producto
      const activeProduct = document.querySelector('.active [class*="slide"], .current [class*="product"]');
      if (activeProduct) {
        const productName = activeProduct.querySelector('h3, h2, img')?.textContent || 
                           activeProduct.querySelector('img')?.alt || 'Consulta Oriflame';
        OriflameEcommerce.trackBeginCheckout(productName, 'Beauty', 0);
      }
    };
  }

  // 4. Enhanced tracking para formulario (considera como generate_lead)
  const originalFormSubmit = window.OriflameAnalytics?.trackFormSubmit;
  if (originalFormSubmit) {
    window.OriflameAnalytics.trackFormSubmit = function(success) {
      // Llamar función original
      originalFormSubmit.call(this, success);
      
      // Agregar lead tracking si es exitoso
      if (success) {
        OriflameEcommerce.trackGenerateLead('contact_form', 15); // Valor estimado de lead
      }
    };
  }

  console.log('Oriflame Enhanced Ecommerce initialized');
});