"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { CheckIcon, PenIcon, TrendingUpIcon, SparklesIcon } from "lucide-react"

export default function ClientGetStartedWrapper() {
  const searchParams = useSearchParams()
  const selectedPackage = searchParams.get("package")

  const [selectedPlan, setSelectedPlan] = useState(selectedPackage || null)

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan)
  }

  return (
    <div>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto">
        Selecciona el paquete de marketing que mejor se adapte a tus necesidades y comienza a impulsar tu negocio hoy
        mismo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Paquete Inicial */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative shadow-lg">
          <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white text-xs font-bold px-3 py-1 rounded">
            Popular
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
            <PenIcon className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Paquete Inicial</h3>
          <p className="text-blue-600 dark:text-blue-500 text-2xl font-bold mb-2">499€</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Ideal para pequeñas empresas que buscan establecer presencia online
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Análisis SEO inicial</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Optimización de 5 páginas</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Configuración de Google Analytics</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Informe mensual de rendimiento</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Soporte por email</span>
            </li>
          </ul>

          <button
            onClick={() => handleSelectPlan("inicial")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors shadow-md"
          >
            Seleccionar
          </button>
        </div>

        {/* Paquete Crecimiento */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-blue-300 dark:border-blue-700 rounded-lg p-6 relative shadow-lg">
          <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white text-xs font-bold px-3 py-1 rounded">
            Recomendado
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
            <TrendingUpIcon className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Paquete Crecimiento</h3>
          <p className="text-blue-600 dark:text-blue-500 text-2xl font-bold mb-2">999€</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Perfecto para empresas en crecimiento que buscan expandir su alcance
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Todo lo del plan Básico</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Optimización de 15 páginas</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Estrategia de contenidos</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Gestión de redes sociales</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Campañas de Google Ads</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Soporte prioritario</span>
            </li>
          </ul>

          <button
            onClick={() => handleSelectPlan("crecimiento")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors shadow-md"
          >
            Seleccionar
          </button>
        </div>

        {/* Paquete Premium */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 relative shadow-lg">
          <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white text-xs font-bold px-3 py-1 rounded">
            Avanzado
          </div>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
            <SparklesIcon className="w-6 h-6 text-purple-600 dark:text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Paquete Premium</h3>
          <p className="text-blue-600 dark:text-blue-500 text-2xl font-bold mb-2">1999€</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Solución completa para empresas que buscan dominar su mercado
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Todo lo del plan Profesional</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Optimización de sitio completo</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Estrategia de marketing integral</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Desarrollo de contenido premium</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Análisis de competencia</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Consultor dedicado</span>
            </li>
            <li className="flex items-start">
              <CheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-500 mr-2 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">Soporte 24/7</span>
            </li>
          </ul>

          <button
            onClick={() => handleSelectPlan("premium")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors shadow-md"
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  )
}
