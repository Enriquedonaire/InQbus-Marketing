import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { MapPin, Mail, Clock } from "lucide-react"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import ContactFormStatic from "@/components/contact-form-static"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black/[0.96] bg-grid-black/[0.02] dark:bg-grid-white/[0.02] antialiased relative overflow-hidden transition-colors duration-300">
      {/* Ambient background with layered particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-contact"
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
              Ponte en <span className="text-blue-500">Contacto</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Estamos aquí para responder a tus preguntas y ayudarte a impulsar tu negocio con nuestras soluciones de
              marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-900/20 rounded-full mb-4">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 dark:text-white font-semibold text-lg mb-2">Ubicación</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Calle Principal 123
                <br />
                Ciudad Empresarial
                <br />
                28001, Madrid
              </p>
            </div>

            <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-900/20 rounded-full mb-4">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 dark:text-white font-semibold text-lg mb-2">Email & Teléfono</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">info@inqubus.com</p>
              <p className="text-gray-600 dark:text-gray-400">+34 91 123 45 67</p>
            </div>

            <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center">
              <div className="p-3 bg-blue-900/20 rounded-full mb-4">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-blue-900 dark:text-white font-semibold text-lg mb-2">Horario</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Lunes - Viernes
                <br />
                9:00 - 18:00
                <br />
                <span className="text-blue-400">Fines de semana cerrado</span>
              </p>
            </div>
          </div>

          {/* Usamos el formulario estático que no usa useSearchParams */}
          <ContactFormStatic />

          <div className="mt-16">
            <div className="border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12140.766594903964!2d-3.7037974!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sMadrid%2C%20Spain!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de InQbus"
              ></iframe>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
