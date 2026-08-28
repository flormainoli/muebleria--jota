/**
 * ==========================================================================
 * MUEBLERÍA JOTA - JAVASCRIPT PRINCIPAL (Vanilla JS)
 * ==========================================================================
 * Este archivo gestiona la interactividad de la página:
 * 1. Efecto del encabezado (Header) al hacer scroll.
 * 2. Menú de navegación responsive en dispositivos móviles.
 * 3. Feedback al agregar productos al carrito de compras.
 * 4. Filtro interactivo de productos por categoría y buscador en tiempo real.
 */

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initCartFeedback();
  initCatalogFilters();
  initProductGalleryHover();
});

/**
 * 1. Control del Header en Scroll
 * Añade la clase 'is-scrolled' cuando el usuario baja en la página.
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Menú Hamburguesa Responsive
 * Controla el menú lateral en celulares y tablets sincronizando atributos aria.
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('is-active');
      navMenu.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 3. Feedback al agregar productos al carrito
 * Incrementa la insignia numérica con una microanimación.
 */
function initCartFeedback() {
  const cartButtons = document.querySelectorAll('.product-card__cart-btn');
  const cartBadge = document.querySelector('.cart-badge');

  if (!cartBadge || cartButtons.length === 0) return;

  let cartCount = parseInt(cartBadge.textContent, 10) || 0;

  cartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      cartCount++;
      cartBadge.textContent = cartCount;

      cartBadge.style.transform = 'scale(1.35)';
      setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
      }, 200);
    });
  });
}

/**
 * 4. Filtro Interactivo de Catálogo y Buscador
 * Filtra los productos de productos.html según la categoría seleccionada
 * y/o el texto ingresado en el buscador en tiempo real.
 */
function initCatalogFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const bentoTriggers = document.querySelectorAll('[data-filter-trigger]');
  const searchInput = document.getElementById('search-input');
  const productCards = document.querySelectorAll('#catalog-grid .product-card');
  const counterElement = document.getElementById('catalog-counter');
  const emptyMessage = document.getElementById('catalog-empty');

  // Si no estamos en la página de productos, salimos limpiamente
  if (productCards.length === 0) return;

  let currentCategory = 'all';
  let currentSearch = '';

  // Función principal para filtrar los elementos visibles
  function applyFilters() {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();
      const cardMaterial = (card.getAttribute('data-material') || '').toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSearch = currentSearch === '' || 
                            cardTitle.includes(currentSearch) || 
                            cardMaterial.includes(currentSearch) ||
                            cardCategory.includes(currentSearch);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Actualizamos el contador textual
    if (counterElement) {
      if (currentCategory === 'all' && currentSearch === '') {
        counterElement.textContent = `Mostrando todos los productos (${visibleCount})`;
      } else {
        counterElement.textContent = `Mostrando ${visibleCount} resultado${visibleCount === 1 ? '' : 's'}`;
      }
    }

    // Mostramos el mensaje de "sin resultados" si no hay coincidencias
    if (emptyMessage) {
      emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Evento: Clic en los botones de categoría (Chips)
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });

      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      currentCategory = pill.getAttribute('data-category') || 'all';
      applyFilters();
    });
  });

  // Evento: Clic en las tarjetas del Bento Grid superior
  bentoTriggers.forEach((bento) => {
    bento.addEventListener('click', (e) => {
      const targetCategory = bento.getAttribute('data-filter-trigger');
      if (!targetCategory) return;

      // Activamos el pill correspondiente
      filterPills.forEach((pill) => {
        if (pill.getAttribute('data-category') === targetCategory) {
          pill.click();
        }
      });
    });
  });

  // Evento: Escritura en el buscador en tiempo real
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Inicializamos el contador al cargar
  applyFilters();
}

/**
 * 5. Galería Automática al pasar el cursor (Hover) en Tarjetas de Producto
 * Alterna suavemente entre las fotografías del producto mientras el cursor esté encima.
 * Al retirar el cursor, detiene la animación y regresa inmediatamente a la foto principal.
 */
function initProductGalleryHover() {
  const galleryContainers = document.querySelectorAll('.product-gallery-hover');

  galleryContainers.forEach((container) => {
    const images = container.querySelectorAll('.product-gallery-img');
    if (images.length <= 1) return;

    let currentIndex = 0;
    let intervalId = null;

    // Obtenemos la tarjeta contenedora para escuchar los eventos de hover
    const card = container.closest('.product-card') || container;

    // Al ingresar el cursor: iniciamos la rotación suave de imágenes
    card.addEventListener('mouseenter', () => {
      // Si ya había un intervalo activo, lo limpiamos por seguridad
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        images[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('is-active');
      }, 1600); // Cambia de foto cada 1.6 segundos
    });

    // Al retirar el cursor: detenemos el ciclo y volvemos a la 1ra fotografía
    card.addEventListener('mouseleave', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }

      // Restablecemos el estado a la primera imagen
      images.forEach((img) => img.classList.remove('is-active'));
      currentIndex = 0;
      images[0].classList.add('is-active');
    });
  });
}

