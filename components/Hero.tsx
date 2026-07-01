"use client"

import { useState, useEffect } from "react"
import { config } from "@/lib/config"

const TYPING_SPEED       = 90
const DELETING_SPEED     = 55
const PAUSE_AFTER_WORD   = 1800
const PAUSE_AFTER_DELETE = 300

export function Hero() {
  const words = config.hero.typewriterWords
  const [wordIndex,   setWordIndex]   = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting,  setIsDeleting]  = useState(false)
  const [paused,      setPaused]      = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) { setDisplayText(words[0]); return }
    if (paused) return

    const currentWord = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const next = currentWord.slice(0, displayText.length + 1)
        setDisplayText(next)
        if (next === currentWord) {
          setPaused(true)
          setTimeout(() => { setPaused(false); setIsDeleting(true) }, PAUSE_AFTER_WORD)
        }
      } else {
        const next = displayText.slice(0, -1)
        setDisplayText(next)
        if (next === "") {
          setPaused(true)
          setTimeout(() => {
            setPaused(false)
            setIsDeleting(false)
            setWordIndex(i => (i + 1) % words.length)
          }, PAUSE_AFTER_DELETE)
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, paused, wordIndex, words])

  const waUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`

  return (
    <section id="inicio" className="hero-section">

      {/* ── Background orbs (outside the device frame) ── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-dot-grid" />
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
      </div>

      <div className="container">

        {/* ── Browser / device frame ── */}
        <div data-reveal className="hero-device">

          {/* Chrome top bar */}
          <div className="hero-device-chrome">
            <div className="hero-device-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <div className="hero-device-url">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              lewebs.com
            </div>
          </div>

          {/* Screen */}
          <div className="hero-device-screen">
            {/* Inner glow — makes the screen feel lit */}
            <div className="hero-screen-glow" aria-hidden="true" />

            <div className="hero-content">
              {/* Pill */}
              <div className="hero-pill-wrap">
                <span className="pill">Estudio de diseño web</span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline">
                {config.hero.prefix}{" "}
                <span className="hero-typewriter">
                  {displayText}
                  <span className="hero-cursor" aria-hidden="true" />
                </span>
              </h1>
              <h1 className="hero-headline hero-headline--2">
                {config.hero.suffix}
              </h1>

              {/* Description */}
              <p className="hero-desc">{config.hero.description}</p>

              {/* CTAs */}
              <div className="hero-ctas">
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary hero-btn-primary">
                  {config.hero.cta}
                </a>
                <a href="#portfolio" className="btn btn-ghost hero-btn-ghost">
                  {config.hero.ctaSecondary}
                </a>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                {[
                  { value: "Inmediato", label: "tiempo de respuesta" },
                  { value: "3–5 días",  label: "landing page" },
                  { value: "~2 sem",    label: "e-commerce" },
                ].map(stat => (
                  <div key={stat.label} className="hero-stat">
                    <div className="hero-stat-value">{stat.value}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
