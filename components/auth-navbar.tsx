"use client"

import Link from "next/link"
import { useAuth } from "@/lib/context/auth-context"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { MoonIcon, SunIcon, UserIcon } from "lucide-react"

export function AuthNavbar() {
  const { user, signOut } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">
            In<span className="text-blue-600">Q</span>bus
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">{user.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={signOut}>
                Cerrar Sesión
              </Button>
              {user.role === "admin" && (
                <Button asChild size="sm">
                  <Link href="/admin">Panel Admin</Link>
                </Button>
              )}
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
