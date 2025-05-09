"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { useTheme } from "@/components/theme-provider"
import LayeredParticlesEffect from "@/components/layered-particles-effect"
import VignetteOverlay from "@/components/vignette-overlay"
import SubtleLightEffect from "@/components/subtle-light-effect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle, Package, FileCheck, Users, BarChart } from "lucide-react"
import { submitGetStartedRequest } from "@/app/actions/get-started-actions"

// Definir los planes disponibles
const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "499€",
    description: "Ideal para pequeñas empresas que buscan establecer su presencia online.",
    features: ["Análisis SEO básico", "Gestión de 2 redes sociales", "Informe mensual"],
    icon: <Package className="h-10 w-10 text-blue-500" />,
  },
  {
    id: "professional",
    name: "Profesional",
    price: "999€",
    description: "Perfecto para empresas en crecimiento que necesitan una estrategia completa.",
    features: [
      "Análisis SEO avanzado",
      "Gestión de 4 redes sociales",
      "Estrategia de contenidos",
      "Informes quincenales",
    ],
    icon: <FileCheck className="h-10 w-10 text-blue-500" />,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "1999€",
    description: "Solución integral para grandes empresas con necesidades complejas.",
    features: [
      "Estrategia SEO completa",
      "Gestión de todas las redes sociales",
      "Creación de contenido premium",
      "Análisis de competencia",
      "Informes semanales",
    ],
    icon: <BarChart className="h-10 w-10 text-blue-500" />,
  },
  {
    id: "custom",
    name: "Personalizado",
    price: "Consultar",
    description: "Solución a medida adaptada a tus necesidades específicas.",
    features: ["Estrategia personalizada", "Servicios a medida", "Atención prioritaria", "Consultor dedicado"],
    icon: <Users className="h-10 w-10 text-blue-500" />,
  },
]

export default function GetStartedPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Usar useEffect para obtener el plan de la URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const planParam = urlParams.get("plan")
    if (planParam && plans.some((p) => p.id === planParam)) {
      setSelectedPlan(planParam)
    }
  }, [])

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    // Actualizar la URL sin recargar la página
    const url = new URL(window.location.href)
    url.searchParams.set("plan", planId)
    window.history.pushState({}, "", url.toString())
  }

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
      const plan = selectedPlan || "custom"

      // Guardar en Supabase
      await submitGetStartedRequest({
        name,
        email,
        company,
        phone,
        message,
        plan,
      })

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-black/[0.96] bg-grid-white/[0.02]" : "bg-gray-50 bg-grid-black/[0.02]"
      } antialiased relative overflow-hidden transition-colors duration-300`}
    >
      {/* Ambient background with layered particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-get-started"
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
              Comienza con <span className="text-blue-500">InQbus</span>
            </h1>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
              Selecciona el plan que mejor se adapte a tus necesidades y comienza a impulsar tu negocio con nuestras
              soluciones de marketing.
            </p>
          </div>

          {/* Selección de planes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`${
                  isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                } border backdrop-blur-sm rounded-lg p-6 flex flex-col ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-blue-500 border-transparent"
                    : "hover:border-blue-500/50 transition-colors"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-900/20 rounded-full">{plan.icon}</div>
                  <span className={`font-bold text-xl ${isDark ? "text-white" : "text-blue-900"}`}>{plan.price}</span>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>{plan.name}</h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-4 flex-grow`}>{plan.description}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      <span className={isDark ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className={`w-full ${selectedPlan === plan.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? "Seleccionado" : "Seleccionar"}
                </Button>
              </div>
            ))}
          </div>

          {/* Documentación necesaria */}
          <div
            className={`${
              isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
            } border backdrop-blur-sm rounded-lg p-8 mb-16`}
          >
            <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
              Documentación Necesaria
            </h2>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
              Para comenzar con tu proyecto, necesitaremos la siguiente información:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">✓</span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Información de la empresa (logo, colores corporativos, etc.)
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">✓</span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Acceso a cuentas de redes sociales existentes
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">✓</span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Información sobre tu público objetivo
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">✓</span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  Ejemplos de competidores o referencias
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">✓</span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>Objetivos específicos de marketing</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">✓</span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>Presupuesto y timeline del proyecto</span>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div
                className={`${
                  isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                } border backdrop-blur-sm rounded-lg p-8 text-center`}
              >
                <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>
                  ¡Solicitud Enviada!
                </h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
                  Gracias por tu interés en nuestros servicios. Nuestro equipo se pondrá en contacto contigo en las
                  próximas 24 horas para discutir los detalles de tu proyecto.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="glow">
                  Enviar otra solicitud
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`${
                  isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                } border backdrop-blur-sm rounded-lg p-8`}
              >
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6 text-center`}>
                  {selectedPlan
                    ? `Solicitar Plan ${plans.find((p) => p.id === selectedPlan)?.name}`
                    : "Solicitar Información"}
                </h2>

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
                    Detalles adicionales
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos más sobre tu proyecto y objetivos..."
                    required
                    rows={5}
                    className={`${
                      isDark
                        ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                        : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                    } focus:border-blue-500 resize-none`}
                  />
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
                      Enviar Solicitud
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
