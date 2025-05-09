"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingWithSupabase() {
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlans() {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()

        const { data, error } = await supabase
          .from("pricing_plans")
          .select("*")
          .order("display_order", { ascending: true })

        if (error) throw error

        setPlans(data || [])
      } catch (err: any) {
        console.error("Error al cargar planes de precios:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  return (
    <section className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes y Precios</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ofrecemos diferentes planes adaptados a las necesidades de tu negocio. Elige el que mejor se ajuste a tus
            objetivos.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error al cargar los planes: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-lg overflow-hidden ${
                  plan.is_popular
                    ? "border-2 border-primary shadow-lg scale-105 lg:scale-110 z-10 bg-white dark:bg-gray-800"
                    : "border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80"
                }`}
              >
                {plan.is_popular && (
                  <div className="bg-primary text-white text-center py-2 font-medium">Más Popular</div>
                )}
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.is_popular ? "" : "bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"}`}
                    size="lg"
                    asChild
                  >
                    <a href="#contact">{plan.button_text}</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
