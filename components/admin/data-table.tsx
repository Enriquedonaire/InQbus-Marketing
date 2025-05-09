"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface DataTableProps {
  tableName: string
}

export default function DataTable({ tableName }: DataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [columns, setColumns] = useState<string[]>([])
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase.from(tableName).select("*").limit(100)

        if (error) throw error

        setData(data || [])

        // Extract column names from the first row
        if (data && data.length > 0) {
          setColumns(Object.keys(data[0]))
        }
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError(err.message || "Error al cargar los datos")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tableName, supabase])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-500 rounded-md">
        <p>Error: {error}</p>
        <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
          Reintentar
        </Button>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return <p className="p-4 text-muted-foreground">No hay datos en esta tabla.</p>
  }

  // Function to format cell values
  const formatCellValue = (value: any) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "object") return JSON.stringify(value)
    return String(value)
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            {columns.map((column) => (
              <th key={column} className="p-2 text-left text-xs font-medium text-muted-foreground border">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b hover:bg-muted/50">
              {columns.map((column) => (
                <td key={`${rowIndex}-${column}`} className="p-2 text-sm border truncate max-w-[200px]">
                  {formatCellValue(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
