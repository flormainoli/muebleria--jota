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

/**
 * Crea el elemento DOM de una Product Card.
 * @param {Object} producto - Objeto del array de productos
 * @returns {HTMLElement} La tarjeta <article> del producto
 */
function crearProductCard(producto) {
  const imagen = producto.imagenes[0];

  const article = document.createElement('article');
  article.className = 'product-card';
  article.dataset.id = producto.id;

  // Contenedor de imagen con botones de acción superpuestos
  const wrapper = document.createElement('div');
  wrapper.className = 'product-card__image-wrapper';

  const img = document.createElement('img');
  img.src = imagen;
  img.alt = producto.nombre;
  img.className = 'product-card__image';
  img.loading = 'lazy';

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

  wrapper.appendChild(img);
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
  material.textContent = producto.material;

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
function vincularAccionesProductos(contenedor) {
  const badge = document.querySelector('.cart-badge');

  contenedor.querySelectorAll('.product-card').forEach((card) => {
    const productoId = card.dataset.id;

    // Botones con data-accion="ver-mas" (icono y texto)
    card.querySelectorAll('[data-accion="ver-mas"]').forEach((boton) => {
      boton.addEventListener('click', () => {
        // Cada producto se identifica por su id y se navega al detalle
        window.location.href = 'producto-detalle.html?id=' + productoId;
      });
    });

    // Botones con data-accion="carrito"
    card.querySelectorAll('[data-accion="carrito"]').forEach((boton) => {
      boton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (!badge) return;

        // Feedback simple del contador del carrito (sin lógica completa aún)
        let contador = parseInt(badge.textContent, 10) || 0;
        contador++;
        badge.textContent = contador;

        badge.style.transform = 'scale(1.35)';
        setTimeout(() => {
          badge.style.transform = 'scale(1)';
        }, 200);
      });
    });
  });
}
