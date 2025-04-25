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

  // Mantenemos la opacidad alta en la esquina izquierda
  const cornerOpacity = isDark ? 0.95 : 0.7

  // Ajustamos los puntos de parada para que la transición sea más rápida hacia la derecha
  // Esto dará más margen claro al lado derecho
  const diagonalGradient = `
    radial-gradient(
      circle at top left, 
      rgba(0, 0, 0, ${cornerOpacity}) 0%, 
      rgba(0, 0, 0, ${cornerOpacity * 0.8}) 8%, 
      rgba(0, 0, 0, ${isDark ? 0.6 : 0.35}) 20%, 
      rgba(0, 0, 0, ${isDark ? 0.3 : 0.1}) 40%, 
      rgba(0, 0, 0, 0) 65%
    )
  `

  // Estilos para diferentes posiciones de viñeta
  const gradientStyles = {
    "top-left": {
      background: diagonalGradient,
    },
    full: {
      background: `radial-gradient(ellipse at center, rgba(0, 0, 0, ${cornerOpacity}) 0%, rgba(0, 0, 0, 0) 100%)`,
    },
  }

  // Usar un z-index bajo para que esté por debajo del contenido principal
  return <div className="fixed inset-0 pointer-events-none z-5" style={gradientStyles[position]} aria-hidden="true" />
}
