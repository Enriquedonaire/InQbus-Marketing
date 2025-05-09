import NetworkParticles from "@/components/network-particles"

export default function GetStartedLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
      <div className="absolute inset-0 z-0">
        <NetworkParticles />
      </div>
      <div className="flex flex-col items-center z-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 dark:border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-800 dark:text-white">Cargando paquetes...</p>
      </div>
    </div>
  )
}
