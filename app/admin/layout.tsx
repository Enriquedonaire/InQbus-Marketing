import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - InQbus Marketing",
  description: "Panel de administración de InQbus Marketing",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
