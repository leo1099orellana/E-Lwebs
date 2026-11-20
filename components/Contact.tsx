"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import { config } from "@/lib/config"
import { WaLink } from "@/components/WaLink"
import { isFromAd, trackContact, waUrl } from "@/lib/whatsapp"
import { TbMail, TbBrandWhatsapp, TbClock, TbArrowRight } from "react-icons/tb"

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "var(--text-muted)",
  marginBottom: "0.4rem",
  letterSpacing: "0.02em",
} as const

function InfoBody({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text-subtle)",
          marginBottom: "0.15rem",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>
        {value}
      </div>
    </div>
  )
}

function InfoIcon({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--accent)", flexShrink: 0 }}>{children}</span>
}

export function Contact() {
  const [name, setName]       = useState("")
  const [rubro, setRubro]     = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const fromAd = isFromAd()
    const text = [
      fromAd ? "Hola, vi su anuncio." : "Hola!",
      name.trim()    && `Soy ${name.trim()}.`,
      rubro.trim()   && `Mi negocio: ${rubro.trim()}.`,
      message.trim() || "Quiero un presupuesto para mi página web.",
      fromAd ? config.whatsapp.tagAd : config.whatsapp.tagWeb,
    ]
      .filter(Boolean)
      .join(" ")

    trackContact("formulario")
    window.open(waUrl(text), "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contacto" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-head">
          <div data-reveal className="section-pill">
            <span className="pill">Contacto Directo</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1">
            Hablemos sobre tu proyecto
          </h2>
          <p className="subhead" data-reveal data-delay="2">
            {config.contact.subhead}
          </p>
        </div>

        {/* Grid — en celular el formulario va primero (ver .contact-form en CSS) */}
        <div className="contact-grid" data-reveal data-delay="1">
          {/* ── Left: info (en celular se reemplaza por .contact-compact) ── */}
          <div className="contact-info">
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.65,
                marginBottom: "0.5rem",
              }}
            >
              {config.contact.intro}
            </p>

            <WaLink origen="contacto" className="contact-info-item">
              <InfoIcon><TbBrandWhatsapp size={22} /></InfoIcon>
              <InfoBody label="WhatsApp" value={config.whatsapp.display} />
            </WaLink>

            <a
              href={`mailto:${config.brand.email}`}
              className="contact-info-item"
            >
              <InfoIcon><TbMail size={22} /></InfoIcon>
              <InfoBody label="Email" value={config.brand.email} />
            </a>

            <div className="contact-info-item">
              <InfoIcon><TbClock size={22} /></InfoIcon>
              <InfoBody label="Horario" value={config.horario} />
            </div>

            <div
              aria-hidden="true"
              style={{
                marginTop: "1rem",
                height: "1px",
                background:
                  "linear-gradient(90deg, var(--accent) 0%, transparent 70%)",
                opacity: 0.4,
              }}
            />
          </div>

          {/* ── Right: form (corto a propósito: nombre, rubro y mensaje) ── */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div>
              <label htmlFor="c-name" style={labelStyle}>
                Tu nombre
              </label>
              <input
                id="c-name"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Ej: Laura"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-input"
              />
            </div>

            <div>
              <label htmlFor="c-rubro" style={labelStyle}>
                Rubro de tu negocio
              </label>
              <input
                id="c-rubro"
                type="text"
                required
                placeholder="Ej: peluquería, gastronomía"
                value={rubro}
                onChange={(e) => setRubro(e.target.value)}
                className="contact-input"
              />
            </div>

            <div>
              <label htmlFor="c-message" style={labelStyle}>
                Mensaje <span style={{ fontWeight: 400, color: "var(--text-subtle)" }}>(opcional)</span>
              </label>
              <textarea
                id="c-message"
                placeholder="¿Qué necesitás? ¿Ya tenés página o redes?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-textarea"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "1rem",
                fontSize: "1rem",
                gap: "0.6rem",
              }}
            >
              Enviar por WhatsApp
              <TbArrowRight size={18} />
            </button>

            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-subtle)",
                textAlign: "center",
              }}
            >
              Se abre WhatsApp con tu mensaje listo para enviar.
            </p>
          </form>

          {/* Celular: datos de contacto en una línea, debajo del formulario */}
          <p className="contact-compact">
            <TbClock size={16} aria-hidden="true" /> {config.horario}
            <span aria-hidden="true">·</span>
            <a href={`mailto:${config.brand.email}`}>{config.brand.email}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
