import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Crear cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  try {
    // Verificar si ya hay datos en las tablas
    const { count: servicesCount } = await supabaseAdmin.from("services").select("*", { count: "exact", head: true })

    const { count: pricingCount } = await supabaseAdmin
      .from("pricing_plans")
      .select("*", { count: "exact", head: true })

    const { count: caseStudiesCount } = await supabaseAdmin
      .from("case_studies")
      .select("*", { count: "exact", head: true })

    // Insertar servicios si no hay ninguno
    if (!servicesCount) {
      await supabaseAdmin.from("services").insert([
        {
          title: "Estrategia de Marketing Digital",
          description:
            "Desarrollamos estrategias personalizadas para aumentar tu presencia online y alcanzar tus objetivos de negocio.",
          icon: "strategy",
          is_active: true,
          display_order: 1,
        },
        {
          title: "SEO y Posicionamiento",
          description:
            "Optimizamos tu sitio web para mejorar su visibilidad en los motores de búsqueda y atraer tráfico cualificado.",
          icon: "search",
          is_active: true,
          display_order: 2,
        },
        {
          title: "Marketing de Contenidos",
          description: "Creamos contenido relevante y valioso para atraer y retener a tu audiencia objetivo.",
          icon: "file-text",
          is_active: true,
          display_order: 3,
        },
        {
          title: "Publicidad Digital",
          description:
            "Gestionamos campañas publicitarias en Google Ads, Facebook Ads y otras plataformas para maximizar tu ROI.",
          icon: "megaphone",
          is_active: true,
          display_order: 4,
        },
        {
          title: "Redes Sociales",
          description:
            "Desarrollamos y ejecutamos estrategias de redes sociales para aumentar tu engagement y construir comunidad.",
          icon: "share-2",
          is_active: true,
          display_order: 5,
        },
        {
          title: "Email Marketing",
          description: "Diseñamos campañas de email marketing efectivas para nutrir leads y convertir clientes.",
          icon: "mail",
          is_active: true,
          display_order: 6,
        },
      ])
    }

    // Insertar planes de precios si no hay ninguno
    if (!pricingCount) {
      await supabaseAdmin.from("pricing_plans").insert([
        {
          name: "Básico",
          price: "499€",
          period: "mes",
          description: "Ideal para pequeñas empresas que quieren empezar a crecer online",
          features: [
            "Estrategia de marketing digital",
            "Gestión de 2 redes sociales",
            "Optimización SEO básica",
            "Informe mensual de resultados",
          ],
          button_text: "Comenzar",
          is_popular: false,
          display_order: 1,
        },
        {
          name: "Profesional",
          price: "999€",
          period: "mes",
          description: "Perfecto para empresas en crecimiento que buscan expandir su presencia online",
          features: [
            "Todo lo del plan Básico",
            "Gestión de 4 redes sociales",
            "SEO avanzado",
            "Campañas de Google Ads",
            "Email marketing",
            "Soporte prioritario",
          ],
          button_text: "Comenzar",
          is_popular: true,
          display_order: 2,
        },
        {
          name: "Empresarial",
          price: "1999€",
          period: "mes",
          description: "Solución completa para empresas que necesitan una estrategia integral",
          features: [
            "Todo lo del plan Profesional",
            "Gestión de todas las redes sociales",
            "Estrategia de contenidos avanzada",
            "Campañas de Facebook e Instagram Ads",
            "Análisis de competencia",
            "Consultor dedicado",
          ],
          button_text: "Contactar",
          is_popular: false,
          display_order: 3,
        },
      ])
    }

    // Insertar casos de éxito si no hay ninguno
    if (!caseStudiesCount) {
      await supabaseAdmin.from("case_studies").insert([
        {
          title: "Tienda Online de Moda",
          client: "FashionStore",
          description:
            "Aumentamos las ventas en un 150% en 6 meses mediante una estrategia combinada de SEO, publicidad en redes sociales y email marketing.",
          image_url: "/stylish-online-storefront.png",
          tag: "E-commerce",
          color: "blue",
          metrics: {
            "Aumento de ventas": "150%",
            "Tráfico orgánico": "+200%",
            ROI: "320%",
          },
          is_featured: true,
        },
        {
          title: "App de Viajes",
          client: "TravelBuddy",
          description:
            "Lanzamiento exitoso de una aplicación de viajes con más de 50,000 descargas en el primer mes gracias a una estrategia de marketing digital integral.",
          image_url: "/modern-travel-interface.png",
          tag: "Aplicación Móvil",
          color: "green",
          metrics: {
            Descargas: "50,000+",
            Retención: "68%",
            Conversión: "12.5%",
          },
          is_featured: true,
        },
        {
          title: "Red Social Profesional",
          client: "ProConnect",
          description:
            "Incrementamos la base de usuarios en un 200% y mejoramos la tasa de engagement mediante contenido de valor y campañas segmentadas.",
          image_url: "/interconnected-social-network.png",
          tag: "SaaS",
          color: "purple",
          metrics: {
            "Crecimiento de usuarios": "200%",
            Engagement: "+75%",
            "Tiempo en plataforma": "+120%",
          },
          is_featured: true,
        },
      ])
    }

    return NextResponse.json({
      success: true,
      message: "Datos iniciales insertados correctamente",
    })
  } catch (error: any) {
    console.error("Error al insertar datos iniciales:", error)

    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Datos de ejemplo para servicios
    const services = [
      {
        title: "SEO Optimization",
        description: "Boost your online visibility with our data-driven SEO strategies that drive organic traffic.",
        icon: "Search",
        display_order: 1,
      },
      {
        title: "Digital Marketing",
        description: "Comprehensive digital marketing campaigns that convert visitors into loyal customers.",
        icon: "TrendingUp",
        display_order: 2,
      },
      {
        title: "Content Creation",
        description: "Engaging content that tells your brand story and resonates with your target audience.",
        icon: "PenTool",
        display_order: 3,
      },
      {
        title: "Web Development",
        description: "Custom websites and applications designed to enhance your brand and drive conversions.",
        icon: "Globe",
        display_order: 4,
      },
      {
        title: "Analytics & Insights",
        description: "Data-driven insights to optimize your marketing strategy and maximize ROI.",
        icon: "BarChart",
        display_order: 5,
      },
      {
        title: "Social Media Management",
        description: "Strategic social media campaigns that build community and increase brand awareness.",
        icon: "MessageSquare",
        display_order: 6,
      },
    ]

    // Datos de ejemplo para planes de precios
    const pricingPlans = [
      {
        name: "Starter",
        price: "$999",
        period: "per month",
        description: "Perfect for small businesses just getting started",
        features: [
          "Social media management (2 platforms)",
          "Basic SEO optimization",
          "Monthly performance report",
          "Email marketing (1 campaign/month)",
          "Basic content creation",
        ],
        button_text: "Get Started",
        is_popular: false,
        display_order: 1,
      },
      {
        name: "Growth",
        price: "$2,499",
        period: "per month",
        description: "For businesses ready to accelerate their growth",
        features: [
          "Social media management (4 platforms)",
          "Advanced SEO strategy",
          "Weekly performance reports",
          "Email marketing (4 campaigns/month)",
          "Content creation & strategy",
          "PPC campaign management",
        ],
        button_text: "Choose Growth",
        is_popular: true,
        display_order: 2,
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: null,
        description: "Tailored solutions for large organizations",
        features: [
          "Comprehensive digital strategy",
          "Full-service marketing team",
          "Custom reporting dashboard",
          "Dedicated account manager",
          "Advanced analytics & insights",
          "Multi-channel campaign management",
        ],
        button_text: "Contact Sales",
        is_popular: false,
        display_order: 3,
      },
    ]

    // Datos de ejemplo para casos de éxito
    const caseStudies = [
      {
        title: "Aumento de 300% en tráfico orgánico",
        client: "E-commerce de Moda",
        description:
          "Implementamos una estrategia SEO completa que resultó en un aumento significativo del tráfico y un 150% más de conversiones en 6 meses.",
        image_url: "/stylish-online-storefront.png",
        tag: "SEO",
        color: "blue",
        metrics: JSON.stringify([
          { label: "Aumento de tráfico", value: "+300%" },
          { label: "Mejora en conversiones", value: "+150%" },
          { label: "Palabras clave en top 10", value: "120+" },
        ]),
        is_featured: true,
      },
      {
        title: "Campaña viral en redes sociales",
        client: "Startup de Tecnología",
        description:
          "Diseñamos una campaña que generó más de 1 millón de impresiones y 50,000 nuevos seguidores en un mes, aumentando las descargas de la app en un 200%.",
        image_url: "/interconnected-social-network.png",
        tag: "Redes Sociales",
        color: "purple",
        metrics: JSON.stringify([
          { label: "Impresiones", value: "1M+" },
          { label: "Nuevos seguidores", value: "50K+" },
          { label: "Aumento en descargas", value: "+200%" },
        ]),
        is_featured: true,
      },
      {
        title: "Rediseño web con enfoque en conversión",
        client: "Agencia de Viajes",
        description:
          "Rediseñamos su sitio web con un enfoque en la experiencia del usuario, logrando un aumento del 85% en la tasa de conversión y reduciendo el abandono en un 40%.",
        image_url: "/modern-travel-interface.png",
        tag: "Diseño Web",
        color: "green",
        metrics: JSON.stringify([
          { label: "Mejora en conversión", value: "+85%" },
          { label: "Reducción de abandono", value: "-40%" },
          { label: "Tiempo en sitio", value: "+120%" },
        ]),
        is_featured: true,
      },
    ]

    // Insertar servicios
    const { error: servicesError } = await supabase.from("services").insert(services)
    if (servicesError) throw servicesError

    // Insertar planes de precios
    const { error: pricingError } = await supabase.from("pricing_plans").insert(pricingPlans)
    if (pricingError) throw pricingError

    // Insertar casos de éxito
    const { error: caseStudiesError } = await supabase.from("case_studies").insert(caseStudies)
    if (caseStudiesError) throw caseStudiesError

    return NextResponse.json({ success: true, message: "Datos de ejemplo insertados correctamente" })
  } catch (error) {
    console.error("Error al insertar datos de ejemplo:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
