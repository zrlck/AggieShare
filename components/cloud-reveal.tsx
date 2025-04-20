"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface CloudRevealProps {
  children: React.ReactNode
  customImagePath?: string
}

export default function CloudReveal({ children, customImagePath }: CloudRevealProps) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Reset animation state on page reload
  useEffect(() => {
    setShowAnimation(true)
    setAnimationComplete(false)
    setImageError(false)
    setImageLoaded(false)

    // Shorter animation duration - complete in 5 seconds
    const animationTimer = setTimeout(() => {
      handleAnimationComplete()
    }, 5000)

    return () => clearTimeout(animationTimer)
  }, [])

  const handleAnimationComplete = () => {
    setAnimationComplete(true)
    setTimeout(() => {
      setShowAnimation(false)
    }, 300) // Shorter fade-out transition
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    console.error("Failed to load custom image:", customImagePath)
    setImageError(true)
  }

  // Determine whether to show custom image or default clouds
  const showCustomImage = customImagePath && !imageError

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} // Faster fade transitions
          >
            {/* Simplified background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-300">
              {/* Replaced background clouds with chillcloud.png */}
              <div className="absolute top-[15%] left-[10%] w-32 h-32">
                <Image
                  src="/chillcloud.png"
                  alt="Chill Cloud"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain opacity-70"
                />
              </div>
              <div className="absolute top-[25%] right-[15%] w-40 h-40">
                <Image
                  src="/chillcloud.png"
                  alt="Chill Cloud"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain opacity-70"
                />
              </div>
            </div>

            {showCustomImage ? (
              // Custom image reveal animation
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 1 }}
                animate={{ scale: 1.2 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                onAnimationComplete={handleAnimationComplete}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={customImagePath || "cloudbeautiful.png"}
                    alt="Custom reveal image"
                    fill
                    className="object-contain"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    priority
                  />
                </div>
              </motion.div>
            ) : (
              // Default cloud animation - replaced with chillcloud.png
              <>
                {/* Left cloud - replaced with chillcloud.png */}
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-screen"
                  initial={{ x: 0 }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute top-0 right-0 h-full w-full flex items-center justify-end">
                      {/* Replaced with chillcloud.png */}
                      <div className="relative w-[100%] h-[100%]">
                        <Image
                          src="/chillcloud.png"
                          alt="Left Cloud"
                          fill
                          className="object-contain"
                          style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))" }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Bigger, more transparent left background cloud */}
<div className="absolute top-[20%] right-[-10%] w-[140%] h-[120%] z-0">
  <Image
    src="/chillcloud.png"
    alt="Left Cloud Background"
    fill
    className="object-contain opacity-40"
    style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.03))" }}
  />
</div>
<div className="absolute top-[-40%] right-[-10%] w-[140%] h-[120%] z-0">
  <Image
    src="/chillcloud.png"
    alt="Left Cloud Background"
    fill
    className="object-contain opacity-40"
    style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.03))" }}
  />
</div>
<div className="absolute top-[40%] right-[-10%] w-[140%] h-[120%] z-0">
  <Image
    src="/chillcloud.png"
    alt="Left Cloud Background"
    fill
    className="object-contain opacity-100"
    style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.03))" }}
  />
</div>

                </motion.div>

                {/* Right cloud - replaced with chillcloud.png */}
                <motion.div
                  className="absolute top-0 right-0 w-1/2 h-screen"
                  initial={{ x: 0 }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute top-0 left-0 h-full w-full flex items-center">
                      {/* Replaced with chillcloud.png */}
                      <div className="relative w-[100%] h-[100%]">
                        <Image
                          src="/chillcloud.png"
                          alt="Right Cloud"
                          fill
                          className="object-contain"
                          style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))" }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Bigger, more transparent right background cloud */}
<div className="absolute top-[-20%] left-[-10%] w-[140%] h-[120%] z-0">
  <Image
    src="/chillcloud.png"
    alt="Right Cloud Background"
    fill
    className="object-contain opacity-40"
    style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.03))" }}
  />
</div>
<div className="absolute top-[50%] left-[-10%] w-[140%] h-[120%] z-0">
  <Image
    src="/chillcloud.png"
    alt="Right Cloud Background"
    fill
    className="object-contain opacity-100"
    style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.03))" }}
  />
</div>
<div className="absolute top-[40%] left-[-10%] w-[140%] h-[120%] z-0">
  <Image
    src="/chillcloud.png"
    alt="Right Cloud Background"
    fill
    className="object-contain opacity-40"
    style={{ filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.03))" }}
  />
</div>

                </motion.div>
              </>
            )}

            {/* Logo and text - simplified animations */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-16 w-16">
                  <Image src="hackercow.png" alt="AggieShare Logo" fill className="object-contain" />
                </div>
                <h1 className="text-5xl font-bold">
                  <span className="text-hackdavis-navy">Aggie</span>
                  <span className="text-white">Share</span>
                </h1>
              </div>
              <p className="text-hackdavis-navy text-xl font-medium">Made in HackDavis 2025</p>

              {/* Error message if image failed to load */}
              {imageError && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-red-600 bg-white/80 px-3 py-1 rounded-md text-sm"
                >
                  Failed to load custom image. Using default animation.
                </motion.div>
              )}

              {/* Simplified loading indicator */}
              <motion.div
                className="mt-8 flex space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-hackdavis-navy"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.8, repeat: 5, repeatType: "loop" }}
                />
                <motion.div
                  className="h-4 w-4 rounded-full bg-hackdavis-navy"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.8, repeat: 5, repeatType: "loop", delay: 0.2 }}
                />
                <motion.div
                  className="h-4 w-4 rounded-full bg-hackdavis-navy"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.8, repeat: 5, repeatType: "loop", delay: 0.4 }}
                />
              </motion.div>
            </motion.div>

            {/* Single floating cow for visual appeal with minimal performance impact */}
            {!showCustomImage && (
              <motion.div
                className="absolute bottom-20 left-[15%]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: 2, ease: "easeInOut" }}
              >
                <div className="relative w-40 h-40">
                  <Image src="hackercow.png" alt="UC Davis Cow" fill className="object-contain" />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with optimized transition */}
      <div className={`${animationComplete ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>
        {children}
      </div>
    </div>
  )
}
