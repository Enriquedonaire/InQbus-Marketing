"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

const pricingPlans = [
  {
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
    buttonText: "Get Started",
    popular: false,
  },
  {
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
    buttonText: "Choose Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large organizations",
    features: [
      "Comprehensive digital strategy",
      "Full-service marketing team",
      "Custom reporting dashboard",
      "Dedicated account manager",
      "Advanced analytics & insights",
      "Multi-channel campaign management",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
]

export default function Pricing() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
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
                  plan.popular ? "border-blue-500 shadow-lg shadow-blue-500/20" : ""
                }`}
              >
                {plan.popular && (
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
                      <span className={isDark ? "text-gray-400" : "text-gray-600"} className="ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"} className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                        <span className={isDark ? "text-gray-300" : "text-gray-700"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/get-started" className="w-full">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : `${isDark ? "bg-black/60 hover:bg-black/80 text-white" : "bg-white/60 hover:bg-white/80 text-blue-900"} border ${isDark ? "border-white/20" : "border-blue-900/20"}`
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
