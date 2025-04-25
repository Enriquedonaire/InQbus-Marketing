"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function DeskLampEffect() {
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
      {/* Efecto de luz principal - cono de luz */}
      <motion.div
        animate={{
          rotate: [0, 1, -1, 0], // Movimiento de balanceo sutil
          x: [0, 5, -5, 0], // Pequeño movimiento horizontal
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[76px] right-[70px] origin-top"
      >
        {/* Cono de luz principal */}
        <div
          className="w-[400px] h-[600px]"
          style={{
            background: isDark
              ? `conic-gradient(
                  from 180deg at 50% 0%, 
                  transparent 310deg, 
                  rgba(59, 130, 246, 0.7) 330deg, 
                  rgba(59, 130, 246, 0.7) 390deg, 
                  transparent 410deg
                )`
              : `conic-gradient(
                  from 180deg at 50% 0%, 
                  transparent 310deg, 
                  rgba(59, 130, 246, 0.4) 330deg, 
                  rgba(59, 130, 246, 0.4) 390deg, 
                  transparent 410deg
                )`,
            filter: "blur(15px)",
            transform: "translateX(-50%)",
          }}
        />

        {/* Punto brillante en el origen (bombilla) */}
        <div
          className="absolute top-0 left-0 w-[30px] h-[30px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.8) 50%, transparent 100%)"
              : "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(59, 130, 246, 0.6) 50%, transparent 100%)",
            filter: "blur(5px)",
            transform: "translateX(-50%)",
            boxShadow: isDark ? "0 0 20px 10px rgba(59, 130, 246, 0.5)" : "0 0 20px 10px rgba(59, 130, 246, 0.3)",
          }}
        />

        {/* Reflejo en el suelo */}
        <div
          className="absolute top-[600px] left-0 w-[300px] h-[100px] opacity-50"
          style={{
            background: isDark
              ? "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>

      {/* Efecto de parpadeo sutil para simular fluctuación de la luz */}
      <motion.div
        animate={{
          opacity: [0.8, 1, 0.9, 1, 0.85, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
        className="absolute top-[76px] right-[70px] w-[400px] h-[600px]"
        style={{
          background: isDark
            ? `conic-gradient(
                from 180deg at 50% 0%, 
                transparent 320deg, 
                rgba(255, 255, 255, 0.2) 330deg, 
                rgba(255, 255, 255, 0.2) 390deg, 
                transparent 400deg
              )`
            : `conic-gradient(
                from 180deg at 50% 0%, 
                transparent 320deg, 
                rgba(255, 255, 255, 0.1) 330deg, 
                rgba(255, 255, 255, 0.1) 390deg, 
                transparent 400deg
              )`,
          filter: "blur(10px)",
          transform: "translateX(-50%)",
        }}
      />

      {/* Soporte de la lámpara (parte visual) */}
      <div
        className="absolute top-[40px] right-[70px] w-[10px] h-[36px]"
        style={{
          background: isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.2)",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  )
}
