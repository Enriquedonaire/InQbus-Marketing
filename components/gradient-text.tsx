"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
}

export default function GradientText({
  children,
  className,
  colors = ["#4ade80", "#06b6d4", "#a855f7", "#ec4899"],
}: GradientTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const textElement = textRef.current

    let animationFrameId: number
    let hueRotation = 0

    const animate = () => {
      hueRotation = (hueRotation + 0.2) % 360
      textElement.style.filter = `hue-rotate(${hueRotation}deg)`
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundSize: "300% 100%",
    animation: "gradientShift 15s ease infinite",
  }

  return (
    <div ref={textRef} className={cn("inline-block", className)} style={gradientStyle}>
      {children}
    </div>
  )
}
