/**
 * Parsea un string de precio en formato argentino (ej: "$1.250.000") a número entero.
 * @param {string|number} value
 * @returns {number}
 */
export function parsePrice(value) {
  if (!value) return 0;
  const text = String(value)
    .replace(/[$\s]/g, '')   // quitar $ y espacios
    .replace(/\./g, '')       // quitar separadores de miles
    .replace(',', '.');        // normalizar decimal si existe
  return Number.parseInt(text, 10) || 0;
}
