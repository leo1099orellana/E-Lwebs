export const config = {
  brand: {
    name: "L&E Webs",
    tagline: "Diseño y desarrollo web a medida",
    description:
      "Creamos sitios web modernos que convierten visitantes en clientes reales.",
    url: "https://lewebs.com",
    email: "eylwebs@gmail.com",
    lang: "es-AR",
  },

  whatsapp: {
    number: "5491176033266",
    message:
      "Hola! Me gustaría pedir un presupuesto para mi proyecto web. ¿Podemos hablar?",
  },

  seo: {
    title: "L&E Webs — Diseño y Desarrollo Web a Medida",
    description:
      "Sitios web modernos, rápidos y orientados a conversión. Diseño y desarrollo a medida para negocios que quieren crecer online.",
    ogImage: "/og.png",
  },

  nav: {
    links: [
      { label: "Proyectos", href: "#portfolio" },
      { label: "Planes", href: "#planes" },
      { label: "Cómo trabajamos", href: "#proceso" },
      { label: "Preguntas", href: "#faq" },
    ],
    cta: {
      primary: "Pedir presupuesto",
      hover: "Es gratis 👋",
    },
  },

  hero: {
    prefix: "Más",
    typewriterWords: ["ventas", "clientes", "consultas"],
    suffix: "para tu negocio",
    description:
      "Diseñamos y desarrollamos sitios web a medida que convierten visitantes en clientes. Rápidos, modernos y pensados para crecer.",
    cta: "Pedir presupuesto",
    ctaSecondary: "Ver proyectos",
  },

  tecnologias: [
    { name: "React", icon: "SiReact", color: "#61DAFB" },
    { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF" },
    { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
    { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
    { name: "CSS3", icon: "SiCss3", color: "#1572B6" },
    { name: "Vercel", icon: "SiVercel", color: "#FFFFFF" },
    { name: "Git", icon: "SiGit", color: "#F05032" },
    { name: "GitHub", icon: "SiGithub", color: "#FFFFFF" },
    { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
    { name: "WordPress", icon: "SiWordpress", color: "#21759B" },
    { name: "Mercado Pago", icon: "SiMercadopago", color: "#009EE3" },
  ],

  portfolio: {
    projects: [
      {
        title: "Pisani",
        tagline: "Más consultas, menos fricción",
        category: "Inmobiliaria",
        description:
          "Sitio institucional moderno para empresa de servicios. Diseño limpio, navegación fluida y optimizado para conversión.",
        metric1Value: "+40%",
        metric1Label: "consultas mensuales",
        metric2Value: "<2s",
        metric2Label: "tiempo de carga",
        url: "https://www.igpisani.com.ar",
      },
      {
        title: "Blanco Construcciones",
        tagline: "Presencia digital que genera leads",
        category: "Construcción",
        description:
          "Sitio institucional para empresa constructora. Presentación de obras, servicios y contacto directo.",
        metric1Value: "+50%",
        metric1Label: "consultas vía web",
        metric2Value: "Activa",
        metric2Label: "campaña de ads",
        url: "https://www.blancoconstrucciones.com.ar",
      },
    ],
  },

  plans: [
    {
      name: "Landing Page",
      description:
        "Página de presentación profesional para captar clientes y validar tu negocio.",
      price: 150000,
      currency: "ARS",
      period: "pago único",
      features: [
        "Diseño personalizado",
        "Hasta 5 secciones",
        "Formulario de contacto vía WhatsApp",
        "Optimización SEO básica",
        "Responsive (mobile y tablet)",
        "Entrega en 3–5 días hábiles",
        "7 días de soporte post-lanzamiento",
      ],
      cta: "Empezar",
      highlighted: false,
    },
    {
      name: "E-commerce",
      description:
        "Tienda online completa con pagos, catálogo y gestión de productos.",
      price: 250000,
      currency: "ARS",
      period: "pago único",
      badge: "Más recomendado",
      features: [
        "Todo lo de Landing Page",
        "Catálogo de productos",
        "Integración Mercado Pago",
        "Carrito de compras",
        "Panel de gestión de productos",
        "Analytics y métricas",
        "Entrega en ~2 semanas",
        "30 días de soporte post-lanzamiento",
      ],
      cta: "Quiero mi tienda",
      highlighted: true,
    },
  ],

  process: [
    {
      step: "01",
      title: "Escuchamos",
      description:
        "Entendemos tu negocio, tu público y tus objetivos antes de escribir una sola línea de código.",
    },
    {
      step: "02",
      title: "Diseñamos",
      description:
        "Creamos el look & feel de tu sitio, pensado para la conversión y la experiencia de usuario.",
    },
    {
      step: "03",
      title: "Desarrollamos",
      description:
        "Programamos todo con tecnología moderna: rápido, seguro y fácil de escalar.",
    },
    {
      step: "04",
      title: "Lanzamos",
      description:
        "Publicamos, te enseñamos a gestionarlo y quedamos disponibles para lo que necesites.",
    },
  ],

  faq: [
    {
      q: "¿Cuánto tarda en estar listo mi sitio?",
      a: "Una landing page lleva entre 5 y 10 días hábiles. Proyectos más complejos, entre 2 y 4 semanas. Depende del plan y la complejidad.",
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
      a: "Sí, trabajamos 100% remoto con herramientas asíncronas. Clientes en Buenos Aires, Córdoba, Rosario y más.",
    },
    {
      q: "¿Pueden integrar Mercado Pago u otros pagos?",
      a: "Sí. Integramos Mercado Pago, transferencias bancarias y otros métodos según tu necesidad de negocio.",
    },
  ],

  cta: {
    title: "¿Listo para dar el siguiente paso?",
    description:
      "Hablemos de tu proyecto. Una charla de 15 minutos puede cambiar el rumbo de tu negocio.",
    cta: "Pedir presupuesto ahora",
  },

  footer: {
    tagline:
      "Diseño y desarrollo web a medida para negocios que quieren crecer.",
    links: [
      { label: "Proyectos", href: "#portfolio" },
      { label: "Planes", href: "#planes" },
      { label: "Proceso", href: "#proceso" },
      { label: "FAQ", href: "#faq" },
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
