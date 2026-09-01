import { formatearPrecio, productoPorId, productosPorAmbiente } from './productos.js';
import { crearProductCard, vincularAccionesProductos } from './product-card.js';
import { addProductToCart } from './cart.js';

async function initProductoDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const producto = id ? productoPorId(id) : undefined;

  if (!producto) {
    document.getElementById('detail-name').textContent = 'Producto no encontrado';
    document.getElementById('detail-description').textContent =
      'El producto que buscás no está disponible. Volvé al catálogo para ver nuestras colecciones.';
    return;
  }

  // Abstraer el setTimeout a una Promesa
  const simularPeticion = () => new Promise(resolve => setTimeout(resolve, 400));
  
  await simularPeticion();

  renderizarBreadcrumb(producto);
  renderizarGaleria(producto);
  renderizarInformacion(producto);
  renderizarDetalles(producto);
  renderizarSimilares(producto);
  vincularBotonCarrito(producto);
  inyectarJSONLD(producto);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductoDetail);
} else {
  initProductoDetail();
}

function inyectarJSONLD(producto) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": producto.nombre,
    "image": producto.imagenes,
    "description": producto.descripcion,
    "sku": producto.id,
    "brand": {
      "@type": "Brand",
      "name": "Mueblería Jota"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "ARS",
      "price": producto.precio,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": producto.calificacion,
      "reviewCount": producto.reseñas
    }
  });
  document.head.appendChild(script);
}

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

function renderizarGaleria(producto) {
  const imagenPrincipal = document.getElementById('detail-main-image');
  const contenedorThumbs = document.getElementById('detail-thumbs');

  imagenPrincipal.src = producto.imagenes[0];
  imagenPrincipal.alt = producto.nombre + ' - Fotografía principal';

  contenedorThumbs.innerHTML = '';

  if (producto.imagenes.length < 2) {
    contenedorThumbs.style.display = 'none';
    return;
  }

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

function renderizarInformacion(producto) {
  document.getElementById('detail-name').textContent = producto.nombre;
  document.getElementById('detail-subtitle').textContent =
    'Colección ' + (producto.tipo || 'Jota');
  document.getElementById('detail-description').textContent = producto.descripcion;
  document.getElementById('detail-price').textContent = formatearPrecio(producto.precio);
  document.getElementById('detail-reviews').textContent =
    '(' + producto.reseñas + ' reseñas)';

  const contenedorRating = document.getElementById('detail-rating');
  const estrellas = contenedorRating.querySelectorAll('.detail-info__star');
  estrellas.forEach((estrella, indice) => {
    if (indice < Math.round(producto.calificacion)) {
      estrella.style.color = '';
    } else {
      estrella.style.opacity = '0.2';
    }
  });

  document.getElementById('quick-dimension').textContent = producto.dimensiones;
  document.getElementById('quick-material').textContent = producto.material;
  document.getElementById('quick-fabricacion').textContent =
    'Nacional · ' + producto.fabricacion;
}

function renderizarDetalles(producto) {
  document.getElementById('detail-descripcion').textContent = producto.descripcion;
  document.getElementById('spec-material').textContent = producto.material;
  document.getElementById('spec-dimension').textContent = producto.dimensiones;
  document.getElementById('spec-color').textContent = producto.color;
  document.getElementById('spec-fabricacion').textContent = producto.fabricacion;
}

function renderizarSimilares(producto) {
  const grilla = document.getElementById('detail-related-grid');
  grilla.innerHTML = '';

  const similares = productosPorAmbiente(producto.ambiente)
    .filter((p) => p.id !== producto.id)
    .slice(0, 4);

  similares.forEach((p) => {
    grilla.appendChild(crearProductCard(p));
  });

  vincularAccionesProductos(grilla);
}

function vincularBotonCarrito(producto) {
  const boton = document.getElementById('detail-add');
  if (!boton) return;

  boton.addEventListener('click', () => {
    addProductToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagenes?.[0],
    });
  });
}
