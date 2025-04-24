"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, FileText, ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { useTheme } from "@/components/theme-provider"
import LayeredParticlesEffect from "@/components/layered-particles-effect"

export default function GetStartedPage() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-black/[0.96] bg-grid-white/[0.02]" : "bg-gray-50 bg-grid-black/[0.02]"
      } antialiased relative overflow-hidden transition-colors duration-300`}
    >
      {/* Mouse move effect */}
      <MouseMoveEffect />

      {/* Ambient background with layered particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <LayeredParticlesEffect
          id="layered-particles-getstarted"
          className="w-full h-full"
          primaryEffect="colorful"
          backgroundEffect={true}
          starsCount={250}
          starsColor={isDark ? "#ffffff" : "#1e293b"}
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
                Comienza con <span className="text-blue-500">InQbus</span>
              </h1>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto text-lg`}>
                Selecciona el paquete de marketing que mejor se adapte a tus necesidades y comienza a impulsar tu
                negocio hoy mismo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {marketingProducts.map((product, index) => (
                <Card
                  key={index}
                  className={`${
                    isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                  } backdrop-blur-sm hover:border-blue-500/50 transition-all`}
                >
                  <CardHeader>
                    <div className="mb-2 flex justify-between items-start">
                      <div className={`p-2 rounded-lg ${product.bgColor}`}>{product.icon}</div>
                      <span className="text-sm font-medium px-2.5 py-0.5 rounded bg-blue-500/30 text-white/80">
                        {product.tag}
                      </span>
                    </div>
                    <CardTitle className={`${isDark ? "text-white" : "text-blue-900"} text-xl`}>
                      {product.title}
                    </CardTitle>
                    <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="glow" className="w-full">
                      Seleccionar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div
              className={`${
                isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
              } border backdrop-blur-sm rounded-lg p-8 mb-16`}
            >
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-6`}>
                Documentación Necesaria
              </h2>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-8`}>
                Para comenzar con nuestros servicios, necesitaremos la siguiente documentación. Esto nos ayudará a
                entender mejor tu negocio y crear estrategias efectivas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className={`flex items-start p-4 ${
                      isDark ? "bg-black/30 border-white/5" : "bg-white/60 border-gray-100"
                    } rounded-lg border`}
                  >
                    <FileText className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-medium mb-1`}>{doc.title}</h3>
                      <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mb-3`}>{doc.description}</p>
                      {doc.template && (
                        <Link
                          href={doc.template}
                          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Descargar plantilla
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`${
                isDark
                  ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-white/10"
                  : "bg-gradient-to-r from-blue-100/50 to-purple-100/50 border-gray-200"
              } border backdrop-blur-sm rounded-lg p-8 text-center`}
            >
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
                ¿Listo para comenzar?
              </h2>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-6 max-w-2xl mx-auto`}>
                Nuestro equipo está listo para ayudarte a alcanzar tus objetivos de marketing. Completa el formulario y
                comencemos a trabajar juntos.
              </p>
              <Link href="/contact">
                <Button size="lg" variant="glow" className="hover:translate-x-1">
                  Completar Formulario
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

const marketingProducts = [
  {
    title: "Paquete Inicial",
    description: "Ideal para pequeñas empresas que buscan establecer su presencia digital",
    tag: "Popular",
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
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
    ),
    bgColor: "bg-blue-900/20",
    features: [
      "Auditoría inicial de marketing",
      "Configuración de Google Analytics",
      "Optimización básica de SEO",
      "Gestión de 2 redes sociales",
      "Informe mensual de rendimiento",
    ],
  },
  {
    title: "Paquete Crecimiento",
    description: "Para empresas en expansión que buscan aumentar su alcance y conversiones",
    tag: "Recomendado",
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
        className="text-green-500"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
    bgColor: "bg-green-900/20",
    features: [
      "Todo lo del Paquete Inicial",
      "Estrategia de contenido completa",
      "Campañas de email marketing",
      "Gestión de 4 redes sociales",
      "Publicidad en Google Ads",
      "Informes semanales de rendimiento",
    ],
  },
  {
    title: "Paquete Premium",
    description: "Solución completa para empresas que buscan dominar su mercado",
    tag: "Avanzado",
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
        className="text-purple-500"
      >
        <path d="M12 2v4"></path>
        <path d="M12 18v4"></path>
        <path d="m4.93 4.93 2.83 2.83"></path>
        <path d="m16.24 16.24 2.83 2.83"></path>
        <path d="M2 12h4"></path>
        <path d="M18 12h4"></path>
        <path d="m4.93 19.07 2.83-2.83"></path>
        <path d="m16.24 7.76 2.83-2.83"></path>
      </svg>
    ),
    bgColor: "bg-purple-900/20",
    features: [
      "Todo lo del Paquete Crecimiento",
      "Estrategia de marketing personalizada",
      "Desarrollo y diseño web",
      "SEO avanzado y optimización de conversión",
      "Gestión de reputación online",
      "Análisis de competencia",
      "Consultor de marketing dedicado",
    ],
  },
]

const documents = [
  {
    title: "Información de la Empresa",
    description: "Detalles sobre tu empresa, misión, visión, valores y objetivos de negocio.",
    template: "#",
  },
  {
    title: "Análisis de Competencia",
    description: "Información sobre tus principales competidores y su presencia en el mercado.",
    template: "#",
  },
  {
    title: "Público Objetivo",
    description: "Descripción detallada de tu cliente ideal y segmentos de mercado.",
    template: "#",
  },
  {
    title: "Activos de Marca",
    description: "Logotipos, guía de estilo, colores corporativos y materiales de marca existentes.",
    template: null,
  },
  {
    title: "Objetivos de Marketing",
    description: "Metas específicas que deseas alcanzar con tus estrategias de marketing.",
    template: "#",
  },
  {
    title: "Accesos y Credenciales",
    description: "Acceso a plataformas existentes como Google Analytics, redes sociales, etc.",
    template: "#",
  },
]
