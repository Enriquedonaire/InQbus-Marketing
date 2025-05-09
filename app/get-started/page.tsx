import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import ClientGetStartedWrapper from "@/components/client-get-started-wrapper"

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black/[0.96] bg-grid-black/[0.02] dark:bg-grid-white/[0.02] antialiased relative overflow-hidden transition-colors duration-300">
      {/* Ambient background with layered particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-get-started"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          particleColor="#ffffff"
          linkColor="rgba(255, 255, 255, 0.5)"
          starsCount={150}
          starsColor="#ffffff"
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

        {/* Envolvemos el componente cliente en Suspense */}
        <Suspense
          fallback={
            <div className="container mx-auto px-6 py-20">
              <div className="text-center mb-16">
                <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 max-w-md mx-auto mb-6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl mx-auto animate-pulse"></div>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-6 h-96 animate-pulse"
                    >
                      <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-full mb-6"></div>
                      <div className="space-y-2">
                        {[0, 1, 2, 3, 4].map((j) => (
                          <div key={j} className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-8">
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-6"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-12 bg-blue-500 rounded-md w-full"></div>
                </div>
              </div>
            </div>
          }
        >
          <ClientGetStartedWrapper />
        </Suspense>

        <Footer />
      </div>
    </main>
  )
}
