import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Obtener la ruta solicitada
  const path = request.nextUrl.pathname

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = path.startsWith("/admin") || path.startsWith("/dashboard")

  if (isProtectedRoute) {
    // Obtener la cookie de autenticación
    const authCookie = request.cookies.get("inqubus_auth")?.value
    const authData = localStorage.getItem("inqubus_auth")

    // Verificar autenticación en localStorage o cookies
    let isAuthenticated = false
    let isAdmin = false

    if (authCookie) {
      try {
        const userData = JSON.parse(authCookie)
        isAuthenticated = true
        isAdmin = userData.role === "admin"
      } catch (error) {
        console.error("Error parsing auth cookie:", error)
      }
    } else if (authData) {
      try {
        const userData = JSON.parse(authData)
        isAuthenticated = true
        isAdmin = userData.role === "admin"
      } catch (error) {
        console.error("Error parsing auth data:", error)
      }
    }

    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", path)
      return NextResponse.redirect(loginUrl)
    }

    // Si no es admin, redirigir a la página principal
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
}
