"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, ArrowRight } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { submitGetStartedRequest } from "@/app/actions/get-started-actions"

// Definimos los planes disponibles
const PLANS = [
  {
    id: "basic",
    name: "Básico",
    price: "499€",
    features: ["Análisis inicial", "Estrategia básica", "Implementación", "1 mes de seguimiento"],
    description: "Ideal para pequeñas empresas que quieren empezar con marketing digital.",
  },
  {
    id: "pro",
    name: "Profesional",
    price: "999€",
    features: ["Todo lo del plan Básico", "Estrategia avanzada", "Contenido premium", "3 meses de seguimiento"],
    description: "Perfecto para empresas en crecimiento que buscan expandir su presencia online.",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "1999€",
    features: [
      "Todo lo del plan Profesional",
      "Estrategia personalizada",
      "Consultoría dedicada",
      "6 meses de seguimiento",
    ],
    description: "La solución completa para grandes empresas con necesidades complejas.",
  },
]

export default function GetStartedFormStatic() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Intentamos obtener el plan de la URL al cargar el componente
  useEffect(() => {
    try {
      // Usamos window.location en lugar de useSearchParams
      const url = new URL(window.location.href)
      const planParam = url.searchParams.get("plan")
      if (planParam && PLANS.some((plan) => plan.id === planParam)) {
        setSelectedPlan(planParam)
      }
    } catch (error) {
      console.error("Error al obtener parámetros de URL:", error)
    }
  }, [])

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
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
          Comienza con <span className="text-blue-500">InQbus</span>
        </h1>
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
          Selecciona el plan que mejor se adapte a tus necesidades y comienza a impulsar tu negocio con nuestras
          soluciones de marketing digital.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {isSubmitted ? (
          <div
            className={`${
              isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
            } border backdrop-blur-sm rounded-lg p-8 text-center max-w-3xl mx-auto`}
          >
            <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>
              ¡Solicitud Enviada!
            </h3>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
              Gracias por tu interés en nuestros servicios. Nuestro equipo se pondrá en contacto contigo pronto para
              discutir los detalles de tu proyecto.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setSelectedPlan(null)
              }}
              variant="glow"
            >
              Enviar otra solicitud
            </Button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`${
                        isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                      } border backdrop-blur-sm rounded-lg p-6 relative ${
                        selectedPlan === plan.id
                          ? "ring-2 ring-blue-500 transform scale-[1.02]"
                          : "hover:border-blue-300 dark:hover:border-blue-700"
                      } transition-all duration-300`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                          Popular
                        </div>
                      )}
                      <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>
                        {plan.name}
                      </h3>
                      <p className="text-blue-500 text-2xl font-bold mb-4">{plan.price}</p>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-4 text-sm`}>{plan.description}</p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className={`${isDark ? "text-gray-300" : "text-gray-700"} flex items-start`}>
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={selectedPlan === plan.id ? "default" : "outline"}
                        className={`w-full ${selectedPlan === plan.id ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        {selectedPlan === plan.id ? "Seleccionado" : "Seleccionar"}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Button onClick={() => setStep(2)} disabled={!selectedPlan} variant="glow" size="lg" className="mt-4">
                    Continuar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <div className="max-w-3xl mx-auto">
                <div
                  className={`${
                    isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                  } border backdrop-blur-sm rounded-lg p-8`}
                >
                  <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6 text-center`}>
                    Completa tus datos para el plan{" "}
                    <span className="text-blue-500">
                      {PLANS.find((p) => p.id === selectedPlan)?.name || "Personalizado"}
                    </span>
                  </h3>

                  <form onSubmit={handleSubmit}>
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
                        ¿Algo más que debamos saber?
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntanos más sobre tu proyecto o necesidades específicas..."
                        rows={5}
                        className={`${
                          isDark
                            ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                            : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
                        } focus:border-blue-500 resize-none`}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className={isDark ? "border-white/10 text-white" : ""}
                      >
                        Volver a los planes
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        variant="glow"
                        className="flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            Solicitar plan <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
