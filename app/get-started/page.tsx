import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientGetStartedWrapper from "@/components/client-get-started-wrapper"
import { Suspense } from "react"

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Comienza tu proyecto</h1>
        <Suspense fallback={<div>Cargando formulario...</div>}>
          <ClientGetStartedWrapper />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
