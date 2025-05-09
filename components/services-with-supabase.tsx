"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { ArrowRight, Loader2 } from "lucide-react"
import * as LucideIcons from "lucide-react"

export default function ServicesWithSupabase() {
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()

        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("display_order", { ascending: true })
          .eq("is_active", true)

        if (error) throw error

        setServices(data || [])
      } catch (err: any) {
        console.error("Error al cargar servicios:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Función para obtener el icono dinámicamente
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)] || LucideIcons.Sparkles
    return <Icon className="h-10 w-10 mb-4 text-primary" />
  }

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ofrecemos soluciones integrales de marketing digital para ayudar a tu negocio a crecer y destacar en el
            entorno digital.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error al cargar los servicios: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {service.icon && getIcon(service.icon)}
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{service.description}</p>
                <a href="#contact" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                  Saber más <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
