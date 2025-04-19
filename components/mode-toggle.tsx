"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { useThemeStore } from "@/lib/store"
import { useEffect } from "react"

export function ModeToggle() {
  const { setTheme: setNextTheme, theme: nextTheme } = useTheme()
  const { theme, setTheme } = useThemeStore()

  // Sync the theme from zustand with next-themes
  useEffect(() => {
    if (theme) {
      setNextTheme(theme)
    }
  }, [theme, setNextTheme])

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    setNextTheme(newTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-hackdavis-navy">
          <div className="relative h-5 w-5">
            {/* Sun icon */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: nextTheme === "dark" ? 0 : 1,
                scale: nextTheme === "dark" ? 0.5 : 1,
                rotate: nextTheme === "dark" ? -30 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </motion.svg>

            {/* Moon icon */}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: nextTheme === "dark" ? 1 : 0,
                scale: nextTheme === "dark" ? 1 : 0.5,
                rotate: nextTheme === "dark" ? 0 : 30,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </motion.svg>
          </div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
