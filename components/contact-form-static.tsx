"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { submitContactForm } from "@/app/actions/contact-actions"

export default function ContactFormStatic() {
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
      const company = (formData.get("company") as string) || null
      const phone = (formData.get("phone") as string) || null
      const message = formData.get("message") as string

      // Obtener servicios seleccionados
      const checkboxes = e.currentTarget.querySelectorAll('input[name="services"]:checked')
      const services = Array.from(checkboxes).map((cb) => (cb as HTMLInputElement).value)

      // Guardar en Supabase
      await submitContactForm({
        name,
        email,
        company,
        phone,
        message,
        services: services.length > 0 ? services : null,
      })

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/5 to-black/0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
            Contáctanos{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Hoy</span>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Cuéntanos sobre tu proyecto y cómo podemos ayudarte a alcanzar tus objetivos de marketing.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            <div
              className={`${
                isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
              } border backdrop-blur-sm rounded-lg p-8 text-center`}
            >
              <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>
                ¡Mensaje Enviado!
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
                Gracias por contactarnos. Nuestro equipo se pondrá en contacto contigo pronto.
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="glow">
                Enviar otro mensaje
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`${
                isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
              } border backdrop-blur-sm rounded-lg p-8`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  <Label htmlFor="company" className={isDark ? "text-white" : "text-blue-900"}>
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Nombre de tu empresa"
                    className={`${
                      isDark
                        ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                        : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                    } focus:border-blue-500`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className={isDark ? "text-white" : "text-blue-900"}>
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Tu número de teléfono"
                    className={`${
                      isDark
                        ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                        : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                    } focus:border-blue-500`}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message" className={isDark ? "text-white" : "text-blue-900"}>
                  ¿Cómo podemos ayudarte?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe tu proyecto o necesidades de marketing..."
                  required
                  rows={5}
                  className={`${
                    isDark
                      ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                      : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                  } focus:border-blue-500 resize-none`}
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="services" className={isDark ? "text-white" : "text-blue-900"}>
                  Servicios que te interesan
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["SEO", "Marketing Digital", "Diseño Web", "Redes Sociales", "Contenido", "Analítica"].map(
                    (service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={service}
                          name="services"
                          value={service}
                          className={`rounded ${
                            isDark
                              ? "border-white/20 bg-black/30 text-blue-500"
                              : "border-gray-300 bg-white/50 text-blue-600"
                          } focus:ring-blue-500`}
                        />
                        <Label htmlFor={service} className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}>
                          {service}
                        </Label>
                      </div>
                    ),
                  )}
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
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
