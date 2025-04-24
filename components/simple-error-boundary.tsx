"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "./ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { useTheme } from "./theme-provider"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

// Simple error display component
function SimpleErrorDisplay({ error, onReset }: { error: Error | null; onReset: () => void }) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
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
        <Button onClick={onReset} variant="glow" className="flex items-center">
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
  )
}

export class SimpleErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console in development
    if (process.env.NODE_ENV !== "production") {
      console.error("Error caught by ErrorBoundary:", error)
      console.error("Component stack:", errorInfo.componentStack)
    }
  }

  reset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error display
      return <SimpleErrorDisplay error={this.state.error} onReset={this.reset} />
    }

    // When there's no error, render children normally
    return this.props.children
  }
}
