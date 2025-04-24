"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, BarChart, PieChart } from "lucide-react"

export function FloatingPaper({ count = 15 }) {
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    // Set client-side flag and initial dimensions
    setIsClient(true)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Icons for marketing agency theme
  const icons = [
    <FileText key="file" className="w-10 h-10 text-blue-400/70" />,
    <BarChart key="bar" className="w-10 h-10 text-blue-400/70" />,
    <PieChart key="pie" className="w-10 h-10 text-blue-400/70" />,
  ]

  // Generate deterministic initial positions with better distribution
  const getPosition = (index: number) => {
    const seed = index * 12345
    // Use a grid-like offset to avoid overlap
    const gridSize = Math.ceil(Math.sqrt(count))
    const row = Math.floor(index / gridSize)
    const col = index % gridSize
    const x = (col / gridSize + (seed % 1000) / 5000) * dimensions.width
    const y = (row / gridSize + ((seed * 56789) % 1000) / 5000) * dimensions.height
    return { x: Math.min(x, dimensions.width - 80), y: Math.min(y, dimensions.height - 96) } // Ensure papers stay in viewport
  }

  // Generate deterministic animation targets
  const getAnimationTargets = (index: number, axis: "x" | "y") => {
    const seed = index * (axis === "x" ? 67890 : 78901)
    const dimension = axis === "x" ? dimensions.width : dimensions.height
    return [
      ((seed % 1000) / 1000) * dimension,
      (((seed * 23456) % 1000) / 1000) * dimension,
      (((seed * 78901) % 1000) / 1000) * dimension,
    ].map((val) => Math.min(val, dimension - (axis === "x" ? 80 : 96))) // Keep within bounds
  }

  // Ensure even icon distribution
  const getIcon = (index: number) => {
    return icons[index % icons.length]
  }

  return (
    <div className="relative w-full h-full">
      {isClient &&
        Array.from({ length: count }).map((_, i) => {
          const { x: initialX, y: initialY } = getPosition(i)
          const xTargets = getAnimationTargets(i, "x")
          const yTargets = getAnimationTargets(i + 100, "y")

          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: initialX,
                y: initialY,
                rotate: 0,
              }}
              animate={{
                x: xTargets,
                y: yTargets,
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + (i % 5) * 3, // Faster, varied animation
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="relative w-20 h-24 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center transform hover:scale-110 transition-transform shadow-md">
                {getIcon(i)}
              </div>
            </motion.div>
          )
        })}
    </div>
  )
}
