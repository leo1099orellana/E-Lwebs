import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Benefits } from "@/components/Benefits"
import { Portfolio } from "@/components/Portfolio"
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
      <Nav />
      <main style={{ position: "relative", zIndex: 2, overflowX: "hidden" }}>
        <Hero />
        <Benefits />
        <Portfolio />
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
