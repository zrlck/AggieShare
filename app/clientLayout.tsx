"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // This ensures hydration completes before showing content
    setShowContent(true)
  }, [])

  const handleLoadingComplete = () => {
    setLoading(false)
  }

  if (!showContent) {
    return null // Prevent hydration errors by not rendering anything on first pass
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AggieShare | Free Donation Marketplace for UC Davis</title>
        <meta name="description" content="Share and discover free essential goods in the UC Davis community" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
          <div
            className={`flex min-h-screen flex-col transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
          >
            <Navbar />
            <main className="flex-1 relative overflow-hidden">
              <AnimatedBackground />
              <div className="relative z-10">{children}</div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
