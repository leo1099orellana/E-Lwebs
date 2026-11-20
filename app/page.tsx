import { CodeBackground } from "@/components/CodeBackground"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Portfolio } from "@/components/Portfolio"
import { Plans } from "@/components/Plans"
import { About } from "@/components/About"
import { Process } from "@/components/Process"
import { Faq } from "@/components/Faq"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { RevealInit } from "@/components/RevealInit"

// Orden pensado para quien llega desde un anuncio:
// promesa → prueba (proyectos) → precio → confianza → dudas → contacto
export default function Home() {
  return (
    <>
      <CodeBackground />
      <Nav />
      <main style={{ position: "relative", zIndex: 2, overflowX: "hidden" }}>
        <Hero />
        <Portfolio />
        <Plans />
        <About />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <RevealInit />
    </>
  )
}
