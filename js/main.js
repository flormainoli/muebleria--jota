/**
 * ==========================================================================
 * MUEBLERÍA JOTA - JAVASCRIPT PRINCIPAL (Vanilla JS)
 * ==========================================================================
 * Este archivo gestiona la interactividad integral del sitio:
 * 1. Efecto del encabezado (Header) al hacer scroll.
 * 2. Menú de navegación responsive en dispositivos móviles.
 * 3. Gestión de sesión de usuario y Modal de Login / Registro.
 * 4. Panel de Usuario (Dashboard) con 4 pestañas:
 *    - Mi Cuenta (Datos personales y seguridad)
 *    - Mis Pedidos (Historial y trazabilidad de taller)
 *    - Lista de Deseos (Wishlist y traspaso al carrito)
 *    - Direcciones de Envío (Gestión de domicilios)
 * 5. Sistema de Carrito de Compras (Drawer lateral, empieza en 0, persistencia).
 * 6. Galería de producto, intercambio de miniaturas y Lightbox / Zoom.
 * 7. Filtros interactivos de catálogo y buscador en tiempo real.
 * 8. Galería automática al pasar el cursor (Hover) en tarjetas de producto.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initAuthModal();
  initAccountDashboardModal();
  initUserProfileMenu();
  initCartSystem();
  initProductDetailGallery();
  initCatalogFilters();
  initProductGalleryHover();
  // Nuevas funcionalidades brutalistas (productos.html)
  initBrutalSearch();
  initDiscountModal();
});

/* ==========================================================================
   1. CONTROL DEL HEADER EN SCROLL
   ========================================================================== */
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

/* ==========================================================================
   2. MENÚ HAMBURGUESA RESPONSIVE (MÓVIL)
   ========================================================================== */
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

/* ==========================================================================
   3. GESTIÓN DE SESIÓN DE USUARIO Y MODAL DE LOGIN / REGISTRO
   ========================================================================== */
const AUTH_STORAGE_KEY = 'muebleria_jota_auth_user_v1';
const WISHLIST_STORAGE_KEY = 'muebleria_jota_wishlist_v1';
const ORDERS_STORAGE_KEY = 'muebleria_jota_orders_v1';
const ADDRESSES_STORAGE_KEY = 'muebleria_jota_addresses_v1';

// Usuario inicial por defecto
const DEFAULT_USER = {
  name: 'Agustín Benítez',
  email: 'agustin@muebleria-j.com.ar',
  phone: '+54 11 4567-8900',
  initials: 'AB',
  role: 'Cliente Distinguido',
  memberSince: 'Agosto 2026',
  loggedIn: true
};

function getAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_USER;
  }
}

function setAuthUser(user) {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Error guardando usuario:', e);
  }
  updateUserProfileUI();
}

function extractInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function updateUserProfileUI() {
  const user = getAuthUser();
  const avatarButtons = document.querySelectorAll('.user-avatar-btn');

  avatarButtons.forEach((btn) => {
    const container = btn.closest('.user-dropdown-container');
    if (!container) return;

    if (user && user.loggedIn) {
      btn.innerHTML = `<span class="user-avatar-btn__initials">${user.initials || extractInitials(user.name)}</span>`;
      btn.title = `Cuenta de ${user.name}`;
    } else {
      btn.innerHTML = `<span class="material-symbols-outlined">person</span>`;
      btn.title = `Iniciar sesión / Mi cuenta`;
    }

    const dropdown = container.querySelector('.user-dropdown');
    if (dropdown) {
      renderUserDropdownContent(dropdown, user);
    }
  });
}

function renderUserDropdownContent(dropdown, user) {
  const wishlist = getStoredWishlist();
  const orders = getStoredOrders();

  if (user && user.loggedIn) {
    dropdown.innerHTML = `
      <div class="user-dropdown__header">
        <div class="user-dropdown__avatar">${user.initials || extractInitials(user.name)}</div>
        <div class="user-dropdown__user-info">
          <span class="user-dropdown__name">${user.name}</span>
          <span class="user-dropdown__email">${user.email}</span>
          <span class="user-dropdown__badge">
            <span class="material-symbols-outlined" style="font-size:13px;">verified</span>
            ${user.role || 'Cliente Distinguido'}
          </span>
        </div>
      </div>
      <ul class="user-dropdown__menu">
        <li>
          <a href="javascript:void(0)" class="user-dropdown__link" data-account-tab="account" role="menuitem">
            <span class="user-dropdown__link-left">
              <span class="material-symbols-outlined">person</span>
              Mi Cuenta
            </span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="user-dropdown__link" data-account-tab="orders" role="menuitem">
            <span class="user-dropdown__link-left">
              <span class="material-symbols-outlined">inventory_2</span>
              Mis Pedidos
            </span>
            <span class="user-dropdown__count">${orders.filter(o => o.status === 'in_progress').length || orders.length}</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="user-dropdown__link" data-account-tab="wishlist" role="menuitem">
            <span class="user-dropdown__link-left">
              <span class="material-symbols-outlined">favorite</span>
              Lista de Deseos
            </span>
            <span class="user-dropdown__count">${wishlist.length}</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="user-dropdown__link" data-account-tab="addresses" role="menuitem">
            <span class="user-dropdown__link-left">
              <span class="material-symbols-outlined">location_on</span>
              Direcciones de Envío
            </span>
          </a>
        </li>
        <li class="user-dropdown__divider"></li>
        <li>
          <button type="button" class="user-dropdown__logout" id="user-logout-btn" role="menuitem">
            <span class="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    `;

    // Conectar clics a las 4 pestañas
    dropdown.querySelectorAll('[data-account-tab]').forEach((link) => {
      link.addEventListener('click', () => {
        const tab = link.getAttribute('data-account-tab');
        dropdown.classList.remove('is-open');
        openAccountModal(tab);
      });
    });

    dropdown.querySelector('#user-logout-btn')?.addEventListener('click', () => {
      dropdown.classList.remove('is-open');
      setAuthUser(null);
      showToast('Sesión', 'Has cerrado sesión correctamente. ¡Hasta pronto!');
    });

  } else {
    dropdown.innerHTML = `
      <div class="user-dropdown__guest-box">
        <div class="auth-modal__brand-icon" style="margin-bottom:4px;">
          <span class="material-symbols-outlined">account_circle</span>
        </div>
        <h3 class="user-dropdown__guest-title">¡Bienvenido a Jota!</h3>
        <p class="user-dropdown__guest-desc">Accedé a tu cuenta para gestionar pedidos, listas de deseos y beneficios exclusivos.</p>
        <div class="user-dropdown__guest-actions">
          <button type="button" class="user-dropdown__guest-login-btn" id="guest-btn-login">
            Iniciar Sesión
          </button>
          <button type="button" class="user-dropdown__guest-register-btn" id="guest-btn-register">
            Crear Cuenta
          </button>
        </div>
      </div>
    `;

    dropdown.querySelector('#guest-btn-login')?.addEventListener('click', () => {
      dropdown.classList.remove('is-open');
      openAuthModal('login');
    });

    dropdown.querySelector('#guest-btn-register')?.addEventListener('click', () => {
      dropdown.classList.remove('is-open');
      openAuthModal('register');
    });
  }
}

