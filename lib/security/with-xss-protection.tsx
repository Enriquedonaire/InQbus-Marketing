import type React from "react"
import { sanitizeObject } from "./sanitize"

/**
 * HOC que protege un componente contra ataques XSS sanitizando sus props
 * @param Component Componente a proteger
 * @returns Componente protegido
 */
export function withXssProtection<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  const ProtectedComponent: React.FC<P> = (props) => {
    // Sanitizar todas las props antes de pasarlas al componente
    const sanitizedProps = sanitizeObject(props) as P

    return <Component {...sanitizedProps} />
  }

  // Mantener el displayName para facilitar la depuración
  ProtectedComponent.displayName = `WithXssProtection(${Component.displayName || Component.name || "Component"})`

  return ProtectedComponent
}
