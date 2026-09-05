const STORAGE_KEY = 'muebleria_jota_cart_v2';

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

export function persistCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn('No se pudo guardar el carrito:', error);
  }
}

function dispatchCartUpdated() {
  document.dispatchEvent(new CustomEvent('cart:updated'));
}

export function getTotalItems() {
  const cart = getCart();
  return cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
}

export function getTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (Number(item.price || 0) * Number(item.quantity || 1)), 0);
}

export function addItem(product) {
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
  dispatchCartUpdated();
  return cart;
}

export function updateQuantity(productId, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex((item) => item.id === String(productId));

  if (itemIndex === -1) return;

  if (quantity <= 0) {
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = quantity;
  }

  persistCart(cart);
  dispatchCartUpdated();
}

export function removeItem(productId) {
  updateQuantity(productId, 0);
}

export function clearItems() {
  persistCart([]);
  dispatchCartUpdated();
}