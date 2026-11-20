import { config } from "@/lib/config"

/** "Quiénes somos" — se muestra solo cuando config.about tiene foto y texto. */
export function About() {
  const about = config.about
  if (!about) return null

  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="about-card" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={about.photo} alt={about.title} className="about-photo" />
          <div>
            <h2 className="about-title">{about.title}</h2>
            <p className="about-text">{about.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
