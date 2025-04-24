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

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-black/[0.96] bg-grid-white/[0.02]" : "bg-gray-50 bg-grid-black/[0.02]"
      } antialiased relative overflow-hidden transition-colors duration-300`}
    >
      {/* Mouse move effect */}
      <MouseMoveEffect />

      {/* Ambient background with layered particles */}
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

      <div className="relative z-10">
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
    </main>
  )
}
