import { initCart, addProductToCart } from './cart.js';
import { parsePrice } from './utils.js';


export function initHeaderScroll() {
  const header = document.querySelector('.header') || document.querySelector('app-header');
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

export function initMobileMenu() {
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
    link.addEventListener('click', closeMenu);
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }
}

export function initProductGalleryHover() {
  const galleryContainers = document.querySelectorAll('.product-gallery-hover');

  galleryContainers.forEach((container) => {
    const images = container.querySelectorAll('.product-gallery-img');
    if (images.length <= 1) return;

    let currentIndex = 0;
    let intervalId = null;

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
