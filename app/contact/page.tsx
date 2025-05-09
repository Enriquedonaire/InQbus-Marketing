import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ClientContactWrapper from "@/components/client-contact-wrapper"
import { Suspense } from "react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Contacta con nosotros</h1>
        <Suspense fallback={<div>Cargando formulario...</div>}>
          <ClientContactWrapper />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
