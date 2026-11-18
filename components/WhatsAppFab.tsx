import { SiWhatsapp } from "react-icons/si"
import { WaLink } from "@/components/WaLink"

/** Botón flotante de WhatsApp: siempre visible, también en celular. */
export function WhatsAppFab() {
  return (
    <WaLink
      origen="flotante"
      aria-label="Escribinos por WhatsApp"
      className="wa-fab"
      style={{
        position: "fixed",
        bottom: "1.25rem",
        right: "1.25rem",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "3.5rem",
        height: "3.5rem",
        borderRadius: "50%",
        background: "#25D366",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <SiWhatsapp size={26} />
    </WaLink>
  )
}
