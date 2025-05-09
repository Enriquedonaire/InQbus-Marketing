"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { submitContactForm } from "@/app/actions/contact-actions"

export default function ContactFormWithSupabase() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const services = [
    { id: "marketing-digital", label: "Marketing Digital" },
    { id: "seo", label: "SEO y Posicionamiento" },
    { id: "redes-sociales", label: "Redes Sociales" },
    { id: "publicidad", label: "Publicidad Digital" },
    { id: "contenidos", label: "Marketing de Contenidos" },
    { id: "email", label: "Email Marketing" },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      await submitContactForm({
        name,
        email,
        company,
        phone,
        message,
        services: selectedServices,
      })

      // Limpiar formulario
      setName("")
      setEmail("")
      setCompany("")
      setPhone("")
      setMessage("")
      setSelectedServices([])

      // Mostrar mensaje de éxito
      setSuccess(true)

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err: any) {
      console.error("Error al enviar formulario:", err)
      setError(err.message || "Error al enviar el formulario. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contacto</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            ¿Listo para impulsar tu negocio? Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus
            objetivos.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12">
          {success ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded mb-6">
              <h3 className="text-lg font-semibold mb-2">¡Mensaje enviado con éxito!</h3>
              <p>Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Empresa (opcional)</Label>
                  <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono (opcional)</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Servicios de interés</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedServices([...selectedServices, service.id])
                          } else {
                            setSelectedServices(selectedServices.filter((id) => id !== service.id))
                          }
                        }}
                      />
                      <Label htmlFor={service.id} className="cursor-pointer">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos sobre tu proyecto o necesidades"
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
