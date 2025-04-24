"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Particles from "react-particles"
import type { Container, Engine } from "tsparticles-engine"
import ParticleConfigSelector from "./particle-config-selector"

interface AdvancedParticlesProps {
  id?: string
  className?: string
  showControls?: boolean
}

export default function AdvancedParticles({
  id = "tsparticles",
  className = "h-full w-full",
  showControls = false,
}: AdvancedParticlesProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    // Configuración inicial
    setConfig({
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#1e293b",
        },
        links: {
          color: isDark ? "#ffffff" : "#1e293b",
          distance: 150,
          enable: true,
          opacity: 0.5,
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
          value: 0.7,
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
    })
  }, [isDark])

  const particlesInit = useCallback(async (engine: Engine) => {
    // En lugar de loadFull, usaremos importaciones específicas para evitar problemas de versión
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Opcional: hacer algo cuando las partículas se cargan
  }, [])

  const handleConfigChange = (newConfig: any) => {
    setConfig(newConfig)
  }

  if (!mounted || !config) return null

  return (
    <div className="relative w-full h-full">
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
          ...config,
          detectRetina: true,
        }}
      />

      {showControls && (
        <div className="absolute top-4 right-4 z-10 w-64">
          <ParticleConfigSelector onConfigChange={handleConfigChange} />
        </div>
      )}
    </div>
  )
}
