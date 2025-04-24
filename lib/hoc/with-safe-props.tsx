import type React from "react"
import { useSafeProps } from "@/lib/hooks/use-safe-props"

// This HOC wraps components to ensure they don't receive Tailwind classes as props
export function withSafeProps<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  const SafeComponent = (props: P) => {
    const safeProps = useSafeProps(props)
    return <Component {...safeProps} />
  }

  // Set display name for better debugging
  SafeComponent.displayName = `WithSafeProps(${Component.displayName || Component.name || "Component"})`

  return SafeComponent
}
