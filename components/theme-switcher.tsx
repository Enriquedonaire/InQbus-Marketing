"use client"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-transparent hover:bg-transparent"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {theme === "dark" ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="absolute inset-0 h-6 w-6 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="absolute inset-0 h-6 w-6 text-blue-900" />
          </motion.div>
        )}
      </div>
    </Button>
  )
}
