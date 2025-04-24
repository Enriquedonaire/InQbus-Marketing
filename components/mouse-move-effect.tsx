"use client"

import { useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"

export default function MouseMoveEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 transition-opacity duration-300"
      style={{
        background: isDark
          ? `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
          : `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.1), transparent 80%)`,
        zIndex: 3, // Asignar un z-index bajo pero por encima de las partículas
      }}
    />
  )
}
