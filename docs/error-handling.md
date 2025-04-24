# Error Handling System Documentation

This document explains how to use the error handling system in the InQbus application.

## Overview

The error handling system consists of several components:

1. **ErrorBoundary**: A React component that catches errors in its child component tree
2. **ErrorDisplay**: A component that displays error information to users
3. **Utility functions**: Helpers for logging errors and fixing common issues
4. **Hooks and HOCs**: Tools to make error handling easier in functional components

## Using the Error Boundary

### App-wide Error Handling

The ErrorBoundary is already set up in the root layout to catch errors across the entire application:

\`\`\`tsx
// app/layout.tsx
import { ErrorBoundary } from "@/components/error-boundary"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

### Component-level Error Handling

You can also use the ErrorBoundary for specific components:

\`\`\`tsx
import { ErrorBoundary } from "@/components/error-boundary"

function MyComponent() {
  return (
    <ErrorBoundary>
      <RiskyComponent />
    </ErrorBoundary>
  )
}
\`\`\`

Or use the convenience component:

\`\`\`tsx
import { WithErrorBoundary } from "@/components/error-boundary"

function MyComponent() {
  return (
    <WithErrorBoundary>
      <RiskyComponent />
    </WithErrorBoundary>
  )
}
\`\`\`

### Custom Fallback UI

You can provide a custom fallback UI:

\`\`\`tsx
import { ErrorBoundary } from "@/components/error-boundary"

function MyComponent() {
  return (
    <ErrorBoundary
      fallback={<div>Something went wrong with this specific component.</div>}
    >
      <RiskyComponent />
    </ErrorBoundary>
  )
}
\`\`\`

### Error Handling with Reset Keys

You can provide reset keys to automatically reset the error boundary when certain values change:

\`\`\`tsx
import { ErrorBoundary } from "@/components/error-boundary"

function MyComponent({ userId }) {
  return (
    <ErrorBoundary resetKeys={[userId]}>
      <UserProfile userId={userId} />
    </ErrorBoundary>
  )
}
\`\`\`

## Fixing Tailwind Class Attribute Errors

To fix the "Received `true` for a non-boolean attribute" error with Tailwind classes, use one of these approaches:

### 1. Use the withFixedTailwindProps HOC

\`\`\`tsx
import { withFixedTailwindProps } from "@/lib/utils/fix-tailwind-props"

function MyComponent(props) {
  return <div {...props}>Content</div>
}

export default withFixedTailwindProps(MyComponent)
\`\`\`

### 2. Use the fixTailwindProps utility directly

\`\`\`tsx
import { fixTailwindProps } from "@/lib/utils/fix-tailwind-props"

function MyComponent(props) {
  const safeProps = fixTailwindProps(props)
  return <div {...safeProps}>Content</div>
}
\`\`\`

### 3. Use the useSafeProps hook

\`\`\`tsx
import { useSafeProps } from "@/lib/hooks/use-safe-props"

function MyComponent(props) {
  const safeProps = useSafeProps(props)
  return <div {...safeProps}>Content</div>
}
\`\`\`

## Error Handling in Functional Components

Use the useErrorHandler hook for error handling in functional components:

\`\`\`tsx
import { useErrorHandler } from "@/lib/hooks/use-error-handler"

function MyComponent() {
  const { hasError, error, handleError, resetError } = useErrorHandler()
  
  if (hasError) {
    return (
      <div>
        <p>Something went wrong</p>
        <button onClick={resetError}>Try Again</button>
      </div>
    )
  }
  
  return (
    <div>
      <RiskyOperation onError={handleError} />
    </div>
  )
}
\`\`\`

## Best Practices

1. Use the app-wide ErrorBoundary for general error handling
2. Add component-specific ErrorBoundaries for critical components
3. Always provide a way for users to recover from errors
4. Log errors to a monitoring service in production
5. Use the Tailwind class fixing utilities to prevent attribute errors
