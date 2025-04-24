"use client"

import { motion } from "framer-motion"
import { Zap, Users, BarChart, Clock } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"

const features = [
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Results-Driven Approach",
    description: "We focus on measurable results that directly impact your business growth and ROI.",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Expert Team",
    description: "Our team of marketing specialists brings years of industry experience across various sectors.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-blue-500" />,
    title: "Data-Backed Strategies",
    description: "Every campaign is built on thorough research and analytics to ensure maximum effectiveness.",
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-500" />,
    title: "Timely Delivery",
    description: "We understand the importance of timing in marketing and always deliver on schedule.",
  },
]

export default function Features() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/10 to-black/0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? "text-white" : "text-blue-900"} mb-4`}>
            Why Choose <GradientText>InQbus</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            We're not just another marketing agency. Here's what sets us apart from the competition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 p-3 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
                {feature.icon}
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-blue-900"} mb-2`}>
                  {feature.title}
                </h3>
                <p className={isDark ? "text-gray-400" : "text-gray-600"}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
