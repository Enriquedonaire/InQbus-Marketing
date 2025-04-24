"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { BarChart, TrendingUp } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import GradientText from "@/components/gradient-text"
import { useTheme } from "@/components/theme-provider"

export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Función para desplazarse a una sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 76 // Altura aproximada de la navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className={isDark ? "text-white" : "text-blue-900"}>Elevate Your Brand with</span>{" "}
              <GradientText colors={["#3b82f6", "#06b6d4", "#6366f1", "#8b5cf6"]}>Strategic Marketing</GradientText>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${isDark ? "text-gray-400" : "text-gray-600"} text-xl mb-8 max-w-2xl mx-auto`}
          >
            We help businesses grow through data-driven marketing strategies, creative campaigns, and cutting-edge
            digital solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" variant="glow" className="px-8 group" onClick={() => scrollToSection("free-audit")}>
              <TrendingUp className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Get a Free Audit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`${isDark ? "text-white" : "text-blue-900"} border-blue-500 bg-blue-950/10 hover:bg-blue-500/20 group`}
              onClick={() => scrollToSection("case-studies")}
            >
              <BarChart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Case Studies
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated logo */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <AnimatedLogo />
      </div>
    </div>
  )
}

function AnimatedLogo() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
            In<span className="text-black">Q</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
