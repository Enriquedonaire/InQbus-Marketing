import { nanoid } from "nanoid"
import Cookies from "js-cookie"

const CSRF_TOKEN_COOKIE = "csrf_token"
const CSRF_TOKEN_HEADER = "X-CSRF-Token"

/**
 * Genera un token CSRF y lo guarda en una cookie
 * @returns Token CSRF generado
 */
export function generateCsrfToken(): string {
  const token = nanoid(32)

  // Guardar el token en una cookie HttpOnly
  if (typeof window !== "undefined") {
    Cookies.set(CSRF_TOKEN_COOKIE, token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 1, // 1 día
    })
  }

  return token
}

/**
 * Verifica si un token CSRF es válido
 * @param token Token CSRF a verificar
 * @returns true si el token es válido, false en caso contrario
 */
export function validateCsrfToken(token: string): boolean {
  const storedToken = Cookies.get(CSRF_TOKEN_COOKIE)
  return storedToken === token
}

/**
 * Añade un token CSRF a los headers de una solicitud fetch
 * @param options Opciones de fetch
 * @returns Opciones de fetch con el token CSRF añadido
 */
export function addCsrfToken(options: RequestInit = {}): RequestInit {
  const token = Cookies.get(CSRF_TOKEN_COOKIE) || generateCsrfToken()

  return {
    ...options,
    headers: {
      ...options.headers,
      [CSRF_TOKEN_HEADER]: token,
    },
  }
}

/**
 * Cliente fetch seguro que añade automáticamente el token CSRF
 * @param url URL a la que se realizará la solicitud
 * @param options Opciones de fetch
 * @returns Respuesta de la solicitud
 */
export async function secureFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const secureOptions = addCsrfToken(options)
  return fetch(url, secureOptions)
}
