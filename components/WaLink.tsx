"use client"

import { useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from "react"
import { config } from "@/lib/config"
import {
  buildMessage,
  isFromAd,
  trackContact,
  waUrl,
  type MessageKey,
  type Origen,
} from "@/lib/whatsapp"

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  origen: Origen
  message?: MessageKey
  children: ReactNode
}

/**
 * Link a WhatsApp con mensaje precargado + evento de Pixel.
 * El href se arma primero como visita normal ([web]) y, ya en el navegador,
 * pasa a [anuncio] si la persona llegó desde un anuncio.
 */
export function WaLink({ origen, message = "default", children, onClick, ...rest }: Props) {
  const body = config.whatsapp.messages[message]
  const [href, setHref] = useState(() => waUrl(buildMessage(body, false)))

  useEffect(() => {
    setHref(waUrl(buildMessage(body, isFromAd())))
  }, [body])

  return (
    <a
      {...rest}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-origen={origen}
      onClick={(e) => {
        trackContact(origen)
        onClick?.(e)
      }}
    >
      {children}
    </a>
  )
}
