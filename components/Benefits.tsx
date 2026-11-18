import type { IconType } from "react-icons"
import { TbBolt, TbBrandGoogle, TbBrandWhatsapp, TbDeviceMobile } from "react-icons/tb"
import { config } from "@/lib/config"

const ICONS: Record<(typeof config.benefits)[number]["icon"], IconType> = {
  mobile: TbDeviceMobile,
  speed: TbBolt,
  google: TbBrandGoogle,
  whatsapp: TbBrandWhatsapp,
}

/** Beneficios en lenguaje de cliente (reemplaza la lista de tecnologías). */
export function Benefits() {
  return (
    <section id="beneficios" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div data-reveal style={{ marginBottom: "1rem" }}>
            <span className="pill">Qué ganás</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1" style={{ marginBottom: "1rem" }}>
            Una página que trabaja para tu negocio
          </h2>
          <p
            className="subhead"
            data-reveal
            data-delay="2"
            style={{ maxWidth: "36rem", margin: "0 auto" }}
          >
            Sin vueltas técnicas: esto es lo que van a notar tus clientes.
          </p>
        </div>

        <div className="benefits-grid">
          {config.benefits.map((b, i) => {
            const Icon = ICONS[b.icon]
            return (
              <div
                key={b.title}
                className="benefit-card"
                data-reveal
                data-delay={String(i + 1)}
              >
                <span className="benefit-icon" aria-hidden="true">
                  <Icon size={24} />
                </span>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-text">{b.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
