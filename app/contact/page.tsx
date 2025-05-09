import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientContactWrapper from "@/components/client-contact-wrapper"
import { Suspense } from "react"
import NetworkParticles from "@/components/network-particles"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NetworkParticles />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Ponte en <span className="text-blue-600 dark:text-blue-500">Contacto</span>
        </h1>
        <Suspense fallback={<div className="text-center text-gray-700 dark:text-gray-300">Cargando formulario...</div>}>
          <ClientContactWrapper />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
