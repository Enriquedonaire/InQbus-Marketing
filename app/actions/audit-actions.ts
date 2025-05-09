"use server"

import { getActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitAuditRequest(formData: FormData) {
  try {
    const supabase = getActionSupabaseClient()

    // Extraer datos del formulario
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const website = formData.get("website") as string
    const message = (formData.get("message") as string) || null

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from("audit_requests")
      .insert({
        name,
        email,
        website,
        message,
        status: "pending",
      })
      .select()

    if (error) {
      console.error("Error al enviar la solicitud de auditoría:", error)
      return { success: false, message: "Error al enviar la solicitud. Por favor, inténtalo de nuevo." }
    }

    // Revalidar la página para actualizar los datos
    revalidatePath("/")

    return {
      success: true,
      message: "¡Solicitud enviada con éxito! Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.",
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    return {
      success: false,
      message: "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    }
  }
}