function initUserProfileMenu() {
  const avatarButtons = document.querySelectorAll('.user-avatar-btn');
  if (avatarButtons.length === 0) return;

  avatarButtons.forEach((btn) => {
    let container = btn.closest('.user-dropdown-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'user-dropdown-container';
      btn.parentNode.insertBefore(container, btn);
      container.appendChild(btn);
    }

    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    let dropdown = container.querySelector('.user-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.className = 'user-dropdown';
      dropdown.setAttribute('role', 'menu');
      container.appendChild(dropdown);
    }

    renderUserDropdownContent(dropdown, getAuthUser());

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen);

      document.querySelectorAll('.user-dropdown.is-open').forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove('is-open');
          const otherBtn = other.closest('.user-dropdown-container')?.querySelector('.user-avatar-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-dropdown-container')) {
      document.querySelectorAll('.user-dropdown.is-open').forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        const btn = dropdown.closest('.user-dropdown-container')?.querySelector('.user-avatar-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.user-dropdown.is-open').forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        const btn = dropdown.closest('.user-dropdown-container')?.querySelector('.user-avatar-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  updateUserProfileUI();
}

/**
 * Modal de Autenticación (Login / Registro)
 */
function initAuthModal() {
  if (document.getElementById('auth-modal-root')) return;

  const root = document.createElement('div');
  root.id = 'auth-modal-root';
  root.innerHTML = `
    <div class="auth-modal-overlay" id="auth-modal-overlay" aria-hidden="true">
      <div class="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        
        <button class="auth-modal__close" id="auth-modal-close" aria-label="Cerrar ventana">
          <span class="material-symbols-outlined">close</span>
        </button>

        <div class="auth-modal__header">
          <div class="auth-modal__brand-icon">
            <span class="material-symbols-outlined">chair</span>
          </div>
          <h2 class="auth-modal__title" id="auth-modal-title">MUEBLERÍA JOTA</h2>
          <p class="auth-modal__subtitle">Mobiliario de autor y atención exclusiva</p>
        </div>

        <div class="auth-modal__tabs">
          <button type="button" class="auth-modal__tab-btn is-active" id="auth-tab-login">Iniciar Sesión</button>
          <button type="button" class="auth-modal__tab-btn" id="auth-tab-register">Registrarse</button>
        </div>

        <div class="auth-modal__body">
          
          <!-- FORMULARIO 1: INICIAR SESIÓN -->
          <form class="auth-form is-active" id="auth-form-login" novalidate>
            <div class="auth-form-group">
              <label class="auth-form-label" for="login-email">Correo Electrónico</label>
              <div class="auth-input-wrapper">
                <input type="email" id="login-email" class="auth-input" placeholder="ejemplo@correo.com" required>
                <span class="material-symbols-outlined auth-input-icon">mail</span>
              </div>
            </div>

            <div class="auth-form-group">
              <label class="auth-form-label" for="login-password">Contraseña</label>
              <div class="auth-input-wrapper">
                <input type="password" id="login-password" class="auth-input" placeholder="Tu contraseña" required>
                <span class="material-symbols-outlined auth-input-icon">lock</span>
                <button type="button" class="auth-pwd-toggle" data-target="login-password" aria-label="Mostrar u ocultar contraseña">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div class="auth-form-options">
              <label class="auth-checkbox-label">
                <input type="checkbox" checked>
                <span>Recordarme</span>
              </label>
              <a href="javascript:void(0)" class="auth-forgot-link" id="auth-forgot-pwd">¿Olvidaste tu clave?</a>
            </div>

            <button type="submit" class="auth-submit-btn">
              <span>Ingresar a mi cuenta</span>
              <span class="material-symbols-outlined">login</span>
            </button>

            <div class="auth-divider">o</div>

            <button type="button" class="auth-demo-btn" id="auth-demo-btn">
              <span class="material-symbols-outlined" style="font-size:18px;">bolt</span>
              <span>Probar con cuenta de demostración</span>
            </button>

            <p class="auth-switch-prompt">
              ¿No tenés una cuenta?
              <span class="auth-switch-link" data-switch="register">Crear cuenta</span>
            </p>
          </form>

          <!-- FORMULARIO 2: REGISTRO -->
          <form class="auth-form" id="auth-form-register" novalidate>
            <div class="auth-form-group">
              <label class="auth-form-label" for="register-name">Nombre y Apellido</label>
              <div class="auth-input-wrapper">
                <input type="text" id="register-name" class="auth-input" placeholder="ej. Florencia Mainoli" required>
                <span class="material-symbols-outlined auth-input-icon">person</span>
              </div>
            </div>

            <div class="auth-form-group">
              <label class="auth-form-label" for="register-email">Correo Electrónico</label>
              <div class="auth-input-wrapper">
                <input type="email" id="register-email" class="auth-input" placeholder="ejemplo@correo.com" required>
                <span class="material-symbols-outlined auth-input-icon">mail</span>
              </div>
            </div>

            <div class="auth-form-group">
              <label class="auth-form-label" for="register-password">Crear Contraseña</label>
              <div class="auth-input-wrapper">
                <input type="password" id="register-password" class="auth-input" placeholder="Mínimo 6 caracteres" required>
                <span class="material-symbols-outlined auth-input-icon">lock</span>
                <button type="button" class="auth-pwd-toggle" data-target="register-password" aria-label="Mostrar u ocultar contraseña">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div class="auth-form-options">
              <label class="auth-checkbox-label">
                <input type="checkbox" checked>
                <span>Deseo recibir novedades y colecciones de diseño</span>
              </label>
            </div>

            <button type="submit" class="auth-submit-btn">
              <span>Crear mi Cuenta</span>
              <span class="material-symbols-outlined">person_add</span>
            </button>

            <p class="auth-switch-prompt">
              ¿Ya tenés una cuenta?
              <span class="auth-switch-link" data-switch="login">Iniciar sesión</span>
            </p>
          </form>

        </div>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  const tabLogin = document.getElementById('auth-tab-login');
  const tabRegister = document.getElementById('auth-tab-register');
  const formLogin = document.getElementById('auth-form-login');
  const formRegister = document.getElementById('auth-form-register');

  const switchTab = (mode) => {
    if (mode === 'login') {
      tabLogin.classList.add('is-active');
      tabRegister.classList.remove('is-active');
      formLogin.classList.add('is-active');
      formRegister.classList.remove('is-active');
      document.getElementById('login-email')?.focus();
    } else {
      tabRegister.classList.add('is-active');
      tabLogin.classList.remove('is-active');
      formRegister.classList.add('is-active');
      formLogin.classList.remove('is-active');
      document.getElementById('register-name')?.focus();
    }
  };

  tabLogin?.addEventListener('click', () => switchTab('login'));
  tabRegister?.addEventListener('click', () => switchTab('register'));

  root.querySelectorAll('[data-switch]').forEach((link) => {
    link.addEventListener('click', () => {
      switchTab(link.getAttribute('data-switch'));
    });
  });

  root.querySelectorAll('.auth-pwd-toggle').forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = toggle.querySelector('.material-symbols-outlined');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.textContent = 'visibility_off';
        } else {
          input.type = 'password';
          if (icon) icon.textContent = 'visibility';
        }
      }
    });
  });

  formLogin?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const email = emailInput?.value.trim();

    if (!email) {
      showToast('Atención', 'Por favor, ingresá tu correo electrónico.');
      emailInput?.focus();
      return;
    }

    let name = email.split('@')[0].replace(/[._-]/g, ' ');
    name = name.charAt(0).toUpperCase() + name.slice(1);

    const loggedUser = {
      name: email === 'agustin@muebleria-j.com.ar' ? 'Agustín Benítez' : name,
      email: email,
      phone: '+54 11 4567-8900',
      initials: extractInitials(name),
      role: 'Cliente Distinguido',
      memberSince: 'Agosto 2026',
      loggedIn: true
    };

    setAuthUser(loggedUser);
    closeAuthModal();
    showToast('¡Bienvenido!', `Has iniciado sesión como ${loggedUser.name}.`);
  });

  formRegister?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('register-name');
    const name = nameInput?.value.trim();
    const emailInput = document.getElementById('register-email');
    const email = emailInput?.value.trim();

    if (!name) {
      showToast('Atención', 'Por favor, ingresá tu nombre completo.');
      nameInput?.focus();
      return;
    }

    if (!email) {
      showToast('Atención', 'Por favor, ingresá un correo electrónico válido.');
      emailInput?.focus();
      return;
    }

    const newUser = {
      name: name,
      email: email,
      phone: '+54 11 0000-0000',
      initials: extractInitials(name),
      role: 'Miembro Jota Club',
      memberSince: 'Agosto 2026',
      loggedIn: true
    };

    setAuthUser(newUser);
    closeAuthModal();
    showToast('¡Cuenta Creada!', `Bienvenido/a a Mueblería Jota, ${name}.`);
  });

  document.getElementById('auth-demo-btn')?.addEventListener('click', () => {
    setAuthUser(DEFAULT_USER);
    closeAuthModal();
    showToast('Sesión Demo', `Has ingresado con la cuenta de demostración (${DEFAULT_USER.name}).`);
  });

  document.getElementById('auth-forgot-pwd')?.addEventListener('click', () => {
    showToast('Recuperación', 'Te enviamos un enlace de restablecimiento a tu casilla de correo.');
  });

  document.getElementById('auth-modal-close')?.addEventListener('click', closeAuthModal);
  document.getElementById('auth-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'auth-modal-overlay') closeAuthModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('auth-modal-overlay')?.classList.contains('is-active')) {
      closeAuthModal();
    }
  });
}

function openAuthModal(tab = 'login') {
  initAuthModal();
  const overlay = document.getElementById('auth-modal-overlay');
  if (!overlay) return;

  const tabLogin = document.getElementById('auth-tab-login');
  const tabRegister = document.getElementById('auth-tab-register');
  const formLogin = document.getElementById('auth-form-login');
  const formRegister = document.getElementById('auth-form-register');

  if (tab === 'register') {
    tabRegister?.classList.add('is-active');
    tabLogin?.classList.remove('is-active');
    formRegister?.classList.add('is-active');
    formLogin?.classList.remove('is-active');
  } else {
    tabLogin?.classList.add('is-active');
    tabRegister?.classList.remove('is-active');
    formLogin?.classList.add('is-active');
    formRegister?.classList.remove('is-active');
  }

  overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
  const overlay = document.getElementById('auth-modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   4. PANEL DE USUARIO (DASHBOARD) CON 4 PESTAÑAS:
      - Mi Cuenta
      - Mis Pedidos
      - Lista de Deseos
      - Direcciones de Envío
   ========================================================================== */
// Datos de pedidos por defecto
const DEFAULT_ORDERS = [
  {
    id: 'MJ-2026-8942',
    date: '18 de Agosto, 2026',
    status: 'in_progress',
    statusLabel: 'En fabricación artesanal',
    statusIcon: 'carpenter',
    productName: 'Sofá Tierra',
    productMaterial: 'Colección Living · Nogal macizo y Bouclé',
    productImage: 'assets/images/sofa-tierra-1.jpg',
    total: 1250000
  },
  {
    id: 'MJ-2026-7210',
    date: '02 de Julio, 2026',
    status: 'completed',
    statusLabel: 'Entregado',
    statusIcon: 'check_circle',
    productName: 'Mesa Origen',
    productMaterial: 'Colección Comedor · Roble macizo',
    productImage: 'assets/images/mesa-origen-1.jpg',
    total: 1100000
  }
];

// Datos de lista de deseos por defecto
const DEFAULT_WISHLIST = [
  {
    id: 'sofa-tierra',
    name: 'Sofá Tierra',
    collection: 'Colección Living · Curvas orgánicas',
    price: 1250000,
    image: 'assets/images/sofa-tierra-1.jpg'
  },
  {
    id: 'rack-andes',
    name: 'Rack Andes',
    collection: 'Colección Living · Nogal macizo',
    price: 890000,
    image: 'assets/images/rack-andes-1.jpg'
  },
  {
    id: 'escritorio-pro',
    name: 'Escritorio PRO',
    collection: 'Colección Oficina · Madera maciza',
    price: 650000,
    image: 'assets/images/escritorio-pro-1.jpg'
  }
];

// Datos de direcciones por defecto
const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    tag: 'Casa Principal',
    recipient: 'Agustín Benítez',
    street: 'Av. del Libertador 3450, Piso 8 B',
    city: 'Palermo, CABA (C1425)',
    phone: '+54 11 4567-8900',
    isDefault: true
  },
  {
    id: 'addr-2',
    tag: 'Estudio de Diseño',
    recipient: 'Agustín Benítez',
    street: 'Thames 1820',
    city: 'Palermo Soho, CABA (C1414)',
    phone: '+54 11 9876-5432',
    isDefault: false
  }
];

function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_ORDERS;
  }
}

function getStoredWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(DEFAULT_WISHLIST));
      return DEFAULT_WISHLIST;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_WISHLIST;
  }
}

function saveStoredWishlist(wishlist) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (e) {
    console.error('Error guardando wishlist:', e);
  }
  updateUserProfileUI();
}

function getStoredAddresses() {
  try {
    const raw = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(DEFAULT_ADDRESSES));
      return DEFAULT_ADDRESSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_ADDRESSES;
  }
}

function saveStoredAddresses(addresses) {
  try {
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
  } catch (e) {
    console.error('Error guardando direcciones:', e);
  }
}

function initAccountDashboardModal() {
  if (document.getElementById('account-dashboard-root')) return;

  const root = document.createElement('div');
  root.id = 'account-dashboard-root';
  root.innerHTML = `
    <div class="account-modal-overlay" id="account-modal-overlay" aria-hidden="true">
      <div class="account-modal" role="dialog" aria-modal="true" aria-labelledby="account-modal-title">
        
        <button class="account-modal__close" id="account-modal-close" aria-label="Cerrar panel">
          <span class="material-symbols-outlined">close</span>
        </button>

        <!-- Barra Lateral (Sidebar) -->
        <aside class="account-sidebar">
          <div>
            <div class="account-user-card" id="account-sidebar-user">
              <div class="account-user-avatar" id="account-sidebar-avatar">AB</div>
              <div>
                <h3 class="account-user-name" id="account-sidebar-name">Agustín Benítez</h3>
                <span class="account-user-role" id="account-sidebar-role">Cliente Distinguido</span>
              </div>
            </div>

            <ul class="account-nav">
              <li>
                <button type="button" class="account-nav-btn is-active" data-tab="account">
                  <span class="account-nav-btn-left">
                    <span class="material-symbols-outlined">person</span>
                    Mi Cuenta
                  </span>
                </button>
              </li>
              <li>
                <button type="button" class="account-nav-btn" data-tab="orders">
                  <span class="account-nav-btn-left">
                    <span class="material-symbols-outlined">inventory_2</span>
                    Mis Pedidos
                  </span>
                  <span class="account-nav-badge" id="account-badge-orders">2</span>
                </button>
              </li>
              <li>
                <button type="button" class="account-nav-btn" data-tab="wishlist">
                  <span class="account-nav-btn-left">
                    <span class="material-symbols-outlined">favorite</span>
                    Lista de Deseos
                  </span>
                  <span class="account-nav-badge" id="account-badge-wishlist">3</span>
                </button>
              </li>
              <li>
                <button type="button" class="account-nav-btn" data-tab="addresses">
                  <span class="account-nav-btn-left">
                    <span class="material-symbols-outlined">location_on</span>
                    Direcciones
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <div class="account-sidebar-footer">
            <button type="button" class="account-logout-btn" id="account-logout-trigger">
              <span class="material-symbols-outlined">logout</span>
              Cerrar Sesión
            </button>
          </div>
        </aside>

        <!-- Área de Contenido Principal -->
        <main class="account-content" id="account-content-area">
          
          <!-- PESTAÑA 1: MI CUENTA -->
          <section class="account-pane is-active" id="pane-account">
            <div class="account-pane-header">
              <div>
                <h2 class="account-pane-title">Datos de mi Cuenta</h2>
                <p class="account-pane-desc">Administrá tu información de contacto y preferencias de seguridad.</p>
              </div>
            </div>

            <form id="form-edit-account" style="display:flex; flex-direction:column; gap:16px;">
              <div class="new-address-grid">
                <div class="auth-form-group">
                  <label class="auth-form-label" for="acc-edit-name">Nombre Completo</label>
                  <div class="auth-input-wrapper">
                    <input type="text" id="acc-edit-name" class="auth-input" required>
                    <span class="material-symbols-outlined auth-input-icon">badge</span>
                  </div>
                </div>
                <div class="auth-form-group">
                  <label class="auth-form-label" for="acc-edit-email">Correo Electrónico</label>
                  <div class="auth-input-wrapper">
                    <input type="email" id="acc-edit-email" class="auth-input" required>
                    <span class="material-symbols-outlined auth-input-icon">mail</span>
                  </div>
                </div>
              </div>

              <div class="new-address-grid">
                <div class="auth-form-group">
                  <label class="auth-form-label" for="acc-edit-phone">Teléfono / WhatsApp</label>
                  <div class="auth-input-wrapper">
                    <input type="tel" id="acc-edit-phone" class="auth-input" placeholder="+54 11 0000-0000">
                    <span class="material-symbols-outlined auth-input-icon">phone</span>
                  </div>
                </div>
                <div class="auth-form-group">
                  <label class="auth-form-label">Membresía</label>
                  <div class="auth-input-wrapper">
                    <input type="text" id="acc-edit-role" class="auth-input" readonly style="background:#eee; cursor:not-allowed;">
                    <span class="material-symbols-outlined auth-input-icon">verified</span>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary" style="align-self:flex-start; margin-top:8px;">
                Guardar Cambios
              </button>
            </form>

            <div style="border-top:1px solid rgba(210,196,188,0.4); padding-top:20px; margin-top:12px;">
              <h3 style="font-family:var(--font-display); font-size:1.15rem; color:var(--color-primary); margin-bottom:12px;">Seguridad y Contraseña</h3>
              <form id="form-edit-pwd" style="display:flex; flex-direction:column; gap:14px;">
                <div class="new-address-grid">
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="pwd-current">Contraseña Actual</label>
                    <input type="password" id="pwd-current" class="auth-input" placeholder="••••••••" style="padding-left:14px;">
                  </div>
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="pwd-new">Nueva Contraseña</label>
                    <input type="password" id="pwd-new" class="auth-input" placeholder="Mínimo 6 caracteres" style="padding-left:14px;">
                  </div>
                </div>
                <button type="submit" class="btn btn-outline" style="align-self:flex-start; color:var(--color-primary); border-color:var(--color-outline-variant);">
                  Actualizar Contraseña
                </button>
              </form>
            </div>
          </section>

          <!-- PESTAÑA 2: MIS PEDIDOS -->
          <section class="account-pane" id="pane-orders">
            <div class="account-pane-header">
              <div>
                <h2 class="account-pane-title">Mis Pedidos</h2>
                <p class="account-pane-desc">Seguimiento en tiempo real de fabricación y envíos.</p>
              </div>
            </div>

            <div class="orders-list" id="orders-container">
              <!-- Renderizado dinámico -->
            </div>
          </section>

          <!-- PESTAÑA 3: LISTA DE DESEOS -->
          <section class="account-pane" id="pane-wishlist">
            <div class="account-pane-header">
              <div>
                <h2 class="account-pane-title">Lista de Deseos</h2>
                <p class="account-pane-desc">Tus piezas favoritas guardadas para tu próximo espacio.</p>
              </div>
            </div>

            <div class="wishlist-grid" id="wishlist-container">
              <!-- Renderizado dinámico -->
            </div>
          </section>

          <!-- PESTAÑA 4: DIRECCIONES DE ENVÍO -->
          <section class="account-pane" id="pane-addresses">
            <div class="account-pane-header">
              <div>
                <h2 class="account-pane-title">Direcciones de Envío</h2>
                <p class="account-pane-desc">Lugares de entrega guardados para coordinar la logística de tus muebles.</p>
              </div>
              <button type="button" class="btn btn-primary" id="btn-toggle-new-address" style="padding:10px 18px; font-size:0.7rem;">
                <span class="material-symbols-outlined">add</span>
                Nueva Dirección
              </button>
            </div>

            <!-- Formulario colapsable para agregar dirección -->
            <div class="new-address-form-wrap" id="new-address-form-wrap">
              <h3 style="font-family:var(--font-display); font-size:1.1rem; color:var(--color-primary); margin-bottom:14px;">Agregar Nueva Dirección de Entrega</h3>
              <form id="form-new-address" style="display:flex; flex-direction:column; gap:14px;">
                <div class="new-address-grid">
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="addr-tag">Etiqueta (ej. Casa, Estudio)</label>
                    <input type="text" id="addr-tag" class="auth-input" placeholder="ej. Casa de Veraneo" style="padding-left:14px;" required>
                  </div>
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="addr-recipient">Nombre de quien recibe</label>
                    <input type="text" id="addr-recipient" class="auth-input" placeholder="Nombre completo" style="padding-left:14px;" required>
                  </div>
                </div>

                <div class="new-address-grid">
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="addr-street">Calle y Altura / Piso</label>
                    <input type="text" id="addr-street" class="auth-input" placeholder="ej. Gorriti 4820, Piso 3" style="padding-left:14px;" required>
                  </div>
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="addr-city">Ciudad, Provincia y CP</label>
                    <input type="text" id="addr-city" class="auth-input" placeholder="ej. CABA (C1414)" style="padding-left:14px;" required>
                  </div>
                </div>

                <div class="new-address-grid">
                  <div class="auth-form-group">
                    <label class="auth-form-label" for="addr-phone">Teléfono de contacto para la entrega</label>
                    <input type="tel" id="addr-phone" class="auth-input" placeholder="+54 11 0000-0000" style="padding-left:14px;" required>
                  </div>
                  <div class="auth-form-group" style="justify-content:center;">
                    <label class="auth-checkbox-label" style="margin-top:16px;">
                      <input type="checkbox" id="addr-is-default">
                      <span>Establecer como dirección predeterminada</span>
                    </label>
                  </div>
                </div>

                <div style="display:flex; gap:10px; margin-top:8px;">
                  <button type="submit" class="btn btn-primary">Guardar Dirección</button>
                  <button type="button" class="btn btn-outline" id="btn-cancel-address" style="color:var(--color-primary); border-color:var(--color-outline-variant);">Cancelar</button>
                </div>
              </form>
            </div>

            <div class="addresses-grid" id="addresses-container">
              <!-- Renderizado dinámico -->
            </div>
          </section>

        </main>
      </div>
    </div>
  `;

  document.body.appendChild(root);

  // Escuchadores de pestañas laterales
  const tabBtns = root.querySelectorAll('.account-nav-btn');
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      switchAccountTab(target);
    });
  });

  // Cerrar modal
  document.getElementById('account-modal-close')?.addEventListener('click', closeAccountModal);
  document.getElementById('account-modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'account-modal-overlay') closeAccountModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('account-modal-overlay')?.classList.contains('is-active')) {
      closeAccountModal();
    }
  });

  // Cerrar sesión desde el sidebar
  document.getElementById('account-logout-trigger')?.addEventListener('click', () => {
    closeAccountModal();
    setAuthUser(null);
    showToast('Sesión', 'Has cerrado sesión correctamente.');
  });

  // Guardar cambios en Mi Cuenta
  document.getElementById('form-edit-account')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = getAuthUser() || DEFAULT_USER;
    const newName = document.getElementById('acc-edit-name')?.value.trim();
    const newEmail = document.getElementById('acc-edit-email')?.value.trim();
    const newPhone = document.getElementById('acc-edit-phone')?.value.trim();

    if (newName) user.name = newName;
    if (newEmail) user.email = newEmail;
    if (newPhone) user.phone = newPhone;
    user.initials = extractInitials(user.name);

    setAuthUser(user);
    renderAccountSidebar(user);
    showToast('Perfil Actualizado', 'Tus datos se guardaron correctamente.');
  });

  // Guardar contraseña
  document.getElementById('form-edit-pwd')?.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('pwd-current').value = '';
    document.getElementById('pwd-new').value = '';
    showToast('Seguridad', 'Tu contraseña ha sido actualizada con éxito.');
  });

  // Desplegar/Ocultar formulario de nueva dirección
  const toggleAddressBtn = document.getElementById('btn-toggle-new-address');
  const cancelAddressBtn = document.getElementById('btn-cancel-address');
  const addressFormWrap = document.getElementById('new-address-form-wrap');

  toggleAddressBtn?.addEventListener('click', () => {
    addressFormWrap.classList.toggle('is-active');
  });

  cancelAddressBtn?.addEventListener('click', () => {
    addressFormWrap.classList.remove('is-active');
  });

  // Agregar nueva dirección
  document.getElementById('form-new-address')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const tag = document.getElementById('addr-tag')?.value.trim();
    const recipient = document.getElementById('addr-recipient')?.value.trim();
    const street = document.getElementById('addr-street')?.value.trim();
    const city = document.getElementById('addr-city')?.value.trim();
    const phone = document.getElementById('addr-phone')?.value.trim();
    const isDefault = document.getElementById('addr-is-default')?.checked;

    let addresses = getStoredAddresses();
    if (isDefault) {
      addresses.forEach(a => a.isDefault = false);
    }

    addresses.push({
      id: 'addr_' + Date.now(),
      tag: tag || 'Mi Dirección',
      recipient: recipient || 'Destinatario',
      street: street,
      city: city,
      phone: phone,
      isDefault: isDefault || addresses.length === 0
    });

    saveStoredAddresses(addresses);
    renderAddressesList();
    addressFormWrap.classList.remove('is-active');
    document.getElementById('form-new-address').reset();
    showToast('Dirección Guardada', `"${tag}" se añadió a tus destinos de entrega.`);
  });
}

function renderAccountSidebar(user) {
  const avatar = document.getElementById('account-sidebar-avatar');
  const name = document.getElementById('account-sidebar-name');
  const role = document.getElementById('account-sidebar-role');

  if (avatar) avatar.textContent = user.initials || extractInitials(user.name);
  if (name) name.textContent = user.name;
  if (role) role.textContent = user.role || 'Cliente Distinguido';

  // Llenar campos del formulario
  const editName = document.getElementById('acc-edit-name');
  const editEmail = document.getElementById('acc-edit-email');
  const editPhone = document.getElementById('acc-edit-phone');
  const editRole = document.getElementById('acc-edit-role');

  if (editName) editName.value = user.name || '';
  if (editEmail) editEmail.value = user.email || '';
  if (editPhone) editPhone.value = user.phone || '+54 11 4567-8900';
  if (editRole) editRole.value = `${user.role || 'Cliente Distinguido'} (${user.memberSince || '2026'})`;
}

function renderOrdersList() {
  const container = document.getElementById('orders-container');
  if (!container) return;

  const orders = getStoredOrders();
  const badgeOrders = document.getElementById('account-badge-orders');
  if (badgeOrders) badgeOrders.textContent = orders.length;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" style="padding:32px 0;">
        <span class="material-symbols-outlined" style="font-size:40px; color:var(--color-outline);">inventory_2</span>
        <h3 class="cart-empty__title">No tenés pedidos registrados</h3>
        <p class="cart-empty__text">Cuando encargues tus muebles de autor, podrás seguir el avance artesanal desde aquí.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map((order) => `
    <article class="order-card">
      <div class="order-card__header">
        <div>
          <span class="order-card__id">Pedido #${order.id}</span>
          <div class="order-card__date">${order.date}</div>
        </div>
        <span class="order-status-badge ${order.status === 'in_progress' ? 'order-status--process' : 'order-status--done'}">
          <span class="material-symbols-outlined" style="font-size:16px;">${order.statusIcon || 'check_circle'}</span>
          ${order.statusLabel}
        </span>
      </div>
      <div class="order-card__product-row">
        <img src="${order.productImage}" alt="${order.productName}" class="order-card__img">
        <div class="order-card__prod-info">
          <h4 class="order-card__prod-name">${order.productName}</h4>
          <p class="order-card__prod-material">${order.productMaterial}</p>
        </div>
        <span style="font-weight:700; color:var(--color-primary);">${formatPrice(order.total)}</span>
      </div>
      <div class="order-card__footer">
        <span class="order-card__total">Total Invertido: ${formatPrice(order.total)}</span>
        <div class="order-card__actions">
          <a href="https://wa.me/5491112345678?text=Hola%20Mueblería%20Jota,%20deseo%20consultar%20el%20estado%20de%20mi%20pedido%20%23${order.id}" target="_blank" class="btn btn-outline" style="padding:6px 14px; font-size:0.68rem; color:var(--color-primary); border-color:var(--color-outline-variant);">
            <span class="material-symbols-outlined" style="font-size:15px;">chat</span>
            Seguimiento Taller
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderWishlistGrid() {
  const container = document.getElementById('wishlist-container');
  if (!container) return;

  const wishlist = getStoredWishlist();
  const badgeWishlist = document.getElementById('account-badge-wishlist');
  if (badgeWishlist) badgeWishlist.textContent = wishlist.length;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty" style="grid-column: 1 / -1; padding:32px 0;">
        <span class="material-symbols-outlined" style="font-size:40px; color:var(--color-outline);">favorite_border</span>
        <h3 class="cart-empty__title">Tu lista de deseos está vacía</h3>
        <p class="cart-empty__text">Guardá las piezas que más te inspiren para planificar tus ambientes.</p>
        <a href="productos.html" class="btn btn-primary" style="margin-top:8px;">Explorar Catálogo</a>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlist.map((item) => `
    <article class="wishlist-card" data-id="${item.id}">
      <div class="wishlist-card__image-wrap">
        <img src="${item.image}" alt="${item.name}" class="wishlist-card__image">
        <button class="wishlist-card__remove-btn" data-wishlist-remove="${item.id}" aria-label="Eliminar de favoritos">
          <span class="material-symbols-outlined" style="font-size:18px;">delete</span>
        </button>
      </div>
      <div class="wishlist-card__info">
        <div>
          <h4 class="wishlist-card__name">${item.name}</h4>
          <span class="wishlist-card__collection">${item.collection || 'Mobiliario de autor'}</span>
        </div>
        <span class="wishlist-card__price">${formatPrice(item.price)}</span>
        <button type="button" class="wishlist-card__add-cart-btn" data-wishlist-move="${item.id}">
          <span class="material-symbols-outlined" style="font-size:16px;">shopping_bag</span>
          Mover al Carrito
        </button>
      </div>
    </article>
  `).join('');

  // Acciones en Wishlist
  container.querySelectorAll('[data-wishlist-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wishlist-remove');
      let wl = getStoredWishlist();
      const item = wl.find(i => i.id === id);
      wl = wl.filter(i => i.id !== id);
      saveStoredWishlist(wl);
      renderWishlistGrid();
      showToast('Favoritos', `Se eliminó "${item?.name || 'Mueble'}" de tu lista de deseos.`);
    });
  });

  container.querySelectorAll('[data-wishlist-move]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-wishlist-move');
      let wl = getStoredWishlist();
      const item = wl.find(i => i.id === id);
      if (item) {
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          variant: item.collection,
          quantity: 1
        });
        wl = wl.filter(i => i.id !== id);
        saveStoredWishlist(wl);
        renderWishlistGrid();
        closeAccountModal();
      }
    });
  });
}

