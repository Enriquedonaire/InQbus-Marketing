import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin - InQbus Marketing",
  description: "Panel de administración de InQbus Marketing",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">InQbus Admin</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al sitio
            </Link>
          </Button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
