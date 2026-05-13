"use client"

import { useEffect, useRef } from "react"
import anime from "animejs"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-up" | "fade-in" | "zoom-in"
  delay?: number
}

export function AnimatedSection({ 
  children, 
  className, 
  animation = "fade-up",
  delay = 0 
}: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const config: anime.AnimeParams = {
      targets: containerRef.current,
      easing: "easeOutExpo",
      duration: 1000,
      delay,
      opacity: [0, 1],
    }

    if (animation === "fade-up") {
      config.translateY = [30, 0]
    } else if (animation === "zoom-in") {
      config.scale = [0.95, 1]
    }

    anime(config)
  }, [animation, delay])

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
