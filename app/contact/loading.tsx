import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { MapPin, Mail, Clock } from "lucide-react"

export default function ContactLoading() {
  // No podemos usar hooks como useTheme en un componente de carga,
  // así que usamos clases que funcionan tanto en modo claro como oscuro
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black/[0.96] antialiased relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 max-w-md mx-auto mb-6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full max-w-2xl mx-auto animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 max-w-xl mx-auto mt-2 animate-pulse"></div>
        </div>

        {/* Tarjetas de información de contacto */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center"
            >
              <div className="p-3 bg-blue-900/20 rounded-full mb-4 flex items-center justify-center">
                {i === 0 ? (
                  <MapPin className="h-6 w-6 text-blue-500" />
                ) : i === 1 ? (
                  <Mail className="h-6 w-6 text-blue-500" />
                ) : (
                  <Clock className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Formulario de contacto (esqueleto) */}
        <div className="max-w-3xl mx-auto">
          <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-8">
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
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-48 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="h-12 bg-blue-500 rounded-md w-full animate-pulse"></div>
          </div>
        </div>

        {/* Mapa (esqueleto) */}
        <div className="mt-16">
          <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden h-96">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center">
              <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
