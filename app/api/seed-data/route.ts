import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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
