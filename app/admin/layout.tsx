import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Admin - Inqubus",
  description: "Panel de administración de la base de datos",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center text-sm font-medium mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al sitio
          </Link>
          <h1 className="text-lg font-semibold">Panel de Administración</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
