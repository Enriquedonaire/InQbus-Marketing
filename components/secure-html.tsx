"use client"

import { useEffect, useRef } from "react"
import { sanitizeHtml } from "@/lib/security/sanitize"

interface SecureHtmlProps {
  html: string
  className?: string
}

/**
 * Componente para renderizar HTML sanitizado de forma segura
 */
export default function SecureHtml({ html, className = "" }: SecureHtmlProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Sanitizar el HTML antes de insertarlo
      const sanitizedHtml = sanitizeHtml(html)
      containerRef.current.innerHTML = sanitizedHtml

      // Desactivar scripts en el contenido renderizado
      const scripts = containerRef.current.querySelectorAll("script")
      scripts.forEach((script) => script.remove())

      // Desactivar eventos inline en el contenido renderizado
      const elements = containerRef.current.querySelectorAll("*")
      elements.forEach((el) => {
        // Eliminar atributos que comienzan con "on" (eventos)
        Array.from(el.attributes).forEach((attr) => {
          if (attr.name.startsWith("on")) {
            el.removeAttribute(attr.name)
          }
        })
      })
    }
  }, [html])

  return <div ref={containerRef} className={className} />
}
