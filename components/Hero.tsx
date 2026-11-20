import type { IconType } from "react-icons"
import {
  TbArrowDown,
  TbBolt,
  TbBrandGoogle,
  TbBrandWhatsapp,
  TbDeviceMobile,
} from "react-icons/tb"
import { config } from "@/lib/config"
import { WaLink } from "@/components/WaLink"

const BENEFIT_ICONS: Record<(typeof config.benefits)[number]["icon"], IconType> = {
  mobile: TbDeviceMobile,
  speed: TbBolt,
  google: TbBrandGoogle,
  whatsapp: TbBrandWhatsapp,
}

export function Hero() {
  const { hero } = config

  return (
    <section id="inicio" className="hero-section">

      {/* ── Background orbs (outside the device frame) ── */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-dot-grid" />
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-orb hero-orb--3" />
      </div>

      <div className="container">

        {/* ── Browser / device frame (en celular se oculta el marco) ── */}
        <div className="hero-device">

          <div className="hero-device-chrome" aria-hidden="true">
            <div className="hero-device-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <div className="hero-device-url">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.5 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {hero.browserUrl}
            </div>
          </div>

          <div className="hero-device-screen">
            <div className="hero-screen-glow" aria-hidden="true" />

            <div className="hero-content">
              <div className="hero-pill-wrap">
                <span className="pill">{hero.pill}</span>
              </div>

              {/* Texto completo y fijo desde el primer render */}
              <h1 className="hero-headline">
                {hero.headline.before}
                <span className="hero-highlight">{hero.headline.highlight}</span>
                {hero.headline.after}
              </h1>

              <p className="hero-desc">{hero.description}</p>

              <div className="hero-ctas">
                <WaLink origen="hero" className="btn btn-primary hero-btn-primary">
                  <TbBrandWhatsapp size={20} aria-hidden="true" />
                  {hero.cta}
                </WaLink>
                <a href="#portfolio" className="hero-link">
                  {hero.ctaSecondary} <TbArrowDown size={15} aria-hidden="true" />
                </a>
              </div>

              <div className="hero-stats">
                {hero.stats.map(stat => (
                  <div key={stat.label} className="hero-stat">
                    <div className="hero-stat-value">{stat.value}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Beneficios en lenguaje de cliente (antes era una sección aparte) */}
              <ul className="hero-benefits">
                {config.benefits.map((b) => {
                  const Icon = BENEFIT_ICONS[b.icon]
                  return (
                    <li key={b.title}>
                      <Icon size={18} aria-hidden="true" />
                      {b.title}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
