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

  // Usamos una combinación de gradientes para asegurar que la esquina inferior derecha sea completamente transparente
  const diagonalGradient = `
    linear-gradient(
      to bottom right,
      rgba(0, 0, 0, ${cornerOpacity}) 0%,
      rgba(0, 0, 0, ${isDark ? 0.7 : 0.4}) 15%,
      rgba(0, 0, 0, ${isDark ? 0.4 : 0.2}) 30%,
      rgba(0, 0, 0, ${isDark ? 0.2 : 0.05}) 45%,
      rgba(0, 0, 0, 0) 60%
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
