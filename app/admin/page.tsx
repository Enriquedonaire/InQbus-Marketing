"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import AuthNavbar from "@/components/auth-navbar"

export default function AdminPage() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    try {
      const authData = localStorage.getItem("inqubus_auth")
      if (authData) {
        const userData = JSON.parse(authData)
        setUser(userData)

        // Redirigir si no es admin
        if (userData.role !== "admin") {
          window.location.href = "/"
        }
      } else {
        // Redirigir si no hay datos de autenticación
        window.location.href = "/login"
      }
    } catch (e) {
      console.error("Error al verificar autenticación:", e)
      window.location.href = "/login"
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>
  }

  if (!user || user.role !== "admin") {
    return null // No debería llegar aquí debido a la redirección
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      <AuthNavbar />

      <header className={`py-4 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">
            In<span className="text-blue-600">Q</span>bus Admin
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-white shadow"}`}>
            <h3 className="text-lg font-medium mb-4">Estadísticas</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-500"}>Visitantes</span>
                <span>1,234</span>
              </li>
              <li className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-500"}>Solicitudes</span>
                <span>56</span>
              </li>
              <li className="flex justify-between">
                <span className={isDark ? "text-gray-400" : "text-gray-500"}>Conversiones</span>
                <span>12%</span>
              </li>
            </ul>
          </div>

          <div className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-white shadow"}`}>
            <h3 className="text-lg font-medium mb-4">Solicitudes Recientes</h3>
            <ul className="space-y-2">
              <li>Juan Pérez - Auditoría SEO</li>
              <li>María García - Campaña de Redes</li>
              <li>Carlos López - Rediseño Web</li>
            </ul>
          </div>

          <div className={`p-6 rounded-lg ${isDark ? "bg-gray-900" : "bg-white shadow"}`}>
            <h3 className="text-lg font-medium mb-4">Acciones Rápidas</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Ver Solicitudes
              </button>
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Gestionar Casos
              </button>
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded">
                Configuración
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Volver al sitio principal
          </Link>
        </div>
      </main>
    </div>
  )
}
