"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

// Define interfaces for cloud configuration
interface CloudConfig {
  src: string
  position: {
    top?: string
    left?: string
    right?: string
    bottom?: string
  }
  size: {
    width: string
    height: string
  }
  opacity?: number
  zIndex?: number
}

interface AnimatedBackgroundProps {
  customClouds?: CloudConfig[] // Array of custom cloud configurations
}

export default function AnimatedBackground({ customClouds }: AnimatedBackgroundProps) {
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

  // Default cloud configurations - matching the original positions and sizes
  const defaultClouds = [
    {
      position: { top: "10%", left: "5%" },
      size: { width: "32", height: "20" },
      opacity: 0.8,
    },
    {
      position: { top: "20%", left: "30%" },
      size: { width: "48", height: "24" },
      opacity: 0.8,
    },
    {
      position: { top: "15%", right: "10%" },
      size: { width: "40", height: "24" },
      opacity: 0.8,
    },
    {
      position: { top: "40%", right: "25%" },
      size: { width: "36", height: "20" },
      opacity: 0.8,
    },
  ]

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Sky background with clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-300">
        {customClouds ? (
          // Render custom cloud images if provided
          customClouds.map((cloud, index) => (
            <div
              key={`custom-cloud-${index}`}
              className="absolute"
              style={{
                top: cloud.position.top,
                left: cloud.position.left,
                right: cloud.position.right,
                bottom: cloud.position.bottom,
                width: cloud.size.width,
                height: cloud.size.height,
                opacity: cloud.opacity || 0.8,
                zIndex: cloud.zIndex || 1,
              }}
            >
              <Image
                src={cloud.src || "cloudbeautiful.png"}
                alt={`Cloud ${index + 1}`}
                fill
                className="object-contain"
                priority={index < 2} // Prioritize loading the first few clouds
              />
            </div>
          ))
        ) : (
          // Fallback to the original div-based clouds if no custom images
          <>
            <div className="absolute top-[15%] left-[5%] w-32 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[20%] left-[30%] w-48 h-24 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[15%] right-[10%] w-40 h-24 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[40%] right-[25%] w-36 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[15%] left-[45%] w-32 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[25%] right-[30%] w-40 h-24 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[40%] left-[40%] w-48 h-24 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[75%] left-[5%] w-32 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[75%] left-[40%] w-32 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-[65%] left-[65%] w-32 h-20 bg-white rounded-full opacity-80"></div>




          </>
        )}
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
          <Image src="hackercow.png" alt="UC Davis Cow" fill className="object-contain" />
        </div>
      </div>
    </div>
  )
}
