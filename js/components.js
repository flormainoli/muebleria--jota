class AppHeader extends HTMLElement {
  connectedCallback() {
    const isOpaque = this.hasAttribute('opaque');
    const headerClass = isOpaque ? 'header header-opaque' : 'header';

    this.innerHTML = `
      <header class="${headerClass}">
        <div class="nav-overlay" aria-hidden="true"></div>
        <div class="container">
          <nav class="navbar" aria-label="Navegación principal">
            <a href="index.html" class="brand-link" aria-label="Ir a la página de inicio">
              <img 
                src="assets/images/logo.png" 
                alt="Logo Mueblería Jota" 
                class="brand-logo"
              >
            </a>
            <ul class="nav-menu" id="nav-menu">
              <li><a href="index.html" class="nav-link">Home</a></li>
              <li><a href="productos.html" class="nav-link">Productos</a></li>
              <li><a href="quienes-somos.html" class="nav-link">Quiénes somos</a></li>
              <li><a href="contacto.html" class="nav-link">Contacto</a></li>
            </ul>
            <div class="nav-actions">
              <button class="action-btn header-search-toggle" aria-label="Buscar productos" aria-expanded="false" type="button">
                <span class="material-symbols-outlined">search</span>
              </button>
              <button id="cart-trigger" class="action-btn" type="button" aria-label="Ver carrito de compras" aria-controls="cart-drawer" aria-expanded="false">
                <span class="material-symbols-outlined">shopping_bag</span>
                <span class="cart-badge" aria-label="Artículos en el carrito">0</span>
              </button>
              <button type="button" class="action-btn user-avatar-btn" aria-label="Mi cuenta de usuario">
                <span class="material-symbols-outlined">person</span>
              </button>
              <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-menu" type="button">
                <span></span><span></span><span></span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div class="header-search" id="header-search" aria-hidden="true">
        <div class="header-search__bar">
          <span class="material-symbols-outlined header-search__icon" aria-hidden="true">search</span>
          <input
            type="search"
            id="search-input-header"
            class="header-search__input"
            placeholder="Buscar en Mueblería Jota..."
            autocomplete="off"
            aria-label="Buscar productos"
          >
          <button class="header-search__close" id="header-search-close" type="button" aria-label="Cerrar búsqueda">
            <span class="material-symbols-outlined" aria-hidden="true">close</span>
          </button>
        </div>
        <div class="header-search__results" id="search-results"></div>
      </div>

    `;

    // Highlight active link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = this.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // We can dispatch an event if needed to let the main script know it's ready, 
    // but the main script could also just use event delegation or wait for DOMContentLoaded.
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="brand-link">
                <img 
                  src="assets/images/logo.png" 
                  alt="Logo Mueblería Jota" 
                  class="brand-logo"
                >
                <span class="brand-text">MUEBLERÍA JOTA</span>
              </div>
              <p class="footer-description">
                Mobiliario de autor diseñado para trascender generaciones. Fabricado con maestría en el corazón de Argentina.
              </p>
              <span class="footer-badge">Industria Argentina</span>
            </div>
            <div>
              <h3 class="footer-column-title">Explorar</h3>
              <ul class="footer-links">
                <li><a href="productos.html">Colecciones</a></li>
                <li><a href="productos.html#catalogo">Catálogo</a></li>
                <li><a href="#">Cuidados y Madera</a></li>
              </ul>
            </div>
            <div>
              <h3 class="footer-column-title">Contacto</h3>
              <ul class="footer-links footer-contact-list">
                <li>
                  <a href="mailto:hola@muebleria-j.com.ar" class="contact-link">
                    <span class="material-symbols-outlined contact-icon">mail</span>
                    hola@muebleria-j.com.ar
                  </a>
                </li>
                <li>
                  <a href="tel:+541112345678" class="contact-link">
                    <span class="material-symbols-outlined contact-icon">phone</span>
                    +54 11 1234-5678
                  </a>
                </li>
                <li>
                  <a href="https://maps.google.com/?q=Buenos+Aires,+Argentina" target="_blank" rel="noopener noreferrer" class="contact-link" aria-label="Ver ubicación en Google Maps">
                    <span class="material-symbols-outlined contact-icon">location_on</span>
                    Buenos Aires, Argentina
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="footer-column-title">Seguinos</h3>
              <div class="social-links">
                <a href="#" class="social-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.96-.5 3.96-1.65 5.54-1.16 1.58-2.92 2.69-4.86 3.04-1.94.35-4.01.16-5.83-.69-1.83-.85-3.32-2.38-4.14-4.18-.82-1.8-.97-3.92-.41-5.83.56-1.92 1.83-3.56 3.48-4.57 1.66-1.02 3.65-1.4 5.58-1.06v4.1c-1.15-.22-2.37-.02-3.37.58-1.01.6-1.78 1.58-2.09 2.71-.32 1.12-.17 2.37.4 3.38.58 1.01 1.56 1.77 2.69 2.1 1.13.32 2.36.18 3.37-.39 1.01-.58 1.78-1.57 2.1-2.7.32-1.12.18-2.35-.4-3.37v-14.1z"/></svg>
                </a>
                <a href="#" class="social-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; 2026 MUEBLERÍA JOTA. TODOS LOS DERECHOS RESERVADOS.</span>
            <div class="footer-legal-links">
              <a href="#">TÉRMINOS Y CONDICIONES</a>
              <a href="#">POLÍTICA DE PRIVACIDAD</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
