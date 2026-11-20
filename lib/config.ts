// ─────────────────────────────────────────────────────────────────────────────
// Plazos y promesas — ÚNICA fuente de verdad.
// Hero, planes, preguntas frecuentes y contacto leen de acá, así no se
// contradicen. Si cambiás un plazo, cambialo solo en este bloque.
// ─────────────────────────────────────────────────────────────────────────────
const TIEMPOS = {
  respuesta: "el mismo día hábil",
  landing: "3 a 5 días hábiles",
  ecommerce: "2 a 4 semanas",
} as const

const HORARIO = "Lun a Vie · 9 a 18 hs"

export type Testimonial = {
  quote: string
  name: string
  business: string
}

export type ProjectMetric = {
  value: string
  label: string
}

export type Project = {
  title: string
  tagline: string
  category: string
  description: string
  url: string
  screenshot: string
  imgPosition: string
  /** Solo cifras MEDIDAS. Dejalo vacío si no tenés el dato. */
  metrics: ProjectMetric[]
  /** De dónde sale la cifra, ej: "Meta Ads, marzo a mayo 2026 vs. mismo período 2025" */
  metricsSource?: string
}

export const config = {
  brand: {
    name: "L&E Webs",
    tagline: "Páginas web para negocios locales",
    // Cuando tengas dominio propio, cambiá a algo como hola@tudominio.com
    email: "eylwebs@gmail.com",
    lang: "es-AR",
  },

  tiempos: TIEMPOS,
  horario: HORARIO,

  whatsapp: {
    number: "5491176033266",
    display: "+54 9 11 7603-3266",
    // Cuerpo del mensaje precargado según el botón. Se arma así:
    //   visita normal  → "Hola, <cuerpo> [web]"
    //   viene de anuncio → "Hola, vi su anuncio y <cuerpo> [anuncio]"
    // Con la etiqueta final distinguís en WhatsApp Business qué chats vienen de ads.
    messages: {
      default: "quiero un presupuesto para mi página web",
      plan_landing: "me interesa el plan Landing Page",
      plan_ecommerce: "me interesa el plan E-commerce",
      revision_gratis: "quiero la revisión gratis de mi presencia online",
    },
    tagWeb: "[web]",
    tagAd: "[anuncio]",
  },

  seo: {
    title: "L&E Webs — Tu página web lista en 5 días, con botón a WhatsApp",
    description:
      "Páginas web para negocios locales: se ven bien en el celular, cargan rápido, aparecen en Google y tus clientes te escriben por WhatsApp. Landing desde $100.000.",
  },

  nav: {
    links: [
      { label: "Proyectos", href: "#portfolio" },
      { label: "Planes", href: "#planes" },
    ],
    cta: {
      primary: "Pedir presupuesto",
      hover: "Es gratis 👋",
    },
  },

  hero: {
    pill: "Diseño web para negocios locales",
    headline: {
      before: "Tu página web lista ",
      highlight: "en 5 días",
      after: ", con botón directo a WhatsApp",
    },
    description:
      "Para negocios locales que quieren que los encuentren y les escriban.",
    // Texto decorativo de la barra del navegador falso (no es un link)
    browserUrl: "tunegocio.com.ar",
    cta: "Pedir presupuesto",
    ctaSecondary: "Ver proyectos",
    stats: [
      { value: "Mismo día", label: "hábil te respondemos" },
      { value: "3–5 días", label: "hábiles · landing" },
      { value: "2–4 sem.", label: "tienda online" },
    ],
  },

  benefits: [
    {
      icon: "mobile",
      title: "Se ve bien en el celular",
      text: "La mayoría de tus clientes te va a mirar desde el teléfono. La diseñamos pensando primero en eso.",
    },
    {
      icon: "speed",
      title: "Carga rápido",
      text: "Liviana y sin vueltas, para que abra rápido incluso con datos móviles.",
    },
    {
      icon: "google",
      title: "Aparece en Google",
      text: "La dejamos preparada para que te encuentren cuando buscan lo que hacés en tu zona.",
    },
    {
      icon: "whatsapp",
      title: "Te escriben por WhatsApp",
      text: "Botón directo a tu WhatsApp: el cliente toca y ya está hablando con vos.",
    },
  ],

  portfolio: {
    projects: [
      {
        title: "Pisani",
        tagline: "Más consultas, menos fricción",
        category: "Inmobiliaria",
        description:
          "Sitio institucional moderno para empresa de servicios. Diseño limpio, navegación fluida y optimizado para conversión.",
        url: "https://www.igpisani.com.ar",
        screenshot: "/screenshots/pisani.jpg",
        imgPosition: "top center",
        metrics: [],
      },
      {
        title: "Blanco Construcciones",
        tagline: "Presencia digital que genera leads",
        category: "Construcción",
        description:
          "Sitio institucional para empresa constructora. Presentación de obras, servicios y contacto directo.",
        url: "https://www.blancoconstrucciones.com.ar",
        screenshot: "/screenshots/blanco.jpg",
        imgPosition: "left top",
        metrics: [],
      },
      {
        title: "Lo de Dani",
        tagline: "Pedidos directo a WhatsApp",
        category: "Gastronomía",
        description:
          "Landing para casa de comidas con delivery: carta completa, promos y pedidos directo por WhatsApp.",
        url: "https://www.lodedanicomidas.com.ar",
        screenshot: "/screenshots/lodedani.jpg",
        imgPosition: "left top",
        metrics: [],
      },
    ] as Project[],
  },

  // Prueba social. La sección aparece sola apenas cargues al menos uno.
  // Pedí permiso antes de publicar nombre y negocio. Ejemplo:
  // { quote: "Desde que tenemos la web nos escriben más por WhatsApp.", name: "Dani", business: "Lo de Dani · Gastronomía" },
  testimonials: [] as Testimonial[],

  pricing: {
    updatedAt: "noviembre 2026",
    paymentNote: "50% al empezar · 50% al entregar",
    // REVISAR: son condiciones que le prometés al cliente. Ajustalas a cómo trabajás.
    terms: [
      {
        title: "Forma de pago",
        text: "50% al empezar y 50% al entregar. Sin cuotas mensuales.",
      },
      {
        title: "Dominio y hosting",
        text: "No están incluidos en el precio. Te ayudamos a contratarlos y quedan a tu nombre.",
      },
      {
        title: "Cambios",
        text: "Incluye 2 rondas de cambios sobre el diseño antes de publicar.",
      },
      {
        title: "Textos y fotos",
        text: "Los ponés vos (logo, fotos y textos). El plazo de entrega corre desde que los recibimos.",
      },
    ],
    freeReview: {
      title: "¿Todavía no sabés qué necesitás?",
      text: "Revisamos tu presencia online gratis en 15 minutos: Google Maps, redes y web. Te decimos qué mejorar, sin compromiso.",
      cta: "Quiero la revisión gratis",
    },
  },

  plans: [
    {
      id: "landing",
      name: "Landing Page",
      description:
        "Página profesional para que te encuentren y te escriban. Ideal para negocios locales.",
      price: 100000,
      currency: "ARS",
      badge: "Más recomendado",
      features: [
        "Diseño a medida para tu negocio",
        "Hasta 5 secciones",
        "Botón y formulario directo a WhatsApp",
        "Se ve bien en el celular",
        "Preparada para aparecer en Google",
        `Entrega en ${TIEMPOS.landing}`,
        "7 días de soporte después de publicar",
      ],
      cta: "Quiero mi landing",
      highlighted: true,
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description:
        "Tienda online completa con pagos, catálogo y gestión de productos.",
      price: 250000,
      currency: "ARS",
      features: [
        "Todo lo de Landing Page",
        "Catálogo de productos",
        "Cobros con Mercado Pago",
        "Carrito de compras",
        "Panel para cargar y editar productos",
        "Estadísticas de visitas y ventas",
        `Entrega en ${TIEMPOS.ecommerce}`,
        "30 días de soporte después de publicar",
      ],
      cta: "Quiero mi tienda",
      highlighted: false,
    },
  ],

  process: [
    {
      step: "01",
      title: "Escuchamos",
      description:
        "Entendemos tu negocio, tu público y tus objetivos antes de empezar a diseñar.",
    },
    {
      step: "02",
      title: "Diseñamos",
      description:
        "Armamos cómo se va a ver tu página, pensada para que el cliente te escriba.",
    },
    {
      step: "03",
      title: "Desarrollamos",
      description:
        "La construimos para que sea rápida, segura y fácil de ampliar más adelante.",
    },
    {
      step: "04",
      title: "Lanzamos",
      description:
        "Publicamos, te enseñamos a usarla y quedamos disponibles para lo que necesites.",
    },
  ],

  faq: [
    {
      q: "¿Cuánto tarda en estar listo mi sitio?",
      a: `Una landing page está lista en ${TIEMPOS.landing} y una tienda online en ${TIEMPOS.ecommerce}. El plazo corre desde que nos pasás textos, logo y fotos.`,
    },
    {
      q: "¿Puedo editar el contenido yo mismo?",
      a: "Sí. Configuramos un panel de administración simple o te entregamos las instrucciones para editar el texto directamente sin tocar código.",
    },
    {
      q: "¿El diseño es único o usan templates?",
      a: "Cada sitio es 100% a medida. Partimos de tus necesidades y tu identidad de marca, no de un template genérico.",
    },
    {
      q: "¿Qué incluye el soporte post-lanzamiento?",
      a: "El plan E-commerce incluye 30 días de soporte. El plan Landing incluye 7 días. Después podés contratar soporte mensual a medida.",
    },
    {
      q: "¿Trabajan con negocios de todo el país?",
      a: "Sí. Trabajamos 100% remoto por WhatsApp y videollamada, así que no importa dónde esté tu negocio.",
    },
    {
      q: "¿Pueden integrar Mercado Pago u otros pagos?",
      a: "Sí. Integramos Mercado Pago, transferencias bancarias y otros métodos según tu necesidad de negocio.",
    },
  ],

  contact: {
    subhead: `Contanos qué necesitás y te respondemos ${TIEMPOS.respuesta}.`,
    intro:
      "Preferimos WhatsApp para responderte más rápido. Si nos escribís fuera de horario, te respondemos el próximo día hábil.",
  },

  cta: {
    title: "¿Listo para dar el siguiente paso?",
    description:
      "Hablemos de tu proyecto. Una charla de 15 minutos puede cambiar el rumbo de tu negocio.",
    cta: "Pedir presupuesto ahora",
  },

  footer: {
    tagline: "Páginas web para negocios locales que quieren que los encuentren y les escriban.",
    links: [
      { label: "Proyectos", href: "#portfolio" },
      { label: "Planes", href: "#planes" },
      { label: "Proceso", href: "#proceso" },
      { label: "Preguntas", href: "#faq" },
    ],
    legal: "© 2026 L&E Webs. Todos los derechos reservados.",
  },

  themes: {
    default: "tech",
    options: [
      {
        id: "tech",
        label: "Tech",
        bg: "#060810",
        accent: "#2fdba0",
      },
      {
        id: "ocean",
        label: "Ocean",
        bg: "#04080f",
        accent: "#38bdf8",
      },
      {
        id: "dusk",
        label: "Dusk",
        bg: "#080602",
        accent: "#fbbf24",
      },
    ],
  },
} as const

export type Config = typeof config
