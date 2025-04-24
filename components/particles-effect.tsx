"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "@/components/theme-provider"
import Particles from "react-particles"
import type { Container, Engine } from "tsparticles-engine"

// Tipos de efectos disponibles para usar en el código
export type ParticleEffectType = "network" | "gentle" | "colorful" | "space" | "minimal"

interface ParticlesEffectProps {
  id?: string
  className?: string
  effectType?: ParticleEffectType
  particleColor?: string
  linkColor?: string
}

export default function ParticlesEffect({
  id = "tsparticles",
  className = "h-full w-full",
  effectType = "network",
  particleColor,
  linkColor,
}: ParticlesEffectProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    const { loadSlim } = await import("tsparticles-slim")
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Opcional: hacer algo cuando las partículas se cargan
  }, [])

  // Colores predeterminados basados en el tema
  const defaultParticleColor = isDark ? "#ffffff" : "#1e293b"
  const defaultLinkColor = isDark ? "#ffffff" : "#1e293b"

  // Colores de gradiente para el efecto colorful
  const gradientColors = isDark
    ? ["#4ade80", "#06b6d4", "#a855f7", "#ec4899"]
    : ["#3b82f6", "#06b6d4", "#6366f1", "#8b5cf6"]

  // Configuraciones para diferentes tipos de efectos
  const effectConfigs = {
    network: {
      particles: {
        color: {
          value: particleColor || defaultParticleColor,
        },
        links: {
          color: linkColor || defaultLinkColor,
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "out",
          },
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
          value: 70,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.8,
              },
            },
          },
        },
      },
    },
    gentle: {
      particles: {
        color: {
          value: particleColor || defaultParticleColor,
        },
        links: {
          color: linkColor || defaultLinkColor,
          distance: 200,
          enable: true,
          opacity: 0.3,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 50,
        },
        opacity: {
          value: 0.4,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.5, max: 1.5 },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              distance: 250,
              size: 3,
              duration: 2,
              opacity: 0.8,
            },
          },
        },
      },
    },
    colorful: {
      particles: {
        color: {
          value: gradientColors,
        },
        links: {
          color: "random",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
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
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
      },
    },
    space: {
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 0.5,
        },
        move: {
          enable: true,
          speed: 0.2,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: {
          density: {
            enable: true,
            area: 1000,
          },
          value: 160,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.5,
          },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.1, max: 1 },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              distance: 200,
              size: 2,
              duration: 2,
              opacity: 1,
            },
          },
        },
      },
    },
    minimal: {
      particles: {
        color: {
          value: particleColor || defaultParticleColor,
        },
        links: {
          color: linkColor || defaultLinkColor,
          distance: 200,
          enable: true,
          opacity: 0.2,
          width: 0.3,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "out",
          },
        },
        number: {
          density: {
            enable: true,
            area: 1500,
          },
          value: 40,
        },
        opacity: {
          value: 0.3,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.5, max: 1 },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "connect",
            },
          },
          modes: {
            connect: {
              distance: 200,
              links: {
                opacity: 0.3,
              },
              radius: 120,
            },
          },
        },
      },
    },
  }

  // Seleccionar la configuración según el tipo de efecto
  const selectedConfig = effectConfigs[effectType] || effectConfigs.network

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
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        ...selectedConfig,
        detectRetina: true,
      }}
    />
  )
}
