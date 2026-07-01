import type { Metadata } from "next"
import { Space_Grotesk, Instrument_Sans } from "next/font/google"
import "./globals.css"
import { config } from "@/lib/config"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  metadataBase: new URL(config.brand.url),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    url: config.brand.url,
    siteName: config.brand.name,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.title,
    description: config.seo.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={config.brand.lang}
      data-theme="marble"
      className={`${spaceGrotesk.variable} ${instrumentSans.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
