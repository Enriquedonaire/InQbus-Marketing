import { createServerComponentClient, createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

// Cliente para componentes del servidor
export const getServerSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

// Cliente para acciones del servidor
export const getActionSupabaseClient = () => {
  return createServerActionClient<Database>({ cookies })
}
