import { PRODUCTOS } from './productos.js';
import { crearProductCard, vincularAccionesProductos } from './product-card.js';

function initHome() {
  const destacadosContainer = document.querySelector('#destacados .products-grid');
  if (!destacadosContainer) return;

  const productosDestacados = PRODUCTOS.filter(p => p.destacado);

  destacadosContainer.innerHTML = '';
  
  productosDestacados.forEach(producto => {
    destacadosContainer.appendChild(crearProductCard(producto));
  });

  vincularAccionesProductos(destacadosContainer);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHome);
} else {
  initHome();
}
