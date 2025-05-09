"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div
        className={`max-w-md w-full p-8 rounded-lg shadow-lg text-center ${
          isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"
        }`}
      >
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? "text-red-400" : "text-red-600"}`}>¡Algo salió mal!</h2>

        <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Ha ocurrido un error inesperado. Por favor, intente nuevamente.
        </p>

        <div className="flex flex-col space-y-4">
          <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white">
            Intentar nuevamente
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className={isDark ? "border-gray-700 text-gray-300" : "border-gray-300 text-gray-700"}
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
