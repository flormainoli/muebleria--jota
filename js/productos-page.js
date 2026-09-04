/**
 * ==========================================================================
 * MUEBLERÍA JOTA - LÓGICA DE LAS PÁGINAS DE AMBIENTE
 * ==========================================================================
 * Renderiza dinámicamente las Product Cards de las páginas de ambiente
 * a partir del atributo `data-ambiente` del contenedor en el HTML.
 * ==========================================================================
 */

import { productosPorAmbiente } from './productos.js';
import { crearProductCard, vincularAccionesProductos } from './product-card.js';

function initProductosPage() {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor) return;

  // 1. Leemos el ambiente directamente del atributo data-ambiente en el HTML
  const ambiente = contenedor.getAttribute('data-ambiente');
  if (!ambiente) return;

  // 2. Obtenemos los productos correspondientes
  const productos = productosPorAmbiente(ambiente);

  // 3. Mostramos estado de carga
  contenedor.innerHTML = '<p class="loading-products">Cargando productos...</p>';

  // 4. Renderizamos las tarjetas dinámicamente
  setTimeout(() => {
    contenedor.innerHTML = '';
    
    if (productos.length === 0) {
      contenedor.innerHTML = '<p class="loading-products">Categoría no encontrada.</p>';
      return;
    }

    productos.forEach((producto) => {
      contenedor.appendChild(crearProductCard(producto));
    });

    // 5. Vinculamos los eventos
    vincularAccionesProductos(contenedor);
  }, 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductosPage);
} else {
  initProductosPage();
}