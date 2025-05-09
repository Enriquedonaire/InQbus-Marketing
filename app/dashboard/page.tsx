"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getTodos } from "@/app/actions/todo-actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertTriangle, ListTodo } from "lucide-react"

export default function DashboardPage() {
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadTodos() {
      try {
        setLoading(true)
        const result = await getTodos()
        if (result.success) {
          setTodos(result.data || [])
        } else {
          setError(result.error || "Error al cargar las tareas")
        }
      } catch (err) {
        console.error("Error al cargar las tareas:", err)
        setError("Error al cargar las tareas")
      } finally {
        setLoading(false)
      }
    }

    loadTodos()
  }, [])

  // Calcular estadísticas
  const totalTasks = todos.length
  const completedTasks = todos.filter((todo) => todo.status === "completed").length
  const pendingTasks = todos.filter((todo) => todo.status === "pending").length
  const inProgressTasks = todos.filter((todo) => todo.status === "in-progress").length
  const highPriorityTasks = todos.filter((todo) => todo.priority === "high").length

  // Calcular tareas próximas a vencer (en los próximos 3 días)
  const today = new Date()
  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(today.getDate() + 3)

  const upcomingTasks = todos.filter((todo) => {
    if (!todo.due_date) return false
    const dueDate = new Date(todo.due_date)
    return dueDate <= threeDaysFromNow && dueDate >= today && todo.status !== "completed"
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/todos">
          <Button>Ver todas las tareas</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total de Tareas</CardTitle>
                <CardDescription>Todas las tareas registradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <ListTodo className="h-8 w-8 text-gray-500 mr-2" />
                  <span className="text-3xl font-bold">{totalTasks}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Tareas Completadas</CardTitle>
                <CardDescription>Tareas finalizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                  <span className="text-3xl font-bold">{completedTasks}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">En Progreso</CardTitle>
                <CardDescription>Tareas en curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-blue-500 mr-2" />
                  <span className="text-3xl font-bold">{inProgressTasks}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Alta Prioridad</CardTitle>
                <CardDescription>Tareas urgentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-500 mr-2" />
                  <span className="text-3xl font-bold">{highPriorityTasks}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tareas Próximas a Vencer</CardTitle>
                <CardDescription>Tareas que vencen en los próximos 3 días</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingTasks.length === 0 ? (
                  <p className="text-gray-500">No hay tareas próximas a vencer</p>
                ) : (
                  <ul className="space-y-2">
                    {upcomingTasks.map((task) => (
                      <li key={task.id} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-gray-500">
                              Vence: {new Date(task.due_date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                task.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : task.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen de Estado</CardTitle>
                <CardDescription>Distribución de tareas por estado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Pendientes</span>
                      <span>{pendingTasks} tareas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        style={{ width: `${totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>En Progreso</span>
                      <span>{inProgressTasks} tareas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Completadas</span>
                      <span>{completedTasks} tareas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
