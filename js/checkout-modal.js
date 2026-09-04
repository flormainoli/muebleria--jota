import { showToast } from './toast.js';
import { createFocusTrap } from './focus-trap.js';
import { clearCart, closeCartDrawer } from './cart.js';

// ─────────────────────────────────────────────
// Helpers de validación
// ─────────────────────────────────────────────

function hasDigit(value) {
  return /\d/.test(value);
}

function hasAt(value) {
  return value.includes('@');
}

function setFieldError(input, errorEl, message) {
  input.classList.add('checkout-modal__input--error');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function clearFieldError(input, errorEl) {
  input.classList.remove('checkout-modal__input--error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';
}

// ─────────────────────────────────────────────
// Focus trap (creado una sola vez por modal)
// ─────────────────────────────────────────────

let modalFocusTrap = null;

// ─────────────────────────────────────────────
// Crear / obtener el modal en el DOM
// ─────────────────────────────────────────────

function getOrCreateModal() {
  let modal = document.getElementById('checkout-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'checkout-modal';
  modal.className = 'checkout-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'checkout-modal-title');
  modal.innerHTML = `
    <div class="checkout-modal__backdrop" id="checkout-modal-backdrop"></div>
    <div class="checkout-modal__panel">
      <div class="checkout-modal__header">
        <h2 class="checkout-modal__title" id="checkout-modal-title">Finalizar pedido</h2>
        <button class="checkout-modal__close" id="checkout-modal-close" type="button" aria-label="Cerrar">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <p class="checkout-modal__subtitle">
        Completá tus datos para coordinar el envío y el pago.
      </p>
      <form class="checkout-modal__form" id="checkout-modal-form" novalidate>

        <div class="checkout-modal__field">
          <label class="checkout-modal__label" for="checkout-name">Nombre completo *</label>
          <input
            class="checkout-modal__input"
            id="checkout-name"
            name="checkout-name"
            type="text"
            placeholder="Ej. María García"
            autocomplete="name"
            required
          >
          <span class="checkout-modal__error" id="checkout-name-error" aria-live="polite"></span>
        </div>

        <div class="checkout-modal__field">
          <label class="checkout-modal__label" for="checkout-email">Email *</label>
          <input
            class="checkout-modal__input"
            id="checkout-email"
            name="checkout-email"
            type="email"
            placeholder="maria@ejemplo.com"
            autocomplete="email"
            required
          >
          <span class="checkout-modal__error" id="checkout-email-error" aria-live="polite"></span>
        </div>

        <div class="checkout-modal__field">
          <label class="checkout-modal__label" for="checkout-phone">Teléfono</label>
          <input
            class="checkout-modal__input"
            id="checkout-phone"
            name="checkout-phone"
            type="tel"
            placeholder="Ej. +54 11 1234-5678"
            autocomplete="tel"
          >
        </div>

        <div class="checkout-modal__field">
          <label class="checkout-modal__label" for="checkout-address">Dirección de envío *</label>
          <input
            class="checkout-modal__input"
            id="checkout-address"
            name="checkout-address"
            type="text"
            placeholder="Calle, número, ciudad"
            autocomplete="street-address"
            required
          >
          <span class="checkout-modal__error" id="checkout-address-error" aria-live="polite"></span>
        </div>

        <div class="checkout-modal__actions">
          <button class="btn btn-outline" id="checkout-modal-cancel" type="button">Cancelar</button>
          <button class="btn btn-primary" type="submit">
            Confirmar pedido
            <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
          </button>
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(modal);
  bindModalEvents(modal);

  // Inicializar focus trap sobre el panel
  modalFocusTrap = createFocusTrap(modal.querySelector('.checkout-modal__panel'));

  return modal;
}

// ─────────────────────────────────────────────
// Eventos internos del modal
// ─────────────────────────────────────────────

function bindModalEvents(modal) {
  const backdrop    = modal.querySelector('#checkout-modal-backdrop');
  const closeBtn    = modal.querySelector('#checkout-modal-close');
  const cancelBtn   = modal.querySelector('#checkout-modal-cancel');
  const form        = modal.querySelector('#checkout-modal-form');

  const nameInput    = modal.querySelector('#checkout-name');
  const nameError    = modal.querySelector('#checkout-name-error');
  const emailInput   = modal.querySelector('#checkout-email');
  const emailError   = modal.querySelector('#checkout-email-error');
  const addressInput = modal.querySelector('#checkout-address');
  const addressError = modal.querySelector('#checkout-address-error');

  backdrop?.addEventListener('click', closeCheckoutModal);
  closeBtn?.addEventListener('click', closeCheckoutModal);
  cancelBtn?.addEventListener('click', closeCheckoutModal);

  // Bloquear números en el nombre en tiempo real
  nameInput?.addEventListener('input', () => {
    const cleaned = nameInput.value.replace(/\d/g, '');
    if (nameInput.value !== cleaned) nameInput.value = cleaned;
    clearFieldError(nameInput, nameError);
  });

  emailInput?.addEventListener('input', () => clearFieldError(emailInput, emailError));
  addressInput?.addEventListener('input', () => clearFieldError(addressInput, addressError));

  // Submit con validaciones
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (!nameInput.value.trim()) {
      setFieldError(nameInput, nameError, 'Por favor ingresá tu nombre.');
      valid = false;
    } else if (hasDigit(nameInput.value)) {
      setFieldError(nameInput, nameError, 'El nombre no puede contener números.');
      valid = false;
    } else {
      clearFieldError(nameInput, nameError);
    }

    if (!emailInput.value.trim()) {
      setFieldError(emailInput, emailError, 'Por favor ingresá tu email.');
      valid = false;
    } else if (!hasAt(emailInput.value)) {
      setFieldError(emailInput, emailError, 'El email debe contener un @.');
      valid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    if (!addressInput.value.trim()) {
      setFieldError(addressInput, addressError, 'Por favor ingresá tu dirección de envío.');
      valid = false;
    } else {
      clearFieldError(addressInput, addressError);
    }

    if (!valid) return;

    // Todo OK: vaciar carrito y confirmar
    clearCart();
    closeCheckoutModal();
    closeCartDrawer();

    showToast('¡Ya hemos recibido su pedido! En la brevedad nos pondremos en contacto para coordinar método de envío y pago.');
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeCheckoutModal();
    }
  });
}

// ─────────────────────────────────────────────
// API pública
// ─────────────────────────────────────────────

export function openCheckoutModal() {
  const modal = getOrCreateModal();
  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');
  modalFocusTrap?.activate();
}

export function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  modalFocusTrap?.deactivate();

  const form = modal.querySelector('#checkout-modal-form');
  form?.reset();
  modal.querySelectorAll('.checkout-modal__input--error').forEach((el) => {
    el.classList.remove('checkout-modal__input--error');
  });
  modal.querySelectorAll('.checkout-modal__error').forEach((el) => {
    el.textContent = '';
    el.style.display = 'none';
  });
}