"use client"

import { useEffect, useState } from "react"
import { config } from "@/lib/config"

const STEP_MS = 2400

type Step = (typeof config.process)[number]

function StepContent({ step, isActive }: { step: Step; isActive: boolean }) {
  return (
    <>
      <div className="process-step-badge" data-active={isActive ? "true" : "false"}>
        {step.step}
      </div>
      <h3 className="process-step-title" style={{ color: isActive ? "var(--accent)" : "var(--text)" }}>
        {step.title}
      </h3>
      <p className="process-step-desc">{step.description}</p>
    </>
  )
}

export function Process() {
  const [active, setActive] = useState(0)
  const steps = config.process
  const total = steps.length

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const id = setInterval(() => setActive(i => (i + 1) % total), STEP_MS)
    return () => clearInterval(id)
  }, [total])

  return (
    <section id="proceso" className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div data-reveal style={{ marginBottom: "1rem" }}>
            <span className="pill">Proceso</span>
          </div>
          <h2 className="headline" data-reveal data-delay="1" style={{ marginBottom: "1rem" }}>
            Cómo trabajamos
          </h2>
          <p className="subhead" data-reveal data-delay="2" style={{ maxWidth: "38rem", margin: "0 auto" }}>
            Un proceso claro y transparente de principio a fin. Sin sorpresas, sin demoras.
          </p>
        </div>

        {/* ── DESKTOP: alternating timeline ── */}
        <div data-reveal data-delay="1" className="process-tl-wrap">

          {/* Top row — steps 01, 03 */}
          <div className="process-tl-row process-tl-row--top">
            {steps.map((step, i) => {
              const isActive = i === active
              return (
                <div key={step.step} className="process-tl-cell">
                  {i % 2 === 0 ? (
                    <>
                      <div className="process-tl-card" data-active={isActive ? "true" : "false"}>
                        <StepContent step={step} isActive={isActive} />
                      </div>
                      {/* vertical connector going down */}
                      <div className="process-tl-conn" data-active={isActive ? "true" : "false"} />
                    </>
                  ) : (
                    /* empty spacer in the top row for odd steps */
                    <div className="process-tl-empty" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Horizontal axis */}
          <div className="process-tl-axis">
            <div className="process-tl-track-line" />
            {steps.map((step, i) => (
              <div key={step.step} className="process-tl-dot" data-active={i === active ? "true" : "false"} />
            ))}
          </div>

          {/* Bottom row — steps 02, 04 */}
          <div className="process-tl-row process-tl-row--bottom">
            {steps.map((step, i) => {
              const isActive = i === active
              return (
                <div key={step.step} className="process-tl-cell">
                  {i % 2 === 1 ? (
                    <>
                      {/* vertical connector going up */}
                      <div className="process-tl-conn" data-active={isActive ? "true" : "false"} />
                      <div className="process-tl-card" data-active={isActive ? "true" : "false"}>
                        <StepContent step={step} isActive={isActive} />
                      </div>
                    </>
                  ) : (
                    <div className="process-tl-empty" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── MOBILE: 2-col grid ── */}
        <div data-reveal data-delay="1" className="process-mobile-grid">
          {steps.map((step, i) => {
            const isActive = i === active
            return (
              <div key={step.step} className="process-card" data-active={isActive ? "true" : "false"}>
                <StepContent step={step} isActive={isActive} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
