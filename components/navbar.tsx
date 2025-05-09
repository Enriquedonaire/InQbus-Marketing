"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import type React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useTheme } from "@/components/theme-provider"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [welcomeUser, setWelcomeUser] = useState("")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isHomePage = pathname === "/"
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Check for auth in URL parameters
  useEffect(() => {
    const authParam = searchParams.get("auth")
    const userParam = searchParams.get("user")
    const roleParam = searchParams.get("role")

    if (authParam === "true" && userParam) {
      // Store user info in localStorage
      const userData = {
        username: userParam,
        role: roleParam || "user",
      }
      localStorage.setItem("inqubus_auth", JSON.stringify(userData))

      // Set authentication state
      setIsAuthenticated(true)
      setIsAdmin(roleParam === "admin")

      // Show welcome message
      setWelcomeUser(userParam)
      setShowWelcome(true)

      // Hide welcome message after 3 seconds
      setTimeout(() => {
        setShowWelcome(false)
      }, 3000)

      // Clean URL parameters
      const url = new URL(window.location.href)
      url.searchParams.delete("auth")
      url.searchParams.delete("user")
      url.searchParams.delete("role")
      window.history.replaceState({}, "", url.toString())
    }
  }, [searchParams])

  // Check localStorage for user on load
  useEffect(() => {
    const storedUser = localStorage.getItem("inqubus_auth")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setIsAuthenticated(true)
        setIsAdmin(userData.role === "admin")
      } catch (error) {
        console.error("Error parsing stored user:", error)
      }
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("inqubus_auth")
    document.cookie = "inqubus_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    setIsAuthenticated(false)
    setIsAdmin(false)
    window.location.href = "/"
  }

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)

    if (isHomePage) {
      const element = document.getElementById(sectionId)
      if (element) {
        const navbarHeight = 76 // Approximate navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    } else {
      // If not on homepage, navigate to homepage with hash
      window.location.href = `/#${sectionId}`
    }
  }

  // Update active section based on scroll position and handle navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled for navbar transparency
      setScrolled(window.scrollY > 50)

      if (isHomePage) {
        const sections = ["home", "services", "features", "pricing"]
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            return rect.top <= 100 && rect.bottom >= 100
          }
          return false
        })

        if (currentSection) {
          setActiveSection(currentSection)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const navbarBgClass = isDark
    ? scrolled
      ? "bg-black/30 backdrop-blur-md border-b border-white/20"
      : "bg-black/80 backdrop-blur-md border-b border-white/10"
    : scrolled
      ? "bg-white/30 backdrop-blur-md border-b border-black/10"
      : "bg-white/80 backdrop-blur-md border-b border-black/5"

  const textColorClass = isDark ? "text-white" : "text-blue-900"

  return (
    <>
      {/* Welcome notification */}
      {showWelcome && (
        <div className="fixed top-20 right-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>Bienvenido, {welcomeUser}!</p>
        </div>
      )}

      <nav
        className={`flex items-center justify-between px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBgClass}`}
      >
        <Link href="/" className="flex items-center space-x-2">
          <div className={`text-2xl font-bold ${textColorClass}`}>
            In<span className="text-blue-500">Q</span>bus
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#home" active={activeSection === "home"} onClick={() => scrollToSection("home")}>
            Home
          </NavLink>
          <NavLink href="#services" active={activeSection === "services"} onClick={() => scrollToSection("services")}>
            Servicios
          </NavLink>
          <NavLink href="#features" active={activeSection === "features"} onClick={() => scrollToSection("features")}>
            Por Qué Nosotros
          </NavLink>
          <NavLink href="#pricing" active={activeSection === "pricing"} onClick={() => scrollToSection("pricing")}>
            Paquetes
          </NavLink>

          {/* Admin links - only show for admin users */}
          {isAdmin && (
            <>
              <NavLink href="/admin" active={pathname === "/admin"} onClick={() => (window.location.href = "/admin")}>
                Admin
              </NavLink>
              <NavLink
                href="/dashboard"
                active={pathname.startsWith("/dashboard")}
                onClick={() => (window.location.href = "/dashboard")}
              >
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeSwitcher />
          <Link href="/contact">
            <Button
              variant="ghost"
              className={`${isDark ? "text-white border border-blue-950 hover:text-blue-400" : "text-blue-900 border border-blue-200 hover:text-blue-600"} hover:scale-110`}
            >
              Contacto
            </Button>
          </Link>
          <Link href="/get-started">
            <Button variant="glow">Comenzar</Button>
          </Link>

          {isAuthenticated ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`${isDark ? "text-white border border-blue-950 hover:text-blue-400" : "text-blue-900 border border-blue-200 hover:text-blue-600"} hover:scale-110`}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className={`${isDark ? "text-white border border-blue-950 hover:text-blue-400" : "text-blue-900 border border-blue-200 hover:text-blue-600"} hover:scale-110`}
              >
                Iniciar sesión
              </Button>
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className={isDark ? "text-white" : "text-blue-900"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 right-0 ${
              isDark
                ? "bg-black/90 backdrop-blur-md border-b border-white/10"
                : "bg-white/90 backdrop-blur-md border-b border-black/10"
            } p-6 flex flex-col space-y-4 md:hidden z-50`}
          >
            <NavLink href="#home" active={activeSection === "home"} onClick={() => scrollToSection("home")}>
              Home
            </NavLink>
            <NavLink href="#services" active={activeSection === "services"} onClick={() => scrollToSection("services")}>
              Servicios
            </NavLink>
            <NavLink href="#features" active={activeSection === "features"} onClick={() => scrollToSection("features")}>
              Por Qué Nosotros
            </NavLink>
            <NavLink href="#pricing" active={activeSection === "pricing"} onClick={() => scrollToSection("pricing")}>
              Paquetes
            </NavLink>

            {/* Admin links - only show for admin users */}
            {isAdmin && (
              <>
                <NavLink href="/admin" active={pathname === "/admin"} onClick={() => (window.location.href = "/admin")}>
                  Admin
                </NavLink>
                <NavLink
                  href="/dashboard"
                  active={pathname.startsWith("/dashboard")}
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Dashboard
                </NavLink>
              </>
            )}

            <div className="pt-4 flex flex-col space-y-2">
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className={`justify-start ${
                    isDark
                      ? "text-white border-1 border-blue-950 hover:text-blue-400"
                      : "text-blue-900 border-1 border-blue-200 hover:text-blue-600"
                  }`}
                >
                  Contacto
                </Button>
              </Link>
              <Link href="/get-started">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Comenzar</Button>
              </Link>

              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={`justify-start ${
                    isDark
                      ? "text-white border-1 border-blue-950 hover:text-blue-400"
                      : "text-blue-900 border-1 border-blue-200 hover:text-blue-600"
                  }`}
                >
                  Cerrar sesión
                </Button>
              ) : (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      isDark
                        ? "text-white border-1 border-blue-950 hover:text-blue-400"
                        : "text-blue-900 border-1 border-blue-200 hover:text-blue-600"
                    }`}
                  >
                    Iniciar sesión
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </>
  )
}

function NavLink({
  href,
  children,
  active = false,
  onClick,
}: {
  href: string
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const textColorClass = isDark
    ? `text-gray-300 hover:text-white ${active ? "text-white" : ""}`
    : `text-gray-600 hover:text-blue-900 ${active ? "text-blue-900" : ""}`

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick && onClick()
      }}
      className={`${textColorClass} transition-colors relative group`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${active ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </a>
  )
}
