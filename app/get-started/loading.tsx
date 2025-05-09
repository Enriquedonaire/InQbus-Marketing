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

      <Footer />
    </main>
  )
}
