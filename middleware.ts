import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Verificar si el usuario está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ["/login", "/api"]
  const isPublicRoute = publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  // Ruta de admin que requiere rol específico
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  // Si no hay sesión y no es una ruta pública, redirigir al login
  if (!session && !isPublicRoute) {
    const redirectUrl = new URL("/login", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Si hay sesión pero intenta acceder a login, redirigir a home
  if (session && req.nextUrl.pathname === "/login") {
    const redirectUrl = new URL("/", req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Si intenta acceder a rutas de admin sin ser admin, redirigir a home
  if (isAdminRoute) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("role")
      .eq("user_id", session?.user.id)
      .single()

    if (!profile || profile.role !== "admin") {
      const redirectUrl = new URL("/", req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
