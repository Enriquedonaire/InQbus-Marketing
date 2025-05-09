"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createTodo, getTodoById, updateTodo } from "@/app/actions/todo-actions"
import Link from "next/link"
import { ArrowLeft, Save, Loader2 } from "lucide-react"

interface TodoFormProps {
  todoId?: string
}

export default function TodoForm({ todoId }: TodoFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loadingTodo, setLoadingTodo] = useState(!!todoId)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    due_date: "",
  })

  const isEditing = todoId && todoId !== "new"

  // Cargar datos si estamos editando
  useEffect(() => {
    async function fetchTodo() {
      if (!isEditing) {
        setLoadingTodo(false)
        return
      }

      try {
        const result = await getTodoById(todoId)
        if (result.success && result.data) {
          const todoData = result.data
          setTodo({
            title: todoData.title,
            description: todoData.description || "",
            status: todoData.status,
            priority: todoData.priority,
            due_date: todoData.due_date ? new Date(todoData.due_date).toISOString().split("T")[0] : "",
          })
        } else {
          setError(result.error || "Error al cargar la tarea")
        }
      } catch (err: any) {
        console.error("Error al obtener la tarea:", err)
        setError(`Error al obtener la tarea: ${err.message}`)
      } finally {
        setLoadingTodo(false)
      }
    }

    fetchTodo()
  }, [todoId, isEditing])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTodo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTodo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append("title", todo.title)
      formData.append("description", todo.description)
      formData.append("status", todo.status)
      formData.append("priority", todo.priority)
      formData.append("due_date", todo.due_date)

      let result
      if (isEditing) {
        result = await updateTodo(todoId, formData)
      } else {
        result = await createTodo(formData)
      }

      if (result.success) {
        setSuccess(isEditing ? "Tarea actualizada correctamente" : "Tarea creada correctamente")
        setTimeout(() => {
          router.push("/dashboard/todos")
        }, 1500)
      } else {
        setError(result.error || `Error al ${isEditing ? "actualizar" : "crear"} la tarea`)
      }
    } catch (err: any) {
      console.error(`Error al ${isEditing ? "actualizar" : "crear"} la tarea:`, err)
      setError(`Error al ${isEditing ? "actualizar" : "crear"} la tarea: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loadingTodo) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2 text-lg">Cargando tarea...</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Link href="/dashboard/todos" className="mr-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <CardTitle>{isEditing ? "Editar Tarea" : "Nueva Tarea"}</CardTitle>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              name="title"
              value={todo.title}
              onChange={handleChange}
              placeholder="Título de la tarea"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={todo.description}
              onChange={handleChange}
              placeholder="Descripción detallada de la tarea"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={todo.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En Progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select value={todo.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Selecciona una prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Fecha límite</Label>
              <Input id="due_date" name="due_date" type="date" value={todo.due_date} onChange={handleChange} />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Link href="/dashboard/todos">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
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
