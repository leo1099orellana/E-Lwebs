import { config } from "@/lib/config"
import { WaLink } from "@/components/WaLink"
import { TbCheck, TbSearch } from "react-icons/tb"

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function Plans() {
  const { pricing } = config

  return (
    <section id="planes" className="section">
      <div className="container">
        <div className="section-head">
          <div data-reveal className="section-pill">
            <span className="pill">Planes</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1">
            Precios claros, sin sorpresas
          </h2>
          <p className="subhead" data-reveal data-delay="2">
            Dos opciones pensadas para distintas etapas de tu negocio. Ambas
            incluyen diseño y desarrollo a medida.
          </p>
        </div>

        <div className="plans-grid">
          {config.plans.map((plan, i) => (
            <div
              key={plan.id}
              data-reveal
              data-delay={String(i + 1)}
              className={`plan-card${plan.highlighted ? " plan-card--highlighted" : ""}`}
            >
              {"badge" in plan && plan.badge && (
                <div className="plan-badge">{plan.badge}</div>
              )}

              <div className="plan-name">{plan.name}</div>
              <p className="plan-desc">{plan.description}</p>

              <div style={{ marginBottom: "1.75rem" }}>
                <div className="plan-from">Desde</div>
                <div className="plan-price">{formatPrice(plan.price, plan.currency)}</div>
                <div className="plan-period">{pricing.paymentNote}</div>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <TbCheck size={18} className="plan-check" />
                    {feature}
                  </li>
                ))}
              </ul>

              <WaLink
                origen={plan.id === "landing" ? "plan_landing" : "plan_ecommerce"}
                message={plan.id === "landing" ? "plan_landing" : "plan_ecommerce"}
                className={`btn ${plan.highlighted ? "btn-primary" : "btn-ghost"}`}
                style={{ justifyContent: "center", width: "100%", padding: "0.875rem" }}
              >
                {plan.cta}
              </WaLink>
            </div>
          ))}
        </div>

        <p data-reveal className="plans-updated">
          Precios en pesos argentinos, actualizados a {pricing.updatedAt}.
        </p>

        {/* Primer paso sin costo, para tráfico frío — justo después de los precios */}
        <div data-reveal className="plans-free">
          <span className="plans-free-icon" aria-hidden="true">
            <TbSearch size={22} />
          </span>
          <div className="plans-free-body">
            <h3>{pricing.freeReview.title}</h3>
            <p>{pricing.freeReview.text}</p>
          </div>
          <WaLink
            origen="revision_gratis"
            message="revision_gratis"
            className="btn btn-primary plans-free-btn"
          >
            {pricing.freeReview.cta}
          </WaLink>
        </div>

        {/* Qué incluye y qué no */}
        <div data-reveal className="plans-terms">
          <h3 className="plans-terms-title">Antes de empezar, lo que tenés que saber</h3>
          <dl className="plans-terms-grid">
            {pricing.terms.map((term) => (
              <div key={term.title} className="plans-term">
                <dt>{term.title}</dt>
                <dd>{term.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p data-reveal className="plans-custom">
          ¿Necesitás algo diferente?{" "}
          <WaLink origen="plan_medida" style={{ color: "var(--accent)", textDecoration: "underline" }}>
            Hablemos y armamos un plan a tu medida.
          </WaLink>
        </p>
      </div>
    </section>
  )
}
