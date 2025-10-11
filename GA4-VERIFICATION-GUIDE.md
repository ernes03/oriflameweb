# Google Analytics 4 - Guía de Verificación y Testing
# Emma Mora Oriflame

## ✅ PASOS PARA VERIFICAR LA INSTALACIÓN

### 1. Reemplazar el ID de Google Analytics
- Abrir: `/public/index.html`
- Buscar: `G-XXXXXXXXXX` (aparece 2 veces)
- Reemplazar con tu ID real de GA4 (ej: `G-ABC123DEF4`)

### 2. Verificar en el navegador
1. Abrir las DevTools (F12)
2. Ir a la pestaña "Network"
3. Recargar la página
4. Buscar requests a:
   - `googletagmanager.com/gtag/js`
   - `google-analytics.com/g/collect`

### 3. Usar Google Analytics DebugView
1. Instalar extensión "Google Analytics Debugger"
2. Activar la extensión
3. Navegar por el sitio
4. Ver eventos en tiempo real en GA4 > Configure > DebugView

### 4. Verificar eventos específicos
- ✅ page_view (automático)
- ✅ scroll (al hacer scroll 75%)
- ✅ contact_whatsapp (click en WhatsApp)
- ✅ form_start (focus en formulario)
- ✅ form_submit (enviar formulario)
- ✅ catalog_download (click en PDF)
- ✅ section_view (navegar secciones)
- ✅ social_click (click Facebook)
- ✅ view_item_list (ver galería productos)
- ✅ select_item (click en producto)

## 🎯 EVENTOS PRINCIPALES A MONITOREAR

### Eventos de Contacto (Más importantes)
- `contact_whatsapp` - Lead caliente
- `form_submit` - Lead contacto
- `generate_lead` - Conversión

### Eventos de Productos
- `view_item_list` - Interés en catálogo
- `select_item` - Interés específico
- `begin_checkout` - WhatsApp sobre producto

### Eventos de Engagement
- `scroll` - Páginas interesantes
- `time_on_page` - Tiempo de calidad
- `section_view` - Navegación efectiva

## 📊 CONFIGURACIÓN EN GOOGLE ANALYTICS 4

### 1. Objetivos/Conversiones a crear:
- `contact_whatsapp` (valor: 20)
- `form_submit` (valor: 25)
- `generate_lead` (valor: 30)
- `catalog_download` (valor: 5)

### 2. Audiencias a crear:
- "Interesados en productos" (view_item + select_item)
- "Leads calientes" (contact_whatsapp OR form_submit)
- "Engagement alto" (scroll + time_on_page > 30s)

### 3. Reports personalizados:
- Embudo de conversión: page_view → section_view → contact
- ROI por fuente de tráfico
- Productos más vistos

## 🔧 COMANDOS DE TESTING EN CONSOLA

```javascript
// Probar evento de WhatsApp
OriflameAnalytics.trackWhatsAppClick('test');

// Probar evento de catálogo
OriflameAnalytics.trackCatalogDownload('Test Catalog', 'test.pdf');

// Probar producto
OriflameEcommerce.trackViewItem('Royal Velvet Test', 'Beauty', 50);

// Ver dataLayer
console.log(window.dataLayer);
```

## 🚨 SOLUCIÓN DE PROBLEMAS

### Si no aparecen eventos:
1. Verificar ID de GA4 correcto
2. Verificar que scripts se cargan (Network tab)
3. Revisar errores en Console
4. Verificar que gtag esté definido: `typeof gtag`

### Si eventos duplicados:
1. Verificar que no hay múltiples instalaciones
2. Revisar que GTM no tenga GA4 también configurado

### Tiempo de aparición:
- Eventos inmediatos: Real-time reports
- Datos completos: 24-48 horas

## 📱 TESTING EN MOBILE
- Probar todos los eventos en dispositivo móvil
- Verificar que WhatsApp abre correctamente
- Probar formulario en móvil

## 📈 KPIs A MONITOREAR
1. **Tasa de conversión**: Leads / Visitors
2. **Costo por lead**: Si hay ads pagados
3. **Productos más populares**: select_item events
4. **Fuentes que generan más leads**
5. **Tiempo promedio en sitio**
6. **Tasa de rebote por página**

¡Análisis listo para optimizar el negocio de Emma Mora Oriflame! 🌟