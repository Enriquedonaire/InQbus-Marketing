"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from "@/components/admin/data-table"
import { createClient } from "@supabase/supabase-js"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AdminPage() {
  const tables = ["contacts", "audit_requests", "case_studies", "services", "pricing_plans", "todos"]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <Tabs defaultValue={tables[0]}>
        <TabsList className="mb-8 flex flex-wrap">
          {tables.map((table) => (
            <TabsTrigger key={table} value={table} className="capitalize">
              {table.replace(/_/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {tables.map((table) => (
          <TabsContent key={table} value={table}>
            <DataTable tableName={table} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
