"use client"

import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// Fondo decorativo de código — versión liviana.
// · 6 bloques en escritorio, 4 en pantallas medianas, ninguno en celular
// · un único temporizador para todos los bloques, escribe de a varias letras
// · se pausa con la pestaña oculta y queda estático con "reducir movimiento"
// ─────────────────────────────────────────────────────────────────────────────

const SNIPPETS: string[] = [
  `// app/page.tsx
import { Hero } from '@/components/Hero'
import { Plans } from '@/components/Plans'

export default function Home() {
  return (
    <main>
      <Hero />
      <Plans />
    </main>
  )
}`,

  `// lib/config.ts
export const config = {
  brand: {
    name: 'L&E Webs',
    tagline: 'Páginas web para tu negocio',
  },
  whatsapp: {
    message: 'Hola, quiero un presupuesto',
  },
} as const`,

  `// types/plan.ts
export type Plan = {
  name: string
  price: number
  currency: 'ARS' | 'USD'
  features: readonly string[]
}`,

  `// hooks/useInView.ts
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}`,

  `// components/Plans.tsx
export function Plans() {
  return (
    <section id="planes">
      {config.plans.map((plan) => (
        <div key={plan.name} className="plan-card">
          <h3>{plan.name}</h3>
          <a href={whatsappUrl}>{plan.cta}</a>
        </div>
      ))}
    </section>
  )
}`,

  `// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig`,
]

type BlockCfg = {
  x: number
  y: number
  fontSize: number
  opacity: number
  drift: string
  driftDur: string
  snippet: number
  delay: number
}

// Escritorio: 3 a la izquierda y 3 a la derecha, en los márgenes
const DESKTOP: BlockCfg[] = [
  { x:  0, y:  6, fontSize: 10, opacity: 0.85, drift: "drift-a", driftDur: "30s", snippet: 0, delay:    0 },
  { x: 87, y: 14, fontSize: 10, opacity: 0.85, drift: "drift-b", driftDur: "34s", snippet: 1, delay: 2500 },
  { x:  1, y: 40, fontSize: 10, opacity: 0.80, drift: "drift-d", driftDur: "38s", snippet: 3, delay: 5000 },
  { x: 88, y: 48, fontSize: 10, opacity: 0.80, drift: "drift-c", driftDur: "28s", snippet: 2, delay: 7500 },
  { x:  0, y: 72, fontSize:  9, opacity: 0.75, drift: "drift-e", driftDur: "42s", snippet: 4, delay: 10000 },
  { x: 87, y: 80, fontSize:  9, opacity: 0.75, drift: "drift-a", driftDur: "36s", snippet: 5, delay: 12500 },
]


const TICK_MS     = 70    // un solo temporizador para todos los bloques
const CHARS_TICK  = 4     // letras que se agregan por tick
const HOLD_MS     = 2600  // tiempo que el bloque queda completo
const FADE_MS     = 900
const GAP_MS      = 700

