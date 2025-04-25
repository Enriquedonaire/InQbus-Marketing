import { type NextRequest, NextResponse } from "next/server"
import { nanoid } from "nanoid"

export function middleware(request: NextRequest) {
  // Generar un nonce único para cada solicitud
  const nonce = nanoid(16)

  // Construir una política CSP con el nonce dinámico
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `

  // Limpiar el header CSP (eliminar espacios en blanco y saltos de línea)
  const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, " ").trim()

  // Configurar los headers de la solicitud
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)
  requestHeaders.set("Content-Security-Policy", contentSecurityPolicyHeaderValue)

  // Configurar los headers de la respuesta
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set("Content-Security-Policy", contentSecurityPolicyHeaderValue)

  // Añadir otros headers de seguridad
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  return response
}

// Configurar el matcher para aplicar el middleware solo a rutas específicas
export const config = {
  matcher: [
    /*
     * Aplicar a todas las rutas excepto:
     * - API routes
     * - Archivos estáticos (_next/static)
     * - Imágenes optimizadas (_next/image)
     * - Favicon
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
