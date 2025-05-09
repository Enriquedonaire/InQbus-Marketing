"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full p-8 rounded-lg shadow-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-2 text-red-600 dark:text-red-400">Error</h2>

            <p className="mb-6 text-gray-600 dark:text-gray-400">Ha ocurrido un error crítico en la aplicación.</p>

            <div className="flex flex-col space-y-4">
              <Button onClick={reset} className="bg-blue-600 hover:bg-blue-700 text-white">
                Intentar nuevamente
              </Button>

              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
