"use client"

import { useSearchParams } from "next/navigation"
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react"
import { useState } from "react"

export default function ClientContactWrapper() {
  const searchParams = useSearchParams()
  // Podríamos usar searchParams si fuera necesario

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    mensaje: "",
    servicios: {
      seo: false,
      socialMedia: false,
      emailMarketing: false,
      contentMarketing: false,
      googleAds: false,
      disenoWeb: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      servicios: {
        ...prev.servicios,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false)
        setFormData({
          nombre: "",
          email: "",
          empresa: "",
          telefono: "",
          mensaje: "",
          servicios: {
            seo: false,
            socialMedia: false,
            emailMarketing: false,
            contentMarketing: false,
            googleAds: false,
            disenoWeb: false,
          },
        })
      }, 3000)
    }, 1500)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Ubicación */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <MapPinIcon className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ubicación</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Calle Principal 123</p>
          <p className="text-gray-600 dark:text-gray-400">Piso 4, Oficina 415</p>
          <p className="text-gray-600 dark:text-gray-400">28001, Madrid</p>
        </div>

        {/* Email & Teléfono */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <MailIcon className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email & Teléfono</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">info@inqubus.com</p>
          <p className="text-gray-600 dark:text-gray-400">+34 91 123 45 67</p>
        </div>

        {/* Horario */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <PhoneIcon className="w-6 h-6 text-blue-600 dark:text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Horario</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Lunes - Viernes</p>
          <p className="text-gray-600 dark:text-gray-400">9:00 - 18:00</p>
          <p className="text-blue-600 dark:text-blue-500 mt-2 text-sm cursor-pointer">Pedir una llamada</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Contáctanos <span className="text-blue-600 dark:text-blue-500">Hoy</span>
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Cuéntanos sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos de marketing.
      </p>

      {submitSuccess ? (
        <div className="max-w-2xl mx-auto bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center shadow-lg">
          <h3 className="text-xl font-bold text-green-600 dark:text-green-500 mb-2">¡Mensaje enviado con éxito!</h3>
          <p className="text-gray-700 dark:text-gray-300">Nos pondremos en contacto contigo lo antes posible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Empresa
            </label>
            <input
              type="text"
              id="empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              placeholder="Nombre de tu empresa"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              placeholder="+34 600 000 000"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ¿Cómo podemos ayudarte?
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={4}
              className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              placeholder="Describe tu proyecto o necesidades de marketing..."
            />
          </div>

          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Servicios que te interesan:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="seo"
                  checked={formData.servicios.seo}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">SEO</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="socialMedia"
                  checked={formData.servicios.socialMedia}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Social Media</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="emailMarketing"
                  checked={formData.servicios.emailMarketing}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Email Marketing</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="contentMarketing"
                  checked={formData.servicios.contentMarketing}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Marketing Digital</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="googleAds"
                  checked={formData.servicios.googleAds}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Google Ads</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="disenoWeb"
                  checked={formData.servicios.disenoWeb}
                  onChange={handleCheckboxChange}
                  className="rounded border-gray-300 dark:border-gray-700 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Diseño Web</span>
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </div>
        </form>
      )}

      {/* Mapa */}
      <div className="mt-16 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12143.354760973503!2d-3.7037974302246036!3d40.41677007936128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2zTWFkcmlkLCBFc3Bhw7Fh!5e0!3m2!1ses!2ses!4v1651234567890!5m2!1ses!2ses"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}
