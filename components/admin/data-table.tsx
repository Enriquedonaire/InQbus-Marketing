"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Search, RefreshCw } from "lucide-react"

interface DataTableProps {
  tableName: string
}

export default function DataTable({ tableName }: DataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [tableName])

  useEffect(() => {
    if (data.length > 0) {
      filterData()
    }
  }, [searchTerm, data])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)

      const supabase = getSupabaseClient()
      const { data, error } = await supabase.from(tableName).select("*")

      if (error) throw error

      if (data && data.length > 0) {
        setData(data)
        setColumns(Object.keys(data[0]).filter((col) => !col.includes("password")))
      } else {
        setData([])
        setColumns([])
      }
    } catch (err: any) {
      console.error(`Error al cargar datos de ${tableName}:`, err)
      setError(err.message || `Error al cargar datos de ${tableName}`)
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
      return columns.some((column) => {
        const value = item[column]
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

    return String(value)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl capitalize">{tableName.replace(/_/g, " ")}</CardTitle>
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
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No hay datos disponibles en esta tabla</div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((column) => (
                      <TableHead key={column} className="whitespace-nowrap">
                        {column.replace(/_/g, " ")}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((column) => (
                        <TableCell key={column} className="max-w-[300px] truncate">
                          {formatCellValue(row[column])}
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
      </CardContent>
    </Card>
  )
}
