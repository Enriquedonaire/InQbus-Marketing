"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { sanitizeObject } from "../security/sanitize"

interface UseSecureFormOptions<T> {
  schema: z.ZodType<T>
  onSubmit: (data: T) => Promise<void> | void
  initialValues?: Partial<T>
}

interface UseSecureFormResult<T> {
  values: Partial<T>
  errors: Record<string, string>
  isSubmitting: boolean
  isSubmitted: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  reset: () => void
}

/**
 * Hook para manejar formularios con validación segura
 * @param options Opciones del formulario
 * @returns Estado y manejadores del formulario
 */
export function useSecureForm<T extends Record<string, any>>({
  schema,
  onSubmit,
  initialValues = {},
}: UseSecureFormOptions<T>): UseSecureFormResult<T> {
  const [values, setValues] = useState<Partial<T>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    // Sanitizar el valor antes de guardarlo
    const sanitizedValue = type === "text" || type === "textarea" ? sanitizeObject({ value }).value : value

    setValues((prev) => ({ ...prev, [name]: sanitizedValue }))

    // Limpiar el error cuando el usuario modifica el campo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validar los datos con el esquema Zod
      const validatedData = schema.parse(values)

      // Llamar a la función onSubmit con los datos validados
      await onSubmit(validatedData)

      setIsSubmitted(true)
      setErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convertir errores de Zod a un formato más amigable
        const formattedErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          const path = err.path.join(".")
          formattedErrors[path] = err.message
        })
        setErrors(formattedErrors)
      } else {
        // Manejar otros tipos de errores
        console.error("Error en el formulario:", error)
        setErrors({ form: "Ha ocurrido un error al procesar el formulario." })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitted(false)
  }

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    reset,
  }
}
