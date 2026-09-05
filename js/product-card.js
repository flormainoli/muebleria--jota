/**
 * ==========================================================================
 * MUEBLERÍA JOTA - CONSTRUCTOR DE PRODUCT CARDS (Compartido)
 * ==========================================================================
 * Crea dinámicamente la Product Card a partir de un objeto del array
 * `PRODUCTOS`. Reutilizada por las páginas de ambiente y por la página de
 * detalle (para los productos similares), garantizando un único punto de
 * generación y la misma apariencia en todo el sitio.
 * ==========================================================================
 */

import { formatearPrecio } from './productos.js';
import { addProductToCart } from './cart.js';
import { parsePrice } from './utils.js';

/**
 * Crea el elemento DOM de una Product Card.
 * @param {Object} producto - Objeto del array de productos
 * @returns {HTMLElement} La tarjeta <article> del producto
 */
export function crearProductCard(producto) {
  const article = document.createElement('article');
  article.className = 'product-card';
  article.dataset.id = producto.id;

  const imagenes = Array.isArray(producto.imagenes) && producto.imagenes.length > 0
    ? producto.imagenes
    : [producto.image || 'assets/images/rack-andes-1.jpg'];
  const tieneGaleria = imagenes.length > 1;

  // Contenedor de imagen con botones de acción superpuestos
  const wrapper = document.createElement('div');
  wrapper.className = tieneGaleria
    ? 'product-card__image-wrapper product-gallery-hover'
    : 'product-card__image-wrapper';

  if (tieneGaleria) {
    imagenes.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = producto.nombre + ' - Fotografía ' + (i + 1);
      img.className = 'product-card__image product-gallery-img' + (i === 0 ? ' is-active' : '');
      img.loading = 'lazy';
      img.width = 400;
      img.height = 500;
      wrapper.appendChild(img);
    });
  } else {
    const img = document.createElement('img');
    img.src = imagenes[0];
    img.alt = producto.nombre;
    img.className = 'product-card__image';
    img.loading = 'lazy';
    img.width = 400;
    img.height = 500;
    wrapper.appendChild(img);
  }

  const acciones = document.createElement('div');
  acciones.className = 'product-card__actions';

  // Botón "Ver más" (icono ojo)
  const botonVerMas = document.createElement('button');
  botonVerMas.className = 'action-circle-btn';
  botonVerMas.type = 'button';
  botonVerMas.setAttribute('aria-label', 'Ver detalles de ' + producto.nombre);
  botonVerMas.dataset.accion = 'ver-mas';

  const iconoVerMas = document.createElement('span');
  iconoVerMas.className = 'material-symbols-outlined';
  iconoVerMas.textContent = 'visibility';
  botonVerMas.appendChild(iconoVerMas);

  // Botón "Añadir al carrito"
  const botonCarrito = document.createElement('button');
  botonCarrito.className = 'action-circle-btn action-circle-btn--primary product-card__cart-btn';
  botonCarrito.type = 'button';
  botonCarrito.setAttribute('aria-label', 'Agregar ' + producto.nombre + ' al carrito');
  botonCarrito.dataset.accion = 'carrito';

  const iconoCarrito = document.createElement('span');
  iconoCarrito.className = 'material-symbols-outlined';
  iconoCarrito.textContent = 'add_shopping_cart';
  botonCarrito.appendChild(iconoCarrito);

  acciones.appendChild(botonVerMas);
  acciones.appendChild(botonCarrito);

  wrapper.appendChild(acciones);

  // Información del producto
  const info = document.createElement('div');
  info.className = 'product-card__info';

  const fila = document.createElement('div');
  fila.className = 'product-card__row';

  const nombre = document.createElement('h2');
  nombre.className = 'product-card__name';
  nombre.textContent = producto.nombre;

  const precio = document.createElement('span');
  precio.className = 'product-card__price';
  precio.textContent = formatearPrecio(producto.precio);

  fila.appendChild(nombre);
  fila.appendChild(precio);

  const material = document.createElement('p');
  material.className = 'product-card__material';
  material.textContent = producto.material || '';

  const verMas = document.createElement('button');
  verMas.className = 'product-card__view-more';
  verMas.type = 'button';
  verMas.textContent = 'Ver más';
  verMas.dataset.accion = 'ver-mas';

  info.appendChild(fila);
  info.appendChild(material);
  info.appendChild(verMas);

  article.appendChild(wrapper);
  article.appendChild(info);

  return article;
}

/**
 * Vincula addEventListener a los botones de "Ver más" y "Añadir al carrito"
 * de todas las cards dentro de un contenedor.
 * @param {HTMLElement} contenedor - Contenedor que posee las cards
 */
export function vincularAccionesProductos(contenedor) {
  if (!contenedor) return;

  contenedor.querySelectorAll('.product-card').forEach((card) => {
    const productoId = card.dataset.id;

    // Navegar al detalle al hacer click en la tarjeta (excepto botones)
    card.addEventListener('click', (event) => {
      if (event.target.closest('button') && event.target.closest('button').dataset.accion === 'carrito') {
        return;
      }
      window.location.href = 'producto-detalle.html?id=' + encodeURIComponent(productoId);
    });

    // Botones con data-accion="carrito"
    card.querySelectorAll('[data-accion="carrito"]').forEach((boton) => {
      boton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const productName = card.querySelector('.product-card__name')
          ? card.querySelector('.product-card__name').textContent
          : 'Producto';
        const priceText = card.querySelector('.product-card__price')
          ? card.querySelector('.product-card__price').textContent
          : '0';
        const parsedPrice = parsePrice(priceText);
        const imageEl = card.querySelector('.product-card__image');
        const imageSrc = imageEl ? imageEl.src : '';

        addProductToCart({
          id: String(card.dataset.id || productName.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
          nombre: productName,
          precio: parsedPrice,
          image: imageSrc,
        });
      });
    });
  });
}