function renderAddressesList() {
  const container = document.getElementById('addresses-container');
  if (!container) return;

  const addresses = getStoredAddresses();

  container.innerHTML = addresses.map((addr) => `
    <article class="address-card ${addr.isDefault ? 'address-card--default' : ''}" data-id="${addr.id}">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="address-card__tag">
          <span class="material-symbols-outlined" style="font-size:16px;">home_pin</span>
          ${addr.tag}
        </span>
        ${addr.isDefault ? '<span class="address-card__default-badge">Predeterminada</span>' : ''}
      </div>
      <div>
        <div class="address-card__recipient">${addr.recipient}</div>
        <div class="address-card__details">${addr.street}</div>
        <div class="address-card__details">${addr.city}</div>
      </div>
      <div class="address-card__phone">
        <span class="material-symbols-outlined" style="font-size:16px;">phone</span>
        ${addr.phone}
      </div>
      <div class="address-card__actions">
        ${!addr.isDefault ? `
          <button type="button" class="address-card__btn" data-addr-default="${addr.id}">
            <span class="material-symbols-outlined" style="font-size:15px;">check</span>
            Hacer Predeterminada
          </button>
        ` : ''}
        <button type="button" class="address-card__btn" style="color:#a83232;" data-addr-delete="${addr.id}">
          <span class="material-symbols-outlined" style="font-size:15px;">delete</span>
          Eliminar
        </button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('[data-addr-default]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-addr-default');
      let list = getStoredAddresses();
      list.forEach(a => a.isDefault = (a.id === id));
      saveStoredAddresses(list);
      renderAddressesList();
      showToast('Dirección', 'Dirección predeterminada actualizada.');
    });
  });

  container.querySelectorAll('[data-addr-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-addr-delete');
      let list = getStoredAddresses();
      list = list.filter(a => a.id !== id);
      saveStoredAddresses(list);
      renderAddressesList();
      showToast('Dirección', 'Se eliminó la dirección de entrega.');
    });
  });
}

function switchAccountTab(tabName) {
  const overlay = document.getElementById('account-modal-overlay');
  if (!overlay) return;

  // Actualizar botones de navegación
  overlay.querySelectorAll('.account-nav-btn').forEach((btn) => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('is-active');
    } else {
      btn.classList.remove('is-active');
    }
  });

  // Mostrar panel correspondiente
  overlay.querySelectorAll('.account-pane').forEach((pane) => {
    if (pane.id === `pane-${tabName}`) {
      pane.classList.add('is-active');
    } else {
      pane.classList.remove('is-active');
    }
  });

  // Renderizar datos específicos según pestaña
  if (tabName === 'orders') renderOrdersList();
  if (tabName === 'wishlist') renderWishlistGrid();
  if (tabName === 'addresses') renderAddressesList();
  if (tabName === 'account') renderAccountSidebar(getAuthUser() || DEFAULT_USER);
}

function openAccountModal(tab = 'account') {
  const user = getAuthUser();
  if (!user || !user.loggedIn) {
    showToast('Iniciar Sesión', 'Iniciá sesión para acceder a tu panel de cuenta.');
    openAuthModal('login');
    return;
  }

  initAccountDashboardModal();
  const overlay = document.getElementById('account-modal-overlay');
  if (!overlay) return;

  renderAccountSidebar(user);
  switchAccountTab(tab);

  overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeAccountModal() {
  const overlay = document.getElementById('account-modal-overlay');
  if (!overlay) return;

  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   5. SISTEMA COMPLETO DE CARRITO DE COMPRAS (DRAWER + LOCALSTORAGE)
      - Comienza en 0 por defecto
   ========================================================================== */
const CART_STORAGE_KEY = 'muebleria_jota_cart_v2';

function formatPrice(num) {
  return '$' + Number(num).toLocaleString('es-AR');
}

// Carrito empieza vacío (0 productos)
const DEFAULT_CART_ITEMS = [];

function getStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(DEFAULT_CART_ITEMS));
      return DEFAULT_CART_ITEMS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_CART_ITEMS;
  }
}

function saveStoredCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.error('No se pudo guardar el carrito:', e);
  }
}

function initCartSystem() {
  ensureCartDrawerDOM();
  updateCartUI();

  const cartTriggerBtns = document.querySelectorAll('.action-btn[aria-label*="carrito"], .action-btn .cart-badge');
  cartTriggerBtns.forEach((elem) => {
    const btn = elem.closest('.action-btn') || elem;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  initAddToCartButtons();
}

function ensureCartDrawerDOM() {
  if (document.getElementById('cart-drawer-root')) return;

  const root = document.createElement('div');
  root.id = 'cart-drawer-root';
  root.innerHTML = `
    <div class="cart-drawer-overlay" id="cart-drawer-overlay" aria-hidden="true"></div>
    <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      
      <!-- Encabezado -->
      <div class="cart-drawer__header">
        <div class="cart-drawer__title-wrap">
          <h2 class="cart-drawer__title">Tu Carrito</h2>
          <span class="cart-drawer__badge" id="cart-drawer-count">(0 productos)</span>
        </div>
        <button class="cart-drawer__close" id="cart-drawer-close" aria-label="Cerrar carrito">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Banner de Envío Bonificado -->
      <div class="cart-drawer__shipping-banner">
        <span class="material-symbols-outlined">local_shipping</span>
        <span>¡Envío bonificado a todo el país incluido!</span>
      </div>

      <!-- Lista de Productos -->
      <div class="cart-drawer__body" id="cart-drawer-items">
        <!-- Renderizado dinámico -->
      </div>

      <!-- Pie y Resumen de Compra -->
      <div class="cart-drawer__footer" id="cart-drawer-footer">
        <div class="cart-summary__row">
          <span>Subtotal</span>
          <span id="cart-summary-subtotal">$0</span>
        </div>
        <div class="cart-summary__row">
          <span>Envío estimado</span>
          <span style="color:#2e7d32; font-weight:600;">Gratis</span>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span class="cart-summary__total-val" id="cart-summary-total">$0</span>
        </div>
        <div class="cart-drawer__actions">
          <button class="cart-drawer__checkout-btn" id="cart-checkout-btn">
            <span>Iniciar Compra</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
          <button class="cart-drawer__continue-btn" id="cart-continue-btn">
            Seguir explorando muebles
          </button>
        </div>
      </div>

    </aside>
  `;

  document.body.appendChild(root);

  document.getElementById('cart-drawer-close')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-overlay')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-continue-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-checkout-btn')?.addEventListener('click', handleCheckout);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('cart-drawer')?.classList.contains('is-active')) {
      closeCartDrawer();
    }
  });
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (!drawer || !overlay) return;

  renderCartItems();
  drawer.classList.add('is-active');
  overlay.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  if (!drawer || !overlay) return;

  drawer.classList.remove('is-active');
  overlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

function renderCartItems() {
  const container = document.getElementById('cart-drawer-items');
  const countBadge = document.getElementById('cart-drawer-count');
  const footer = document.getElementById('cart-drawer-footer');
  const subtotalElem = document.getElementById('cart-summary-subtotal');
  const totalElem = document.getElementById('cart-summary-total');

  if (!container) return;

  const cart = getStoredCart();
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (countBadge) {
    countBadge.textContent = `(${totalUnits} artículo${totalUnits === 1 ? '' : 's'})`;
  }

  if (subtotalElem) subtotalElem.textContent = formatPrice(totalPrice);
  if (totalElem) totalElem.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">
          <span class="material-symbols-outlined">shopping_bag</span>
        </div>
        <h3 class="cart-empty__title">Tu carrito está vacío</h3>
        <p class="cart-empty__text">Descubrí nuestras piezas de autor diseñadas y fabricadas en Argentina.</p>
        <a href="productos.html" class="btn btn-primary cart-empty__btn" id="cart-empty-explore-btn">
          Explorar Catálogo
        </a>
      </div>
    `;
    if (footer) footer.style.display = 'none';

    document.getElementById('cart-empty-explore-btn')?.addEventListener('click', () => {
      closeCartDrawer();
    });
    return;
  }

  if (footer) footer.style.display = 'flex';

  container.innerHTML = cart.map((item) => `
    <article class="cart-item" data-id="${item.id}">
      <div class="cart-item__thumb">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item__details">
        <div class="cart-item__top">
          <div>
            <h3 class="cart-item__name">${item.name}</h3>
            <p class="cart-item__variant">${item.variant || 'Mobiliario de autor'}</p>
          </div>
          <button class="cart-item__delete" data-action="remove" data-id="${item.id}" aria-label="Eliminar ${item.name} del carrito">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
        <div class="cart-item__bottom">
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Disminuir cantidad">-</button>
            <span class="cart-item__qty-value">${item.quantity}</span>
            <button class="cart-item__qty-btn" data-action="increase" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
          </div>
          <span class="cart-item__price">${formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');

      if (action === 'increase') {
        updateCartItemQuantity(id, 1);
      } else if (action === 'decrease') {
        updateCartItemQuantity(id, -1);
      } else if (action === 'remove') {
        removeCartItem(id);
      }
    });
  });
}

function updateCartItemQuantity(id, delta) {
  let cart = getStoredCart();
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      const removedName = cart[itemIndex].name;
      cart.splice(itemIndex, 1);
      showToast('Carrito', `Se eliminó "${removedName}" del carrito.`);
    }
    saveStoredCart(cart);
    updateCartUI();
    renderCartItems();
  }
}

function removeCartItem(id) {
  let cart = getStoredCart();
  const item = cart.find((i) => i.id === id);
  const name = item ? item.name : 'Producto';
  cart = cart.filter((i) => i.id !== id);
  saveStoredCart(cart);
  updateCartUI();
  renderCartItems();
  showToast('Carrito', `Se eliminó "${name}" del carrito.`);
}

function addToCart(productData) {
  let cart = getStoredCart();
  const existing = cart.find((i) => i.id === productData.id || i.name === productData.name);

  if (existing) {
    existing.quantity += (productData.quantity || 1);
  } else {
    cart.push({
      id: productData.id || ('prod_' + Date.now()),
      name: productData.name || 'Mueble de Autor',
      price: Number(productData.price) || 0,
      image: productData.image || 'assets/images/sofa-tierra-1.jpg',
      variant: productData.variant || 'Industria Argentina',
      quantity: productData.quantity || 1
    });
  }

  saveStoredCart(cart);
  updateCartUI();
  animateCartBadges();

  showToast('¡Agregado al carrito!', `${productData.name} se añadió a tu pedido.`, 'Ver Carrito', () => {
    openCartDrawer();
  });

  setTimeout(() => {
    openCartDrawer();
  }, 300);
}

function updateCartUI() {
  const cart = getStoredCart();
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll('.cart-badge').forEach((badge) => {
    badge.textContent = totalUnits;
    badge.setAttribute('aria-label', `${totalUnits} artículos en el carrito`);
    badge.style.display = totalUnits >= 0 ? 'flex' : 'none';
  });
}

function animateCartBadges() {
  document.querySelectorAll('.cart-badge').forEach((badge) => {
    badge.style.transform = 'scale(1.4)';
    setTimeout(() => {
      badge.style.transform = 'scale(1)';
    }, 250);
  });
}

function initAddToCartButtons() {
  const detailAddBtn = document.querySelector('.detail-info__add');
  if (detailAddBtn) {
    detailAddBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const rawPrice = (document.querySelector('.detail-info__price-value')?.textContent || '$1.250.000').replace(/[^0-9]/g, '');
      const name = document.querySelector('.detail-info__name')?.textContent.trim() || 'Sofá Tierra';
      const mainImg = document.getElementById('detail-main-image')?.src || 'assets/images/sofa-tierra-1.jpg';
      const variant = document.querySelector('.detail-info__subtitle')?.textContent.trim() || 'Colección Living';

      addToCart({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        price: parseInt(rawPrice, 10) || 1250000,
        image: mainImg,
        variant: variant,
        quantity: 1
      });
    });
  }

  document.querySelectorAll('.product-card__cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.product-card');
      if (!card) return;

      const name = card.querySelector('.product-card__name')?.textContent.trim() || 'Mueble de Colección';
      const rawPrice = (card.querySelector('.product-card__price')?.textContent || '$0').replace(/[^0-9]/g, '');
      const img = card.querySelector('.product-card__image')?.src || 'assets/images/sofa-tierra-1.jpg';
      const material = card.querySelector('.product-card__material')?.textContent.trim() || 'Madera maciza';

      addToCart({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        price: parseInt(rawPrice, 10) || 450000,
        image: img,
        variant: material,
        quantity: 1
      });
    });
  });
}

function handleCheckout() {
  const cart = getStoredCart();
  if (cart.length === 0) return;

  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  closeCartDrawer();

  let modalOverlay = document.getElementById('checkout-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'checkout-modal-overlay';
    modalOverlay.className = 'checkout-modal-overlay';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="checkout-modal" role="dialog" aria-modal="true">
      <div class="checkout-modal__icon">
        <span class="material-symbols-outlined">verified</span>
      </div>
      <h2 class="checkout-modal__title">Resumen de tu Pedido</h2>
      <p class="checkout-modal__desc">
        Estás a punto de coordinar tu pedido de <strong>${totalUnits} piezas de autor</strong> con atención personalizada de nuestros ebanistas y diseñadores.
      </p>
      <div class="checkout-modal__total-box">
        <span>Inversión Total</span>
        <span class="checkout-modal__total-amount">${formatPrice(totalPrice)}</span>
      </div>
      <div class="checkout-modal__actions">
        <a href="https://wa.me/5491112345678?text=Hola%20Muebler%C3%ADa%20Jota,%20deseo%20confirmar%20mi%20pedido%20de:%20${encodeURIComponent(cart.map(i => `${i.quantity}x ${i.name}`).join(', '))}%20por%20un%20total%20de%20${encodeURIComponent(formatPrice(totalPrice))}" target="_blank" class="btn btn-primary" style="width:100%;">
          <span>Confirmar por WhatsApp</span>
          <span class="material-symbols-outlined">chat</span>
        </a>
        <button type="button" class="btn btn-outline" style="width:100%; color:var(--color-primary); border-color:var(--color-outline-variant);" id="checkout-modal-close">
          Seguir viendo la web
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('is-active');

  const closeModal = () => modalOverlay.classList.remove('is-active');
  document.getElementById('checkout-modal-close')?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* ==========================================================================
   6. GALERÍA DE PRODUCTO DETALLE & LIGHTBOX ZOOM
   ========================================================================== */
function initProductDetailGallery() {
  const mainImage = document.getElementById('detail-main-image');
  const mainContainer = document.getElementById('detail-main-container') || mainImage?.parentElement;
  const thumbs = document.querySelectorAll('#detail-thumbs .detail-gallery__thumb');

  if (!mainImage) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      thumbs.forEach((t) => t.classList.remove('is-active'));
      thumb.classList.add('is-active');

      const newSrc = thumb.getAttribute('data-image') || thumb.querySelector('img')?.src;
      const newAlt = thumb.querySelector('img')?.alt || mainImage.alt;

      if (newSrc && newSrc !== mainImage.src) {
        mainImage.style.opacity = '0.3';
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.alt = newAlt;
          mainImage.style.opacity = '1';
        }, 150);
      }
    });
  });

  if (mainContainer) {
    mainContainer.addEventListener('click', () => {
      openImageLightbox(mainImage.src, mainImage.alt);
    });
  }
}

function openImageLightbox(src, caption) {
  let lightbox = document.getElementById('image-lightbox-root');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'image-lightbox-root';
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
      <button class="image-lightbox__close" id="image-lightbox-close" aria-label="Cerrar vista ampliada">
        <span class="material-symbols-outlined">close</span>
      </button>
      <figure class="image-lightbox__figure">
        <img src="" alt="" class="image-lightbox__img" id="image-lightbox-img">
        <figcaption class="image-lightbox__caption" id="image-lightbox-caption"></figcaption>
      </figure>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = document.getElementById('image-lightbox-close');
    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  const imgElem = document.getElementById('image-lightbox-img');
  const captionElem = document.getElementById('image-lightbox-caption');

  if (imgElem) imgElem.src = src;
  if (captionElem) captionElem.textContent = caption || 'Detalle de Producto · Mueblería Jota';

  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   7. NOTIFICACIONES TOAST FLOTANTES
   ========================================================================== */
function showToast(title, desc, actionText, actionCallback) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <span class="material-symbols-outlined toast-notification__icon">check_circle</span>
    <div class="toast-notification__content">
      <span class="toast-notification__title">${title}</span>
      <span class="toast-notification__desc">${desc}</span>
    </div>
    ${actionText ? `<button class="toast-notification__btn" id="toast-action">${actionText}</button>` : ''}
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  if (actionText && actionCallback) {
    toast.querySelector('#toast-action')?.addEventListener('click', () => {
      actionCallback();
      removeToast(toast);
    });
  }

  const timeoutId = setTimeout(() => {
    removeToast(toast);
  }, 4500);

  toast.addEventListener('click', (e) => {
    if (!e.target.closest('#toast-action')) {
      clearTimeout(timeoutId);
      removeToast(toast);
    }
  });
}

function removeToast(toast) {
  toast.classList.remove('is-visible');
  setTimeout(() => {
    toast.remove();
  }, 350);
}

/* ==========================================================================
   8. FILTRO INTERACTIVO DE CATÁLOGO Y BUSCADOR
   ========================================================================== */
function initCatalogFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const bentoTriggers = document.querySelectorAll('[data-filter-trigger]');
  const searchInput = document.getElementById('search-input');
  const productCards = document.querySelectorAll('#catalog-grid .product-card');
  const counterElement = document.getElementById('catalog-counter');
  const emptyMessage = document.getElementById('catalog-empty');

  if (productCards.length === 0) return;

  let currentCategory = 'all';
  let currentSearch = '';

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

    if (counterElement) {
      if (currentCategory === 'all' && currentSearch === '') {
        counterElement.textContent = `Mostrando todos los productos (${visibleCount})`;
      } else {
        counterElement.textContent = `Mostrando ${visibleCount} resultado${visibleCount === 1 ? '' : 's'}`;
      }
    }

    if (emptyMessage) {
      emptyMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

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

  bentoTriggers.forEach((bento) => {
    bento.addEventListener('click', () => {
      const targetCategory = bento.getAttribute('data-filter-trigger');
      if (!targetCategory) return;

      filterPills.forEach((pill) => {
        if (pill.getAttribute('data-category') === targetCategory) {
          pill.click();
        }
      });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  applyFilters();
}

/* ==========================================================================
   9. GALERÍA AUTOMÁTICA EN HOVER PARA TARJETAS DE PRODUCTO
   ========================================================================== */
function initProductGalleryHover() {
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

export { initProductGalleryHover };

