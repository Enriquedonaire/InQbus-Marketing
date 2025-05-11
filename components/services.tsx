"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ContactForm from "@/components/contact-form"
import Link from "next/link"

const services = [
  {
    title: "SEO y Posicionamiento Web",
    description:
      "Mejora la visibilidad de tu sitio web en los motores de búsqueda y atrae tráfico orgánico de calidad.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    ),
  },
  {
    title: "Marketing de Contenidos",
    description:
      "Creamos contenido relevante y valioso para atraer y retener a tu audiencia, estableciéndote como autoridad en tu sector.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
      </svg>
    ),
  },
  {
    title: "Publicidad Digital",
    description:
      "Campañas de publicidad en Google Ads, redes sociales y plataformas relevantes para tu negocio con enfoque en ROI.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  },
  {
    title: "Redes Sociales",
    description:
      "Gestión profesional de tus perfiles en redes sociales para aumentar tu comunidad y engagement con tu marca.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    ),
  },
  {
    title: "Email Marketing",
    description:
      "Estrategias de email marketing efectivas para nutrir leads, fidelizar clientes y aumentar las conversiones.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
  },
  {
    title: "Analítica Web",
    description:
      "Medición y análisis de datos para tomar decisiones basadas en información real y optimizar tus estrategias de marketing.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-500"
      >
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    ),
  },
]

export default function Services() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [showContactForm, setShowContactForm] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <section id="services" className="py-20 relative">
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
            Nuestros <GradientText>Servicios</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Ofrecemos soluciones integrales de marketing digital para ayudarte a alcanzar tus objetivos de negocio y
            destacar en el mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div
                className={`${
                  isDark ? "bg-black/50 border-white/10 text-white" : "bg-white/80 border-gray-200 text-gray-900"
                } border backdrop-blur-sm h-full flex flex-col rounded-lg p-6`}
              >
                <div className={`p-3 ${isDark ? "bg-blue-900/20" : "bg-blue-100"} rounded-full w-fit mb-4`}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-3`}>{service.title}</h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6 flex-grow`}>{service.description}</p>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className={`${isDark ? "text-white hover:text-blue-400" : "text-blue-600 hover:text-blue-800"} group justify-start p-0`}
                  >
                    Solicitar información
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/get-started">
            <Button variant="glow" size="lg" className="group">
              Ver todos los servicios
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal para formulario de contacto */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent
          className={`max-w-3xl ${isDark ? "bg-black/90 border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedService ? `Solicitar información sobre ${selectedService}` : "Solicitar información"}
            </DialogTitle>
            <DialogDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
              Completa el formulario y nos pondremos en contacto contigo para brindarte más información
            </DialogDescription>
          </DialogHeader>
          <ContactForm initialService={selectedService || undefined} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
