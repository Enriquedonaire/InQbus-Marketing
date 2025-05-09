"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Check, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitGetStartedRequest } from "@/app/actions/get-started-actions"
import { useTheme } from "@/components/theme-provider"

interface GetStartedFormProps {
  selectedPackage?: string | null
}

export default function GetStartedForm({ selectedPackage }: GetStartedFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Establecer el plan seleccionado desde la URL si existe
  useEffect(() => {
    if (selectedPackage) {
      setSelectedPlan(selectedPackage)
    }
  }, [selectedPackage])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)
      formData.append("package", selectedPlan || "No especificado")

      // Guardar en Supabase
      await submitGetStartedRequest({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        company: (formData.get("company") as string) || null,
        phone: (formData.get("phone") as string) || null,
        message: (formData.get("message") as string) || null,
        package: selectedPlan || "No especificado",
      })

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setIsSubmitting(false)
    }
  }

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "499€",
      description: "Ideal para pequeñas empresas que buscan establecer presencia online",
      features: [
        "Análisis SEO inicial",
        "Optimización de 5 páginas",
        "Configuración de Google Analytics",
        "Informe mensual de rendimiento",
        "Soporte por email",
      ],
    },
    {
      id: "professional",
      name: "Profesional",
      price: "999€",
      description: "Perfecto para empresas en crecimiento que buscan expandir su alcance",
      features: [
        "Todo lo del plan Básico",
        "Optimización de 15 páginas",
        "Estrategia de contenidos",
        "Gestión de redes sociales",
        "Campañas de Google Ads",
        "Soporte prioritario",
      ],
    },
    {
      id: "enterprise",
      name: "Empresarial",
      price: "1999€",
      description: "Solución completa para empresas que buscan dominar su mercado",
      features: [
        "Todo lo del plan Profesional",
        "Optimización de sitio completo",
        "Estrategia de marketing integral",
        "Desarrollo de contenido premium",
        "Análisis de competencia",
        "Consultor dedicado",
        "Soporte 24/7",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
          Comienza con <span className="text-blue-500">InQbus</span>
        </h1>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
          Selecciona el plan que mejor se adapte a tus necesidades y comienza a impulsar tu negocio hoy mismo.
        </p>
      </div>

      {isSubmitted ? (
        <div
          className={`${
            isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
          } border backdrop-blur-sm rounded-lg p-8 text-center max-w-3xl mx-auto`}
        >
          <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>¡Solicitud Enviada!</h3>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
            Gracias por tu interés en nuestros servicios. Nuestro equipo se pondrá en contacto contigo pronto para
            discutir los detalles de tu proyecto.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="glow">
            Enviar otra solicitud
          </Button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Planes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`${
                  isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                } border backdrop-blur-sm rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "ring-2 ring-blue-500 transform scale-[1.02]"
                    : "hover:border-blue-300 dark:hover:border-blue-700"
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}>{plan.name}</h3>
                    <p className="text-blue-500 font-bold text-2xl mt-1">{plan.price}</p>
                  </div>
                  {selectedPlan === plan.id && (
                    <div className="bg-blue-500 text-white p-1 rounded-full">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-4 text-sm`}>{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className={isDark ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className={`${
              isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
            } border backdrop-blur-sm rounded-lg p-8`}
          >
            <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
              Completa tus datos para comenzar
            </h3>

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
                Mensaje (opcional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Cuéntanos más sobre tu proyecto o necesidades específicas..."
                rows={4}
                className={`${
                  isDark
                    ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                    : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                } focus:border-blue-500 resize-none`}
              />
            </div>

            <div className="mb-6">
              <p className={`${isDark ? "text-white" : "text-blue-900"} font-medium mb-2`}>Plan seleccionado:</p>
              <div
                className={`${
                  isDark ? "bg-black/30 border-white/10" : "bg-white/50 border-gray-200"
                } border rounded-md p-3`}
              >
                {selectedPlan ? (
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white p-1 rounded-full mr-2">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className={isDark ? "text-white" : "text-blue-900"}>
                      Plan {plans.find((p) => p.id === selectedPlan)?.name || selectedPlan}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">Ningún plan seleccionado. Por favor, elige un plan arriba.</span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !selectedPlan}
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
                  Comenzar con InQbus
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}
