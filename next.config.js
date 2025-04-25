/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // Configuración de headers de seguridad
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Política de Seguridad de Contenido (CSP)
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data:;
              font-src 'self';
              connect-src 'self' https://*.vercel-insights.com;
              frame-ancestors 'none';
              form-action 'self';
              base-uri 'self';
              object-src 'none';
              upgrade-insecure-requests;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          // Prevenir MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Protección contra clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Habilitar protecciones XSS del navegador
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Política de referencia
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Política de permisos
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Forzar HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
