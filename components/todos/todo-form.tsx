"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { createTodo, updateTodo, getTodoById, type Todo } from "@/app/actions/todo-actions"

interface TodoFormProps {
  todoId?: string
}

export default function TodoForm({ todoId }: TodoFormProps) {
  const [loading, setLoading] = useState(false)
  const [loadingTodo, setLoadingTodo] = useState(!!todoId)
  const [error, setError] = useState<string | null>(null)
  const [todo, setTodo] = useState<Partial<Todo>>({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: null,
  })
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const router = useRouter()
  const isEditing = !!todoId && todoId !== "new"

  // Cargar la tarea si estamos editando
  useEffect(() => {
    if (todoId && todoId !== "new") {
      const fetchTodo = async () => {
        try {
          const result = await getTodoById(todoId)

          if (result.success) {
            setTodo(result.data)
          } else {
            setError(result.error || "Error al cargar la tarea")
          }
        } catch (err) {
          console.error("Error al cargar la tarea:", err)
          setError("Error al cargar la tarea. Por favor, inténtalo de nuevo más tarde.")
        } finally {
          setLoadingTodo(false)
        }
      }

      fetchTodo()
    } else {
      setLoadingTodo(false)
    }
  }, [todoId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)

      let result
      if (isEditing) {
        result = await updateTodo(todoId, formData)
      } else {
        result = await createTodo(formData)
      }

      if (result.success) {
        router.push("/dashboard/todos")
      } else {
        setError(result.error || `Error al ${isEditing ? "actualizar" : "crear"} la tarea`)
      }
    } catch (err) {
      console.error(`Error al ${isEditing ? "actualizar" : "crear"} la tarea:`, err)
      setError(`Error al ${isEditing ? "actualizar" : "crear"} la tarea. Por favor, inténtalo de nuevo más tarde.`)
    } finally {
      setLoading(false)
    }
  }

  // Formatear la fecha para el input date
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return ""
    return new Date(dateString).toISOString().split("T")[0]
  }

  if (loadingTodo) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-lg">Cargando tarea...</span>
      </div>
    )
  }

  return (
    <Card
      className={`${isDark ? "bg-black/50 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-sm max-w-2xl mx-auto`}
    >
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/todos")} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className={isDark ? "text-white" : "text-blue-900"}>
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className={`p-3 rounded ${isDark ? "bg-red-900/30" : "bg-red-100"} text-red-500`}>{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className={isDark ? "text-white" : "text-blue-900"}>
              Título *
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={todo.title}
              placeholder="Título de la tarea"
              required
              className={`${
                isDark
                  ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                  : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
              } focus:border-blue-500`}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={isDark ? "text-white" : "text-blue-900"}>
              Descripción
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={todo.description || ""}
              placeholder="Descripción detallada de la tarea"
              rows={4}
              className={`${
                isDark
                  ? "bg-black/30 border-white/10 text-white placeholder:text-gray-500"
                  : "bg-white/50 border-gray-200 text-gray-900 placeholder:text-gray-400"
              } focus:border-blue-500 resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className={isDark ? "text-white" : "text-blue-900"}>
                Estado
              </Label>
              <Select name="status" defaultValue={todo.status}>
                <SelectTrigger
                  className={`${
                    isDark ? "bg-black/30 border-white/10 text-white" : "bg-white/50 border-gray-200 text-gray-900"
                  }`}
                >
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className={isDark ? "text-white" : "text-blue-900"}>
                Prioridad
              </Label>
              <Select name="priority" defaultValue={todo.priority}>
                <SelectTrigger
                  className={`${
                    isDark ? "bg-black/30 border-white/10 text-white" : "bg-white/50 border-gray-200 text-gray-900"
                  }`}
                >
                  <SelectValue placeholder="Selecciona una prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date" className={isDark ? "text-white" : "text-blue-900"}>
              Fecha de vencimiento
            </Label>
            <Input
              id="due_date"
              name="due_date"
              type="date"
              defaultValue={formatDateForInput(todo.due_date || null)}
              className={`${
                isDark ? "bg-black/30 border-white/10 text-white" : "bg-white/50 border-gray-200 text-gray-900"
              } focus:border-blue-500`}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/todos")}
            className={isDark ? "border-white/20 text-white" : "border-gray-300 text-gray-700"}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEditing ? "Actualizando..." : "Guardando..."}
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {isEditing ? "Actualizar" : "Guardar"}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
