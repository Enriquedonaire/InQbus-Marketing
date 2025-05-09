"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Particles from "react-particles"
import type { Container, Engine } from "tsparticles-engine"

interface NetworkParticlesProps {
  id?: string
  className?: string
}

export default function NetworkParticles({ id = "tsparticles", className = "h-full w-full" }: NetworkParticlesProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    // En lugar de loadFull, usaremos importaciones específicas para evitar problemas de versión
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Opcional: hacer algo cuando las partículas se cargan
  }, [])

  if (!mounted) return null

  return (
    <Particles
      id={id}
      className={className}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: isDark
              ? ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"]
              : ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"],
          },
          links: {
            color: {
              value: isDark ? "#ffffff" : "#1e293b",
            },
            distance: 150,
            enable: true,
            opacity: isDark ? 0.3 : 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8,
            straight: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: isDark ? 0.7 : 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
          collisions: {
            enable: true,
          },
        },
        detectRetina: true,
      }}
    />
  )
}
