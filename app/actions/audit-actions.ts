"use server"

import { getActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

type AuditRequestData = {
  name: string
  email: string
  website: string
  message?: string | null
}

export async function submitAuditRequest(data: AuditRequestData) {
  try {
    const supabase = getActionSupabaseClient()

    // Insertar en la base de datos
    const { data: result, error } = await supabase
      .from("audit_requests")
      .insert({
        name: data.name,
        email: data.email,
        website: data.website,
        message: data.message || null,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error al enviar la solicitud de auditoría:", error)
      throw new Error("Error al enviar la solicitud. Por favor, inténtalo de nuevo.")
    }

    // Revalidar la página para actualizar los datos
    revalidatePath("/")

    return {
      success: true,
      message: "¡Solicitud enviada con éxito! Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.",
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    throw error
  }
}
