"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Search, BarChart, TrendingUp, Send } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"
import { submitAuditRequest } from "@/app/actions/audit-actions"

export default function FreeAudit() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      const name = formData.get("name") as string
      const email = formData.get("email") as string
      const website = formData.get("website") as string
      const message = formData.get("message") as string

      // Guardar en Supabase
      await submitAuditRequest({
        name,
        email,
        website,
        message: message || null,
      })

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar la solicitud:", error)
      setIsSubmitting(false)
      // Podríamos mostrar un mensaje de error, pero mantenemos la UX original
    }
  }

  return (
    <section id="free-audit" className="py-20 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/5 to-black/0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
            Obtén tu <GradientText>Auditoría Gratuita</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Descubre oportunidades de mejora para tu estrategia de marketing con nuestro análisis profesional sin costo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className={`${isDark ? "text-white" : "text-blue-900"} mb-8`}>
              <h3 className="text-2xl font-bold mb-4">¿Qué incluye nuestra auditoría?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Search className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Análisis SEO completo</h4>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Evaluación de palabras clave, estructura del sitio, metadatos y oportunidades de mejora.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <BarChart className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Revisión de analíticas</h4>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Análisis de tráfico, conversiones, comportamiento de usuarios y puntos de abandono.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Estrategia de contenido</h4>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Evaluación de tu contenido actual y recomendaciones para mejorar engagement y conversiones.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div
                className={`${
                  isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                } border backdrop-blur-sm rounded-lg p-8 text-center`}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>
                  ¡Solicitud Enviada!
                </h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
                  Gracias por solicitar tu auditoría gratuita. Nuestro equipo se pondrá en contacto contigo en las
                  próximas 24 horas para programar una sesión.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="glow">
                  Solicitar otra auditoría
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`${
                  isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                } border backdrop-blur-sm rounded-lg p-8`}
              >
                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className={isDark ? "text-white" : "text-blue-900"}>
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      required
                      className={`${
                        isDark
                          ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                          : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      } focus:border-blue-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className={isDark ? "text-white" : "text-blue-900"}>
                      Correo Electrónico
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className={`${
                        isDark
                          ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                          : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      } focus:border-blue-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className={isDark ? "text-white" : "text-blue-900"}>
                      Sitio Web
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://tusitio.com"
                      required
                      className={`${
                        isDark
                          ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                          : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      } focus:border-blue-500`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className={isDark ? "text-white" : "text-blue-900"}>
                      ¿Qué te gustaría mejorar?
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Cuéntanos sobre tus objetivos y desafíos actuales..."
                      rows={4}
                      className={`${
                        isDark
                          ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                          : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                      } focus:border-blue-500 resize-none`}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="glow"
                  className="w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Solicitar Auditoría Gratuita
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
