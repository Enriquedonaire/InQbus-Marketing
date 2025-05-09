import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function GetStartedLoading() {
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

        {/* Formulario de get-started (esqueleto) */}
        <div className="max-w-4xl mx-auto">
          <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-8">
            {/* Paquetes */}
            <div className="mb-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="border border-gray-200 dark:border-white/10 rounded-lg p-4 animate-pulse">
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
      </div>

      <Footer />
    </main>
  )
}
