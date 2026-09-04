import { showToast } from './toast.js';
import { createFocusTrap } from './focus-trap.js';
import { openCheckoutModal } from './checkout-modal.js';
import { getCart, persistCart, addItem, updateQuantity, removeItem, clearItems, getTotalItems, getTotal } from './cart-store.js';

export function formatCurrencyARS(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

// Re-export getCart, persistCart if needed
export { getCart, persistCart };

export function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;

  const quantity = getTotalItems();
  badge.textContent = quantity;
  badge.style.transform = 'scale(1.35)';
  window.clearTimeout(badge.dataset.cartPulseTimer);
  badge.dataset.cartPulseTimer = window.setTimeout(() => {
    badge.style.transform = 'scale(1)';
  }, 200);
}

export function addProductToCart(product) {
  const cart = addItem(product);
  showToast(`Se ha añadido ${product.nombre || product.name || 'Producto'} a tu carrito`);
  return cart;
}

export function updateCartItemQuantity(productId, quantity) {
  updateQuantity(productId, quantity);
}

export function removeProductFromCart(productId) {
  removeItem(productId);
}

export function clearCart() {
  clearItems();
  showToast('Tu carrito ha sido vaciado');
}

let cartDrawerTrap = null;

export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const trigger = document.getElementById('cart-trigger');
  if (!drawer) return;

  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  trigger?.setAttribute('aria-expanded', 'true');
  const backdrop = document.getElementById('cart-backdrop');
  if (backdrop) backdrop.classList.add('is-visible');
  document.body.classList.add('cart-open');
  if (cartDrawerTrap) cartDrawerTrap.activate();
}

export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const trigger = document.getElementById('cart-trigger');
  if (!drawer) return;

  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  trigger?.setAttribute('aria-expanded', 'false');
  const backdrop = document.getElementById('cart-backdrop');
  if (backdrop) backdrop.classList.remove('is-visible');
  document.body.classList.remove('cart-open');
  if (cartDrawerTrap) cartDrawerTrap.deactivate();
}

export function renderCart() {
  const cart = getCart();
  const itemsContainer = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const totalElement = document.getElementById('cart-total');
  const drawer = document.getElementById('cart-drawer');

  if (!itemsContainer) return;

  itemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyState.style.display = 'block';
    if (totalElement) totalElement.textContent = formatCurrencyARS(0);
    if (drawer) drawer.classList.add('is-empty');
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (drawer) drawer.classList.remove('is-empty');

  cart.forEach((item) => {
    const quantity = Number(item.quantity || 1);
    const itemTotal = Number(item.price || 0) * quantity;

    const row = document.createElement('article');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item__image-wrap">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" class="cart-item__image">` : '<div class="cart-item__image cart-item__image--placeholder">M</div>'}
      </div>
      <div class="cart-item__details">
        <div class="cart-item__head">
          <h3>${item.name}</h3>
          <button type="button" class="cart-item__remove" data-cart-action="remove" data-cart-id="${item.id}" aria-label="Eliminar ${item.name}">Eliminar</button>
        </div>
        <div class="cart-item__meta">
          <div class="cart-item__qty">
            <button type="button" class="cart-item__qty-btn" data-cart-action="decrease" data-cart-id="${item.id}" aria-label="Disminuir cantidad">-</button>
            <span>${quantity}</span>
            <button type="button" class="cart-item__qty-btn" data-cart-action="increase" data-cart-id="${item.id}" aria-label="Aumentar cantidad">+</button>
          </div>
          <strong>${formatCurrencyARS(itemTotal)}</strong>
        </div>
      </div>
    `;

    itemsContainer.appendChild(row);
  });

  if (totalElement) totalElement.textContent = formatCurrencyARS(getTotal());
}

export function initCart() {
  if (document.body.dataset.cartInitialized === 'true') return;
  document.body.dataset.cartInitialized = 'true';

  const cartTrigger = document.getElementById('cart-trigger');
  const closeButton = document.getElementById('cart-close');
  const backdrop = document.getElementById('cart-backdrop');
  const clearButton = document.getElementById('cart-clear');
  const drawer = document.getElementById('cart-drawer');
  if (drawer && !cartDrawerTrap) { cartDrawerTrap = createFocusTrap(drawer); }
  const checkoutButton = document.getElementById('cart-checkout');

  cartTrigger?.addEventListener('click', () => {
    const drawer = document.getElementById('cart-drawer');
    if (!drawer) return;

    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeCartDrawer();
    } else {
      openCartDrawer();
    }
  });

  closeButton?.addEventListener('click', closeCartDrawer);
  backdrop?.addEventListener('click', closeCartDrawer);

  clearButton?.addEventListener('click', () => {
    clearCart();
    closeCartDrawer();
  });

  checkoutButton?.addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) {
      showToast('Tu carrito está vacío');
      return;
    }

    openCheckoutModal();
  });

  document.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-cart-action]');
    if (!actionButton) return;

    const { cartAction, cartId } = actionButton.dataset;
    if (!cartId) return;

    if (cartAction === 'remove') {
      removeProductFromCart(cartId);
    }

    if (cartAction === 'increase') {
      const cart = getCart();
      const item = cart.find((entry) => entry.id === cartId);
      if (item) {
        updateCartItemQuantity(cartId, Number(item.quantity || 1) + 1);
      }
    }

    if (cartAction === 'decrease') {
      const cart = getCart();
      const item = cart.find((entry) => entry.id === cartId);
      if (item) {
        updateCartItemQuantity(cartId, Number(item.quantity || 1) - 1);
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeCartDrawer();
    }
  });

  // Listen to store updates
  document.addEventListener('cart:updated', () => {
    updateCartBadge();
    renderCart();
  });

  updateCartBadge();
  renderCart();
}