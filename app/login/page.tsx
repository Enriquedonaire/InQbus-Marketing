"use client"

import type React from "react"

import { useState } from "react"
import { useTheme } from "@/components/theme-provider"
import NetworkParticles from "@/components/network-particles"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { setCookie } from "cookies-next"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Validación simple
    if (
      (username === "Enrique Andres Donaire" && password === "<Q2N41R3/98-40-31/>") ||
      (username === "Recruiter" && password === "Recruiter-Gest-2025")
    ) {
      // Activar el spinner de carga
      setLoading(true)

      // Determinar el rol
      const role = username === "Enrique Andres Donaire" ? "admin" : "recruiter"

      // Crear objeto de usuario
      const userData = {
        username,
        role,
      }

      // Guardar en localStorage y cookies para persistencia
      localStorage.setItem("inqubus_auth", JSON.stringify(userData))
      setCookie("inqubus_auth", JSON.stringify(userData), {
        maxAge: 60 * 60 * 24 * 7, // 7 días
        path: "/",
      })

      // Redirigir después de un breve retraso
      setTimeout(() => {
        // Redirigir con parámetros de autenticación para mostrar la notificación
        const redirectUrl = new URL(redirect, window.location.origin)
        redirectUrl.searchParams.set("auth", "true")
        redirectUrl.searchParams.set("user", username)
        redirectUrl.searchParams.set("role", role)
        window.location.href = redirectUrl.toString()
      }, 1500)
    } else {
      setError("Credenciales incorrectas")
    }
  }

  // Si está cargando, mostrar pantalla de carga con spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          <p className="text-white text-lg">Iniciando sesión...</p>
          <p className="text-gray-400 text-sm">Redirigiendo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NetworkParticles />
      </div>

      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg z-10 bg-black/80 border border-blue-900/50 backdrop-blur-sm text-white">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img src="/inqubus-logo.png" alt="InQbus Logo" className="h-12" />
          </div>
          <h1 className="text-2xl font-bold text-white">Acceso al Portal</h1>
          <p className="mt-2 text-sm text-gray-400">Ingrese sus credenciales para continuar</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Nombre de Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900/50 border-gray-700 text-white"
              placeholder="Ingrese su nombre de usuario"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900/50 border-gray-700 text-white"
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </div>
        </form>

        <div className="text-xs text-center text-gray-500">
          <p>Acceso exclusivo para personal autorizado de InQbus Marketing</p>
        </div>
      </div>
    </div>
  )
}
