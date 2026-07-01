"use client"

import { useEffect, useRef } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// Snippet pool — real code from the L&E Webs stack
// ─────────────────────────────────────────────────────────────────────────────
const SNIPPETS: string[] = [
  `// app/page.tsx
import { Hero } from '@/components/Hero'
import { Portfolio } from '@/components/Portfolio'
import { Plans } from '@/components/Plans'
import { Nav } from '@/components/Nav'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Portfolio />
        <Plans />
      </main>
    </>
  )
}`,

  `// lib/config.ts
export const config = {
  brand: {
    name: 'L&E Webs',
    tagline: 'Diseño web a medida',
    url: 'https://lewebs.com',
  },
  whatsapp: {
    number: '5491100000000',
    message: 'Hola, quiero un presupuesto',
  },
} as const

export type Config = typeof config`,

  `// components/Hero.tsx
'use client'
import { useState, useEffect } from 'react'

const WORDS = ['ventas', 'clientes', 'consultas']

export function Hero() {
  const [word, setWord] = useState(0)
  const [text, setText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setText(WORDS[word % WORDS.length])
    }, 80)
    return () => clearTimeout(timer)
  }, [word])

  return (
    <section>
      <h1>Más {text} para tu negocio</h1>
    </section>
  )
}`,

  `// types/project.ts
export interface Project {
  title: string
  category: Category
  description: string
  tags: readonly string[]
  accent: string
  url?: string
}

export type Category =
  | 'Todos'
  | 'E-commerce'
  | 'Landing Page'
  | 'Corporativo'

export type Plan = {
  name: string
  price: number
  currency: 'ARS' | 'USD'
  features: readonly string[]
}`,

  `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
}

module.exports = nextConfig`,

  `// hooks/useInView.ts
import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, inView }
}`,

  `// components/Plans.tsx
import { config } from '@/lib/config'

export function Plans() {
  const plans = config.plans
  return (
    <section id="planes" className="section">
      <div className="container">
        {plans.map((plan) => (
          <div key={plan.name} className="plan-card">
            <h3>{plan.name}</h3>
            <span>{plan.price} {plan.currency}</span>
            <ul>
              {plan.features.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#contacto" className="btn btn-primary">
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}`,

  `// api/contact/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!email || !message) {
    return NextResponse.json(
      { error: 'Missing fields' },
      { status: 400 }
    )
  }

  // Send via WhatsApp Business API or email
  await sendNotification({ name, email, message })

  return NextResponse.json({ ok: true })
}`,

  `// components/ThemeSwitch.tsx
'use client'
import { useState } from 'react'

const THEMES = ['nocturno', 'frio', 'calido']

export function ThemeSwitch() {
  const [theme, setTheme] = useState(THEMES[0])

  const cycle = () => {
    const next = THEMES[
      (THEMES.indexOf(theme) + 1) % THEMES.length
    ]
    document.documentElement
      .setAttribute('data-theme', next)
    setTheme(next)
  }

  return (
    <button onClick={cycle} aria-label="Cambiar tema">
      ◑
    </button>
  )
}`,
]

