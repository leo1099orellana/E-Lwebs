"use client"

import { useState, useEffect } from "react"
import { config } from "@/lib/config"
import { WaLink } from "@/components/WaLink"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        background: scrolled
          ? "rgba(6, 8, 16, 0.92)"
          : "rgba(6, 8, 16, 0.20)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "68px",
          gap: "1.5rem",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          aria-label={config.brand.name}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.5rem",
            letterSpacing: "-0.04em",
            color: "var(--text)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.8rem",
              height: "2.8rem",
              borderRadius: "10px",
              background: "var(--accent)",
              color: "#060810",
              fontSize: "0.95rem",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              flexShrink: 0,
            }}
          >
            L&amp;E
          </span>
          <span style={{ color: "var(--text)" }}>Webs</span>
        </a>

        {/* Desktop links — pocos a propósito: menos fugas desde los anuncios */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            marginLeft: "auto",
          }}
          className="nav-links-desktop"
        >
          {config.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  padding: "0.45rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  transition: "color var(--transition-fast), background var(--transition-fast)",
                }}
                className="nav-link"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — visible también en celular */}
        <WaLink
          origen="nav"
          className="nav-cta btn btn-primary"
          aria-label={config.nav.cta.primary}
        >
          <span className="nav-cta-default">{config.nav.cta.primary}</span>
          <span className="nav-cta-hover" aria-hidden="true">
            {config.nav.cta.hover}
          </span>
        </WaLink>
      </nav>
    </header>
  )
}
