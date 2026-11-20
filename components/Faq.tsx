import { config } from "@/lib/config"
import { TbChevronDown } from "react-icons/tb"

/** Acordeón: solo las preguntas a la vista, la respuesta se abre al tocar. */
export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="section-head">
          <div data-reveal className="section-pill">
            <span className="pill">Preguntas frecuentes</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1">
            Preguntas que nos hacen seguido
          </h2>
          <p className="subhead" data-reveal data-delay="2">
            Si tenés alguna otra, escribinos por WhatsApp. Te respondemos {config.tiempos.respuesta}.
          </p>
        </div>

        <div className="faq-list" data-reveal data-delay="1">
          {config.faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <TbChevronDown size={20} className="faq-chevron" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
