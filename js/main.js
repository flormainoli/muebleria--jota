/**
 * ==========================================================================
 * MUEBLERÍA JOTA - JAVASCRIPT PRINCIPAL (Vanilla JS)
 * ==========================================================================
 * Este archivo gestiona la interactividad de la página:
 * 1. Efecto del encabezado (Header) al hacer scroll.
 * 2. Menú de navegación responsive en dispositivos móviles.
 * 3. Notificación simple al agregar productos al carrito.
 */

// Esperamos a que todo el HTML esté cargado en el navegador
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initCartFeedback();
});

/**
 * 1. Control del Header en Scroll
 * Añade la clase 'is-scrolled' cuando el usuario baja en la página
 * para cambiar el fondo transparente a un fondo con blur y sombra suave.
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    // Si el usuario scrolleó más de 50px, activamos el fondo del header
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  // Escuchamos el evento de scroll en la ventana
  window.addEventListener('scroll', handleScroll, { passive: true });
  // Ejecutamos una vez al cargar por si la página inicia ya scrolleada
  handleScroll();
}

/**
 * 2. Menú Hamburguesa Responsive
 * Abre y cierra el menú lateral en pantallas pequeñas (móviles y tablets).
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  // Alternar el menú al hacer clic en el botón hamburguesa
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');

    // Accesibilidad (a11y): indicamos al lector de pantalla si el menú está expandido
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Cerrar el menú automáticamente al hacer clic en cualquier enlace
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
 * Incrementa el contador del carrito al presionar el botón de compra rápida.
 */
function initCartFeedback() {
  const cartButtons = document.querySelectorAll('.product-card__cart-btn');
  const cartBadge = document.querySelector('.cart-badge');

  if (!cartBadge || cartButtons.length === 0) return;

  let cartCount = parseInt(cartBadge.textContent, 10) || 0;

  cartButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      // Evitamos que el clic en el botón active el enlace de la tarjeta si lo hubiera
      event.stopPropagation();

      // Incrementamos la cantidad y actualizamos la vista
      cartCount++;
      cartBadge.textContent = cartCount;

      // Pequeña animación visual en la insignia del carrito
      cartBadge.style.transform = 'scale(1.3)';
      setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
      }, 200);
    });
  });
}
