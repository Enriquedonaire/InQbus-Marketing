"use client"

import { useState, useCallback } from "react"
import { logErrorToService } from "@/lib/error-logging"

interface ErrorState {
  hasError: boolean
  error: Error | null
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
  })

  const handleError = useCallback((error: Error) => {
    logErrorToService(error, { componentStack: "" })
    setErrorState({
      hasError: true,
      error,
    })
  }, [])

  const resetError = useCallback(() => {
    setErrorState({
      hasError: false,
      error: null,
    })
  }, [])

  return {
    ...errorState,
    handleError,
    resetError,
  }
}
