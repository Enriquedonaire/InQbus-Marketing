"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Loader2 } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"
import { getSupabaseClient } from "@/lib/supabase/client"
import { SimpleErrorBoundary } from "@/components/simple-error-boundary"

// Tipo para los planes de precios
interface PricingPlan {
  id: string
  name: string
  price: string
  period: string | null
  description: string
  features: string[]
  button_text: string
  is_popular: boolean
  display_order: number | null
}

function PricingComponent() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPricingPlans = async () => {
      try {
        const supabase = getSupabaseClient()
        const { data, error } = await supabase
          .from("pricing_plans")
          .select("*")
          .order("display_order", { ascending: true })

        if (error) throw error

        setPricingPlans(data || [])
      } catch (err) {
        console.error("Error al cargar los planes de precios:", err)
        setError("No se pudieron cargar los planes de precios. Por favor, inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchPricingPlans()
  }, [])

  // Planes de precios de respaldo en caso de error o mientras se cargan
  const fallbackPricingPlans = [
    {
      id: "1",
      name: "Starter",
      price: "$999",
      period: "per month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Social media management (2 platforms)",
        "Basic SEO optimization",
        "Monthly performance report",
        "Email marketing (1 campaign/month)",
        "Basic content creation",
      ],
      button_text: "Get Started",
      is_popular: false,
      display_order: 1,
    },
    {
      id: "2",
      name: "Growth",
      price: "$2,499",
      period: "per month",
      description: "For businesses ready to accelerate their growth",
      features: [
        "Social media management (4 platforms)",
        "Advanced SEO strategy",
        "Weekly performance reports",
        "Email marketing (4 campaigns/month)",
        "Content creation & strategy",
        "PPC campaign management",
      ],
      button_text: "Choose Growth",
      is_popular: true,
      display_order: 2,
    },
    {
      id: "3",
      name: "Enterprise",
      price: "Custom",
      period: null,
      description: "Tailored solutions for large organizations",
      features: [
        "Comprehensive digital strategy",
        "Full-service marketing team",
        "Custom reporting dashboard",
        "Dedicated account manager",
        "Advanced analytics & insights",
        "Multi-channel campaign management",
      ],
      button_text: "Contact Sales",
      is_popular: false,
      display_order: 3,
    },
  ]

  // Usar planes de precios de respaldo si hay un error o no hay datos
  const displayPricingPlans = pricingPlans.length > 0 ? pricingPlans : fallbackPricingPlans

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
            Marketing <GradientText>Packages</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Choose the marketing package that aligns with your business goals and budget.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-lg">Cargando planes de precios...</span>
          </div>
        ) : error ? (
          <div className={`text-center p-6 rounded-lg ${isDark ? "bg-red-900/20" : "bg-red-100"} text-red-500 mb-8`}>
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayPricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <Card
                  className={`${
                    isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"
                  } backdrop-blur-sm flex flex-col w-full ${
                    plan.is_popular ? "border-blue-500 shadow-lg shadow-blue-500/20" : ""
                  }`}
                >
                  {plan.is_popular && (
                    <div className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="relative">
                    <CardTitle className={`${isDark ? "text-white" : "text-blue-900"} text-2xl`}>{plan.name}</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className={`text-3xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className={`${isDark ? "text-gray-400" : "text-gray-600"} ml-1`}>{plan.period}</span>
                      )}
                    </div>
                    <CardDescription className={`${isDark ? "text-gray-400" : "text-gray-600"} mt-2`}>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {Array.isArray(plan.features) ? (
                        plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <span className={isDark ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No features available</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.is_popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : `${isDark ? "bg-black/60 hover:bg-black/80 text-white" : "bg-white/60 hover:bg-white/80 text-blue-900"} border ${isDark ? "border-white/20" : "border-blue-900/20"}`
                      }`}
                    >
                      {plan.button_text}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default function PricingWithSupabase() {
  return (
    <SimpleErrorBoundary>
      <PricingComponent />
    </SimpleErrorBoundary>
  )
}
