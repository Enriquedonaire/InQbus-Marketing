"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2 } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"
import { getSupabaseClient } from "@/lib/supabase/client"

// Tipo para los casos de éxito
interface CaseStudy {
  id: string
  title: string
  client: string
  description: string
  image_url: string | null
  tag: string | null
  color: string
  metrics: any
  is_featured: boolean
}

export default function CaseStudiesWithSupabase() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("is_featured", true)
          .order("created_at", { ascending: false })

        if (error) throw error

        setCaseStudies(data || [])
      } catch (err) {
        console.error("Error al cargar los casos de éxito:", err)
        setError("No se pudieron cargar los casos de éxito. Por favor, inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  // Casos de éxito de respaldo en caso de error o mientras se cargan
  const fallbackCaseStudies = [
    {
      id: "1",
      title: "Aumento de 300% en tráfico orgánico",
      client: "E-commerce de Moda",
      description:
        "Implementamos una estrategia SEO completa que resultó en un aumento significativo del tráfico y un 150% más de conversiones en 6 meses.",
      image_url: "/stylish-online-storefront.png",
      tag: "SEO",
      color: "blue",
      metrics: [
        { label: "Aumento de tráfico", value: "+300%" },
        { label: "Mejora en conversiones", value: "+150%" },
        { label: "Palabras clave en top 10", value: "120+" },
      ],
      is_featured: true,
    },
    {
      id: "2",
      title: "Campaña viral en redes sociales",
      client: "Startup de Tecnología",
      description:
        "Diseñamos una campaña que generó más de 1 millón de impresiones y 50,000 nuevos seguidores en un mes, aumentando las descargas de la app en un 200%.",
      image_url: "/interconnected-social-network.png",
      tag: "Redes Sociales",
      color: "purple",
      metrics: [
        { label: "Impresiones", value: "1M+" },
        { label: "Nuevos seguidores", value: "50K+" },
        { label: "Aumento en descargas", value: "+200%" },
      ],
      is_featured: true,
    },
    {
      id: "3",
      title: "Rediseño web con enfoque en conversión",
      client: "Agencia de Viajes",
      description:
        "Rediseñamos su sitio web con un enfoque en la experiencia del usuario, logrando un aumento del 85% en la tasa de conversión y reduciendo el abandono en un 40%.",
      image_url: "/modern-travel-interface.png",
      tag: "Diseño Web",
      color: "green",
      metrics: [
        { label: "Mejora en conversión", value: "+85%" },
        { label: "Reducción de abandono", value: "-40%" },
        { label: "Tiempo en sitio", value: "+120%" },
      ],
      is_featured: true,
    },
  ]

  // Usar casos de éxito de respaldo si hay un error o no hay datos
  const displayCaseStudies = caseStudies.length > 0 ? caseStudies : fallbackCaseStudies

  // Función para parsear las métricas JSON
  const parseMetrics = (metrics: any) => {
    if (!metrics) return []
    if (Array.isArray(metrics)) return metrics
    try {
      return typeof metrics === "string" ? JSON.parse(metrics) : metrics
    } catch (e) {
      console.error("Error al parsear métricas:", e)
      return []
    }
  }

  return (
    <section id="case-studies" className="py-20 relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/5 to-black/0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
            Nuestros <GradientText>Casos de Éxito</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Descubre cómo hemos ayudado a empresas como la tuya a alcanzar sus objetivos de marketing y crecimiento.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-lg">Cargando casos de éxito...</span>
          </div>
        ) : error ? (
          <div className={`text-center p-6 rounded-lg ${isDark ? "bg-red-900/20" : "bg-red-100"} text-red-500 mb-8`}>
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayCaseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card
                  className={`${
                    isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                  } backdrop-blur-sm h-full flex flex-col hover:border-${study.color}-500/50 transition-all`}
                >
                  <div className="relative">
                    <img
                      src={study.image_url || "/placeholder.svg"}
                      alt={study.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-${study.color}-500/80 text-white`}
                    >
                      {study.tag}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className={isDark ? "text-white" : "text-blue-900"}>{study.title}</CardTitle>
                    <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
                      Cliente: {study.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>{study.description}</p>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {parseMetrics(study.metrics).map((metric: any, i: number) => (
                        <div key={i} className="text-center">
                          <p className={`text-${study.color}-500 font-bold text-xl`}>{metric.value}</p>
                          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-xs`}>{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className={`w-full ${isDark ? "text-white hover:text-blue-400" : "text-blue-900 hover:text-blue-700"} group`}
                    >
                      Ver caso completo
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button variant="glow" size="lg" className="group">
            Ver todos los casos de éxito
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
