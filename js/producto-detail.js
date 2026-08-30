/**
 * ==========================================================================
 * MUEBLERÍA JOTA - LÓGICA DE LA PÁGINA DE DETALLE DE PRODUCTO
 * ==========================================================================
 * Lee el id del producto desde la URL (?id=slug), lo busca en el array
 * `PRODUCTOS` (js/productos.js) y rellena dinámicamente la página:
 *   - Miga de pan
 *   - Galería (imagen principal + miniaturas con addEventListener)
 *   - Información (nombre, precio, calificación, descripción, detalles)
 *   - Productos similares (mismo ambiente, usando crearProductCard)
 *
 * Los contenedores vacíos ya existen en producto-detalle.html; este archivo
 * solo inyecta contenido y comportamiento.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtenemos el id desde el query string: producto-detalle.html?id=slug
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const producto = id ? productoPorId(id) : undefined;

  // Si no existe el producto, mostramos un mensaje amigable y salimos
  if (!producto) {
    document.getElementById('detail-name').textContent = 'Producto no encontrado';
    document.getElementById('detail-description').textContent =
      'El producto que buscás no está disponible. Volvé al catálogo para ver nuestras colecciones.';
    return;
  }

  // 2. Carga asíncrona para simular la obtención de datos
  setTimeout(() => {
    renderizarBreadcrumb(producto);
    renderizarGaleria(producto);
    renderizarInformacion(producto);
    renderizarDetalles(producto);
    renderizarSimilares(producto);
    vincularBotonCarrito(producto);
  }, 400);
});

/**
 * Actualiza la miga de pan con el nombre y el ambiente del producto.
 * @param {Object} producto
 */
function renderizarBreadcrumb(producto) {
  const ambienteLink = document.getElementById('detail-crumb-ambiente');
  const nombreCrumb = document.getElementById('detail-crumb-name');

  const etiquetasAmbiente = {
    living: 'Living',
    comedor: 'Comedor',
    cocina: 'Cocina',
    oficina: 'Oficina',
    dormitorio: 'Dormitorio'
  };

  const etiqueta = etiquetasAmbiente[producto.ambiente] || 'Productos';
  if (ambienteLink) {
    ambienteLink.href = producto.ambiente + '.html';
    ambienteLink.textContent = etiqueta;
  }
  if (nombreCrumb) nombreCrumb.textContent = producto.nombre;
}

/**
 * Rellena la galería: imagen principal y miniaturas clicables.
 * @param {Object} producto
 */
function renderizarGaleria(producto) {
  const imagenPrincipal = document.getElementById('detail-main-image');
  const contenedorThumbs = document.getElementById('detail-thumbs');

  imagenPrincipal.src = producto.imagenes[0];
  imagenPrincipal.alt = producto.nombre + ' - Fotografía principal';

  // Ocultamos el placeholder de carga
  contenedorThumbs.innerHTML = '';

  // Si hay una sola imagen, no mostramos miniaturas
  if (producto.imagenes.length < 2) {
    contenedorThumbs.style.display = 'none';
    return;
  }

  // Creamos una miniatura por imagen
  producto.imagenes.forEach((url, indice) => {
    const thumb = document.createElement('button');
    thumb.className = 'detail-gallery__thumb' + (indice === 0 ? ' is-active' : '');
    thumb.type = 'button';
    thumb.dataset.image = url;
    thumb.setAttribute('aria-label', 'Ver fotografía ' + (indice + 1) + ' de ' + producto.nombre);

    const img = document.createElement('img');
    img.src = url;
    img.alt = producto.nombre + ' - Fotografía ' + (indice + 1);
    thumb.appendChild(img);

    thumb.addEventListener('click', () => {
      // Resaltamos la miniatura activa y actualizamos la imagen principal
      contenedorThumbs.querySelectorAll('.detail-gallery__thumb').forEach((t) => {
        t.classList.remove('is-active');
      });
      thumb.classList.add('is-active');
      imagenPrincipal.src = url;
      imagenPrincipal.alt = img.alt;
    });

    contenedorThumbs.appendChild(thumb);
  });
}

/**
 * Rellena la columna de información (nombre, precio, rating, etc.).
 * @param {Object} producto
 */
function renderizarInformacion(producto) {
  document.getElementById('detail-name').textContent = producto.nombre;
  document.getElementById('detail-subtitle').textContent =
    'Colección ' + (producto.tipo || 'Jota');
  document.getElementById('detail-description').textContent = producto.descripcion;
  document.getElementById('detail-price').textContent = formatearPrecio(producto.precio);
  document.getElementById('detail-reviews').textContent =
    '(' + producto.reseñas + ' reseñas)';

  // Calificación en estrellas
  const contenedorRating = document.getElementById('detail-rating');
  const estrellas = contenedorRating.querySelectorAll('.detail-info__star');
  estrellas.forEach((estrella, indice) => {
    if (indice < Math.round(producto.calificacion)) {
      estrella.style.color = '';
    } else {
      estrella.style.opacity = '0.2';
    }
  });

  // Detalles rápidos
  document.getElementById('quick-dimension').textContent = producto.dimensiones;
  document.getElementById('quick-material').textContent = producto.material;
  document.getElementById('quick-fabricacion').textContent =
    'Nacional · ' + producto.fabricacion;
}

/**
 * Rellena la sección de descripción y los detalles técnicos.
 * @param {Object} producto
 */
function renderizarDetalles(producto) {
  document.getElementById('detail-descripcion').textContent = producto.descripcion;
  document.getElementById('spec-material').textContent = producto.material;
  document.getElementById('spec-dimension').textContent = producto.dimensiones;
  document.getElementById('spec-color').textContent = producto.color;
  document.getElementById('spec-fabricacion').textContent = producto.fabricacion;
}

/**
 * Renderiza en la grilla de productos similares los demás productos del
 * mismo ambiente (con crearProductCard de js/product-card.js).
 * @param {Object} producto
 */
function renderizarSimilares(producto) {
  const grilla = document.getElementById('detail-related-grid');
  grilla.innerHTML = '';

  const similares = productosPorAmbiente(producto.ambiente)
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);

  similares.forEach((p) => {
    grilla.appendChild(crearProductCard(p));
  });

  // Reutilizamos el vínculo de acciones común (Ver más / carrito)
  vincularAccionesProductos(grilla);
}

/**
 * Vincula el feedback del botón "Añadir al carrito" del detalle.
 * @param {Object} producto
 */
function vincularBotonCarrito(producto) {
  const boton = document.getElementById('detail-add');
  if (!boton) return;

  const badge = document.querySelector('.cart-badge');

  boton.addEventListener('click', () => {
    if (!badge) return;
    let contador = parseInt(badge.textContent, 10) || 0;
    contador++;
    badge.textContent = contador;

    badge.style.transform = 'scale(1.35)';
    setTimeout(() => {
      badge.style.transform = 'scale(1)';
    }, 200);
  });
}
