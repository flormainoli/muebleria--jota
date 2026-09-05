/**
 * ==========================================================================
 * MUEBLERÍA JOTA - LÓGICA DE LAS PÁGINAS DE AMBIENTE
 * ==========================================================================
 * Renderiza dinámicamente las Product Cards de las páginas de ambiente
 * a partir del array `PRODUCTOS` definido en `js/productos.js`.
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

  const urlParams = new URLSearchParams(window.location.search);
  const ambiente = urlParams.get('ambiente') || contenedor.dataset.ambiente;
  
  if (!ambiente || !METADATA[ambiente]) {
    contenedor.innerHTML = '<p class="loading-products">Categoría no encontrada.</p>';
    return;
  }

  const meta = METADATA[ambiente];
  const breadcrumb = document.getElementById('breadcrumb-current');
  const title = document.getElementById('category-title');
  const desc = document.getElementById('category-desc');
  
  if (breadcrumb) breadcrumb.textContent = meta.titulo;
  if (title) title.textContent = meta.titulo.toUpperCase();
  if (desc) desc.textContent = meta.descripcion;
  
  document.title = `Colección ${meta.titulo} | Mueblería Jota`;

  const productos = productosPorAmbiente(ambiente);

  contenedor.innerHTML = '';
  productos.forEach((producto) => {
    contenedor.appendChild(crearProductCard(producto));
  });

  vincularAccionesProductos(contenedor);
  initProductGalleryHover();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductosPage);
} else {
  initProductosPage();
}
