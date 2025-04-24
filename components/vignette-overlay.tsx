"use client"

import { useTheme } from "@/components/theme-provider"
import { useEffect, useState } from "react"

interface VignetteOverlayProps {
  intensity?: number // 0-100, controla la intensidad de la viñeta
  position?: "top-left" | "full" // Posición de la viñeta
  size?: number // Tamaño relativo de la viñeta (1-100)
}

export default function VignetteOverlay({ intensity = 70, position = "top-left", size = 70 }: VignetteOverlayProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Actualizar dimensiones al montar y en resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDimensions = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)

      return () => {
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [])

  // Calcular la opacidad basada en la intensidad y el tema
  // Aumentamos significativamente la opacidad para hacer la viñeta más oscura
  const maxOpacity = isDark ? (intensity / 100) * 0.95 : (intensity / 100) * 0.6

  // Crear un gradiente más complejo y oscuro para el vértice superior izquierdo
  const topLeftGradient = `
    radial-gradient(
      circle at top left, 
      rgba(0, 0, 0, ${maxOpacity}) 0%, 
      rgba(0, 0, 0, ${maxOpacity * 0.85}) ${size * 0.2}%, 
      rgba(0, 0, 0, ${maxOpacity * 0.7}) ${size * 0.4}%, 
      rgba(0, 0, 0, ${maxOpacity * 0.4}) ${size * 0.6}%, 
      rgba(0, 0, 0, 0) ${size}%
    )
  `

  // Estilos para diferentes posiciones de viñeta
  const gradientStyles = {
    "top-left": {
      background: topLeftGradient,
    },
    full: {
      background: `radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${maxOpacity}) 100%)`,
    },
  }

  // Reducir el z-index para que esté por debajo del contenido principal
  return <div className="fixed inset-0 pointer-events-none z-5" style={gradientStyles[position]} aria-hidden="true" />
}
