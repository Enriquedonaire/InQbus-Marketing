import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 rounded-lg shadow-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">404</h2>

        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Página no encontrada</h3>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  )
}
