"use client"

import { useState, useEffect } from "react"
import { config } from "@/lib/config"

export function ThemeSwitch() {
  const [current, setCurrent] = useState<string>(config.themes.default)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = current
  }, [current])

  const themes = config.themes.options

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5rem",
        right: "1.5rem",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.5rem",
      }}
    >
      {/* Theme options */}
      {open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
            animation: "fadeIn 0.18s ease",
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setCurrent(theme.id)
                setOpen(false)
              }}
              title={theme.label}
              aria-label={`Cambiar a paleta ${theme.label}`}
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                border: `2px solid ${current === theme.id ? "#fff" : "rgba(255,255,255,0.25)"}`,
                background: theme.accent,
                cursor: "pointer",
                transition: "transform 0.2s ease, border-color 0.2s ease",
                transform: current === theme.id ? "scale(1.15)" : "scale(1)",
                boxShadow:
                  current === theme.id
                    ? `0 0 12px ${theme.accent}`
                    : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Cambiar paleta de colores"
        aria-expanded={open}
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          border: "1px solid var(--border)",
          background: "var(--bg-surface)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          transition: "transform 0.2s ease",
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
        }}
        title="Cambiar paleta"
      >
        🎨
      </button>

    </div>
  )
}
