import type { ErrorInfo } from "react"

// This function can be expanded to send errors to a service like Sentry, LogRocket, etc.
export function logErrorToService(error: Error, errorInfo: ErrorInfo): void {
  // In development, log to console
  if (process.env.NODE_ENV !== "production") {
    console.group("%cError Caught by Error Boundary", "color: #ff0000; font-weight: bold;")
    console.error(error)
    console.error("Component Stack:", errorInfo.componentStack)
    console.groupEnd()
  }

  // In production, you would send to your error tracking service
  // Example for Sentry:
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.withScope((scope) => {
  //     scope.setExtras({ componentStack: errorInfo.componentStack })
  //     window.Sentry.captureException(error)
  //   })
  // }
}
