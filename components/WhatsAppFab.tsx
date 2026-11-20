"use client"

import { useEffect, useState } from "react"
import { SiWhatsapp } from "react-icons/si"
import { WaLink } from "@/components/WaLink"

/**
 * Escritorio: botón redondo flotante, siempre visible.
 * Celular: barra fija abajo a todo el ancho (zona del pulgar). Aparece al pasar
 * el hero y se esconde en el formulario de contacto y el pie, para no tapar nada.
 */
export function WhatsAppFab() {
  const [barVisible, setBarVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("inicio")
    const blockers = [document.getElementById("contacto"), document.querySelector("footer")]
      .filter((el): el is HTMLElement => !!el)

    let heroInView = true
    const blockerInView = new Set<Element>()
    const update = () => setBarVisible(!heroInView && blockerInView.size === 0)

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroInView = e.isIntersecting
        else if (e.isIntersecting) blockerInView.add(e.target)
        else blockerInView.delete(e.target)
      })
      update()
    }, { rootMargin: "0px 0px -80px 0px" })

    if (hero) obs.observe(hero)
    blockers.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <WaLink origen="flotante" aria-label="Escribinos por WhatsApp" className="wa-fab">
        <SiWhatsapp size={26} />
      </WaLink>

      <div
        className="wa-bar"
        data-visible={barVisible ? "true" : "false"}
        aria-hidden={!barVisible}
      >
        <WaLink
          origen="flotante"
          className="btn btn-primary wa-bar-btn"
          tabIndex={barVisible ? 0 : -1}
        >
          <SiWhatsapp size={20} aria-hidden="true" />
          Pedir presupuesto por WhatsApp
        </WaLink>
      </div>
    </>
  )
}
