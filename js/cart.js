import { showToast } from './toast.js';

const STORAGE_KEY = 'muebleria-jota-cart';

export function formatCurrencyARS(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function getCart() {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);
    const parsed = savedCart ? JSON.parse(savedCart) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('No se pudo leer el carrito guardado:', error);
    return [];
  }
}

function persistCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getCartTotalItems(cart = getCart()) {
  return cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
}

export function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;

  const quantity = getCartTotalItems();
  badge.textContent = quantity;
  badge.style.transform = 'scale(1.35)';
  window.clearTimeout(badge.dataset.cartPulseTimer);
  badge.dataset.cartPulseTimer = window.setTimeout(() => {
    badge.style.transform = 'scale(1)';
  }, 200);
}

export function addProductToCart(product) {
  if (!product || !product.id) return getCart();

  const cart = getCart();
  const itemToAdd = {
    id: String(product.id),
    name: product.nombre || product.name || 'Producto',
    price: Number(product.precio || product.price || 0),
    image: product.imagen || product.image || product.imagenes?.[0] || '',
    quantity: 1,
  };

  const existingItem = cart.find((item) => item.id === itemToAdd.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(itemToAdd);
  }

  persistCart(cart);
  updateCartBadge();
  renderCart();
  showToast(itemToAdd.name);

  return cart;
}

export function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === String(productId));

  if (itemIndex === -1) return;

  if (quantity <= 0) {
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = quantity;
  }

  persistCart(cart);
  updateCartBadge();
  renderCart();
}

export function removeProductFromCart(productId) {
  updateCartItemQuantity(productId, 0);
}

export function clearCart() {
  persistCart([]);
  updateCartBadge();
  renderCart();
  showToast('Tu carrito está vacío');
}

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

  let subtotal = 0;

  cart.forEach((item) => {
    const quantity = Number(item.quantity || 1);
    const itemTotal = Number(item.price || 0) * quantity;
    subtotal += itemTotal;

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
            <button type="button" class="cart-item__qty-btn" data-cart-action="decrease" data-cart-id="${item.id}" aria-label="Disminuir cantidad">−</button>
            <span>${quantity}</span>
            <button type="button" class="cart-item__qty-btn" data-cart-action="increase" data-cart-id="${item.id}" aria-label="Aumentar cantidad">+</button>
          </div>
          <strong>${formatCurrencyARS(itemTotal)}</strong>
        </div>
      </div>
    `;

    itemsContainer.appendChild(row);
  });

  if (totalElement) totalElement.textContent = formatCurrencyARS(subtotal);
}

export function initCart() {
  if (document.body.dataset.cartInitialized === 'true') return;
  document.body.dataset.cartInitialized = 'true';

  const cartTrigger = document.getElementById('cart-trigger');
  const closeButton = document.getElementById('cart-close');
  const backdrop = document.getElementById('cart-backdrop');
  const clearButton = document.getElementById('cart-clear');
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

    showToast('Gracias por tu compra');
    persistCart([]);
    updateCartBadge();
    renderCart();
    closeCartDrawer();
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

  updateCartBadge();
  renderCart();
}
