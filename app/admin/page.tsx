"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const [contacts, setContacts] = useState<any[]>([])
  const [audits, setAudits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Obtener contactos
        const { data: contactsData, error: contactsError } = await supabase
          .from("contacts")
          .select("*")
          .order("created_at", { ascending: false })

        if (contactsError) throw contactsError
        setContacts(contactsData || [])

        // Obtener solicitudes de auditoría
        const { data: auditsData, error: auditsError } = await supabase
          .from("audit_requests")
          .select("*")
          .order("created_at", { ascending: false })

        if (auditsError) throw auditsError
        setAudits(auditsData || [])
      } catch (error) {
        console.error("Error al cargar datos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>No tienes permisos para acceder a esta sección.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido, {user?.username}</CardTitle>
            <CardDescription>Panel de administración de InQbus Marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Desde aquí puedes gestionar los contactos y solicitudes de auditoría.</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList className="mb-4">
          <TabsTrigger value="contacts">Contactos ({contacts.length})</TabsTrigger>
          <TabsTrigger value="audits">Solicitudes de Auditoría ({audits.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : contacts.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">No hay contactos registrados.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{contact.name}</CardTitle>
                        <CardDescription>{contact.email}</CardDescription>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(contact.created_at).toLocaleDateString()}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {contact.company && (
                        <p>
                          <span className="font-medium">Empresa:</span> {contact.company}
                        </p>
                      )}
                      {contact.phone && (
                        <p>
                          <span className="font-medium">Teléfono:</span> {contact.phone}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Mensaje:</span> {contact.message}
                      </p>
                      {contact.status && (
                        <p>
                          <span className="font-medium">Estado:</span>{" "}
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded ${
                              contact.status === "new"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : contact.status === "in-progress"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {contact.status === "new"
                              ? "Nuevo"
                              : contact.status === "in-progress"
                                ? "En Progreso"
                                : "Completado"}
                          </span>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="audits">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : audits.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">No hay solicitudes de auditoría registradas.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {audits.map((audit) => (
                <Card key={audit.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{audit.name}</CardTitle>
                        <CardDescription>{audit.email}</CardDescription>
                      </div>
                      <div className="text-sm text-gray-500">{new Date(audit.created_at).toLocaleDateString()}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {audit.company && (
                        <p>
                          <span className="font-medium">Empresa:</span> {audit.company}
                        </p>
                      )}
                      {audit.website && (
                        <p>
                          <span className="font-medium">Sitio web:</span> {audit.website}
                        </p>
                      )}
                      {audit.message && (
                        <p>
                          <span className="font-medium">Mensaje:</span> {audit.message}
                        </p>
                      )}
                      {audit.status && (
                        <p>
                          <span className="font-medium">Estado:</span>{" "}
                          <span
                            className={`inline-block px-2 py-1 text-xs rounded ${
                              audit.status === "new"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : audit.status === "in-progress"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {audit.status === "new"
                              ? "Nuevo"
                              : audit.status === "in-progress"
                                ? "En Progreso"
                                : "Completado"}
                          </span>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
