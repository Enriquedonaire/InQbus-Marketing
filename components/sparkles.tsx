"use client"

import { useEffect, useRef, useState } from "react"
import { useMousePosition } from "@/lib/hooks/use-mouse-position"

interface SparklesProps {
  id?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
  mouseForce?: number
  particleSpeed?: number // Added prop for controlling particle speed
}

export const SparklesCore = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = "h-full w-full",
  particleColor = "#FFFFFF",
  mouseForce = 100,
  particleSpeed = 1, // Default speed multiplier
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useMousePosition()
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    if (typeof window === "undefined") return

    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      connections: Particle[] = []

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * (maxSize - minSize) + minSize
        // Reducir la velocidad para un movimiento más flotante
        this.speedX = (Math.random() * 0.2 - 0.1) * particleSpeed
        this.speedY = (Math.random() * 0.2 - 0.1) * particleSpeed
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Rebote en los bordes con efecto suave
        if (this.x > canvas.width) {
          this.x = canvas.width
          this.speedX *= -0.5
        }
        if (this.x < 0) {
          this.x = 0
          this.speedX *= -0.5
        }
        if (this.y > canvas.height) {
          this.y = canvas.height
          this.speedY *= -0.5
        }
        if (this.y < 0) {
          this.y = 0
          this.speedY *= -0.5
        }

        // Mouse interaction con movimiento más suave
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseForce) {
          const angle = Math.atan2(dy, dx)
          // Reducir significativamente la fuerza para un movimiento más sutil
          const forceFactor = 0.05 * (1 - distance / mouseForce)
          this.x -= Math.cos(angle) * forceFactor
          this.y -= Math.sin(angle) * forceFactor
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Método para encontrar partículas cercanas y dibujar conexiones
      findConnections(particles: Particle[]) {
        this.connections = []
        for (const particle of particles) {
          if (particle === this) continue

          const dx = this.x - particle.x
          const dy = this.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Conectar partículas que estén a menos de 100px de distancia
          if (distance < 100) {
            this.connections.push(particle)
          }
        }
      }

      // Método para dibujar las conexiones
      drawConnections() {
        if (!ctx) return

        for (const particle of this.connections) {
          const dx = this.x - particle.x
          const dy = this.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Hacer que la opacidad dependa de la distancia
          const opacity = 1 - distance / 100

          ctx.strokeStyle = particleColor.replace(")", `, ${opacity})`)
          ctx.lineWidth = 0.3
          ctx.beginPath()
          ctx.moveTo(this.x, this.y)
          ctx.lineTo(particle.x, particle.y)
          ctx.stroke()
        }
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < particleDensity; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizar posiciones
      particles.forEach((particle) => {
        particle.update()
      })

      // Encontrar conexiones
      particles.forEach((particle) => {
        particle.findConnections(particles)
      })

      // Dibujar conexiones primero (para que estén detrás de las partículas)
      particles.forEach((particle) => {
        particle.drawConnections()
      })

      // Dibujar partículas
      particles.forEach((particle) => {
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      if (typeof window === "undefined") return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      init()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [maxSize, minSize, particleColor, particleDensity, mousePosition.x, mousePosition.y, mouseForce, particleSpeed])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background,
        width: dimensions.width,
        height: dimensions.height,
      }}
    />
  )
}
