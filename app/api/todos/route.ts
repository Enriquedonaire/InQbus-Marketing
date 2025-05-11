import { getServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getServerSupabaseClient()
    const { data, error } = await supabase.from("todos").select("*").order("due_date", { ascending: true })

    if (error) {
      console.error("Error al obtener tareas:", error)
      return NextResponse.json({ success: false, error: "Error al obtener las tareas" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error en la ruta de API:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}
