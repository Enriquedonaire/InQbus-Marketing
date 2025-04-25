"use client"

import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Features from "@/components/features"
import PricingFixed from "@/components/pricing-fixed" // Use the fixed version
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import ContactForm from "@/components/contact-form"
import { useTheme } from "@/components/theme-provider"
import { SimpleErrorBoundary } from "@/components/simple-error-boundary" // Updated import
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import BackToTop from "@/components/back-to-top"
import FreeAudit from "@/components/free-audit"
import CaseStudies from "@/components/case-studies"
// Importar el componente de viñeta
import VignetteOverlay from "@/components/vignette-overlay"
// Cambiar la importación del efecto de luz
// Por esta nueva importación:
import SubtleLightEffect from "@/components/subtle-light-effect"

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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
            <PricingFixed />
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
