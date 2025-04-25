"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function EnhancedLightEffect() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-4">
      {/* Efecto principal desde el switch de temas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[76px] right-[70px] w-[600px] h-[600px]"
        style={{
          background: isDark
            ? `radial-gradient(ellipse at top right, 
                rgba(59, 130, 246, 0.4) 0%, 
                rgba(59, 130, 246, 0.2) 20%, 
                rgba(59, 130, 246, 0.1) 40%, 
                rgba(59, 130, 246, 0.05) 60%, 
                transparent 80%)`
            : `radial-gradient(ellipse at top right, 
                rgba(59, 130, 246, 0.25) 0%, 
                rgba(59, 130, 246, 0.15) 20%, 
                rgba(59, 130, 246, 0.08) 40%, 
                rgba(59, 130, 246, 0.03) 60%, 
                transparent 80%)`,
          filter: "blur(30px)",
          transform: "translate(30%, -30%) rotate(-45deg) scale(1.5)",
        }}
      />

      {/* Efecto secundario más pequeño y brillante */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-[76px] right-[70px] w-[200px] h-[200px]"
        style={{
          background: isDark
            ? `radial-gradient(circle at top right, 
                rgba(99, 102, 241, 0.6) 0%, 
                rgba(99, 102, 241, 0.3) 40%, 
                transparent 80%)`
            : `radial-gradient(circle at top right, 
                rgba(99, 102, 241, 0.4) 0%, 
                rgba(99, 102, 241, 0.2) 40%, 
                transparent 80%)`,
          filter: "blur(15px)",
          transform: "translate(50%, -50%) scale(1.2)",
        }}
      />

      {/* Rayos de luz extendidos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[76px] right-[70px] w-[800px] h-[800px]"
        style={{
          background: isDark
            ? `conic-gradient(
                from 225deg at 70% 30%,
                transparent 0deg,
                rgba(59, 130, 246, 0.15) 90deg,
                rgba(99, 102, 241, 0.2) 180deg,
                rgba(139, 92, 246, 0.15) 270deg,
                transparent 360deg
              )`
            : `conic-gradient(
                from 225deg at 70% 30%,
                transparent 0deg,
                rgba(59, 130, 246, 0.1) 90deg,
                rgba(99, 102, 241, 0.15) 180deg,
                rgba(139, 92, 246, 0.1) 270deg,
                transparent 360deg
              )`,
          filter: "blur(40px)",
          transform: "translate(20%, -20%) scale(1.5)",
        }}
      />
    </div>
  )
}
