"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function SubtleLightEffect() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si no está montado o si estamos en tema claro, no mostrar nada
  if (!mounted || !isDark) return null

  // Color azul para el tema oscuro con intensidad moderada
  const lightColor = "rgba(59, 130, 246, 0.28)" // Intensidad moderada
  const lightColorIntense = "rgba(59, 130, 246, 0.35)" // Versión ligeramente más intensa

  return (
    <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-4">
      {/* Efecto de luz principal - moderadamente extendido */}
      <motion.div
        animate={{
          opacity: [0.85, 1, 0.85], // Variación sutil de opacidad
          scale: [1, 1.03, 1], // Pulsación muy sutil
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[76px] right-0" // Posicionado justo donde termina el navbar
      >
        {/* Luz principal con extensión moderada */}
        <div
          className="w-[500px] h-[450px]" // Altura moderada
          style={{
            background: `radial-gradient(ellipse at top right, ${lightColorIntense} 0%, ${lightColor} 30%, transparent 75%)`,
            filter: "blur(50px)",
            transform: "translate(30%, -15%)", // Ajustado para proyectar moderadamente
          }}
        />
      </motion.div>

      {/* Capa adicional con movimiento sutil */}
      <motion.div
        animate={{
          opacity: [0.7, 0.9, 0.7], // Variación simple de opacidad
          x: [0, 8, 0], // Movimiento horizontal sutil
          y: [0, -5, 0], // Movimiento vertical sutil
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[76px] right-0"
      >
        <div
          className="w-[450px] h-[400px]" // Tamaño moderado
          style={{
            background: `radial-gradient(ellipse at top right, ${lightColorIntense} 0%, transparent 70%)`,
            filter: "blur(45px)",
            transform: "translate(25%, -10%) rotate(-3deg)", // Rotación muy sutil
          }}
        />
      </motion.div>

      {/* Capa extendida ligeramente hacia abajo */}
      <motion.div
        animate={{
          opacity: [0.6, 0.8, 0.6], // Variación simple
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[76px] right-0"
      >
        <div
          className="w-[400px] h-[550px]" // Extendido moderadamente
          style={{
            background: `radial-gradient(ellipse at top right, ${lightColor} 0%, transparent 80%)`,
            filter: "blur(55px)",
            transform: "translate(30%, -5%)", // Proyectado ligeramente hacia abajo
          }}
        />
      </motion.div>
    </div>
  )
}
