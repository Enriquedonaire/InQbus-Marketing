import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckSquare, Users, BarChart, Calendar } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Tareas</CardTitle>
            <CardDescription className="text-gray-400">Gestión de tareas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-white">10</div>
              <CheckSquare className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <Link href="/dashboard/todos">
                <Button variant="ghost" className="w-full text-white border border-white/10 hover:bg-white/10">
                  Ver tareas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Contactos</CardTitle>
            <CardDescription className="text-gray-400">Leads y clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-white">24</div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-4">
              <Link href="/dashboard/contacts">
                <Button variant="ghost" className="w-full text-white border border-white/10 hover:bg-white/10">
                  Ver contactos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Analíticas</CardTitle>
            <CardDescription className="text-gray-400">Rendimiento del sitio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-white">+12%</div>
              <BarChart className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <Link href="/dashboard/analytics">
                <Button variant="ghost" className="w-full text-white border border-white/10 hover:bg-white/10">
                  Ver analíticas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Eventos</CardTitle>
            <CardDescription className="text-gray-400">Próximas actividades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-white">3</div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <Link href="/dashboard/events">
                <Button variant="ghost" className="w-full text-white border border-white/10 hover:bg-white/10">
                  Ver eventos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Tareas Recientes</CardTitle>
            <CardDescription className="text-gray-400">Últimas tareas creadas o actualizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Actualizar contenido SEO</h3>
                  <p className="text-gray-400 text-sm">Vence en 3 días</p>
                </div>
                <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Pendiente</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Preparar campaña de email</h3>
                  <p className="text-gray-400 text-sm">Vence en 7 días</p>
                </div>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">En progreso</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Analizar métricas de redes</h3>
                  <p className="text-gray-400 text-sm">Completada hace 2 días</p>
                </div>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">Completada</div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/dashboard/todos">
                <Button variant="ghost" className="w-full text-white border border-white/10 hover:bg-white/10">
                  Ver todas las tareas
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Contactos Recientes</CardTitle>
            <CardDescription className="text-gray-400">Últimos leads y mensajes recibidos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Juan Pérez</h3>
                  <p className="text-gray-400 text-sm">juan@empresa.com</p>
                </div>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Nuevo</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">María García</h3>
                  <p className="text-gray-400 text-sm">maria@startup.com</p>
                </div>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">Contactado</div>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">Carlos López</h3>
                  <p className="text-gray-400 text-sm">carlos@negocio.es</p>
                </div>
                <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Cliente</div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/dashboard/contacts">
                <Button variant="ghost" className="w-full text-white border border-white/10 hover:bg-white/10">
                  Ver todos los contactos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
