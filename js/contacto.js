import { showToast } from './toast.js';

// ─────────────────────────────────────────────
// Formulario de Contacto
// ─────────────────────────────────────────────

function setFieldError(input, errorEl, message) {
  input.classList.add('contact-form__input--error');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function clearFieldError(input, errorEl) {
  input.classList.remove('contact-form__input--error');
  errorEl.textContent = '';
  errorEl.style.display = 'none';
}

function initContactForm() {
  const form     = document.getElementById('contact-form');
  if (!form) return;

  const nameInput  = form.querySelector('#name');
  const emailInput = form.querySelector('#email');

  // Crear elementos de error inline si no existen
  function ensureError(input, id) {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('span');
      el.id = id;
      el.className = 'contact-form__error';
      el.setAttribute('aria-live', 'polite');
      el.style.display = 'none';
      input.insertAdjacentElement('afterend', el);
    }
    return el;
  }

  const nameError  = ensureError(nameInput,  'name-error');
  const emailError = ensureError(emailInput, 'email-error');

  // Bloquear números en Nombre en tiempo real
  nameInput?.addEventListener('input', () => {
    const cleaned = nameInput.value.replace(/\d/g, '');
    if (nameInput.value !== cleaned) nameInput.value = cleaned;
    clearFieldError(nameInput, nameError);
  });

  emailInput?.addEventListener('input', () => clearFieldError(emailInput, emailError));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Validar nombre
    if (!nameInput.value.trim()) {
      setFieldError(nameInput, nameError, 'Por favor ingresá tu nombre.');
      valid = false;
    } else if (/\d/.test(nameInput.value)) {
      setFieldError(nameInput, nameError, 'El nombre no puede contener números.');
      valid = false;
    } else {
      clearFieldError(nameInput, nameError);
    }

    // Validar email (además de la validación nativa del browser)
    if (!emailInput.value.trim()) {
      setFieldError(emailInput, emailError, 'Por favor ingresá tu email.');
      valid = false;
    } else if (!emailInput.value.includes('@')) {
      setFieldError(emailInput, emailError, 'El email debe contener un @.');
      valid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    if (!valid) return;

    // Éxito: mostrar toast y resetear el formulario
    showToast('¡Mensaje enviado! Nos pondremos en contacto a la brevedad.');
    form.reset();
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
