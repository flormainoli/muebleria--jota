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
    const innerHeader = header.querySelector('.header') || header;
    if (window.scrollY > 40) {
      innerHeader.classList.add('is-scrolled');
    } else {
      innerHeader.classList.remove('is-scrolled');
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
  const navOverlay = document.querySelector('.nav-overlay');

  if (!menuToggle || !navMenu) return;

  const closeMenu = () => {
    menuToggle.classList.remove('is-active');
    navMenu.classList.remove('is-active');
    if (navOverlay) navOverlay.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menuToggle.classList.add('is-active');
    navMenu.classList.add('is-active');
    if (navOverlay) navOverlay.classList.add('is-active');
    document.body.classList.add('no-scroll');
    menuToggle.setAttribute('aria-expanded', 'true');
  };

  menuToggle.addEventListener('click', () => {
    if (menuToggle.classList.contains('is-active')) {
      closeMenu();
    } else {
      openMenu();
    }
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

    card.addEventListener('mouseenter', () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        images[currentIndex].classList.remove('is-active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('is-active');
      }, 1600);
    });

    card.addEventListener('mouseleave', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      images.forEach((img) => img.classList.remove('is-active'));
      currentIndex = 0;
      images[0].classList.add('is-active');
    });
  });
}


/* ==========================================================================
   10. BUSCADOR BRUTALISTA DE CATEGORÍAS (productos.html)
   Filtra en tiempo real las tarjetas de colección por nombre.
   ========================================================================== */
function initBrutalSearch() {
  const searchInput = document.getElementById('brutal-search-input');
  const clearBtn    = document.getElementById('brutal-search-clear');
  const resultsEl   = document.getElementById('brutal-search-results');
  const emptyState  = document.getElementById('brutal-empty-state');
  const emptyClear  = document.getElementById('brutal-empty-clear');
  const cards       = document.querySelectorAll('#category-gallery-grid .category-gallery-item');

  if (!searchInput || cards.length === 0) return;

  function applySearch(query) {
    const q = query.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const caption = (card.querySelector('.category-gallery-item__title')?.textContent || '').toLowerCase();

      const matches = q === '' || name.includes(q) || caption.includes(q);
      card.style.display = matches ? '' : 'none';
      if (matches) visible++;
    });

    // Botón limpiar
    if (clearBtn) clearBtn.hidden = q === '';

    // Contador de resultados
    if (resultsEl) {
      if (q === '') {
        resultsEl.textContent = '';
      } else {
        resultsEl.textContent = visible === 0
          ? 'Sin resultados'
          : `${visible} colección${visible === 1 ? '' : 'es'} encontrada${visible === 1 ? '' : 's'}`;
      }
    }

    // Estado vacío
    if (emptyState) {
      emptyState.hidden = visible > 0 || q === '';
    }
  }

  searchInput.addEventListener('input', (e) => applySearch(e.target.value));

  // Botón ×: limpiar campo y restaurar todas las tarjetas
  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    applySearch('');
    searchInput.focus();
  });

  // Botón del estado vacío: también limpia
  emptyClear?.addEventListener('click', () => {
    searchInput.value = '';
    applySearch('');
    searchInput.focus();
  });

  // Acceso rápido con Escape
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      applySearch('');
    }
  });
}

/* ==========================================================================
   11. MODAL DE REGISTRO RÁPIDO PARA DESCUENTO (productos.html)
   Valida campos, guarda en localStorage y muestra pantalla de éxito.
   ========================================================================== */
const DISCOUNT_STORAGE_KEY = 'muebleria_jota_discount_lead_v1';

function initDiscountModal() {
  const openBtn    = document.getElementById('brutal-discount-open');
  const overlay    = document.getElementById('brutal-modal-overlay');
  const closeBtn   = document.getElementById('brutal-modal-close');
  const form       = document.getElementById('brutal-discount-form');
  const successEl  = document.getElementById('brutal-modal-success');
  const doneBtn    = document.getElementById('brutal-modal-done');

  if (!overlay || !openBtn) return;

  // ------------------------------------------------------------------
  // Apertura: si el usuario ya se registró, mostramos confirmación
  // ------------------------------------------------------------------
  function openModal() {
    const existing = getDiscountLead();
    if (existing && form && successEl) {
      form.hidden = true;
      successEl.hidden = false;
      const emailDisplay = document.getElementById('brutal-success-email');
      if (emailDisplay) emailDisplay.textContent = existing.email;
    } else if (form && successEl) {
      form.hidden = false;
      successEl.hidden = true;
    }

    overlay.classList.add('is-active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus al primer campo
    setTimeout(() => {
      const firstInput = overlay.querySelector('.brutal-input');
      if (firstInput && !firstInput.closest('[hidden]')) firstInput.focus();
    }, 230);
  }

  function closeModal() {
    overlay.classList.remove('is-active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  doneBtn?.addEventListener('click', closeModal);

  // Cierre al hacer clic en el overlay (fuera del modal)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Cierre con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-active')) closeModal();
  });

  // ------------------------------------------------------------------
  // Envío del formulario
  // ------------------------------------------------------------------
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput  = document.getElementById('discount-name');
    const emailInput = document.getElementById('discount-email');
    const nameError  = document.getElementById('error-discount-name');
    const emailError = document.getElementById('error-discount-email');

    let isValid = true;

    // Limpiar errores previos
    [nameInput, emailInput].forEach((el) => el?.classList.remove('has-error'));
    if (nameError)  nameError.textContent  = '';
    if (emailError) emailError.textContent = '';

    // Validar Nombre
    const name = nameInput?.value.trim();
    if (!name) {
      nameInput?.classList.add('has-error');
      if (nameError) nameError.textContent = 'El nombre es obligatorio.';
      nameInput?.focus();
      isValid = false;
    }

    // Validar Email
    const email = emailInput?.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailInput?.classList.add('has-error');
      if (emailError) emailError.textContent = 'El correo es obligatorio.';
      if (isValid) emailInput?.focus();
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailInput?.classList.add('has-error');
      if (emailError) emailError.textContent = 'Ingresá un correo válido.';
      if (isValid) emailInput?.focus();
      isValid = false;
    }

    if (!isValid) return;

    // Guardar en localStorage
    const lead = {
      name,
      email,
      newsletter: document.getElementById('discount-newsletter')?.checked ?? true,
      registeredAt: new Date().toISOString()
    };
    saveDiscountLead(lead);

    // Mostrar pantalla de éxito
    form.hidden = true;
    if (successEl) {
      successEl.hidden = false;
      const emailDisplay = document.getElementById('brutal-success-email');
      if (emailDisplay) emailDisplay.textContent = email;
    }
  });
}

// ---------------------------------------------------------------------------
// Helpers de almacenamiento para el lead de descuento
// ---------------------------------------------------------------------------
function getDiscountLead() {
  try {
    const raw = localStorage.getItem(DISCOUNT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveDiscountLead(lead) {
  try {
    localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(lead));
  } catch (e) {
    console.error('Error guardando lead de descuento:', e);
  }
}

function initializeApp() {
  Promise.all([
    customElements.whenDefined('app-header'),
    customElements.whenDefined('app-footer')
  ]).then(() => {
    initHeaderScroll();
    initMobileMenu();
    initCart();
    initProductGalleryHover();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
