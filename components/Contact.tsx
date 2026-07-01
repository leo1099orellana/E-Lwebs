"use client"

import { useState, FormEvent } from "react"
import { config } from "@/lib/config"
import { TbMail, TbBrandWhatsapp, TbClock, TbArrowRight } from "react-icons/tb"

const INFO_ITEMS = [
  {
    icon: <TbBrandWhatsapp size={22} />,
    label: "WhatsApp",
    value: "+54 9 11 7603-3266",
    href: `https://wa.me/${config.whatsapp.number}`,
  },
  {
    icon: <TbMail size={22} />,
    label: "Email",
    value: config.brand.email,
    href: `mailto:${config.brand.email}`,
  },
  {
    icon: <TbClock size={22} />,
    label: "Horario",
    value: "Lun–Vie · 9:00–18:00",
    href: null,
  },
]

export function Contact() {
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = [
      name    ? `Hola, soy ${name}.`                        : "",
      email   ? `Mi email es ${email}.`                     : "",
      message ? message                                      : config.whatsapp.message,
    ]
      .filter(Boolean)
      .join(" ")
    window.open(
      `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(text)}`,
      "_blank"
    )
  }

  return (
    <section id="contacto" className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div data-reveal style={{ marginBottom: "1rem" }}>
            <span className="pill">Contacto Directo</span>
          </div>
          <h2
            className="headline"
            data-reveal
            data-delay="1"
            style={{ marginBottom: "1rem" }}
          >
            Hablemos sobre tu proyecto
          </h2>
          <p
            className="subhead"
            data-reveal
            data-delay="2"
            style={{ maxWidth: "36rem", margin: "0 auto" }}
          >
            Contanos qué necesitás y te respondemos con una propuesta clara en
            menos de 24 hs hábiles.
          </p>
        </div>

        {/* Grid */}
        <div
          className="contact-grid"
          data-reveal
          data-delay="1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* ── Left: info ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                lineHeight: 1.65,
                marginBottom: "0.5rem",
              }}
            >
              Respondemos todos los mensajes. Preferimos el WhatsApp para una
              respuesta más ágil, pero también podés escribirnos por email.
            </p>

            {INFO_ITEMS.map((item) =>
              item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-item"
                >
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
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
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </a>
              ) : (
                <div key={item.label} className="contact-info-item">
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
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
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text)",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Accent glow blob */}
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

          {/* ── Right: form ── */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              padding: "2rem",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)",
              background: "var(--bg-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="c-name"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Nombre completo
              </label>
              <input
                id="c-name"
                type="text"
                required
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="contact-input"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="c-email"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Email
              </label>
              <input
                id="c-email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="contact-input"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="c-message"
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: "0.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                Contanos tu proyecto
              </label>
              <textarea
                id="c-message"
                required
                placeholder="¿Qué tipo de sitio necesitás? ¿Tenés algo en mente?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-textarea"
              />
            </div>

            {/* Submit */}
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
                fontSize: "0.75rem",
                color: "var(--text-subtle)",
                textAlign: "center",
              }}
            >
              Al enviar abriremos WhatsApp con tu mensaje pre-cargado.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
