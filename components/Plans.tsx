import { config } from "@/lib/config"
import { TbCheck } from "react-icons/tb"

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function Plans() {
  const waUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`

  return (
    <section id="planes" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div data-reveal style={{ marginBottom: "1rem" }}>
            <span className="pill">Planes</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1" style={{ marginBottom: "1rem" }}>
            Precios claros, sin sorpresas
          </h2>
          <p
            className="subhead"
            data-reveal
            data-delay="2"
            style={{ maxWidth: "36rem", margin: "0 auto" }}
          >
            Dos opciones pensadas para distintas etapas de tu negocio. Ambas
            incluyen diseño y desarrollo a medida.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 19rem), 1fr))",
            gap: "1.5rem",
            maxWidth: "52rem",
            margin: "0 auto",
          }}
        >
          {config.plans.map((plan, i) => (
            <div
              key={plan.name}
              data-reveal
              data-delay={String(i + 1)}
              style={{
                borderRadius: "var(--radius-xl)",
                border: `1px solid ${plan.highlighted ? "var(--border-accent)" : "var(--border)"}`,
                background: plan.highlighted
                  ? "linear-gradient(160deg, var(--accent-soft) 0%, var(--bg-surface) 100%)"
                  : "var(--bg-surface)",
                padding: "2rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Badge */}
              {"badge" in plan && plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "0.2rem 1rem",
                    borderRadius: "0 0 var(--radius) var(--radius)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {(plan as { badge?: string }).badge}
                </div>
              )}

              {/* Plan name */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  marginBottom: "0.4rem",
                  color: plan.highlighted ? "var(--accent)" : "var(--text)",
                }}
              >
                {plan.name}
              </div>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.5,
                }}
              >
                {plan.description}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "1.75rem" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: "var(--text)",
                  }}
                >
                  {formatPrice(plan.price, plan.currency)}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-subtle)",
                    marginTop: "0.25rem",
                  }}
                >
                  {plan.period}
                </div>
              </div>

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.65rem",
                  marginBottom: "2rem",
                  flex: 1,
                }}
              >
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <TbCheck
                      size={16}
                      style={{
                        color: "var(--accent)",
                        flexShrink: 0,
                        marginTop: "0.15rem",
                      }}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${plan.highlighted ? "btn-primary" : "btn-ghost"}`}
                style={{
                  justifyContent: "center",
                  width: "100%",
                  padding: "0.875rem",
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p
          data-reveal
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "0.85rem",
            color: "var(--text-subtle)",
          }}
        >
          ¿Necesitás algo diferente?{" "}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)", textDecoration: "underline" }}
          >
            Hablemos y armamos un plan a tu medida.
          </a>
        </p>
      </div>
    </section>
  )
}
