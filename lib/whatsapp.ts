import { config } from "@/lib/config"

/** Desde qué botón se abrió WhatsApp. Se manda como parámetro `origen` al Pixel. */
export type Origen =
  | "hero"
  | "nav"
  | "plan_landing"
  | "plan_ecommerce"
  | "plan_medida"
  | "revision_gratis"
  | "formulario"
  | "contacto"
  | "flotante"
  | "cta_final"

export type MessageKey = keyof typeof config.whatsapp.messages

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const AD_KEY = "lew_from_ad"
const PAID_MEDIUMS = ["paid", "paid_social", "paidsocial", "cpc", "ppc", "ads"]

/**
 * true si la visita llegó desde un anuncio.
 * En el anuncio de Meta, agregá a la URL: ?utm_source=meta&utm_medium=paid&utm_campaign=...
 * (No usamos fbclid: Facebook también lo agrega a links orgánicos.)
 * Se guarda en sessionStorage para que no se pierda si la persona recarga.
 */
export function isFromAd(): boolean {
  if (typeof window === "undefined") return false
  try {
    const medium = new URLSearchParams(window.location.search)
      .get("utm_medium")
      ?.toLowerCase()
    if (medium && PAID_MEDIUMS.includes(medium)) {
      sessionStorage.setItem(AD_KEY, "1")
      return true
    }
    return sessionStorage.getItem(AD_KEY) === "1"
  } catch {
    return false
  }
}

/** "Hola, <cuerpo> [web]" o "Hola, vi su anuncio y <cuerpo> [anuncio]" */
export function buildMessage(body: string, fromAd: boolean): string {
  const { tagWeb, tagAd } = config.whatsapp
  return fromAd
    ? `Hola, vi su anuncio y ${body} ${tagAd}`
    : `Hola, ${body} ${tagWeb}`
}

export function waUrl(text: string): string {
  return `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(text)}`
}

/** Evento estándar "Contact" del Pixel de Meta, con el botón de origen. */
export function trackContact(origen: Origen) {
  try {
    window.fbq?.("track", "Contact", { origen })
  } catch {
    /* el Pixel nunca debe romper el click */
  }
}
