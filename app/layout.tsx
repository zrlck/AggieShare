import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CloudReveal from "@/components/cloud-reveal"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AggieShare | Free Donation Marketplace for UC Davis",
  description: "Share and discover free essential goods in the UC Davis community",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CloudReveal>{children}</CloudReveal>
        </ThemeProvider>
      </body>
    </html>
  )
}
