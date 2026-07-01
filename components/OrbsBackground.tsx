"use client"

import { useEffect, useRef } from "react"

interface OrbConfig {
  color: string
  size: number
  x: number
  y: number
  parallaxFactor: number
  duration: number
  delay: number
  blur: number
  opacity: number
  animIndex: number
}

const ORBS: OrbConfig[] = [
  { color: "var(--orb-1)", size: 560, x: 12,  y: 8,  parallaxFactor: 32, duration: 18, delay: 0,    blur: 100, opacity: 0.48, animIndex: 0 },
  { color: "var(--orb-2)", size: 480, x: 72,  y: 55, parallaxFactor: 22, duration: 23, delay: -6,   blur: 90,  opacity: 0.42, animIndex: 1 },
  { color: "var(--orb-3)", size: 400, x: 45,  y: 75, parallaxFactor: 40, duration: 20, delay: -3,   blur: 110, opacity: 0.38, animIndex: 2 },
  { color: "var(--orb-4)", size: 520, x: 85,  y: 15, parallaxFactor: 18, duration: 26, delay: -10,  blur: 95,  opacity: 0.44, animIndex: 3 },
  { color: "var(--orb-5)", size: 360, x: 30,  y: 40, parallaxFactor: 28, duration: 15, delay: -4,   blur: 85,  opacity: 0.36, animIndex: 4 },
  { color: "var(--orb-6)", size: 440, x: 60,  y: 88, parallaxFactor: 36, duration: 22, delay: -8,   blur: 105, opacity: 0.40, animIndex: 5 },
  { color: "var(--orb-7)", size: 320, x: 5,   y: 60, parallaxFactor: 24, duration: 17, delay: -2,   blur: 80,  opacity: 0.34, animIndex: 6 },
]

export function OrbsBackground() {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const lerped = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (prefersReduced.matches) return

    const isMobile = () => window.innerWidth < 768

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const animate = () => {
      const lp = 0.055
      lerped.current.x += (mouse.current.x - lerped.current.x) * lp
      lerped.current.y += (mouse.current.y - lerped.current.y) * lp

      if (!isMobile()) {
        wrapperRefs.current.forEach((el, i) => {
          if (!el) return
          const f = ORBS[i].parallaxFactor
          const tx = lerped.current.x * f
          const ty = lerped.current.y * f
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
        })
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        contain: "strict",
      }}
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { wrapperRefs.current[i] = el }}
          style={{
            position: "absolute",
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            willChange: "transform",
          }}
        >
          <span
            style={{
              display: "block",
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: orb.color,
              filter: `blur(${orb.blur}px)`,
              opacity: orb.opacity,
              animation: `orb-${orb.animIndex} ${orb.duration}s ease-in-out infinite alternate`,
              animationDelay: `${orb.delay}s`,
              willChange: "transform",
            }}
          />
        </div>
      ))}
    </div>
  )
}
