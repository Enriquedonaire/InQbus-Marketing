"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/context/auth-context"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Menu, X, User, LogOut, Shield } from "lucide-react"

export function AuthNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { user, signOut, isAdmin } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/get-started", label: "Comenzar" },
    { href: "/contact", label: "Contacto" },
  ]

  // Agregar enlace de admin si el usuario es admin
  if (isAdmin) {
    navLinks.push({ href: "/admin", label: "Panel Admin" })
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <img src="/inqubus-logo.png" alt="InQbus" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-400 ${
                  pathname === link.href ? "text-blue-400" : "text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              <ThemeSwitcher />

              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-300 hidden lg:block">
                    <span className="opacity-70 mr-1">Conectado como:</span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={signOut} className="text-gray-300 hover:text-white">
                    <LogOut className="h-4 w-4 mr-1" />
                    <span>Salir</span>
                  </Button>
                </div>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">
                    <User className="h-4 w-4 mr-1" />
                    <span>Acceder</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeSwitcher />
            <button onClick={toggleMenu} className="text-gray-200 hover:text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block py-2 text-sm font-medium transition-colors hover:text-blue-400 ${
                  pathname === link.href ? "text-blue-400" : "text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <div className="text-sm text-gray-300">
                  <span className="opacity-70 mr-1">Conectado como:</span>
                  <span className="font-medium">{user.username}</span>
                  {isAdmin && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    signOut()
                    closeMenu()
                  }}
                  className="w-full justify-start text-gray-300 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Cerrar sesión</span>
                </Button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-800">
                <Button asChild variant="ghost" size="sm" className="w-full justify-start">
                  <Link href="/login" onClick={closeMenu}>
                    <User className="h-4 w-4 mr-2" />
                    <span>Acceder</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