// ─────────────────────────────────────────────────────────────────────────────
// Block layout — 12 blocks, extreme LEFT (x:0-4%) and RIGHT (x:87-93%)
// Right blocks start near viewport edge so only first ~10-15 chars are visible
// before the overflow:hidden clip — creates an "emerging from edge" effect.
// ─────────────────────────────────────────────────────────────────────────────
const BLOCK_CFGS = [
  // DESKTOP LEFT — code flows right from edge, always in margin zone (idx 0–5)
  { x:  0, y:  5, fontSize: 10, baseOpacity: 0.95, drift: "drift-a", driftDur: "28s", initSnippet: 0, initDelay:     0, typeSpeed: 10 },
  { x:  1, y: 26, fontSize: 10, baseOpacity: 0.93, drift: "drift-d", driftDur: "35s", initSnippet: 2, initDelay:  1800, typeSpeed: 11 },
  { x:  0, y: 50, fontSize: 10, baseOpacity: 0.93, drift: "drift-b", driftDur: "30s", initSnippet: 4, initDelay:  4500, typeSpeed:  9 },
  { x:  2, y: 72, fontSize:  9, baseOpacity: 0.90, drift: "drift-e", driftDur: "42s", initSnippet: 6, initDelay:  7500, typeSpeed: 12 },
  { x:  0, y: 86, fontSize:  9, baseOpacity: 0.88, drift: "drift-c", driftDur: "38s", initSnippet: 8, initDelay: 10500, typeSpeed: 10 },
  { x:  3, y: 14, fontSize:  9, baseOpacity: 0.86, drift: "drift-d", driftDur: "45s", initSnippet: 1, initDelay: 14000, typeSpeed: 13 },
  // DESKTOP RIGHT — start near right edge, beginning of lines visible before clip (idx 6–11)
  { x: 87, y:  8, fontSize: 10, baseOpacity: 0.95, drift: "drift-b", driftDur: "32s", initSnippet: 1, initDelay:  3000, typeSpeed: 10 },
  { x: 88, y: 32, fontSize: 10, baseOpacity: 0.93, drift: "drift-c", driftDur: "26s", initSnippet: 3, initDelay:  5500, typeSpeed:  8 },
  { x: 87, y: 56, fontSize: 10, baseOpacity: 0.93, drift: "drift-a", driftDur: "36s", initSnippet: 5, initDelay:  1500, typeSpeed: 12 },
  { x: 89, y: 76, fontSize:  9, baseOpacity: 0.90, drift: "drift-e", driftDur: "40s", initSnippet: 7, initDelay:  9000, typeSpeed:  9 },
  { x: 87, y: 88, fontSize:  9, baseOpacity: 0.88, drift: "drift-b", driftDur: "33s", initSnippet: 0, initDelay: 12000, typeSpeed: 14 },
  { x: 90, y: 20, fontSize:  9, baseOpacity: 0.86, drift: "drift-c", driftDur: "48s", initSnippet: 2, initDelay: 16500, typeSpeed: 11 },
  // MOBILE — adapted positions for narrow screens (idx 12–15)
  // Right blocks use x:74 so ~26% of viewport width is visible (≈100px on 390px screen)
  { x:  0, y: 18, fontSize: 8, baseOpacity: 0.78, drift: "drift-a", driftDur: "28s", initSnippet: 0, initDelay:    0, typeSpeed: 10 },
  { x:  0, y: 58, fontSize: 8, baseOpacity: 0.72, drift: "drift-c", driftDur: "35s", initSnippet: 3, initDelay: 2200, typeSpeed: 11 },
  { x: 74, y: 35, fontSize: 8, baseOpacity: 0.78, drift: "drift-b", driftDur: "30s", initSnippet: 1, initDelay: 1000, typeSpeed: 10 },
  { x: 74, y: 74, fontSize: 8, baseOpacity: 0.72, drift: "drift-d", driftDur: "38s", initSnippet: 4, initDelay: 3500, typeSpeed: 12 },
] as const

const DESKTOP_BLOCK_COUNT = 12
const MOBILE_START_IDX    = 12
const MOBILE_BLOCK_COUNT  = 4

