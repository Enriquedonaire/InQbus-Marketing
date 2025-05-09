"use client"

import { useSearchParams } from "next/navigation"
import ContactForm from "@/components/contact-form"

export default function ClientContactWrapper() {
  // Este componente existe solo para usar useSearchParams() en un componente cliente
  // y evitar el error de hidratación
  const searchParams = useSearchParams()

  // Aquí podríamos usar searchParams si fuera necesario
  // const source = searchParams.get('source')

  return <ContactForm />
}
