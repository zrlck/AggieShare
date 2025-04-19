"use client"

import type React from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        <AnimatedBackground />
        <div className="relative z-10">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
