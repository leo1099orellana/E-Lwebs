import { config } from "@/lib/config"

export function CtaBand() {
  const waUrl = `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(config.whatsapp.message)}`

  return (
    <section
      style={{
        padding: "clamp(4rem, 8vw, 6rem) clamp(1rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vmax",
          height: "40vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(84,90,171,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          data-reveal
          style={{
            display: "inline-block",
            padding: "0.35rem 1rem",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border-accent)",
            background: "var(--accent-faint)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "1.5rem",
          }}
        >
          ¿Hablamos?
        </div>

        <h2
          className="headline"
          data-reveal
          data-delay="1"
          style={{ marginBottom: "1rem", maxWidth: "40rem", margin: "0 auto 1rem" }}
        >
          {config.cta.title}
        </h2>

        <p
          className="subhead"
          data-reveal
          data-delay="2"
          style={{ maxWidth: "36rem", margin: "0 auto 2.5rem" }}
        >
          {config.cta.description}
        </p>

        <div data-reveal data-delay="3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: "1rem 2.5rem", fontSize: "1.05rem" }}
          >
            {config.cta.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
