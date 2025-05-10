import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientGetStartedWrapper from "@/components/client-get-started-wrapper"
import { Suspense } from "react"
import MouseMoveEffect from "@/components/mouse-move-effect"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-getstarted"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          starsCount={250}
          starsColor="currentColor"
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

      <Navbar />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Comienza con <span className="text-blue-600 dark:text-blue-500">InQbus</span>
        </h1>
        <Suspense fallback={<div className="text-center text-gray-700 dark:text-gray-300">Cargando formulario...</div>}>
          <ClientGetStartedWrapper />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
