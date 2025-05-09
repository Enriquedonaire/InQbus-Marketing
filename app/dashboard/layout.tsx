"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ListTodo, BarChart3, Settings, LogOut } from "lucide-react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">InQbus Dashboard</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center p-2 rounded-lg ${
                  isActive("/dashboard") && !isActive("/dashboard/todos")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Home className="w-5 h-5 mr-2" />
                <span>Inicio</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/todos"
                className={`flex items-center p-2 rounded-lg ${
                  isActive("/dashboard/todos")
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <ListTodo className="w-5 h-5 mr-2" />
                <span>Tareas</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                <span>Admin</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings className="w-5 h-5 mr-2" />
                <span>Configuración</span>
              </Link>
            </li>
          </ul>
          <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="flex items-center p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span>Volver al sitio</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
