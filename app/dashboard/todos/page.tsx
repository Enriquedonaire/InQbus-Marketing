"use client"

import { useState, useEffect } from "react"
import { getTodos, updateTodoStatus, deleteTodo } from "@/app/actions/todo-actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Trash, Edit, Plus, CheckSquare, Square } from "lucide-react"

export default function TodosPage() {
  const [todos, setTodos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("due_date")

  useEffect(() => {
    loadTodos()
  }, [])

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

  async function handleStatusToggle(id: string, currentStatus: string) {
    try {
      const newStatus = currentStatus === "completed" ? "pending" : "completed"
      const result = await updateTodoStatus(id, newStatus)

      if (result.success) {
        // Actualizar el estado local
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo)))
      } else {
        console.error("Error al actualizar el estado:", result.error)
      }
    } catch (err) {
      console.error("Error al actualizar el estado:", err)
    }
  }

  async function handleDelete(id: string) {
    if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      try {
        const result = await deleteTodo(id)
        if (result.success) {
          // Actualizar el estado local
          setTodos(todos.filter((todo) => todo.id !== id))
        } else {
          console.error("Error al eliminar la tarea:", result.error)
        }
      } catch (err) {
        console.error("Error al eliminar la tarea:", err)
      }
    }
  }

  // Filtrar tareas
  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true
    return todo.status === filter
  })

  // Ordenar tareas
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === "due_date") {
      if (!a.due_date) return 1
      if (!b.due_date) return -1
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return (
        priorityOrder[a.priority as keyof typeof priorityOrder] -
        priorityOrder[b.priority as keyof typeof priorityOrder]
      )
    } else {
      return 0
    }
  })

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Tareas</h1>
        <Link href="/dashboard/todos/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
            Todas
          </Button>
          <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")} size="sm">
            Pendientes
          </Button>
          <Button
            variant={filter === "in-progress" ? "default" : "outline"}
            onClick={() => setFilter("in-progress")}
            size="sm"
          >
            En Progreso
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
            size="sm"
          >
            Completadas
          </Button>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button
            variant={sortBy === "due_date" ? "default" : "outline"}
            onClick={() => setSortBy("due_date")}
            size="sm"
          >
            Ordenar por Fecha
          </Button>
          <Button
            variant={sortBy === "priority" ? "default" : "outline"}
            onClick={() => setSortBy("priority")}
            size="sm"
          >
            Ordenar por Prioridad
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      ) : sortedTodos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">No hay tareas que mostrar</p>
          <Link href="/dashboard/todos/new">
            <Button>Crear una nueva tarea</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTodos.map((todo) => (
            <Card key={todo.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">{todo.title}</CardTitle>
                  <Badge
                    className={
                      todo.priority === "high"
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : todo.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                    }
                  >
                    {todo.priority}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{todo.description || "Sin descripción"}</p>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{todo.due_date ? new Date(todo.due_date).toLocaleDateString() : "Sin fecha límite"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Badge
                    className={
                      todo.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : todo.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {todo.status === "completed"
                      ? "Completada"
                      : todo.status === "in-progress"
                        ? "En Progreso"
                        : "Pendiente"}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t">
                <Button variant="ghost" size="sm" onClick={() => handleStatusToggle(todo.id, todo.status)}>
                  {todo.status === "completed" ? (
                    <>
                      <CheckSquare className="h-4 w-4 mr-1" /> Marcar como pendiente
                    </>
                  ) : (
                    <>
                      <Square className="h-4 w-4 mr-1" /> Marcar como completada
                    </>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Link href={`/dashboard/todos/${todo.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(todo.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
