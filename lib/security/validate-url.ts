/**
 * Lista de dominios permitidos para solicitudes externas
 */
const ALLOWED_DOMAINS = [
  "api.inqubus.com",
  "cdn.inqubus.com",
  "analytics.inqubus.com",
  "vercel.app",
  "vercel-insights.com",
]

/**
 * Verifica si una URL es segura para realizar solicitudes
 * @param url URL a validar
 * @returns true si la URL es segura, false en caso contrario
 */
export function isUrlSafe(url: string): boolean {
  try {
    const parsedUrl = new URL(url)

    // Verificar si el dominio está en la lista de permitidos
    return ALLOWED_DOMAINS.some((domain) => parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`))
  } catch (error) {
    return false
  }
}

/**
 * Realiza una solicitud HTTP segura verificando la URL
 * @param url URL a la que se realizará la solicitud
 * @param options Opciones de fetch
 * @returns Respuesta de la solicitud o error si la URL no es segura
 */
export async function safeFetch(url: string, options?: RequestInit): Promise<Response> {
  if (!isUrlSafe(url)) {
    throw new Error("URL no permitida por razones de seguridad")
  }

  return fetch(url, options)
}

/**
 * Valida una URL y devuelve una URL segura o la URL por defecto
 * @param url URL a validar
 * @param defaultUrl URL por defecto si la validación falla
 * @returns URL validada o URL por defecto
 */
export function validateUrl(url: string, defaultUrl: string): string {
  try {
    const parsedUrl = new URL(url)

    // Verificar protocolos permitidos
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return defaultUrl
    }

    // Si la URL es segura, devolverla
    if (isUrlSafe(url)) {
      return url
    }

    return defaultUrl
  } catch (error) {
    return defaultUrl
  }
}
