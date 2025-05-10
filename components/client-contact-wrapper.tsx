"use client"

import { useSearchParams } from "next/navigation"
import ContactForm from "@/components/contact-form"
import { useTheme } from "@/components/theme-provider"
import { MapPin, Mail, Clock } from "lucide-react"

export default function ClientContactWrapper() {
  const searchParams = useSearchParams()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div
          className={`${
            isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
          } border backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center`}
        >
          <div className="p-3 bg-blue-900/20 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-semibold text-lg mb-2`}>Ubicación</h3>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Calle Principal 123
            <br />
            Ciudad Empresarial
            <br />
            28001, Madrid
          </p>
        </div>

        <div
          className={`${
            isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
          } border backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center`}
        >
          <div className="p-3 bg-blue-900/20 rounded-full mb-4">
            <Mail className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-semibold text-lg mb-2`}>Email & Teléfono</h3>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-2`}>info@inqubus.com</p>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>+34 91 123 45 67</p>
        </div>

        <div
          className={`${
            isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
          } border backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center`}
        >
          <div className="p-3 bg-blue-900/20 rounded-full mb-4">
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-semibold text-lg mb-2`}>Horario</h3>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Lunes - Viernes
            <br />
            9:00 - 18:00
            <br />
            <span className="text-blue-400">Fines de semana cerrado</span>
          </p>
        </div>
      </div>

      <ContactForm />

      <div className="mt-16">
        <div
          className={`${
            isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
          } border backdrop-blur-sm rounded-lg overflow-hidden h-96`}
        >
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
  )
}
