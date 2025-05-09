"use server"

import { getActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

type GetStartedData = {
  name: string
  email: string
  package: string
  company?: string | null
  message?: string | null
}

export async function submitGetStartedRequest(data: GetStartedData) {
  try {
    const supabase = getActionSupabaseClient()

    // Insertar en la base de datos - usamos la tabla contacts pero con un status diferente
    const { data: result, error } = await supabase
      .from("contacts")
      .insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        message: data.message || null,
        services: [data.package], // Guardamos el paquete seleccionado como un servicio
        status: "get_started", // Usamos un status diferente para identificar que viene del formulario de Get Started
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error al enviar la solicitud:", error)
      throw new Error("Error al enviar la solicitud. Por favor, inténtalo de nuevo.")
    }

    // Revalidar la página para actualizar los datos
    revalidatePath("/get-started")

    return {
      success: true,
      message: "¡Solicitud enviada con éxito! Nuestro equipo se pondrá en contacto contigo pronto para comenzar.",
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    throw error
  }
}
