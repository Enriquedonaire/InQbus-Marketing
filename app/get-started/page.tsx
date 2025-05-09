import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import GetStartedFormStatic from "@/components/get-started-form-static"

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

        {/* Usamos el formulario estático que no usa useSearchParams */}
        <GetStartedFormStatic />

        <Footer />
      </div>
    </main>
  )
}
