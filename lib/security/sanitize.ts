import DOMPurify from "dompurify"

/**
 * Sanitiza una cadena de texto para prevenir ataques XSS
 * @param input Texto a sanitizar
 * @returns Texto sanitizado
 */
export function sanitizeHtml(input: string): string {
  if (typeof window === "undefined") {
    // En el servidor, DOMPurify necesita una implementación de DOM
    const { JSDOM } = require("jsdom")
    const window = new JSDOM("").window
    const purify = DOMPurify(window)
    return purify.sanitize(input, { USE_PROFILES: { html: true } })
  }

  // En el cliente, usamos DOMPurify directamente
  return DOMPurify.sanitize(input, { USE_PROFILES: { html: true } })
}

/**
 * Sanitiza un objeto completo recursivamente
 * @param obj Objeto a sanitizar
 * @returns Objeto sanitizado
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result = { ...obj }

  for (const key in result) {
    if (typeof result[key] === "string") {
      result[key] = sanitizeHtml(result[key])
    } else if (typeof result[key] === "object" && result[key] !== null) {
      result[key] = sanitizeObject(result[key])
    }
  }

  return result
}

/**
 * Sanitiza una URL para prevenir ataques de inyección
 * @param url URL a sanitizar
 * @returns URL sanitizada o null si es inválida
 */
export function sanitizeUrl(url: string): string | null {
  try {
    // Verificar si la URL es válida
    const parsedUrl = new URL(url)

    // Permitir solo protocolos seguros
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return null
    }

    return parsedUrl.toString()
  } catch (error) {
    return null
  }
}
