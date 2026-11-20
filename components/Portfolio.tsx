import { Fragment } from "react"
import { config } from "@/lib/config"
import { PortfolioCarousel } from "@/components/PortfolioCarousel"
import { TbArrowUpRight, TbQuote } from "react-icons/tb"

export function Portfolio() {
  const { projects } = config.portfolio
  const { testimonials } = config

  return (
    <section id="portfolio" className="section">
      <div className="container">

        <div className="section-head">
          <div data-reveal className="section-pill">
            <span className="pill">Proyectos</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1">
            Proyectos recientes
          </h2>
          <p className="subhead" data-reveal data-delay="2">
            Sitios que diseñamos y desarrollamos para negocios reales. Entrá y miralos funcionando.
          </p>
        </div>

        {/* Celular: carrusel deslizable con capturas de teléfono */}
        <PortfolioCarousel projects={projects} />

        {/* Escritorio: imagen panorámica + tarjeta superpuesta */}
        <div className="pf-items">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`pf-item${i % 2 === 1 ? " pf-item--flip" : ""}`}
              data-reveal
              data-delay={i === 1 ? "1" : "0"}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-item-img-wrap"
              >
                <img
                  src={project.screenshot}
                  alt={`Captura del sitio de ${project.title}`}
                  className="pf-item-img"
                  style={{ objectPosition: project.imgPosition }}
                  loading="lazy"
                />
                <div className="pf-item-img-veil" aria-hidden="true" />
                <div className="pf-item-img-hover" aria-hidden="true">
                  <span className="pf-img-overlay-cta">
                    Ver sitio <TbArrowUpRight size={13} />
                  </span>
                </div>
              </a>

              {/* Card — fondo opaco para que no se mezcle con la captura */}
              <div className="pf-item-card">
                <div className="pf-num-row">
                  <span className="pf-num">0{i + 1}</span>
                  <span className="pf-eyebrow">{project.category.toUpperCase()}</span>
                </div>
                <h3 className="pf-title">{project.title}</h3>
                <p className="pf-tagline-sub">{project.tagline}</p>
                <p className="pf-desc">{project.description}</p>

                {/* Solo se muestran cifras medidas, con su fuente */}
                {project.metrics.length > 0 && (
                  <div>
                    <div className="pf-stats-row">
                      {project.metrics.map((m, mi) => (
                        <Fragment key={m.label}>
                          {mi > 0 && <div className="pf-stat-sep" aria-hidden="true" />}
                          <div className="pf-stat">
                            <span className="pf-stat-val">{m.value}</span>
                            <span className="pf-stat-lbl">{m.label}</span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    {project.metricsSource && (
                      <p className="pf-stat-src">Fuente: {project.metricsSource}</p>
                    )}
                  </div>
                )}

                {/* Secundario: no competir con el botón de WhatsApp */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost pf-item-btn"
                >
                  Ver sitio <TbArrowUpRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonios — aparece solo cuando hay alguno cargado en config */}
        {testimonials.length > 0 && (
          <div className="testimonials">
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className="testimonial"
                data-reveal
                data-delay={String((i % 3) + 1)}
              >
                <TbQuote size={22} className="testimonial-icon" aria-hidden="true" />
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.business}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
