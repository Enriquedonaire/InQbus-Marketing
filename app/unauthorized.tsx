import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">401</h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">No Autorizado</h3>

        <p className="mb-6 text-gray-600 dark:text-gray-400">Por favor inicia sesión para acceder a esta página.</p>

        <div className="flex flex-col space-y-4">
          <Link href="/login">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Iniciar sesión</Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
