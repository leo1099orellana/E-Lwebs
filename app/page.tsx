import { CodeBackground } from "@/components/CodeBackground"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Portfolio } from "@/components/Portfolio"
import { TechMarquee } from "@/components/TechMarquee"
import { Plans } from "@/components/Plans"
import { Process } from "@/components/Process"
import { Faq } from "@/components/Faq"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { WhatsAppFab } from "@/components/WhatsAppFab"
import { RevealInit } from "@/components/RevealInit"

export default function Home() {
  return (
    <>
      <CodeBackground />
      <Nav />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <Portfolio />
        <TechMarquee />
        <Plans />
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
