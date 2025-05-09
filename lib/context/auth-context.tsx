"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  username: string
  role: "admin" | "recruiter"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (username: string, password: string) => Promise<{ success: boolean; message: string }>
  signOut: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ success: false, message: "No implementado" }),
  signOut: () => {},
  isAdmin: false,
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Credenciales hardcodeadas para demostración
  const validCredentials = [
    {
      username: "Enrique Andres Donaire",
      password: "<Q2N41R3/98-40-31/>",
      role: "admin",
    },
    {
      username: "Recruiter",
      password: "Recruiter-Gest-2025",
      role: "recruiter",
    },
  ]

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar
    const storedUser = localStorage.getItem("inqubus_auth")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user:", error)
      }
    }
    setLoading(false)
  }, [])

  const signIn = async (username: string, password: string) => {
    // Verificar credenciales
    const matchedUser = validCredentials.find((cred) => cred.username === username && cred.password === password)

    if (matchedUser) {
      const userData = {
        id: `user-${Date.now()}`,
        username: matchedUser.username,
        role: matchedUser.role as "admin" | "recruiter",
      }
      setUser(userData)
      localStorage.setItem("inqubus_auth", JSON.stringify(userData))
      return { success: true, message: "Inicio de sesión exitoso" }
    }

    return { success: false, message: "Credenciales inválidas" }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("inqubus_auth")
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
