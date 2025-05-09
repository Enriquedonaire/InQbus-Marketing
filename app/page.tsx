"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Features from "@/components/features"
import CaseStudies from "@/components/case-studies"
import FreeAudit from "@/components/free-audit"
import Pricing from "@/components/pricing"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { useTheme } from "@/components/theme-provider"
import { SimpleErrorBoundary } from "@/components/simple-error-boundary"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import BackToTop from "@/components/back-to-top"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import AuthNavbar from "@/components/auth-navbar"

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  useEffect(() => {
    // Procesar parámetros de autenticación de la URL
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const isAuth = params.get("auth")
      const username = params.get("user")
      const role = params.get("role")

      if (isAuth === "true" && username && role) {
        // Guardar información de autenticación en localStorage
        const userData = { username, role }
        try {
          localStorage.setItem("inqubus_auth", JSON.stringify(userData))
          setUser(userData)

          // Limpiar los parámetros de la URL sin recargar la página
          window.history.replaceState({}, document.title, window.location.pathname)
        } catch (e) {
          console.error("Error al guardar en localStorage:", e)
        }
      } else {
        // Intentar obtener información de autenticación de localStorage
        try {
          const authData = localStorage.getItem("inqubus_auth")
          if (authData) {
            setUser(JSON.parse(authData))
          }
        } catch (e) {
          console.error("Error al leer localStorage:", e)
        }
      }
    }
  }, [])

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-black/[0.96] bg-grid-white/[0.02]" : "bg-gray-50 bg-grid-black/[0.02]"
      } antialiased relative overflow-hidden transition-colors duration-300`}
    >
      {/* Ambient background with layered particles - z-index más bajo (0) */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-home"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          particleColor={isDark ? "#ffffff" : "#1e293b"}
          linkColor={isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(30, 41, 59, 0.5)"}
          starsCount={200}
          starsColor={isDark ? "#ffffff" : "#1e293b"}
        />
      </div>

      {/* Mouse move effect - z-index bajo (3) */}
      <div className="z-3 relative">
        <MouseMoveEffect />
      </div>

      {/* Subtle light effect - z-index 4 */}
      <SubtleLightEffect />

      {/* Viñeta - z-index medio-bajo (5) */}
      <VignetteOverlay intensity={90} position="top-left" size={80} />

      {/* Contenido principal - z-index alto (20) para estar por encima de la viñeta */}
      <div className="relative z-20">
        {/* Navbar - z-index más alto (50) */}
        <Navbar />

        {/* Barra de autenticación si el usuario está logueado */}
        {user && <AuthNavbar />}

        <div id="home">
          <Hero />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="case-studies">
          <CaseStudies />
        </div>
        <div id="free-audit">
          <FreeAudit />
        </div>
        <div id="pricing">
          <SimpleErrorBoundary>
            <Pricing />
          </SimpleErrorBoundary>
        </div>
        <div id="contact">
          <ContactForm />
        </div>
        <Footer />
      </div>

      {/* Back to top button - z-index alto (30) */}
      <div className="z-30 relative">
        <BackToTop />
      </div>
    </main>
  )
}
