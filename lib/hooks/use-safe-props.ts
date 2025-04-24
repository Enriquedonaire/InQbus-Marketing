"use client"

import { useMemo } from "react"

// This hook helps prevent the "Received `true` for a non-boolean attribute" error
// by ensuring that Tailwind classes are properly used in className prop
export function useSafeProps<T extends Record<string, any>>(props: T): T {
  return useMemo(() => {
    const safeProps = { ...props }

    // List of common Tailwind class prefixes that might be mistakenly used as props
    const tailwindPrefixes = [
      "text-",
      "bg-",
      "p-",
      "m-",
      "w-",
      "h-",
      "flex-",
      "grid-",
      "border-",
      "rounded-",
      "shadow-",
      "opacity-",
      "z-",
      "transform-",
      "transition-",
      "hover:",
      "focus:",
      "active:",
      "disabled:",
      "dark:",
      "sm:",
      "md:",
      "lg:",
      "xl:",
    ]

    // Check each prop to see if it might be a Tailwind class
    Object.keys(safeProps).forEach((key) => {
      if (typeof safeProps[key] === "boolean" && tailwindPrefixes.some((prefix) => key.startsWith(prefix))) {
        // If it's a boolean true value and looks like a Tailwind class,
        // convert it to a string to avoid the React warning
        if (safeProps[key] === true) {
          safeProps[key] = key
        } else {
          // If it's false, just delete the prop
          delete safeProps[key]
        }
      }
    })

    return safeProps
  }, [props])
}
