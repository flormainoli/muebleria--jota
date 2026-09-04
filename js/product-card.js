/**
 * ==========================================================================
 * MUEBLERÍA JOTA - CONSTRUCTOR DE PRODUCT CARDS (Compartido)
 * ==========================================================================
 * Crea dinámicamente la Product Card a partir de un objeto del array
 * `PRODUCTOS`. Reutilizada por las páginas de ambiente y por la página de
 * detalle (para los productos similares), garantizando un único punto de
 * generación y la misma apariencia en todo el sitio.
 *
 * Este archivo NO depende del diseño: usa las mismas clases CSS existentes.
 * ==========================================================================
 */

import { formatearPrecio } from './productos.js';
import { addProductToCart } from './cart.js';
import { parsePrice } from './utils.js';

const CARD_TEMPLATE = document.createElement('template');
CARD_TEMPLATE.innerHTML = `
  <article class="product-card" data-id="">
    <div class="product-card__image-wrapper">
      <img src="" alt="" class="product-card__image" loading="lazy" width="400" height="500">
    </div>
    <div class="product-card__info">
      <div class="product-card__row">
        <h2 class="product-card__name"></h2>
        <span class="product-card__price"></span>
      </div>
      <p class="product-card__material"></p>
      <button class="product-card__view-more" type="button" data-accion="ver-mas">Ver más</button>
    </div>
  </article>
`;

export function crearProductCard(producto) {
  const clone = CARD_TEMPLATE.content.cloneNode(true);
  const article = clone.querySelector('article');
  
  article.dataset.id = producto.id;
  
  const img = clone.querySelector('.product-card__image');
  img.src = producto.imagenes[0];
  img.alt = producto.nombre;
  
  clone.querySelector('.product-card__name').textContent = producto.nombre;
  clone.querySelector('.product-card__price').textContent = formatearPrecio(producto.precio);
  clone.querySelector('.product-card__material').textContent = producto.material;

  return clone.firstElementChild;
}

/**
 * Vincula addEventListener a los botones de "Ver más" y "Añadir al carrito"
 * de todas las cards dentro de un contenedor.
 * @param {HTMLElement} contenedor - Contenedor que posee las cards
 */
export function vincularAccionesProductos(contenedor) {
  const badge = document.querySelector('.cart-badge');

  contenedor.querySelectorAll('.product-card').forEach((card) => {
    const productoId = card.dataset.id;

    // Hacer que toda la tarjeta navegue al detalle (el diseño actual la hace clickeable)
    card.addEventListener('click', () => {
      window.location.href = 'producto-detalle.html?id=' + productoId;
    });

    // Botones con data-accion="carrito"
    card.querySelectorAll('[data-accion="carrito"]').forEach((boton) => {
      boton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const productName = card.querySelector('.product-card__name') ? card.querySelector('.product-card__name').textContent : 'Producto';
        const priceText = card.querySelector('.product-card__price') ? card.querySelector('.product-card__price').textContent : '0';
        const parsedPrice = parsePrice(priceText);
        const imageSrc = card.querySelector('.product-card__image') ? card.querySelector('.product-card__image').src : '';

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
