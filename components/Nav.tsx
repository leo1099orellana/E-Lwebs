"use client"

import { useState, useEffect, useRef } from "react"
import { config } from "@/lib/config"
import { TbMenu2, TbX } from "react-icons/tb"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const waUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header
      ref={navRef}
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

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
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

        {/* Right cluster */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
          {/* CTA — sliding text on hover */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta btn btn-primary"
            aria-label={config.nav.cta.primary}
          >
            <span className="nav-cta-default">{config.nav.cta.primary}</span>
            <span className="nav-cta-hover" aria-hidden="true">
              {config.nav.cta.hover}
            </span>
          </a>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            style={{
              display: "none",
              padding: "0.45rem",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "var(--bg-surface)",
              color: "var(--text)",
            }}
          >
            {menuOpen ? <TbX size={20} /> : <TbMenu2 size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: "68px 0 0",
            zIndex: 9,
            background: "rgba(6, 8, 16, 0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            padding: "2rem 1.5rem",
            gap: "0.5rem",
          }}
        >
          {config.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                padding: "1rem",
                fontSize: "1.3rem",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--text)",
                borderRadius: "var(--radius)",
                transition: "background var(--transition-fast)",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: "1.5rem" }}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={handleLinkClick}
            >
              {config.nav.cta.primary}
            </a>
          </div>
        </div>
      )}

    </header>
  )
}
