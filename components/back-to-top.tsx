"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Mostrar el botón cuando el usuario ha desplazado 300px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
            aria-label="Volver arriba"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
