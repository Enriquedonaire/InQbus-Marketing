"use server"

import { getActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

type ContactFormData = {
  name: string
  email: string
  company?: string | null
  phone?: string | null
  message: string
  services?: string[] | null
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const supabase = getActionSupabaseClient()

    // Insertar en la base de datos
    const { data: result, error } = await supabase
      .from("contacts")
      .insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        message: data.message,
        services: data.services || null,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error("Error al enviar el formulario:", error)
      throw new Error("Error al enviar el formulario. Por favor, inténtalo de nuevo.")
    }

    // Revalidar la página para actualizar los datos
    revalidatePath("/")

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nuestro equipo se pondrá en contacto contigo pronto.",
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    throw error
  }
}
