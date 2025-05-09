"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { LogOut, User, Shield } from "lucide-react"

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
      console.error("Error al leer localStorage:", e)
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
      className={`fixed top-0 right-0 p-4 z-50 flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-bl-lg ${
        isDark ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="flex items-center">
        <User className="h-4 w-4 mr-2 text-gray-400" />
        <span className="text-sm text-gray-300">{user.username}</span>
        {user.role === "admin" && (
          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200">
            <Shield className="h-3 w-3 mr-1" />
            Admin
          </span>
        )}
      </div>

      {user.role === "admin" && (
        <Link href="/admin" className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
          Panel Admin
        </Link>
      )}

      <button onClick={handleLogout} className="flex items-center text-sm text-gray-300 hover:text-white">
        <LogOut className="h-4 w-4 mr-1" />
        Salir
      </button>
    </div>
  )
}