// ─────────────────────────────────────────────────────────────────────────────
// Resaltado de sintaxis — escritura directa al DOM, sin estado de React
// ─────────────────────────────────────────────────────────────────────────────
const KWS = new Set([
  "import", "export", "from", "const", "let", "type", "interface",
  "function", "return", "default", "if", "true", "false", "as",
  "new", "readonly",
])

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function highlight(src: string): string {
  return src
    .split("\n")
    .map((line) => {
      if (/^\s*\/\//.test(line)) return `<span class="tok-c">${esc(line)}</span>`
      let out = ""
      let i = 0
      while (i < line.length) {
        const ch = line[i]
        if (ch === '"' || ch === "'" || ch === "`") {
          let j = i + 1
          while (j < line.length && line[j] !== ch) j++
          j = Math.min(j + 1, line.length)
          out += `<span class="tok-s">${esc(line.slice(i, j))}</span>`
          i = j
          continue
        }
        if (/[a-zA-Z_$]/.test(ch)) {
          let j = i
          while (j < line.length && /[\w$]/.test(line[j])) j++
          const w = line.slice(i, j)
          if (KWS.has(w)) out += `<span class="tok-k">${esc(w)}</span>`
          else if (/^[A-Z]/.test(w)) out += `<span class="tok-t">${esc(w)}</span>`
          else out += esc(w)
          i = j
          continue
        }
        out += esc(ch)
        i++
      }
      return out
    })
    .join("\n")
}

// Glifos estáticos (sin animación) — posiciones fijas para evitar diferencias de hidratación
const GLYPH_CHARS = ["<", ">", "{", "}", "/", ";", "=>", "[]", "&&", "()"]
const GLYPHS = Array.from({ length: 16 }, (_, i) => ({
  x: i < 8
    ? +((i * 4.1 + 1.5) % 8 + 1).toFixed(1)
    : +((i * 3.7 + 2.3) % 8 + 90).toFixed(1),
  y: +((i * 23.3 + 7) % 90 + 4).toFixed(1),
  glyph: GLYPH_CHARS[i % GLYPH_CHARS.length],
  opacity: +(0.03 + (i % 4) * 0.008).toFixed(3),
}))

type Phase = "wait" | "type" | "hold" | "fade"

// Ancho de .container (72rem) y su padding lateral máximo (4rem)
const CONTENT_MAX_PX = 72 * 16
const CONTENT_PAD_PX = 4 * 16
const MIN_MARGIN_PX  = 140 // por debajo de esto no hay lugar para el código

export function CodeBackground() {
  const [blocks, setBlocks] = useState<BlockCfg[]>([])
  // Margen libre a cada lado del contenido: el código nunca lo invade
  const [margin, setMargin] = useState(0)
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLElement | null)[]>([])

  // Elegir bloques según el espacio libre a los costados (solo en el navegador).
  // En celular y pantallas angostas no se muestra: el código asomaba detrás de
  // las tarjetas y parecía un error de pantalla.
  useEffect(() => {
    const w = window.innerWidth
    const m = Math.max(0, (w - CONTENT_MAX_PX) / 2) + Math.min(w * 0.05, CONTENT_PAD_PX)
    setMargin(m)
    setBlocks(m < MIN_MARGIN_PX ? [] : DESKTOP)
  }, [])

  useEffect(() => {
    if (blocks.length === 0) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      blocks.forEach((cfg, i) => {
        const text = textRefs.current[i]
        const wrap = wrapRefs.current[i]
        if (text) text.innerHTML = highlight(SNIPPETS[cfg.snippet % SNIPPETS.length])
        if (wrap) { wrap.style.transition = "none"; wrap.style.opacity = String(cfg.opacity) }
      })
      return
    }

    const start = performance.now()
    const state = blocks.map((cfg) => ({
      snippet: cfg.snippet,
      pos: 0,
      phase: "wait" as Phase,
      until: start + cfg.delay,
    }))

    const tick = () => {
      const now = performance.now()
      state.forEach((s, i) => {
        if (now < s.until) return
        const wrap = wrapRefs.current[i]
        const text = textRefs.current[i]
        if (!wrap || !text) return
        const src = SNIPPETS[s.snippet % SNIPPETS.length]

        switch (s.phase) {
          case "wait":
            wrap.style.opacity = String(blocks[i].opacity)
            s.phase = "type"
            break
          case "type":
            s.pos = Math.min(s.pos + CHARS_TICK, src.length)
            text.innerHTML = highlight(src.slice(0, s.pos))
            if (s.pos >= src.length) { s.phase = "hold"; s.until = now + HOLD_MS }
            break
          case "hold":
            wrap.style.opacity = "0"
            s.phase = "fade"
            s.until = now + FADE_MS
            break
          case "fade":
            s.snippet++
            s.pos = 0
            text.innerHTML = ""
            s.phase = "wait"
            s.until = now + GAP_MS
            break
        }
      })
    }

    let timer: ReturnType<typeof setInterval> | null = null
    const run  = () => { if (!timer) timer = setInterval(tick, TICK_MS) }
    const stop = () => { if (timer) { clearInterval(timer); timer = null } }
    const onVisibility = () => (document.hidden ? stop() : run())

    run()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [blocks])

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
        background: "var(--bg)",
      }}
    >
      {/* Velo: protege la zona central de lectura */}
      <div
        className="code-bg-veil"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(4,5,10,0.55) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      {GLYPHS.map((g, i) => (
        <span
          key={i}
          className="code-bg-glyph"
          style={{
            position: "absolute",
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontFamily: "monospace",
            fontSize: "13px",
            color: "var(--accent)",
            opacity: g.opacity,
            lineHeight: 1,
          }}
        >
          {g.glyph}
        </span>
      ))}

      {blocks.map((cfg, i) => (
        <div
          key={i}
          ref={(el) => { wrapRefs.current[i] = el }}
          style={{
            position: "absolute",
            // Izquierda: pegado al borde y recortado al margen libre.
            // Derecha: empieza justo donde termina el contenido.
            ...(cfg.x < 50
              ? { left: 0, width: margin - 20 }
              : { right: 0, width: margin - 20 }),
            overflow: "hidden",
            maskImage: "linear-gradient(to right, black 80%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, black 80%, transparent)",
            top: `${cfg.y}%`,
            opacity: 0,
            transition: "opacity 0.9s ease",
            animation: cfg.drift ? `${cfg.drift} ${cfg.driftDur} ease-in-out infinite` : undefined,
            zIndex: 1,
          }}
        >
          <pre
            style={{
              fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', 'Courier New', monospace",
              fontSize: `${cfg.fontSize}px`,
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: "pre",
              color: "var(--accent)",
            }}
          >
            <code ref={(el) => { textRefs.current[i] = el }} />
            <span className="code-cursor-blink">▌</span>
          </pre>
        </div>
      ))}
    </div>
  )
}
