"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { submitGetStartedRequest } from "@/app/actions/get-started-actions"

interface GetStartedFormSimpleProps {
  initialPlan: string | null
}

export default function GetStartedFormSimple({ initialPlan }: GetStartedFormSimpleProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(initialPlan)
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
      const plan = selectedPlan

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
    <div className="max-w-3xl mx-auto">
      {isSubmitted ? (
        <div
          className={`${
            isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
          } border backdrop-blur-sm rounded-lg p-8 text-center`}
        >
          <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>¡Solicitud Enviada!</h3>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6`}>
            Gracias por tu interés en InQbus. Nuestro equipo se pondrá en contacto contigo pronto para comenzar tu
            proyecto.
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
          <div className="mb-8">
            <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>Selecciona un plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Básico", "Profesional", "Empresarial"].map((plan) => (
                <div
                  key={plan}
                  className={`${
                    selectedPlan === plan
                      ? "border-blue-500 bg-blue-500/10"
                      : isDark
                        ? "border-white/10 hover:border-white/30"
                        : "border-gray-200 hover:border-gray-300"
                  } border rounded-lg p-4 cursor-pointer transition-colors`}
                  onClick={() => setSelectedPlan(plan)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${isDark ? "text-white" : "text-blue-900"}`}>{plan}</h4>
                    <div
                      className={`w-4 h-4 rounded-full border ${
                        selectedPlan === plan
                          ? "border-blue-500 bg-blue-500"
                          : isDark
                            ? "border-white/30"
                            : "border-gray-300"
                      }`}
                    >
                      {selectedPlan === plan && <div className="w-2 h-2 rounded-full bg-white m-auto mt-[3px]"></div>}
                    </div>
                  </div>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    {plan === "Básico"
                      ? "Ideal para pequeñas empresas y startups"
                      : plan === "Profesional"
                        ? "Perfecto para empresas en crecimiento"
                        : "Solución completa para grandes empresas"}
                  </p>
                </div>
              ))}
            </div>
          </div>

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
              Cuéntanos sobre tu proyecto
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe tu proyecto y objetivos..."
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
      )}
    </div>
  )
}