// ─────────────────────────────────────────────────────────────────────────────
// Syntax highlighter — direct DOM write, no React state
// ─────────────────────────────────────────────────────────────────────────────
const KWS = new Set([
  "import", "export", "from", "const", "let", "var", "type", "interface",
  "function", "return", "async", "await", "default", "class", "extends",
  "of", "in", "if", "else", "true", "false", "null", "undefined", "as",
  "typeof", "new", "this", "readonly", "public", "private", "static",
])

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function highlight(src: string): string {
  return src
    .split("\n")
    .map((line) => {
      if (/^\s*\/\//.test(line))
        return `<span class="tok-c">${esc(line)}</span>`

      let out = ""
      let i = 0

      while (i < line.length) {
        const ch = line[i]

        if (ch === '"' || ch === "'" || ch === "`") {
          let j = i + 1
          while (j < line.length && line[j] !== ch) {
            if (line[j] === "\\") j++
            j++
          }
          j = Math.min(j + 1, line.length)
          out += `<span class="tok-s">${esc(line.slice(i, j))}</span>`
          i = j
          continue
        }

        if (/[a-zA-Z_$]/.test(ch)) {
          let j = i
          while (j < line.length && /[\w$]/.test(line[j])) j++
          const w = line.slice(i, j)
          if (KWS.has(w))
            out += `<span class="tok-k">${esc(w)}</span>`
          else if (/^[A-Z]/.test(w))
            out += `<span class="tok-t">${esc(w)}</span>`
          else
            out += esc(w)
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

// ─────────────────────────────────────────────────────────────────────────────
// Static glyphs — deterministic positions (no random, avoids hydration diff)
// ─────────────────────────────────────────────────────────────────────────────
const GLYPH_CHARS = [
  "<", ">", "{", "}", "(", ")", "/", ";", "=", "=>",
  "[]", "&&", "||", "?", ":", ".", "/*", "*/", "++", "!="
]

const GLYPHS = Array.from({ length: 40 }, (_, i) => ({
  x: i < 20
    ? +((i * 4.1 + 1.5) % 14 + 1).toFixed(1)   // left: 1–15%
    : +((i * 3.7 + 2.3) % 20 + 71).toFixed(1),  // right: 71–91%
  y: +((i * 17.3 + 7) % 92 + 2).toFixed(1),
  glyph: GLYPH_CHARS[i % GLYPH_CHARS.length],
  opacity: +(0.030 + (i % 5) * 0.008).toFixed(3),
}))

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export function CodeBackground() {
  const wrapRefs   = useRef<(HTMLDivElement   | null)[]>([])
  const textRefs   = useRef<(HTMLElement      | null)[]>([])
  const cursorRefs = useRef<(HTMLSpanElement  | null)[]>([])
  const cancelled  = useRef<boolean[]>([])
  const timers     = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reduced  = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile  = window.innerWidth < 900
    const isNarrow  = window.innerWidth < 1200

    const startIdx = isMobile ? MOBILE_START_IDX : 0
    const count    = isMobile ? MOBILE_BLOCK_COUNT : isNarrow ? 4 : DESKTOP_BLOCK_COUNT

    if (reduced) {
      BLOCK_CFGS.slice(startIdx, startIdx + count).forEach((cfg, i) => {
        const idx  = startIdx + i
        const wrap = wrapRefs.current[idx]
        const text = textRefs.current[idx]
        const cur  = cursorRefs.current[idx]
        if (text) text.innerHTML = highlight(SNIPPETS[cfg.initSnippet % SNIPPETS.length])
        if (wrap) { wrap.style.transition = "none"; wrap.style.opacity = String(cfg.baseOpacity) }
        if (cur)  cur.style.display = "none"
      })
      return
    }

    BLOCK_CFGS.slice(startIdx, startIdx + count).forEach((cfg, i) => {
      const idx = startIdx + i
      cancelled.current[idx] = false
      let snippetCursor = cfg.initSnippet

      const typeBlock = (charIdx: number) => {
        if (cancelled.current[idx]) return

        const wrap = wrapRefs.current[idx]
        const text = textRefs.current[idx]
        if (!wrap || !text) return

        const snippet = SNIPPETS[snippetCursor % SNIPPETS.length]

        if (charIdx > snippet.length) {
          timers.current[idx] = setTimeout(() => {
            if (cancelled.current[idx]) return
            wrap.style.opacity = "0"

            timers.current[idx] = setTimeout(() => {
              if (cancelled.current[idx]) return
              snippetCursor = (snippetCursor + 1) % SNIPPETS.length
              text.innerHTML = ""
              wrap.style.opacity = String(cfg.baseOpacity)

              timers.current[idx] = setTimeout(() => typeBlock(0), 700)
            }, 900)
          }, 1900)
          return
        }

        text.innerHTML = highlight(snippet.slice(0, charIdx))

        const jitter = Math.random() * 8
        timers.current[idx] = setTimeout(
          () => typeBlock(charIdx + 1),
          cfg.typeSpeed + jitter
        )
      }

      timers.current[idx] = setTimeout(() => {
        const wrap = wrapRefs.current[idx]
        if (!wrap) return
        wrap.style.opacity = String(cfg.baseOpacity)
        typeBlock(0)
      }, cfg.initDelay)
    })

    return () => {
      BLOCK_CFGS.forEach((_, idx) => {
        cancelled.current[idx] = true
        clearTimeout(timers.current[idx])
      })
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
        background: "var(--bg)",
      }}
    >
      {/* Radial veil (desktop) / horizontal column veil (mobile) */}
      <div
        className="code-bg-veil"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 50% 42%, rgba(4,5,10,0.50) 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Static glyphs */}
      {GLYPHS.map((g, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontFamily: "monospace",
            fontSize: "13px",
            color: "var(--accent)",
            opacity: g.opacity,
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {g.glyph}
        </span>
      ))}

      {/* Code blocks */}
      {BLOCK_CFGS.map((cfg, idx) => (
        <div
          key={idx}
          ref={(el) => { wrapRefs.current[idx] = el }}
          style={{
            position: "absolute",
            left: `${cfg.x}%`,
            top: `${cfg.y}%`,
            opacity: 0,
            transition: "opacity 0.9s ease",
            animation: `${cfg.drift} ${cfg.driftDur} ease-in-out infinite`,
            willChange: "transform",
            zIndex: 1,
          }}
        >
          <pre
            style={{
              fontFamily:
                "'Fira Code', 'Cascadia Code', 'Consolas', 'Courier New', monospace",
              fontSize: `${cfg.fontSize}px`,
              lineHeight: 1.7,
              margin: 0,
              padding: 0,
              whiteSpace: "pre",
              background: "none",
              border: "none",
              color: "var(--accent)",
            }}
          >
            <code ref={(el) => { textRefs.current[idx] = el }} />
            <span
              ref={(el) => { cursorRefs.current[idx] = el }}
              className="code-cursor-blink"
            >
              ▌
            </span>
          </pre>
        </div>
      ))}
    </div>
  )
}
