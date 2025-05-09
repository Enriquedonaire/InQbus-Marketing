"use server"

import { getActionSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitContactForm(formData: FormData) {
  try {
    const supabase = getActionSupabaseClient()

    // Extraer datos del formulario
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const company = (formData.get("company") as string) || null
    const phone = (formData.get("phone") as string) || null
    const message = formData.get("message") as string

    // Obtener servicios seleccionados
    const servicesEntries = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("services"))
      .map(([_, value]) => value as string)

    // Insertar en la base de datos
    const { data, error } = await supabase
      .from("contacts")
      .insert({
        name,
        email,
        company,
        phone,
        message,
        services: servicesEntries.length > 0 ? servicesEntries : null,
        status: "pending",
      })
      .select()

    if (error) {
      console.error("Error al enviar el formulario:", error)
      return { success: false, message: "Error al enviar el formulario. Por favor, inténtalo de nuevo." }
    }

    // Revalidar la página para actualizar los datos
    revalidatePath("/")

    return {
      success: true,
      message: "¡Mensaje enviado con éxito! Nuestro equipo se pondrá en contacto contigo pronto.",
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    return {
      success: false,
      message: "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    }
  }
}
