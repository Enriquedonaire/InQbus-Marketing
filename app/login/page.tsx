"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import NetworkParticles from "@/components/network-particles"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Función para limpiar cualquier dato de autenticación existente
  const clearAuthData = () => {
    try {
      localStorage.removeItem("inqubus_auth")
    } catch (e) {
      console.error("Error al limpiar datos de autenticación:", e)
    }
  }

  // Limpiar datos de autenticación al cargar la página
  if (typeof window !== "undefined") {
    clearAuthData()
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validar credenciales hardcodeadas
      if (
        (username === "Enrique Andres Donaire" && password === "<Q2N41R3/98-40-31/>") ||
        (username === "Recruiter" && password === "Recruiter-Gest-2025")
      ) {
        // Determinar el rol basado en el username
        const role = username === "Enrique Andres Donaire" ? "admin" : "recruiter"

        // Guardar en localStorage
        try {
          localStorage.setItem("inqubus_auth", JSON.stringify({ username, role }))

          // Redirigir según el rol
          if (role === "admin") {
            router.push("/admin")
          } else {
            router.push("/")
          }
        } catch (storageError) {
          console.error("Error al guardar en localStorage:", storageError)
          setError("Error al guardar la sesión. Intente nuevamente.")
        }
      } else {
        setError("Credenciales inválidas. Por favor, intente nuevamente.")
      }
    } catch (err) {
      console.error("Error de login:", err)
      setError("Ocurrió un error durante el inicio de sesión. Por favor, intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <NetworkParticles />
      </div>

      <Card className="w-[350px] z-10 bg-black/80 border border-blue-900/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <img src="/inqubus-logo.png" alt="InQbus Logo" className="h-12" />
          </div>
          <CardTitle className="text-2xl text-center text-white">Acceso al Portal</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Ingrese sus credenciales para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-2 rounded">{error}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  Nombre de Usuario
                </Label>
                <Input
                  id="username"
                  placeholder="Ingrese su nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white"
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-900/50 border-gray-700 text-white"
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-center w-full text-gray-500">
            Acceso exclusivo para personal autorizado de InQbus Marketing
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
