"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search, RefreshCw } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("contacts")
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState<any[]>([])
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    fetchData()
  }, [activeTab])

  useEffect(() => {
    if (data.length > 0) {
      filterData()
    } else {
      setFilteredData([])
    }
  }, [searchTerm, data])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)

      const supabase = getSupabaseClient()
      let result

      switch (activeTab) {
        case "contacts":
          result = await supabase.from("contacts").select("*").order("created_at", { ascending: false })
          break
        case "audit_requests":
          result = await supabase.from("audit_requests").select("*").order("created_at", { ascending: false })
          break
        case "case_studies":
          result = await supabase.from("case_studies").select("*").order("created_at", { ascending: false })
          break
        case "services":
          result = await supabase.from("services").select("*").order("created_at", { ascending: false })
          break
        case "pricing_plans":
          result = await supabase.from("pricing_plans").select("*").order("created_at", { ascending: false })
          break
        case "todos":
          result = await supabase.from("todos").select("*").order("created_at", { ascending: false })
          break
        default:
          result = { data: [], error: null }
      }

      if (result.error) {
        console.error(`Error al cargar datos de ${activeTab}:`, result.error)
        setError(result.error.message || `Error al cargar datos de ${activeTab}`)
        setData([])
      } else {
        console.log(`Datos cargados de ${activeTab}:`, result.data)
        setData(result.data || [])
      }
    } catch (err: any) {
      console.error(`Error al cargar datos de ${activeTab}:`, err)
      setError(err.message || `Error al cargar datos de ${activeTab}`)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  function filterData() {
    if (!searchTerm.trim()) {
      setFilteredData(data)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    const filtered = data.filter((item) => {
      return Object.values(item).some((value) => {
        if (value === null || value === undefined) return false
        if (typeof value === "object") {
          return JSON.stringify(value).toLowerCase().includes(searchTermLower)
        }
        return String(value).toLowerCase().includes(searchTermLower)
      })
    })

    setFilteredData(filtered)
  }

  function formatCellValue(value: any): string {
    if (value === null || value === undefined) return ""

    if (typeof value === "object") {
      return JSON.stringify(value)
    }

    if (typeof value === "boolean") {
      return value ? "Sí" : "No"
    }

    if (typeof value === "string" && value.length > 100) {
      return value.substring(0, 100) + "..."
    }

    return String(value)
  }

  function formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900"}`}>
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Panel de Administración</h2>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Volver al sitio principal
          </Link>
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Gestión de Datos</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="contacts">Contactos</TabsTrigger>
                <TabsTrigger value="audit_requests">Auditorías</TabsTrigger>
                <TabsTrigger value="case_studies">Casos de Éxito</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
                <TabsTrigger value="pricing_plans">Planes</TabsTrigger>
                <TabsTrigger value="todos">Tareas</TabsTrigger>
              </TabsList>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-8 text-red-500">{error}</div>
              ) : filteredData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {data.length === 0
                    ? "No hay datos disponibles en esta tabla"
                    : "No se encontraron resultados para la búsqueda"}
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(filteredData[0])
                            .filter((key) => !key.includes("password"))
                            .map((column) => (
                              <TableHead key={column} className="whitespace-nowrap">
                                {column.replace(/_/g, " ")}
                              </TableHead>
                            ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {Object.entries(row)
                              .filter(([key]) => !key.includes("password"))
                              .map(([column, value]) => (
                                <TableCell key={column} className="max-w-[300px] truncate">
                                  {column.includes("date") || column.includes("_at")
                                    ? formatDate(value as string)
                                    : formatCellValue(value)}
                                </TableCell>
                              ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
              <div className="text-sm text-gray-500 mt-4">{filteredData.length} registros encontrados</div>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
