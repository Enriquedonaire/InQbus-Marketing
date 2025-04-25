import { z } from "zod"

/**
 * Esquema para validar datos de contacto
 */
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(100).trim(),
  company: z.string().max(100).trim().optional(),
  phone: z.string().max(20).trim().optional(),
  message: z.string().min(10).max(1000).trim(),
  services: z.array(z.string()).optional(),
})

/**
 * Esquema para validar datos de auditoría
 */
export const auditFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(100).trim(),
  website: z.string().url().max(200).trim(),
  message: z.string().max(1000).trim().optional(),
})

/**
 * Esquema para validar parámetros de URL
 */
export const urlParamsSchema = z.object({
  id: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
})

/**
 * Tipo para los datos de contacto validados
 */
export type ContactFormData = z.infer<typeof contactFormSchema>

/**
 * Tipo para los datos de auditoría validados
 */
export type AuditFormData = z.infer<typeof auditFormSchema>
