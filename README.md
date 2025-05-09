# InQbus Marketing

![InQbus Marketing](https://placeholder.svg?height=300&width=800&query=InQbus+Marketing+Agency+Banner)

## 🚀 Descripción

InQbus Marketing es una plataforma web moderna para una agencia de marketing digital que ofrece servicios de SEO, marketing de contenidos, publicidad digital y más. El sitio cuenta con una interfaz atractiva y dinámica con efectos visuales avanzados, formularios interactivos y un panel de administración para gestionar contenidos y tareas.

**Visita el sitio:** [inqubus-marketing.vercel.app](https://inqubus-marketing.vercel.app)

## ✨ Características

- Diseño responsive con modo claro/oscuro
- Efectos visuales avanzados (partículas, animaciones, efectos de luz)
- Formularios de contacto y solicitud de auditoría gratuita
- Casos de estudio y servicios dinámicos
- Sistema de precios con planes personalizables
- Panel de administración para gestionar contenidos
- Sistema de gestión de tareas (todos)
- Integración completa con base de datos

## 🛠️ Tecnologías

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño responsive
- **Framer Motion** - Animaciones avanzadas
- **tsParticles** - Efectos de partículas
- **Lucide React** - Iconos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de datos
- **Shadcn/UI** - Componentes de UI accesibles

### Backend
- **Supabase** - Base de datos PostgreSQL y autenticación
- **Next.js Server Actions** - Operaciones del servidor
- **Vercel** - Despliegue y hosting

## 📁 Estructura del Proyecto

\`\`\`
inqubus-marketing/
├── app/                      # Rutas y páginas (Next.js App Router)
│   ├── actions/              # Server Actions
│   │   ├── audit-actions.ts
│   │   ├── contact-actions.ts
│   │   └── todo-actions.ts
│   ├── admin/                # Panel de administración
│   ├── api/                  # API Routes
│   │   └── seed-data/
│   ├── dashboard/            # Dashboard de tareas
│   │   └── todos/
│   ├── contact/              # Página de contacto
│   ├── get-started/          # Página para comenzar
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página principal
├── components/               # Componentes reutilizables
│   ├── admin/                # Componentes de administración
│   ├── error-boundary/       # Manejo de errores
│   ├── todos/                # Componentes de tareas
│   ├── ui/                   # Componentes de UI (shadcn)
│   ├── advanced-particles.tsx
│   ├── back-to-top.tsx
│   ├── case-studies.tsx
│   ├── case-studies-with-supabase.tsx
│   ├── contact-form.tsx
│   ├── contact-form-with-supabase.tsx
│   ├── desk-lamp-effect.tsx
│   ├── enhanced-light-effect.tsx
│   ├── features.tsx
│   ├── floating-paper.tsx
│   ├── footer.tsx
│   ├── free-audit.tsx
│   ├── free-audit-with-supabase.tsx
│   ├── gradient-text.tsx
│   ├── hero.tsx
│   ├── layered-particles-effect.tsx
│   ├── light-entry-effect.tsx
│   ├── mouse-move-effect.tsx
│   ├── navbar.tsx
│   ├── network-particles.tsx
│   ├── particle-config-selector.tsx
│   ├── particles-effect.tsx
│   ├── pricing-fixed.tsx
│   ├── pricing-with-supabase.tsx
│   ├── pricing.tsx
│   ├── robo-animation.tsx
│   ├── services.tsx
│   ├── services-with-supabase.tsx
│   ├── simple-error-boundary.tsx
│   ├── sparkles.tsx
│   ├── subtle-light-effect.tsx
│   ├── theme-provider.tsx
│   ├── theme-switcher.tsx
│   └── vignette-overlay.tsx
├── lib/                      # Utilidades y configuraciones
│   ├── error-logging.ts
│   ├── hoc/
│   ├── hooks/
│   │   ├── use-error-handler.ts
│   │   ├── use-mouse-position.ts
│   │   ├── use-safe-props.ts
│   │   └── use-theme.tsx
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── database.types.ts
│   │   └── server.ts
│   └── utils/
│       └── fix-tailwind-props.tsx
├── public/                   # Archivos estáticos
├── docs/                     # Documentación
├── tailwind.config.ts        # Configuración de Tailwind
├── package.json              # Dependencias
└── tsconfig.json             # Configuración de TypeScript
\`\`\`

## 🔧 Instalación y Uso

1. **Clonar el repositorio**
 \`\`\`bash
 git clone https://github.com/tu-usuario/inqubus-marketing.git
 cd inqubus-marketing
 \`\`\`

2. **Instalar dependencias**
 \`\`\`bash
 npm install
 \`\`\`

3. **Configurar variables de entorno**
 Crea un archivo `.env.local` con las siguientes variables:
 \`\`\`
 NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
 NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase
 \`\`\`

4. **Inicializar la base de datos**
 Ejecuta la ruta API para sembrar datos iniciales:
 \`\`\`bash
 curl -X POST http://localhost:3000/api/seed-data
 \`\`\`

5. **Ejecutar en desarrollo**
 \`\`\`bash
 npm run dev
 \`\`\`

6. **Construir para producción**
 \`\`\`bash
 npm run build
 npm start
 \`\`\`

## 🧩 Características Principales

### Modo Oscuro/Claro
El sitio incluye un selector de tema que permite a los usuarios cambiar entre modo oscuro y claro según sus preferencias.

### Efectos Visuales
- **Partículas Interactivas**: Diferentes configuraciones de partículas que responden al movimiento del ratón.
- **Efecto de Luz**: Efecto de luz sutil que añade profundidad y dinamismo a la interfaz.
- **Animaciones**: Transiciones y animaciones suaves para mejorar la experiencia de usuario.

### Panel de Administración
Accede a `/admin` para gestionar todos los datos de la aplicación:
- Contactos
- Solicitudes de auditoría
- Casos de éxito
- Servicios
- Planes de precios
- Tareas

### Sistema de Tareas
Accede a `/dashboard` para gestionar tareas con funcionalidades como:
- Creación y edición de tareas
- Filtrado por estado y prioridad
- Asignación de fechas límite
- Seguimiento de progreso

## 📝 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Contacto
Para cualquier consulta o sugerencia, por favor contacta a través de [contacto@inqubus.com](mailto:contacto@inqubus.com).
