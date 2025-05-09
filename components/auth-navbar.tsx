"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function AuthNavbar() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Obtener datos de usuario del localStorage
    const authData = localStorage.getItem("inqubus_auth")
    if (authData) {
      setUser(JSON.parse(authData))
    } else {
      // Si no hay datos de autenticación, redirigir al login
      router.push("/login")
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("inqubus_auth")
    router.push("/login")
  }

  if (!user) {
    return null
  }

  return (
    <nav className="bg-black/80 backdrop-blur-sm border-b border-blue-900/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/inqubus-logo.png" alt="InQbus Logo" className="h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/"
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`}
              >
                Inicio
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === "/admin"
                      ? "border-blue-500 text-white"
                      : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                  }`}
                >
                  Panel de Admin
                </Link>
              )}
              <Link
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/contact"
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }`}
              >
                Contacto
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <ThemeSwitcher />
            <div className="text-sm text-gray-300">
              Hola, <span className="font-medium">{user.username}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Cerrar Sesión
            </Button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === "/"
                  ? "bg-blue-900/20 border-blue-500 text-blue-300"
                  : "border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white"
              }`}
            >
              Inicio
            </Link>
            {user.role === "admin" && (
              <Link
                href="/admin"
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === "/admin"
                    ? "bg-blue-900/20 border-blue-500 text-blue-300"
                    : "border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white"
                }`}
              >
                Panel de Admin
              </Link>
            )}
            <Link
              href="/contact"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === "/contact"
                  ? "bg-blue-900/20 border-blue-500 text-blue-300"
                  : "border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white"
              }`}
            >
              Contacto
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-base font-medium text-white">{user.username}</div>
                <div className="text-sm font-medium text-gray-400">
                  {user.role === "admin" ? "Administrador" : "Reclutador"}
                </div>
              </div>
              <div className="ml-auto">
                <ThemeSwitcher />
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
