"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const animationFrameRef = useRef<number>()
  const cowRef = useRef<{ x: number; y: number; rotation: number }>({ x: 0, y: 0, rotation: 0 })

  // Initialize window size
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      // Set initial cow position
      cowRef.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        rotation: 0,
      }
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animate cow
  useEffect(() => {
    if (windowSize.width === 0) return

    const animateCow = () => {
      // Calculate direction to mouse with some smoothing
      const dx = (mousePosition.x - cowRef.current.x) * 0.05
      const dy = (mousePosition.y - cowRef.current.y) * 0.05

      // Update position with smoothing
      cowRef.current.x += dx
      cowRef.current.y += dy

      // Calculate rotation based on movement direction
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cowRef.current.rotation = Math.atan2(dy, dx) * (180 / Math.PI)
      }

      // Update the DOM
      const cowElement = document.getElementById("following-cow")
      if (cowElement) {
        cowElement.style.transform = `translate(${cowRef.current.x}px, ${cowRef.current.y}px) rotate(${cowRef.current.rotation}deg)`
      }

      animationFrameRef.current = requestAnimationFrame(animateCow)
    }

    animationFrameRef.current = requestAnimationFrame(animateCow)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [mousePosition, windowSize])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sky background with clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-300">
        <div className="absolute top-[10%] left-[5%] w-32 h-20 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-[20%] left-[30%] w-48 h-24 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-[15%] right-[10%] w-40 h-24 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-[40%] right-[25%] w-36 h-20 bg-white rounded-full opacity-80"></div>
      </div>

      {/* Single animated cow that follows the cursor */}
      <div
        id="following-cow"
        className="absolute transition-transform duration-300 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate(${windowSize.width / 2}px, ${windowSize.height / 2}px)`,
          zIndex: 10,
        }}
      >
        <div className="relative w-24 h-24">
          <Image src="/mascots/cow.png" alt="UC Davis Cow" fill className="object-contain" />
        </div>
      </div>
    </div>
  )
}
