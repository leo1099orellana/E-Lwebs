"use client"

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss,
  SiVercel,
  SiGit,
  SiGithub,
  SiFigma,
  SiWordpress,
  SiMercadopago,
} from "react-icons/si"
import type { IconType } from "react-icons"
import { config } from "@/lib/config"

const ICON_MAP: Record<string, IconType> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiHtml5,
  SiCss3: SiCss,
  SiVercel,
  SiGit,
  SiGithub,
  SiFigma,
  SiWordpress,
  SiMercadopago,
}

const ROWS: Array<{ direction: "left" | "right"; duration: number }> = [
  { direction: "left",  duration: 38 },
  { direction: "right", duration: 48 },
  { direction: "left",  duration: 43 },
]

function MarqueeRow({
  direction,
  duration,
}: {
  direction: "left" | "right"
  duration: number
}) {
  const techs = config.tecnologias

  return (
    <div
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
      className="marquee-row"
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee-${direction} ${duration}s linear infinite`,
          gap: "0",
        }}
        className="marquee-track"
      >
        {/* Real items */}
        {techs.map((tech) => {
          const Icon = ICON_MAP[tech.icon]
          return (
            <div key={tech.name} className="marquee-item">
              {Icon && <Icon size={20} color={tech.color} />}
              <span>{tech.name}</span>
            </div>
          )
        })}
        {/* Duplicate for seamless loop */}
        {techs.map((tech) => {
          const Icon = ICON_MAP[tech.icon]
          return (
            <div key={`dup-${tech.name}`} className="marquee-item" aria-hidden="true">
              {Icon && <Icon size={20} color={tech.color} />}
              <span>{tech.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section
      id="tecnologias"
      className="section"
      style={{
        paddingBlock: "clamp(4rem, 8vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="container"
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <div data-reveal style={{ marginBottom: "1rem" }}>
          <span className="pill">Stack</span>
        </div>
        <h2 className="headline" data-reveal data-delay="1" style={{ marginBottom: "1rem" }}>
          Trabajamos con tecnología moderna
        </h2>
        <p
          className="subhead"
          data-reveal
          data-delay="2"
          style={{ maxWidth: "38rem", margin: "0 auto" }}
        >
          Las mismas herramientas que usan las grandes, al servicio de tu
          negocio.
        </p>
      </div>

      {/* Marquee rows */}
      <div
        data-reveal
        data-delay="2"
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        {ROWS.map((row, i) => (
          <MarqueeRow key={i} direction={row.direction} duration={row.duration} />
        ))}
      </div>

    </section>
  )
}
