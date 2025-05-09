"use client"

import type React from "react"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { MapPin, Mail, Clock } from "lucide-react"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { submitContactForm } from "@/app/actions/contact-actions"

export default function ContactPage() {
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
    <main className="min-h-screen bg-gray-50 dark:bg-black/[0.96] bg-grid-black/[0.02] dark:bg-grid-white/[0.02] antialiased relative overflow-hidden transition-colors duration-300">
      {/* Ambient background with layered particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-contact"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          particleColor={isDark ? "#ffffff" : "#1e293b"}
          linkColor={isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(30, 41, 59, 0.5)"}
          starsCount={150}
          starsColor={isDark ? "#ffffff" : "#1e293b"}
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
            <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
              Ponte en <span className="text-blue-500">Contacto</span>
            </h1>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
              Estamos aquí para responder a tus preguntas y ayudarte a impulsar tu negocio con nuestras soluciones de
              marketing.
            </p>
          </div>

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
              <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-semibold text-lg mb-2`}>
                Email & Teléfono
              </h3>
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

          {/* Formulario de contacto integrado directamente en la página */}
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

        <Footer />
      </div>
    </main>
  )
}
