"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"
import { getSupabaseClient } from "@/lib/supabase/client"
import { BarChart, Globe, TrendingUp, Search, MessageSquare, PenTool, Loader2 } from "lucide-react"

// Tipo para los servicios
interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  is_active: boolean
  display_order: number | null
}

export default function ServicesWithSupabase() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })

        if (error) throw error

        setServices(data || [])
      } catch (err) {
        console.error("Error al cargar los servicios:", err)
        setError("No se pudieron cargar los servicios. Por favor, inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Función para obtener el icono correcto basado en el nombre
  const getIconComponent = (iconName: string | null) => {
    switch (iconName) {
      case "Search":
        return <Search className="h-10 w-10 text-blue-500" />
      case "TrendingUp":
        return <TrendingUp className="h-10 w-10 text-blue-500" />
      case "PenTool":
        return <PenTool className="h-10 w-10 text-blue-500" />
      case "Globe":
        return <Globe className="h-10 w-10 text-blue-500" />
      case "BarChart":
        return <BarChart className="h-10 w-10 text-blue-500" />
      case "MessageSquare":
        return <MessageSquare className="h-10 w-10 text-blue-500" />
      default:
        return <Globe className="h-10 w-10 text-blue-500" />
    }
  }

  // Servicios de respaldo en caso de error o mientras se cargan
  const fallbackServices = [
    {
      id: "1",
      icon: "Search",
      title: "SEO Optimization",
      description: "Boost your online visibility with our data-driven SEO strategies that drive organic traffic.",
      is_active: true,
      display_order: 1,
    },
    {
      id: "2",
      icon: "TrendingUp",
      title: "Digital Marketing",
      description: "Comprehensive digital marketing campaigns that convert visitors into loyal customers.",
      is_active: true,
      display_order: 2,
    },
    {
      id: "3",
      icon: "PenTool",
      title: "Content Creation",
      description: "Engaging content that tells your brand story and resonates with your target audience.",
      is_active: true,
      display_order: 3,
    },
  ]

  // Usar servicios de respaldo si hay un error o no hay datos
  const displayServices = services.length > 0 ? services : fallbackServices

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
            Our <GradientText>Marketing Services</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Comprehensive marketing solutions tailored to help your business grow and succeed in today's competitive
            landscape.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-lg">Cargando servicios...</span>
          </div>
        ) : error ? (
          <div className={`text-center p-6 rounded-lg ${isDark ? "bg-red-900/20" : "bg-red-100"} text-red-500 mb-8`}>
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`${isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-sm hover:border-blue-500/50 transition-all`}
                >
                  <CardHeader>
                    <div className="mb-4">{getIconComponent(service.icon)}</div>
                    <CardTitle className={isDark ? "text-white" : "text-blue-900"}>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
