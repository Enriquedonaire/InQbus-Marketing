"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from "@/components/admin/data-table"

export default function AdminPage() {
  const tables = ["users", "contacts", "audit_requests", "case_studies", "services", "pricing_plans", "todos"]

  const [activeTab, setActiveTab] = useState(tables[0])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Administración de Base de Datos</h1>

      <Tabs defaultValue={tables[0]} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap">
          {tables.map((table) => (
            <TabsTrigger key={table} value={table} className="capitalize">
              {table.replace(/_/g, " ")}
            </TabsTrigger>
          ))}
        </TabsList>

        {tables.map((table) => (
          <TabsContent key={table} value={table} className="border rounded-md">
            <div className="p-4 bg-muted mb-4">
              <h2 className="text-xl font-semibold capitalize">{table.replace(/_/g, " ")}</h2>
              <p className="text-sm text-muted-foreground">Mostrando hasta 100 registros de la tabla {table}</p>
            </div>
            <DataTable tableName={table} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
