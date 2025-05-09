"use client"

import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { useTheme } from "@/components/theme-provider"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import GetStartedForm from "@/components/get-started-form"

export default function GetStartedPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-black/[0.96] bg-grid-white/[0.02]" : "bg-gray-50 bg-grid-black/[0.02]"
      } antialiased relative overflow-hidden transition-colors duration-300`}
    >
      {/* Ambient background with layered particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-get-started"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          particleColor={isDark ? "#ffffff" : "#1e293b"}
          linkColor={isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(30, 41, 59, 0.5)"}
          starsCount={150}
          starsColor={isDark ? "#ffffff" : "#1e293b"}
        />
      </div>

      {/* Mouse move effect */}
      <div className="z-3 relative">
        <MouseMoveEffect />
      </div>

      {/* Subtle light effect */}
      <SubtleLightEffect />

      {/* Viñeta */}
      <VignetteOverlay intensity={90} position="top-left" size={80} />

      {/* Contenido principal */}
      <div className="relative z-20">
        {/* Navbar */}
        <Navbar />

        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
              Comienza con <span className="text-blue-500">InQbus</span>
            </h1>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
              Selecciona el paquete que mejor se adapte a tus necesidades y completa el formulario para comenzar tu
              viaje de marketing digital.
            </p>
          </div>

          {/* Envolvemos el formulario en Suspense */}
          <Suspense
            fallback={
              <div className="max-w-4xl mx-auto">
                <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-8">
                  {/* Paquetes */}
                  <div className="mb-8">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-4 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="border border-gray-200 dark:border-white/10 rounded-lg p-4 animate-pulse"
                        >
                          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-4"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4"></div>
                          <div className="h-10 bg-blue-200 dark:bg-blue-900 rounded-md w-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Formulario */}
                  <div className="mt-8">
                    <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-64 mb-6 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20 animate-pulse"></div>
                          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-40 animate-pulse"></div>
                      <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse"></div>
                    </div>
                    <div className="h-12 bg-blue-500 rounded-md w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            }
          >
            <GetStartedForm />
          </Suspense>
        </div>

        <Footer />
      </div>
    </main>
  )
}
