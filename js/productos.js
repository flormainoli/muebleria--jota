/**
 * ==========================================================================
 * MUEBLERÍA JOTA - ARRAY DE PRODUCTOS
 * ==========================================================================
 * Fuente única de datos de todos los productos del proyecto.
 * Cada objeto contiene la información necesaria para renderizar tanto las
 * Product Cards como la página de detalle de producto.
 *
 * Este archivo NO contiene lógica de renderizado: solo los datos.
 * Las páginas de ambiente filtran por la propiedad `ambiente`.
 * ==========================================================================
 */

// Array global de productos (accesible desde otros archivos .js)
export const PRODUCTOS = [
  /* ========================================================================
     AMBIENTE: LIVING
     ======================================================================== */
  {
    id: 'rack-andes',
    destacado: true,
    nombre: 'Rack Andes',
    precio: 450000,
    ambiente: 'living',
    tipo: 'Rack de TV',
    descripcion: 'Rack de TV de líneas depuradas con puertas listonadas de nogal, pensado para organizar el living con elegancia y calidez.',
    imagenes: [
      "assets/images/rack-andes-1.jpg",
      "assets/images/rack-andes-2.jpg",
    ],
    material: 'Nogal con puertas listonadas',
    color: 'Nogal oscuro',
    dimensiones: 'Al 520 mm · An 1800 mm · Pr 400 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 14
  },
  {
    id: 'sofa-tierra',
    nombre: 'Sofá Tierra',
    precio: 1250000,
    ambiente: 'living',
    tipo: 'Sofá modular',
    descripcion: 'Sofá modular tapizado en bouclé natural con estructura maciza, combina confort envolvente y una estética contemporánea de autor.',
    imagenes: [
      "assets/images/sofa-tierra-1.jpg",
      "assets/images/sofa-tierra-2.jpg",
      "assets/images/sofa-tierra-3.jpg",
    ],
    material: 'Bouclé natural y estructura maciza',
    color: 'Crema / Marron oscuro/ Verde Militar',
    dimensiones: 'Al 780 mm · An 2200 mm · Pr 950 mm',
    fabricacion: 'Argentina',
    calificacion: 4.9,
    reseñas: 21
  },
  {
    id: 'biblioteca-vora',
    nombre: 'Biblioteca Vora',
    precio: 680000,
    ambiente: 'living',
    tipo: 'Biblioteca',
    descripcion: 'Biblioteca asimétrica de estantes irregulares en fresno claro, una pieza escultural que ordena y da carácter al ambiente.',
    imagenes: ["assets/images/bibloteca-vora.jpeg", "assets/images/bibloteca-vora-2.jpg"],
    material: 'Fresno claro y estantes asimétricos',
    color: 'Fresno claro/ Negro Opaco',
    dimensiones: 'Al 2000 mm · An 1400 mm · Pr 360 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 9
  },
  {
    id: 'aparador-ko',
    nombre: 'Aparador Kō',
    precio: 520000,
    ambiente: 'living',
    tipo: 'Aparador',
    descripcion: 'Aparador de roble oscuro con puertas en esterilla, aporta textura y orden al living con un aire delicado y sofisticado.',
    imagenes: ["assets/images/aparador-ko.jpg", "assets/images/aparador-ko-2.jpg"],
    material: 'Roble oscuro y puertas en esterilla',
    color: 'Roble oscuro/ Blanco Opaco',
    dimensiones: 'Al 760 mm · An 1600 mm · Pr 420 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 11
  },

  /* ========================================================================
     AMBIENTE: COMEDOR
     ======================================================================== */
  {
    id: 'mesa-antigravity',
    destacado: true,
    nombre: 'Mesa Antigravity',
    precio: 2450000,
    ambiente: 'comedor',
    tipo: 'Mesa de comedor',
    descripcion: 'Mesa de comedor en nogal macizo para 8 a 10 comensales, protagonista indiscutida de reuniones memorables.',
    imagenes: ["assets/images/mesa-antigravity.jpg", "assets/images/mesa-antigravity-2.jpg"],
    material: 'Nogal macizo',
    color: 'Nogal oscuro',
    dimensiones: 'Al 750 mm · An 2400 mm · Pr 1100 mm',
    fabricacion: 'Argentina',
    calificacion: 4.9,
    reseñas: 32
  },
  {
    id: 'sillas-atrois',
    nombre: 'Sillas Atrois (Set 2)',
    precio: 890000,
    ambiente: 'comedor',
    tipo: 'Sillas',
    descripcion: 'Set de dos sillas con estructura en nogal y asiento de lino crema, diseño atemporal que complementa cualquier mesa.',
    imagenes: ["assets/images/silla-atrois-3.jpg", "assets/images/sillas-atrois.jpg", "assets/images/sillas-atrois.png"],
    material: 'Estructura en nogal y lino crema',
    color: 'Nogal / Crema',
    dimensiones: 'Al 850 mm · An 460 mm · Pr 520 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 18
  },
  {
    id: 'cava-sommelier',
    nombre: 'Cava Sommelier',
    precio: 3200000,
    ambiente: 'comedor',
    tipo: 'Cava',
    descripcion: 'Cava de vinos en roble oscuro con detalles en bronce, un mueble de autor para los amantes del vino y el diseño.',
    imagenes: ["assets/images/cava-sommelier.jpg", "assets/images/cava-sommelier-2.jpeg"],
    material: 'Roble oscuro y detalles en bronce',
    color: 'Roble oscuro / Bronce',
    dimensiones: 'Al 950 mm · An 1200 mm · Pr 450 mm',
    fabricacion: 'Argentina',
    calificacion: 5.0,
    reseñas: 7
  },
  {
    id: 'aparador-litoral',
    nombre: 'Aparador Litoral',
    precio: 1850000,
    ambiente: 'comedor',
    tipo: 'Aparador',
    descripcion: 'Aparador de fresno cálido con puertas invisibles, elegancia sutil y gran capacidad de guardado para el comedor.',
    imagenes: ["assets/images/aparador-litoral.jpg", "assets/images/aparador-litoral-2.jpg"],
    material: 'Fresno cálido con puertas invisibles',
    color: 'Fresno cálido/ Fresno cálido con bordes negros',
    dimensiones: 'Al 820 mm · An 1900 mm · Pr 450 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 12
  },

  /* ========================================================================
     AMBIENTE: COCINA
     ======================================================================== */
  {
    id: 'alacena-suspendida',
    nombre: 'Alacena Suspendida',
    precio: 210000,
    ambiente: 'cocina',
    tipo: 'Alacena',
    descripcion: 'Alacena de pared en roble claro con puertas de vidrio esmerilado, funcional y luminosa para organizar la cocina.',
    imagenes: ["assets/images/alacena-suspendida.jpg", "assets/images/alacena-suspendida-2.jpg"],
    material: 'Roble claro y vidrio esmerilado',
    color: 'Roble claro',
    dimensiones: 'Al 900 mm · An 1200 mm · Pr 320 mm',
    fabricacion: 'Argentina',
    calificacion: 4.5,
    reseñas: 8
  },
  {
    id: 'barra-de-encuentro',
    nombre: 'Barra de Encuentro',
    precio: 385000,
    ambiente: 'cocina',
    tipo: 'Barra',
    descripcion: 'Barra con tapa maciza y banquetas integradas, perfecta para el desayuno y las reuniones informales en la cocina.',
    imagenes: ["assets/images/barra-encuentro.jpg", "assets/images/barra-encuentro-2.jpg"],
    material: 'Tapa maciza y banquetas integradas',
    color: 'Nogal / Natural',
    dimensiones: 'Al 900 mm · An 1600 mm · Pr 600 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 10
  },
  {
    id: 'cajonera-sabana',
    nombre: 'Cajonera Sábana',
    precio: 520000,
    ambiente: 'cocina',
    tipo: 'Cajonera de cocina',
    descripcion: 'Módulo base para cocina con cajoneras de cierre suave y mesada de mármol, máximo aprovechamiento del espacio.',
    imagenes: [
      "assets/images/cajonera-sabana.jpg", "assets/images/cajonera-sabana-2.jpg"
    ],
    material: 'Cajoneras cierre suave y mármol',
    color: 'Roble / Mármol',
    dimensiones: 'Al 860 mm · An 1800 mm · Pr 600 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 15
  },
  {
    id: 'isla-gourmet',
    destacado: true,
    nombre: 'Isla Gourmet',
    precio: 920000,
    ambiente: 'cocina',
    tipo: 'Isla de cocina',
    descripcion: 'Isla central en nogal macizo con espacio desayunador, el corazón funcional y estético de la cocina moderna.',
    imagenes: ["assets/images/isla-gourmet.jpg", "assets/images/isla-gourmet-2.jpg"],
    material: 'Nogal macizo con espacio desayunador',
    color: 'Nogal oscuro',
    dimensiones: 'Al 900 mm · An 2200 mm · Pr 1100 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 19
  },

  /* ========================================================================
     AMBIENTE: DORMITORIO
     ======================================================================== */
  {
    id: 'cama-serena',
    destacado: true,
    nombre: 'Cama Serena',
    precio: 780000,
    ambiente: 'dormitorio',
    tipo: 'Cama',
    descripcion: 'Cama baja en nogal con cabecero tapizado en lino puro, serenidad y confort para el descanso.',
    imagenes: ["assets/images/cama-serena.jpg", "assets/images/cama-serena-2.jpg"],
    material: 'Nogal y respaldo tapizado en lino puro',
    color: 'Nogal / Lino',
    dimensiones: 'Al 800 mm · An 1600 mm · Pr 2000 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 16
  },
  {
    id: 'mesa-de-luz',
    nombre: 'Mesa de Luz',
    precio: 260000,
    ambiente: 'dormitorio',
    tipo: 'Mesa de luz',
    descripcion: 'Set de dos mesas de luz flotantes en roble claro con cajón oculto, minimalismo funcional para el dormitorio.',
    imagenes: [
      "assets/images/mesa-luz.webp", "assets/images/mesa-luz-2.jpg",],
    material: 'Roble claro con cajón oculto',
    color: 'Roble claro/ Blanco',
    dimensiones: 'Al 450 mm · An 420 mm · Pr 350 mm (c/u)',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 13
  },
  {
    id: 'banco-trenza',
    nombre: 'Banco Trenza',
    precio: 180000,
    ambiente: 'dormitorio',
    tipo: 'Banco',
    descripcion: 'Banco al pie de cama en cuero vacuno trenzado y petiribí, textura y calidez artesanal.',
    imagenes: ["assets/images/banco-trenza.jpg", "assets/images/banco-trenza-2.jpg"],
    material: 'Cuero vacuno trenzado y petiribí',
    color: 'Cuero / Petiribí',
    dimensiones: 'Al 450 mm · An 1200 mm · Pr 400 mm',
    fabricacion: 'Argentina',
    calificacion: 4.5,
    reseñas: 6
  },
  {
    id: 'cama-katie',
    nombre: 'Cama Katie',
    precio: 590000,
    ambiente: 'dormitorio',
    tipo: 'Cama',
    descripcion: 'Cama individual desplegale, ideal para optimizar espacios.',
    imagenes: ["assets/images/cama-katie.jpg", "assets/images/cama-katie-2.jpg"],
    material: 'Madera maciza',
    color: 'Nogal grisaseo',
    dimensiones: 'Al 880 mm · An 1600 mm · Pr 500 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 14
  },

  /* ========================================================================
     AMBIENTE: OFICINA
     ======================================================================== */
  {
    id: 'escritorio-pro',
    nombre: 'Escritorio PRO',
    precio: 650000,
    ambiente: 'oficina',
    tipo: 'Escritorio',
    descripcion: 'Escritorio ejecutivo en nogal macizo con pasacables oculto, diseño ergonómico para trabajar con estilo.',
    imagenes: ["assets/images/escritorio pro.jpg", "assets/images/escritorio pro 2.jpg", "assets/images/escritorio pro 3.jpeg"],
    material: 'Nogal macizo con pasacables oculto',
    color: 'Nogal oscuro/ Negro',
    dimensiones: 'Al 750 mm · An 1600 mm · Pr 800 mm',
    fabricacion: 'Argentina',
    calificacion: 4.7,
    reseñas: 20
  },
  {
    id: 'estanteria-vertice',
    nombre: 'Estantería Vértice',
    precio: 420000,
    ambiente: 'oficina',
    tipo: 'Estantería',
    descripcion: 'Estantería de estructura metálica y estantes de fresno, geometría moderna para archivo y exhibición.',
    imagenes: ["assets/images/estanteria-vertice-1.jpg", "assets/images/estanteria-vertice-2.jpg"],
    material: 'Estructura metálica y estantes de fresno',
    color: 'Negro y Fresno/ Blanco',
    dimensiones: 'Al 2000 mm · An 900 mm · Pr 350 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 9
  },
  {
    id: 'silla-ejecutiva-cuero',
    nombre: 'Silla Ejecutiva Cuero',
    precio: 340000,
    ambiente: 'oficina',
    tipo: 'Silla de oficina',
    descripcion: 'Silla de oficina artesanal en cuero vacuno genuino y base de nogal, confort premium para la jornada laboral.',
    imagenes: ["assets/images/silla-de-cuero.jpg", "assets/images/silla-de-cuero-2.jpeg"],
    material: 'Cuero vacuno genuino y base de nogal',
    color: 'Cuero tostado y Nogal /Cuero crema y Nogal',
    dimensiones: 'Al 1100 mm · An 640 mm · Pr 640 mm',
    fabricacion: 'Argentina',
    calificacion: 4.8,
    reseñas: 17
  },
  {
    id: 'cajonera-rodante',
    nombre: 'Cajonera Rodante',
    precio: 190000,
    ambiente: 'oficina',
    tipo: 'Cajonera',
    descripcion: 'Cajonera rodante de madera maciza con ruedas embutidas silenciosas, practicidad y orden al alcance de la mano.',
    imagenes: ["assets/images/cajonera-rodante.webp", "assets/images/cajonera-rodante-2.jpeg"],
    material: 'Nogal con ruedas embutidas silenciosas',
    color: 'Nogal y Blanco/ Negro y Blanco',
    dimensiones: 'Al 620 mm · An 420 mm · Pr 520 mm',
    fabricacion: 'Argentina',
    calificacion: 4.6,
    reseñas: 12
  }
];

/**
 * Devuelve los productos de un ambiente determinado (minúsculas).
 * @param {string} ambiente - 'living', 'comedor', 'cocina', 'oficina' o 'dormitorio'
 * @returns {Array} productos que coinciden con el ambiente
 */
export function productosPorAmbiente(ambiente) {
  return PRODUCTOS.filter((producto) => producto.ambiente === ambiente);
}

/**
 * Busca un producto por su id.
 * @param {string} id - Identificador único del producto
 * @returns {Object|undefined} el producto encontrado o undefined
 */
export function productoPorId(id) {
  return PRODUCTOS.find((producto) => producto.id === id);
}

/**
 * Formatea un número a precio en pesos argentinos.
 * @param {number} numero - Ej: 450000
 * @returns {string} Ej: "$450.000"
 */
export function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-AR');
}
