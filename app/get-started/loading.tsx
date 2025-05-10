import LayeredParticlesEffect from "@/components/layered-particles-effect"
import MouseMoveEffect from "@/components/mouse-move-effect"
import SubtleLightEffect from "@/components/subtle-light-effect"
import VignetteOverlay from "@/components/vignette-overlay"

export default function GetStartedLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-getstarted-loading"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          starsCount={250}
          starsColor="currentColor"
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

      <div className="flex flex-col items-center z-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-800 dark:text-white">Cargando paquetes...</p>
      </div>
    </div>
  )
}
