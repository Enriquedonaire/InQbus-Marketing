import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import GetStartedFormSimple from "@/components/get-started-form-simple"

// Componente de servidor que recibe searchParams como prop
export default function GetStartedPage({ searchParams }: { searchParams: { plan?: string } }) {
  // Obtenemos el plan directamente de los searchParams que Next.js inyecta
  const selectedPlan = searchParams.plan || null

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

        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-white mb-6">
              Comienza con <span className="text-blue-500">InQbus</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Completa el formulario a continuación para comenzar tu viaje con nosotros. Nuestro equipo se pondrá en
              contacto contigo pronto.
            </p>
          </div>

          {/* Formulario de get-started simplificado */}
          <GetStartedFormSimple initialPlan={selectedPlan} />
        </div>

        <Footer />
      </div>
    </main>
  )
}
