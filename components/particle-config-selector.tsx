"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "@/components/theme-provider"

interface ParticleConfigSelectorProps {
  onConfigChange: (config: any) => void
}

export default function ParticleConfigSelector({ onConfigChange }: ParticleConfigSelectorProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [selectedPreset, setSelectedPreset] = useState("network")
  const [particleCount, setParticleCount] = useState(80)
  const [linkDistance, setLinkDistance] = useState(150)
  const [speed, setSpeed] = useState(0.8)

  const presets = {
    network: {
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#1e293b",
        },
        links: {
          color: isDark ? "#ffffff" : "#1e293b",
          distance: linkDistance,
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
          speed: speed,
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
          value: particleCount,
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
      },
    },
    polygon: {
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#1e293b",
        },
        links: {
          color: isDark ? "#ffffff" : "#1e293b",
          distance: linkDistance,
          enable: true,
          opacity: 0.5,
          width: 1,
          triangles: {
            enable: true,
            opacity: 0.1,
          },
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: particleCount,
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
      },
    },
    nasa: {
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#1e293b",
        },
        links: {
          color: isDark ? "#ffffff" : "#1e293b",
          distance: linkDistance,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: speed,
          straight: false,
          path: {
            enable: true,
            delay: {
              value: 0.1,
            },
            options: {
              size: 5,
              draw: false,
              increment: 0.001,
            },
          },
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: particleCount,
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
      },
    },
  }

  const applyConfig = () => {
    const config = presets[selectedPreset as keyof typeof presets]
    onConfigChange(config)
  }

  return (
    <div
      className={`p-4 rounded-lg ${isDark ? "bg-black/50" : "bg-white/50"} backdrop-blur-sm border ${isDark ? "border-white/10" : "border-gray-200"}`}
    >
      <h3 className={`text-lg font-medium mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
        Configuración de Partículas
      </h3>

      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Tipo de Efecto
          </label>
          <Select value={selectedPreset} onValueChange={setSelectedPreset}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="network">Red Neuronal</SelectItem>
              <SelectItem value="polygon">Polígonos</SelectItem>
              <SelectItem value="nasa">Estilo NASA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Número de Partículas: {particleCount}
          </label>
          <Slider
            value={[particleCount]}
            min={20}
            max={200}
            step={1}
            onValueChange={(value) => setParticleCount(value[0])}
            className="my-2"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Distancia de Conexión: {linkDistance}px
          </label>
          <Slider
            value={[linkDistance]}
            min={50}
            max={300}
            step={10}
            onValueChange={(value) => setLinkDistance(value[0])}
            className="my-2"
          />
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Velocidad: {speed}
          </label>
          <Slider
            value={[speed * 10]}
            min={1}
            max={20}
            step={1}
            onValueChange={(value) => setSpeed(value[0] / 10)}
            className="my-2"
          />
        </div>

        <Button onClick={applyConfig} className="w-full">
          Aplicar Cambios
        </Button>
      </div>
    </div>
  )
}
