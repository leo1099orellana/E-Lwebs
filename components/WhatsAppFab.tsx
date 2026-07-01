"use client"

import { useState, useEffect } from "react"
import { SiWhatsapp } from "react-icons/si"
import { config } from "@/lib/config"

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const waUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3.25rem",
        height: "3.25rem",
        borderRadius: "50%",
        background: "#25D366",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "scale(1)" : "scale(0.8)",
      }}
      className="wa-fab"
    >
      <SiWhatsapp size={24} />

    </a>
  )
}
