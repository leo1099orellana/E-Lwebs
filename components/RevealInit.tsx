"use client"

import { useEffect } from "react"

export function RevealInit() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    // No reduced-motion: enable the hide→reveal mechanism
    if (!prefersReduced) {
      const all = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]")
      )

      // Step 1: mark viewport elements as revealed WHILE they're still visible
      all.forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect()
        if (top < window.innerHeight && bottom > 0) {
          el.classList.add("revealed")
        }
      })

      // Step 2: NOW enable the mechanism that hides unrevealed elements.
      // Elements already marked "revealed" stay visible; the rest fade in on scroll.
      document.documentElement.classList.add("reveal-enabled")

      // Step 3: watch below-fold elements
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed")
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05 }
      )

      document
        .querySelectorAll("[data-reveal]:not(.revealed)")
        .forEach((el) => observer.observe(el))

      // Fallback: revelar todo tras 2s (para herramientas de captura sin scroll)
      const fallback = setTimeout(() => {
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed)").forEach((el) => {
          el.classList.add("revealed")
        })
      }, 2000)

      // Revelar todo antes de imprimir
      const onBeforePrint = () => {
        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          el.classList.add("revealed")
        })
      }
      window.addEventListener("beforeprint", onBeforePrint)

      return () => {
        observer.disconnect()
        clearTimeout(fallback)
        window.removeEventListener("beforeprint", onBeforePrint)
        document.documentElement.classList.remove("reveal-enabled")
      }
    }
  }, [])

  return null
}
