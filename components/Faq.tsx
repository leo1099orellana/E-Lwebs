import { config } from "@/lib/config"
import { TbMessageCircle } from "react-icons/tb"

export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div data-reveal style={{ marginBottom: "1rem" }}>
            <span className="pill">Preguntas frecuentes</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1" style={{ marginBottom: "1rem" }}>
            Preguntas que nos hacen seguido
          </h2>
          <p
            className="subhead"
            data-reveal
            data-delay="2"
            style={{ maxWidth: "38rem", margin: "0 auto" }}
          >
            Si tenés alguna otra, escribinos por WhatsApp. Respondemos en el día.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
            gap: "1rem",
            maxWidth: "56rem",
            margin: "0 auto",
          }}
        >
          {config.faq.map((item, i) => (
            <div
              key={i}
              data-reveal
              data-delay={String((i % 3) + 1)}
              style={{
                padding: "1.5rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border)",
                background: "var(--bg-surface)",
                transition: "border-color var(--transition), transform var(--transition)",
              }}
              className="faq-card"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                <TbMessageCircle
                  size={18}
                  style={{
                    color: "var(--accent)",
                    flexShrink: 0,
                    marginTop: "0.15rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "0.975rem",
                    color: "var(--text)",
                    lineHeight: 1.4,
                  }}
                >
                  {item.q}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                  paddingLeft: "calc(18px + 0.75rem)",
                }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
