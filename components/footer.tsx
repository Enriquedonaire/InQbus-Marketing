"use client"

import Link from "next/link"
import { useTheme } from "@/components/theme-provider"

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <footer className={`border-t ${isDark ? "border-white/10" : "border-gray-200"} py-12`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className={`text-2xl font-bold ${isDark ? "text-white" : "text-blue-900"}`}>
                In<span className="text-blue-500">Q</span>bus
              </div>
            </div>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"} max-w-md`}>
              A full-service digital marketing agency helping businesses grow through strategic marketing solutions and
              creative campaigns.
            </p>
          </div>

          <div>
            <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-semibold mb-4`}>Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  Content Creation
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  Web Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`${isDark ? "text-white" : "text-blue-900"} font-semibold mb-4`}>Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${isDark ? "border-white/10" : "border-gray-200"} mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
        >
          <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
            © {new Date().getFullYear()} InQbus Marketing Agency. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className={`${isDark ? "text-gray-400" : "text-gray-600"} hover:text-blue-500 transition-colors`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Inqubus. Todos los derechos reservados.</p>
          <Link href="/admin" className="text-primary hover:underline mt-2 inline-block">
            Administración
          </Link>
        </div>
      </div>
    </footer>
  )
}
