import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Home, CheckSquare, Users, BarChart, Settings } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function DashboardHeader() {
  return (
    <header className="bg-black/30 backdrop-blur-md border-b border-white/10 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="text-2xl font-bold text-white">
          In<span className="text-blue-500">Q</span>bus
        </div>
        <span className="text-sm text-white/70 px-2 py-1 bg-white/10 rounded">Dashboard</span>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeSwitcher />
        <Link href="/">
          <Button variant="ghost" className="text-white border border-white/10">
            Volver al sitio
          </Button>
        </Link>
      </div>
    </header>
  )
}

function DashboardSidebar() {
  return (
    <aside className="w-64 bg-black/20 backdrop-blur-md border-r border-white/10 p-6">
      <nav className="space-y-6">
        <div>
          <h3 className="text-white/70 uppercase text-xs font-semibold mb-3">General</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-400">
                  <Home className="h-5 w-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/todos">
                <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-400">
                  <CheckSquare className="h-5 w-5 mr-2" />
                  Tareas
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white/70 uppercase text-xs font-semibold mb-3">Marketing</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/contacts">
                <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-400">
                  <Users className="h-5 w-5 mr-2" />
                  Contactos
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/analytics">
                <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-400">
                  <BarChart className="h-5 w-5 mr-2" />
                  Analíticas
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white/70 uppercase text-xs font-semibold mb-3">Configuración</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard/settings">
                <Button variant="ghost" className="w-full justify-start text-white hover:text-blue-400">
                  <Settings className="h-5 w-5 mr-2" />
                  Ajustes
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
