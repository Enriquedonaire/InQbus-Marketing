"use client"

import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import Services from "@/components/services"
import Features from "@/components/features"
import PricingFixed from "@/components/pricing-fixed" // Use the fixed version
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import ContactForm from "@/components/contact-form"
import { useTheme } from "@/components/theme-provider"
import { SimpleErrorBoundary } from "@/components/simple-error-boundary" // Updated import

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

      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor={isDark ? "#FFFFFF" : "#1E293B"}
          mouseForce={20}
          particleSpeed={0.3}
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
