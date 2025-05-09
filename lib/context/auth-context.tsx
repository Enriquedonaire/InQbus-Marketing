"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import type { Database } from "@/lib/supabase/database.types"

type User = {
  id: string
  username: string
  role: "admin" | "recruiter"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  isAdmin: false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        // Verificar si hay información en localStorage (fallback)
        const localAuth = localStorage.getItem("inqubus_auth")
        if (localAuth) {
          const { username, role } = JSON.parse(localAuth)
          setUser({
            id: "local-id",
            username,
            role: role as "admin" | "recruiter",
          })
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  const signOut = async () => {
    localStorage.removeItem("inqubus_auth")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
