"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function LightEntryEffect() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [mounted, setMounted] = useState(false)

  // Asegurarse de que el componente solo se renderice en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed top-0 right-0 w-full h-full pointer-events-none z-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-[76px] right-[70px] w-[500px] h-[500px]"
        style={{
          background: isDark
            ? `radial-gradient(circle at top right, 
                rgba(59, 130, 246, 0.3) 0%, 
                rgba(59, 130, 246, 0.15) 30%, 
                rgba(59, 130, 246, 0.05) 60%, 
                transparent 80%)`
            : `radial-gradient(circle at top right, 
                rgba(59, 130, 246, 0.2) 0%, 
                rgba(59, 130, 246, 0.1) 30%, 
                rgba(59, 130, 246, 0.03) 60%, 
                transparent 80%)`,
          filter: "blur(20px)",
          transform: "translate(50%, -50%) rotate(-45deg) scale(1.5)",
        }}
      />
    </div>
  )
}
