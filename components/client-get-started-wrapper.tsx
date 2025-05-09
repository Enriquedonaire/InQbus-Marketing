"use client"

import { useSearchParams } from "next/navigation"
import GetStartedForm from "@/components/get-started-form"

export default function ClientGetStartedWrapper() {
  // Este componente existe solo para usar useSearchParams() en un componente cliente
  // y evitar el error de hidratación
  const searchParams = useSearchParams()

  // Pasamos los searchParams al componente del formulario
  const selectedPackage = searchParams.get("package")

  return <GetStartedForm selectedPackage={selectedPackage} />
}
