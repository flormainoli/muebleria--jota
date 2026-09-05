/**
 * ==========================================================================
 * MUEBLERÍA JOTA - BÚSQUEDA DE PRODUCTOS (Lupa de la navegación)
 * ==========================================================================
 * Agrega una pequeña lupa en la barra de navegación que despliega un campo
 * de búsqueda compacto. Al escribir, filtra el array `PRODUCTOS`
 * (js/productos.js) por nombre, ambiente, tipo o material y renderiza los
 * resultados dinámicamente mediante DOM, reutilizando la Product Card
 * existente (js/product-card.js).
 *
 * El header es un Web Component (js/components.js), por lo que la lupa está
 * presente en todas las páginas que lo incluyen.
 * ==========================================================================
 */

import { PRODUCTOS } from './productos.js';
import { crearProductCard, vincularAccionesProductos } from './product-card.js';

customElements.whenDefined('app-header').then(() => {
  const toggle = document.querySelector('.header-search-toggle');
  const panel = document.getElementById('header-search');
  const input = document.getElementById('search-input-header');
  const closeBtn = document.querySelector('.header-search__close');
  const results = document.getElementById('search-results');

  // Si la lupa no está en esta página, salimos sin hacer nada
  if (!toggle || !panel || !input || !closeBtn || !results) return;

  const EMPTY_DEFAULT = 'Escribí para buscar un producto...';

  /**
   * Abre el campo de búsqueda y enfoca el input.
   */
  function openSearch() {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
  }

  /**
   * Cierra el campo de búsqueda.
   */
  function closeSearch() {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  /**
   * Renderiza la lista de productos encontrados reutilizando crearProductCard.
   * @param {Array} lista - Productos coincidentes
   */
  function renderResultados(lista) {
    results.innerHTML = '';

    if (!lista || lista.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'search-results__empty';
      msg.textContent = 'No encontramos productos que coincidan con tu búsqueda.';
      results.appendChild(msg);
      return;
    }

    lista.forEach((producto) => {
      results.appendChild(crearProductCard(producto));
    });

    // Reutilizamos el vínculo de acciones común (Ver más / añadir al carrito)
    vincularAccionesProductos(results);
  }

  /**
   * Normaliza un texto: minúsculas y sin tildes/acentos.
   * Permite que "sofa" encuentre "Sofá", "mesa" encuentre "Mesa", etc.
   * @param {string} texto
   * @returns {string}
   */
  function normalizar(texto) {
    return (texto || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /**
   * Filtra PRODUCTOS por el término (nombre, ambiente, tipo o material),
   * sin distinguir mayúsculas de minúsculas ni tildes.
   * @param {string} termino - Término ya normalizado
   * @returns {Array}
   */
  function buscarProductos(termino) {
    return PRODUCTOS.filter((producto) => {
      const texto = normalizar([
        producto.nombre,
        producto.ambiente,
        producto.tipo,
        producto.material
      ].join(' '));
      return texto.includes(termino);
    });
  }

  // Mostrar / ocultar la búsqueda con el botón de la lupa
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const abierta = panel.classList.contains('is-open');
    if (abierta) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  // Cerrar la búsqueda con el botón "X"
  closeBtn.addEventListener('click', closeSearch);

  // Búsqueda en tiempo real mientras se escribe
  input.addEventListener('input', () => {
    const termino = normalizar(input.value);

    if (!termino) {
      results.innerHTML = '';
      const msg = document.createElement('p');
      msg.className = 'search-results__hint';
      msg.textContent = EMPTY_DEFAULT;
      results.appendChild(msg);
      return;
    }

    renderResultados(buscarProductos(termino));
  });

  // Cerrar con la tecla Escape
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeSearch();
  });

  // Cerrar al hacer clic fuera de la búsqueda
  document.addEventListener('click', (event) => {
    const abierta = panel.classList.contains('is-open');
    if (abierta && !panel.contains(event.target) && !toggle.contains(event.target)) {
      closeSearch();
    }
  });
});