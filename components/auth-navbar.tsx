"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function AuthNavbar() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    try {
      const authData = localStorage.getItem("inqubus_auth")
      if (authData) {
        setUser(JSON.parse(authData))
      }
    } catch (e) {
      console.error("Error al leer de localStorage:", e)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("inqubus_auth")
      window.location.href = "/login"
    } catch (e) {
      console.error("Error al cerrar sesión:", e)
    }
  }

  if (!user) return null

  return (
    <div
      className={`fixed top-0 right-0 p-4 z-50 flex items-center space-x-4 ${isDark ? "text-white" : "text-gray-900"}`}
    >
      <span className="text-sm">Hola, {user.username}</span>
      {user.role === "admin" && (
        <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-500">
          Panel Admin
        </Link>
      )}
      <button
        onClick={handleLogout}
        className={`px-3 py-1 text-sm rounded border ${
          isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}
