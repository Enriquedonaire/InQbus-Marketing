"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitAuditRequest } from "@/app/actions/audit-actions"

export default function FreeAuditWithSupabase() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      await submitAuditRequest({
        name,
        email,
        website,
        message,
      })

      // Limpiar formulario
      setName("")
      setEmail("")
      setWebsite("")
      setMessage("")

      // Mostrar mensaje de éxito
      setSuccess(true)

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err: any) {
      console.error("Error al enviar solicitud de auditoría:", err)
      setError(err.message || "Error al enviar la solicitud. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-primary text-white">
              <h2 className="text-3xl font-bold mb-6">Auditoría Gratuita</h2>
              <p className="mb-6">
                Descubre cómo mejorar tu presencia online con nuestra auditoría gratuita. Analizaremos tu sitio web y te
                proporcionaremos recomendaciones personalizadas.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary font-bold mr-3 shrink-0">
                    1
                  </span>
                  <span>Análisis completo de tu sitio web</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary font-bold mr-3 shrink-0">
                    2
                  </span>
                  <span>Evaluación de SEO y palabras clave</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary font-bold mr-3 shrink-0">
                    3
                  </span>
                  <span>Recomendaciones de mejora</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white text-primary font-bold mr-3 shrink-0">
                    4
                  </span>
                  <span>Consulta personalizada de 30 minutos</span>
                </li>
              </ul>
            </div>

            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-6">Solicita tu auditoría gratuita</h3>

              {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>
                    ¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto para programar tu auditoría
                    gratuita.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Sitio Web</Label>
                    <Input
                      id="website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://ejemplo.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje (opcional)</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Cuéntanos más sobre tu negocio y objetivos"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Enviando..." : "Solicitar Auditoría Gratuita"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
