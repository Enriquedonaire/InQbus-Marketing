"use client"

import { useEffect, useState } from "react"
import { getTodos, updateTodoStatus, deleteTodo, type Todo } from "@/app/actions/todo-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, Clock, AlertTriangle, Trash, Edit, Calendar } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useTheme } from "@/components/theme-provider"
import { useRouter } from "next/navigation"

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const router = useRouter()

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)
        const result = await getTodos()

        if (result.success) {
          setTodos(result.data)
        } else {
          setError(result.error || "Error al cargar las tareas")
        }
      } catch (err) {
        console.error("Error al cargar las tareas:", err)
        setError("Error al cargar las tareas. Por favor, inténtalo de nuevo más tarde.")
      } finally {
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const result = await updateTodoStatus(id, newStatus)

      if (result.success) {
        // Actualizar la lista de tareas localmente
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo)))
      } else {
        setError(result.error || "Error al actualizar el estado de la tarea")
      }
    } catch (err) {
      console.error("Error al actualizar el estado de la tarea:", err)
      setError("Error al actualizar el estado de la tarea. Por favor, inténtalo de nuevo más tarde.")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        const result = await deleteTodo(id)

        if (result.success) {
          // Eliminar la tarea de la lista local
          setTodos(todos.filter((todo) => todo.id !== id))
        } else {
          setError(result.error || "Error al eliminar la tarea")
        }
      } catch (err) {
        console.error("Error al eliminar la tarea:", err)
        setError("Error al eliminar la tarea. Por favor, inténtalo de nuevo más tarde.")
      }
    }
  }

  const handleEdit = (id: string) => {
    router.push(`/dashboard/todos/${id}`)
  }

  // Función para obtener el color de la prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completada"
      case "in-progress":
        return "En progreso"
      case "pending":
        return "Pendiente"
      default:
        return status
    }
  }

  // Función para obtener el texto de la prioridad
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "Alta"
      case "medium":
        return "Media"
      case "low":
        return "Baja"
      default:
        return priority
    }
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Sin fecha"
    return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es })
  }

  // Función para obtener el icono del estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-lg">Cargando tareas...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`text-center p-6 rounded-lg ${isDark ? "bg-red-900/20" : "bg-red-100"} text-red-500 mb-8`}>
        {error}
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className={`text-center p-6 rounded-lg ${isDark ? "bg-blue-900/20" : "bg-blue-100"} mb-8`}>
        <p className={isDark ? "text-white" : "text-blue-900"}>No hay tareas disponibles. ¡Crea una nueva tarea!</p>
        <Button className="mt-4" onClick={() => router.push("/dashboard/todos/new")}>
          Crear nueva tarea
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}>Lista de Tareas</h2>
        <Button onClick={() => router.push("/dashboard/todos/new")} className="bg-blue-600 hover:bg-blue-700">
          Nueva Tarea
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className={`${isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-sm hover:shadow-md transition-all`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className={isDark ? "text-white" : "text-blue-900"}>{todo.title}</CardTitle>
                <Badge className={`${getStatusColor(todo.status)} text-white`}>{getStatusText(todo.status)}</Badge>
              </div>
              <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(todo.due_date)}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`${isDark ? "text-gray-300" : "text-gray-700"} mb-4`}>
                {todo.description || "Sin descripción"}
              </p>
              <div className="flex items-center">
                <span className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm mr-2`}>Prioridad:</span>
                <Badge className={`${getPriorityColor(todo.priority)} text-white`}>
                  {getPriorityText(todo.priority)}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(todo.id)}
                  className={isDark ? "text-white border-white/20" : "text-blue-900 border-blue-900/20"}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(todo.id)}
                  className={isDark ? "text-red-400 border-red-400/20" : "text-red-600 border-red-600/20"}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
              <div>
                {todo.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(todo.id, "completed")}
                    className={isDark ? "text-green-400 border-green-400/20" : "text-green-600 border-green-600/20"}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completar
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
