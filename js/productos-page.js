/**
 * ==========================================================================
 * MUEBLERÍA JOTA - LÓGICA DE LAS PÁGINAS DE AMBIENTE
 * ==========================================================================
 * Renderiza dinámicamente las Product Cards de las páginas de ambiente
 * a partir del atributo `data-ambiente` del contenedor o del parámetro
 * `?ambiente=` de la URL (soporte de `categoria.html`).
 * ==========================================================================
 */

import { productosPorAmbiente } from './productos.js';
import { crearProductCard, vincularAccionesProductos } from './product-card.js';
import { initProductGalleryHover } from './main.js';

const METADATA = {
  living: { titulo: 'Living', descripcion: 'Sofás, sillones y mesas de centro para tu sala de estar.' },
  comedor: { titulo: 'Comedor', descripcion: 'Mesas, sillas y aparadores para el corazón del hogar.' },
  cocina: { titulo: 'Cocina', descripcion: 'Muebles funcionales y estéticos para tu cocina.' },
  dormitorio: { titulo: 'Dormitorio', descripcion: 'Camas, cómodas y placards para tu descanso.' },
  oficina: { titulo: 'Oficina', descripcion: 'Escritorios y bibliotecas para tu espacio de trabajo.' }
};

function initProductosPage() {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor) return;

  // 1. Ambiente: prioridad al parámetro ?ambiente= de la URL, luego data-ambiente
  const urlParams = new URLSearchParams(window.location.search);
  const ambiente = urlParams.get('ambiente') || contenedor.getAttribute('data-ambiente');

  if (!ambiente || !METADATA[ambiente]) {
    contenedor.innerHTML = '<p class="loading-products">Categoría no encontrada.</p>';
    return;
  }

  // 2. Actualizamos metadatos de la página (breadcrumb, título y descripción)
  const meta = METADATA[ambiente];
  const breadcrumb = document.getElementById('breadcrumb-current');
  const title = document.getElementById('category-title');
  const desc = document.getElementById('category-desc');

  if (breadcrumb) breadcrumb.textContent = meta.titulo;
  if (title) title.textContent = meta.titulo.toUpperCase();
  if (desc) desc.textContent = meta.descripcion;

  document.title = `Colección ${meta.titulo} | Mueblería Jota`;

  // 3. Obtenemos los productos correspondientes
  const productos = productosPorAmbiente(ambiente);

  // 4. Mostramos estado de carga
  contenedor.innerHTML = '<p class="loading-products">Cargando productos...</p>';

  // 5. Renderizamos las tarjetas dinámicamente
  setTimeout(() => {
    contenedor.innerHTML = '';

    if (productos.length === 0) {
      contenedor.innerHTML = '<p class="loading-products">Categoría no encontrada.</p>';
      return;
    }

    productos.forEach((producto) => {
      contenedor.appendChild(crearProductCard(producto));
    });

    // 6. Vinculamos los eventos
    vincularAccionesProductos(contenedor);
    initProductGalleryHover();
  }, 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductosPage);
} else {
  initProductosPage();
}