"use server"

import { getActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Tipo para las tareas
export type Todo = {
  id: string
  title: string
  description: string | null
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date: string | null
  user_id: string | null
  created_at: string
  updated_at: string
}

// Obtener todas las tareas
export async function getTodos() {
  try {
    const supabase = getActionSupabaseClient()
    const { data, error } = await supabase.from("todos").select("*").order("due_date", { ascending: true })

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error("Error al obtener las tareas:", error)
    return { success: false, error: "Error al obtener las tareas" }
  }
}

// Obtener una tarea por ID
export async function getTodoById(id: string) {
  try {
    const supabase = getActionSupabaseClient()
    const { data, error } = await supabase.from("todos").select("*").eq("id", id).single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error)
    return { success: false, error: "Error al obtener la tarea" }
  }
}

// Crear una nueva tarea
export async function createTodo(formData: FormData) {
  try {
    const supabase = getActionSupabaseClient()

    // Extraer datos del formulario
    const title = formData.get("title") as string
    const description = (formData.get("description") as string) || null
    const status = (formData.get("status") as string) || "pending"
    const priority = (formData.get("priority") as string) || "medium"
    const dueDateStr = formData.get("due_date") as string
    const due_date = dueDateStr ? new Date(dueDateStr).toISOString() : null

    // Validar datos
    if (!title) {
      return { success: false, error: "El título es obligatorio" }
    }

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from("todos")
      .insert({
        title,
        description,
        status,
        priority,
        due_date,
      })
      .select()

    if (error) throw error

    // Revalidar la página para actualizar los datos
    revalidatePath("/dashboard/todos")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error("Error al crear la tarea:", error)
    return { success: false, error: "Error al crear la tarea" }
  }
}

// Actualizar una tarea existente
export async function updateTodo(id: string, formData: FormData) {
  try {
    const supabase = getActionSupabaseClient()

    // Extraer datos del formulario
    const title = formData.get("title") as string
    const description = (formData.get("description") as string) || null
    const status = formData.get("status") as string
    const priority = formData.get("priority") as string
    const dueDateStr = formData.get("due_date") as string
    const due_date = dueDateStr ? new Date(dueDateStr).toISOString() : null

    // Validar datos
    if (!title) {
      return { success: false, error: "El título es obligatorio" }
    }

    // Actualizar en la base de datos
    const { data, error } = await supabase
      .from("todos")
      .update({
        title,
        description,
        status,
        priority,
        due_date,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) throw error

    // Revalidar la página para actualizar los datos
    revalidatePath("/dashboard/todos")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error(`Error al actualizar la tarea con ID ${id}:`, error)
    return { success: false, error: "Error al actualizar la tarea" }
  }
}

// Eliminar una tarea
export async function deleteTodo(id: string) {
  try {
    const supabase = getActionSupabaseClient()

    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) throw error

    // Revalidar la página para actualizar los datos
    revalidatePath("/dashboard/todos")

    return { success: true }
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}:`, error)
    return { success: false, error: "Error al eliminar la tarea" }
  }
}

// Cambiar el estado de una tarea
export async function updateTodoStatus(id: string, status: string) {
  try {
    const supabase = getActionSupabaseClient()

    const { data, error } = await supabase
      .from("todos")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) throw error

    // Revalidar la página para actualizar los datos
    revalidatePath("/dashboard/todos")

    return { success: true, data: data[0] }
  } catch (error) {
    console.error(`Error al actualizar el estado de la tarea con ID ${id}:`, error)
    return { success: false, error: "Error al actualizar el estado de la tarea" }
  }
}
