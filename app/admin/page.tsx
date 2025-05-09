"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthNavbar from "@/components/auth-navbar"

export default function AdminPage() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar autenticación
    const authData = localStorage.getItem("inqubus_auth")
    if (!authData) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(authData)
    if (userData.role !== "admin") {
      router.push("/")
      return
    }

    setUser(userData)
    setLoading(false)
  }, [router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AuthNavbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[70vh]">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <p className="mb-4">
              Bienvenido, {user?.username}. Este es el panel de administración de InQbus Marketing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Solicitudes de Auditoría</h2>
                <p className="text-gray-600 dark:text-gray-400">Gestiona las solicitudes de auditoría gratuita.</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    12 nuevas solicitudes
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Mensajes de Contacto</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Revisa los mensajes enviados a través del formulario de contacto.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    5 mensajes sin leer
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-2">Casos de Éxito</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Administra los casos de éxito mostrados en la página principal.
                </p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    3 casos publicados
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
