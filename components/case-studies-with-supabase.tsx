"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"

export default function CaseStudiesWithSupabase() {
  const [caseStudies, setCaseStudies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()

        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("is_featured", true)
          .order("created_at", { ascending: false })

        if (error) throw error

        setCaseStudies(data || [])
      } catch (err: any) {
        console.error("Error al cargar casos de éxito:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  // Función para obtener el color de fondo según el color del caso de éxito
  const getTagColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    }

    return colorMap[color] || colorMap.blue
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos de Éxito</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a nuestros clientes a alcanzar sus objetivos de negocio a través de estrategias
            de marketing digital efectivas.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error al cargar los casos de éxito: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={caseStudy.image_url || "/placeholder.svg?height=400&width=600&query=marketing+case+study"}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{caseStudy.title}</h3>
                    {caseStudy.tag && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(caseStudy.color)}`}>
                        {caseStudy.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Cliente: {caseStudy.client}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">{caseStudy.description}</p>

                  {caseStudy.metrics && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {Object.entries(caseStudy.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-2xl font-bold text-primary">{value}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{key}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <a
                    href="#contact"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium mt-auto"
                  >
                    Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
