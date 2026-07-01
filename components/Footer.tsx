import { config } from "@/lib/config"

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--border)",
        background: "rgba(6, 8, 16, 0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div
        className="container"
        style={{
          padding: "3rem clamp(1rem, 5vw, 4rem)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: "20rem" }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: "-0.04em",
              marginBottom: "0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2rem",
                height: "2rem",
                borderRadius: "7px",
                background: "var(--accent)",
                color: "#060810",
                fontSize: "0.75rem",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              L&amp;E
            </span>
            Webs
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            {config.footer.tagline}
          </p>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25rem 1.5rem",
              listStyle: "none",
            }}
          >
            {config.footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-muted)",
                    transition: "color var(--transition-fast)",
                  }}
                  className="footer-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "1rem clamp(1rem, 5vw, 4rem)",
          textAlign: "center",
          fontSize: "0.78rem",
          color: "var(--text-subtle)",
        }}
      >
        {config.footer.legal}
      </div>

    </footer>
  )
}
