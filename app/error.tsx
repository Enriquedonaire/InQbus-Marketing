"use client"

import { useEffect } from "react"
import { Button } from "../components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useTheme } from "../components/theme-provider"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Log the error to console in development
    if (process.env.NODE_ENV !== "production") {
      console.error("Next.js Error Page:", error)
    }
  }, [error])

  // Inline error display component instead of importing
  return (
    <div className="container mx-auto px-4 py-16">
      <div
        className={`p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8 ${
          isDark ? "bg-black/50 border border-white/10" : "bg-white/80 border border-gray-200"
        }`}
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}>Something went wrong</h2>
        </div>

        <div className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          <p className="mb-2">We apologize for the inconvenience. An unexpected error has occurred.</p>

          {process.env.NODE_ENV !== "production" && error && (
            <div className="mt-4">
              <p className="font-semibold mb-1">Error:</p>
              <pre
                className={`p-3 rounded overflow-auto text-sm ${
                  isDark ? "bg-black/30 text-red-400" : "bg-gray-100 text-red-600"
                }`}
              >
                {error.toString()}
              </pre>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={reset} variant="glow" className="flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            className={isDark ? "text-white" : "text-blue-900"}
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  )
}
