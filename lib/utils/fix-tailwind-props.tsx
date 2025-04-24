import type React from "react"

// This function takes a component's props and returns a new props object
// with any Tailwind class props moved to the className prop
export function fixTailwindProps<T extends Record<string, any>>(props: T): T {
  const result = { ...props }
  const className = result.className || ""
  const classesToAdd: string[] = []

  // Check for common Tailwind class patterns used as props
  Object.keys(result).forEach((key) => {
    // If the key looks like a Tailwind class and has a boolean value
    if (/^(text|bg|p|m|w|h|flex|grid|border|rounded|shadow)-/.test(key) && typeof result[key] === "boolean") {
      if (result[key] === true) {
        classesToAdd.push(key)
      }
      delete result[key]
    }
  })

  // Add the classes to the className prop
  if (classesToAdd.length > 0) {
    result.className = `${className} ${classesToAdd.join(" ")}`.trim()
  }

  return result
}

// HOC to automatically fix Tailwind props
export function withFixedTailwindProps<P extends object>(Component: React.ComponentType<P>): React.FC<P> {
  const FixedComponent = (props: P) => {
    const fixedProps = fixTailwindProps(props)
    return <Component {...fixedProps} />
  }

  FixedComponent.displayName = `WithFixedTailwindProps(${Component.displayName || Component.name || "Component"})`

  return FixedComponent
}
