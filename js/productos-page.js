/**
 * ==========================================================================
 * MUEBLERÍA JOTA - LÓGICA DE LAS PÁGINAS DE AMBIENTE
 * ==========================================================================
 * Renderiza dinámicamente las Product Cards de las páginas de ambiente
 * (Living, Comedor, Cocina, Oficina y Dormitorio) a partir del array
 * `PRODUCTOS` definido en `js/productos.js`.
 *
 * Cada página de ambiente contiene solamente un contenedor vacío:
 *
 *   <div class="products-grid" id="productos-container" data-ambiente="living">
 *     <p class="loading-products">Cargando productos...</p>
 *   </div>
 *
 * Este archivo:
 *   1. Lee el ambiente desde el atributo `data-ambiente`.
 *   2. Filtra los productos que pertenecen a ese ambiente.
 *   3. Simula una carga asíncrona (setTimeout).
 *   4. Renderiza las cards mediante DOM (crearProductCard de js/product-card.js).
 *   5. Vincula los eventos de "Ver más" y "Añadir al carrito".
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('productos-container');
  if (!contenedor) return;

  const ambiente = contenedor.getAttribute('data-ambiente');
  if (!ambiente) return;

  // Obtenemos los productos del ambiente (provenientes de js/productos.js)
  const productos = productosPorAmbiente(ambiente);

  // Mostramos el estado inicial "Cargando productos..."
  contenedor.innerHTML = '<p class="loading-products">Cargando productos...</p>';

  // Carga asíncrona con espera breve (setTimeout) para simular petición
  setTimeout(() => {
    // Construimos y renderizamos las cards
    contenedor.innerHTML = '';
    productos.forEach((producto) => {
      contenedor.appendChild(crearProductCard(producto));
    });

    // Vinculamos los eventos de cada card recién creada
    vincularAccionesProductos(contenedor);
  }, 600);
});
