"use client"

import { useRef, useState } from "react"
import { TbArrowUpRight } from "react-icons/tb"
import type { Project } from "@/lib/config"

/** Carrusel móvil: se desliza con el dedo, con la tarjeta siguiente asomando. */
export function PortfolioCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return
    const step = first.offsetWidth + 14 // ancho de tarjeta + gap
    setActive(Math.min(projects.length - 1, Math.round(track.scrollLeft / step)))
  }

  const goTo = (i: number) => {
    const card = trackRef.current?.children[i] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
  }

  return (
    <div className="pfc">
      <div
        ref={trackRef}
        className="pfc-track"
        onScroll={onScroll}
        aria-label="Proyectos — deslizá para ver más"
      >
        {projects.map((p, i) => (
          <article key={p.title} className="pfc-card">
            <div className="pfc-stage">
              <div className="pfc-phone">
                <img
                  src={p.mobileScreenshot}
                  alt={`Sitio de ${p.title} visto en el celular`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
            <div className="pfc-body">
              <span className="pfc-eyebrow">
                <span className="pf-num">0{i + 1}</span> {p.category.toUpperCase()}
              </span>
              <h3 className="pfc-title">{p.title}</h3>
              <p className="pfc-desc">{p.description}</p>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="pfc-link">
                Ver sitio <TbArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="pfc-dots" role="tablist" aria-label="Elegir proyecto">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ver ${p.title}`}
            className="pfc-dot"
            data-active={i === active ? "true" : "false"}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  )
}
