"use client"

import { motion } from "framer-motion"
import { BarChart, Globe, TrendingUp, Search, MessageSquare, PenTool } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"

const services = [
  {
    icon: <Search className="h-10 w-10 text-blue-500" />,
    title: "SEO Optimization",
    description: "Boost your online visibility with our data-driven SEO strategies that drive organic traffic.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-blue-500" />,
    title: "Digital Marketing",
    description: "Comprehensive digital marketing campaigns that convert visitors into loyal customers.",
  },
  {
    icon: <PenTool className="h-10 w-10 text-blue-500" />,
    title: "Content Creation",
    description: "Engaging content that tells your brand story and resonates with your target audience.",
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-500" />,
    title: "Web Development",
    description: "Custom websites and applications designed to enhance your brand and drive conversions.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-blue-500" />,
    title: "Analytics & Insights",
    description: "Data-driven insights to optimize your marketing strategy and maximize ROI.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
    title: "Social Media Management",
    description: "Strategic social media campaigns that build community and increase brand awareness.",
  },
]

export default function Services() {
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
            Our <GradientText>Marketing Services</GradientText>
          </h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Comprehensive marketing solutions tailored to help your business grow and succeed in today's competitive
            landscape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={`${isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-sm hover:border-blue-500/50 transition-all`}
              >
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className={isDark ? "text-white" : "text-blue-900"}>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
