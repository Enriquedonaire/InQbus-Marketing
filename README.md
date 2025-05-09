# InQbus Marketing

<img src="public/inqubus-logo.png" alt="InQbus Marketing" width="200"/>

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

```bash
src/
├── components/              # Componentes reutilizables
│   ├── Cart.jsx             # Componente del carrito lateral
│   ├── ErrorDisplay.jsx     # Componente para mostrar errores
│   ├── Header.jsx           # Cabecera con navegación y carrito
│   ├── ProductActions.jsx   # Acciones de producto (selección de opciones)
│   ├── ProductCard.jsx      # Tarjeta de producto para el listado
│   ├── ProductDescription.jsx # Descripción detallada del producto
│   ├── ProductImage.jsx     # Componente para mostrar la imagen del producto
│   ├── ProductList.jsx      # Lista de productos con grid responsive
│   ├── SearchBar.jsx        # Barra de búsqueda para filtrar productos
│   ├── ThemeToggle.jsx      # Botón para cambiar entre modo claro y oscuro
│   └── UI/                  # Componentes de UI reutilizables
│       ├── toaster.jsx      # Componente para mostrar notificaciones
│       └── use-toast.js     # Hook para usar el sistema de notificaciones
├── context/
│   ├── CartContext.jsx      # Contexto para gestión del carrito
│   └── ThemeContext.jsx     # Contexto para gestión del tema
├── hooks/
│   └── useDebounce.js       # Hook personalizado para debounce en búsquedas
├── lib/
│   └── utils.js             # Funciones de utilidad
├── pages/
│   ├── CheckoutPage.jsx     # Página de proceso de compra
│   ├── HomePage.jsx         # Página principal con listado de productos
│   ├── NotFoundPage.jsx     # Página de error 404
│   ├── ProductDetailPage.jsx# Página de detalle de producto
│   └── ProductListPage.jsx  # Página de listado de productos
├── services/
│   └── api.js               # Servicios para comunicación con la API
├── __test__/                # Tests unitarios y de integración
│   ├── api.test.js
│   ├── CartContext.test.jsx
│   ├── CheckoutPage.test.jsx
│   ├── ErrorDisplay.test.jsx
│   ├── Header.test.jsx
│   ├── NotFound.test.jsx
│   ├── ProductCard.test.jsx
│   ├── ProductDescription.test.jsx
│   ├── ProductImage.test.jsx
│   ├── ProductListPage.test.jsx
│   ├── ThemeToggle.test.jsx
│   └── useToast.test.js
├── App.jsx                  # Componente principal de la aplicación
├── index.css                # Estilos globales
├── index.jsx                # Punto de entrada de la aplicación
├── main.jsx                 # Archivo HTML principal
├── vite.config.js           # Configuración de Vite
├── tailwind.config.js       # Configuración de Tailwind CSS
├── postcss.config.js        # Configuración de PostCSS
├── jest.config.js           # Configuración de Jest para testing
├── package.json             # Dependencias y scripts
└── README.md                # Documentación del proyecto
```

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
\`\`\`





```types file="lib/supabase/database.types"
... This file was left out for brevity. Assume it is correct and does not need any modifications. ...
