"use client"

import { config } from "@/lib/config"
import { TbArrowUpRight } from "react-icons/tb"

export function Portfolio() {
  const { projects } = config.portfolio
  const screenshots = ["pisani", "blanco"]
  const imgPositions = ["top center", "left top"]

  return (
    <section id="portfolio" className="section">
      <div className="container">

        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div data-reveal style={{ marginBottom: "1rem" }}>
            <span className="pill">Proyectos</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1" style={{ marginBottom: "1rem" }}>
            Trabajo real, resultados reales
          </h2>
          <p className="subhead" data-reveal data-delay="2" style={{ maxWidth: "38rem", margin: "0 auto" }}>
            Una muestra de lo que construimos para negocios como el tuyo.
          </p>
        </div>

        <div className="pf-items">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`pf-item${i % 2 === 1 ? " pf-item--flip" : ""}`}
              data-reveal
              data-delay={i === 1 ? "1" : "0"}
            >
              {/* Panoramic image */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-item-img-wrap"
              >
                <img
                  src={`/screenshots/${screenshots[i]}.jpg`}
                  alt={project.title}
                  className="pf-item-img"
                  style={{ objectPosition: imgPositions[i] }}
                />
                <div className="pf-item-img-veil" aria-hidden="true" />
                <div className="pf-item-img-hover" aria-hidden="true">
                  <span className="pf-img-overlay-cta">
                    Ver sitio <TbArrowUpRight size={13} />
                  </span>
                </div>
              </a>

              {/* Floating glass card */}
              <div className="pf-item-card">
                <div className="pf-num-row">
                  <span className="pf-num">0{i + 1}</span>
                  <span className="pf-eyebrow">{project.category.toUpperCase()}</span>
                </div>
                <h3 className="pf-title">{project.title}</h3>
                <p className="pf-tagline-sub">{project.tagline}</p>
                <p className="pf-desc">{project.description}</p>
                <div className="pf-stats-row">
                  <div className="pf-stat">
                    <span className="pf-stat-val">{project.metric1Value}</span>
                    <span className="pf-stat-lbl">{project.metric1Label}</span>
                  </div>
                  <div className="pf-stat-sep" aria-hidden="true" />
                  <div className="pf-stat">
                    <span className="pf-stat-val">{project.metric2Value}</span>
                    <span className="pf-stat-lbl">{project.metric2Label}</span>
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary pf-item-btn"
                >
                  Ver proyecto <TbArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
