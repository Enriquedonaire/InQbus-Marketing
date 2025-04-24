"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"

const caseStudies = [
  {
    title: "Aumento de 300% en tráfico orgánico",
    client: "E-commerce de Moda",
    description:
      "Implementamos una estrategia SEO completa que resultó en un aumento significativo del tráfico y un 150% más de conversiones en 6 meses.",
    image: "/stylish-online-storefront.png",
    metrics: [
      { label: "Aumento de tráfico", value: "+300%" },
      { label: "Mejora en conversiones", value: "+150%" },
      { label: "Palabras clave en top 10", value: "120+" },
    ],
    tag: "SEO",
    color: "blue",
  },
  {
    title: "Campaña viral en redes sociales",
    client: "Startup de Tecnología",
    description:
      "Diseñamos una campaña que generó más de 1 millón de impresiones y 50,000 nuevos seguidores en un mes, aumentando las descargas de la app en un 200%.",
    image: "/interconnected-social-network.png",
    metrics: [
      { label: "Impresiones", value: "1M+" },
      { label: "Nuevos seguidores", value: "50K+" },
      { label: "Aumento en descargas", value: "+200%" },
    ],
    tag: "Redes Sociales",
    color: "purple",
  },
  {
    title: "Rediseño web con enfoque en conversión",
    client: "Agencia de Viajes",
    description:
      "Rediseñamos su sitio web con un enfoque en la experiencia del usuario, logrando un aumento del 85% en la tasa de conversión y reduciendo el abandono en un 40%.",
    image: "/modern-travel-interface.png",
    metrics: [
      { label: "Mejora en conversión", value: "+85%" },
      { label: "Reducción de abandono", value: "-40%" },
      { label: "Tiempo en sitio", value: "+120%" },
    ],
    tag: "Diseño Web",
    color: "green",
  },
]

export default function CaseStudies() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
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
                    src={study.image || "/placeholder.svg"}
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
                    {study.metrics.map((metric, i) => (
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
