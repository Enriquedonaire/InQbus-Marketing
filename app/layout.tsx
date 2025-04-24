import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>InQbus - Marketing Agency</title>
        <meta name="description" content="InQbus Marketing Agency - Elevate your brand with strategic marketing" />
      </head>
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="inqubus-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
