"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface CloudRevealProps {
  children: React.ReactNode
  customImagePath?: string // New prop to accept a custom image path
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
              {/* Reduced number of background clouds */}
              <div className="absolute top-[15%] left-[10%] w-24 h-16 bg-white rounded-full opacity-70 blur-sm"></div>
              <div className="absolute top-[25%] right-[15%] w-32 h-20 bg-white rounded-full opacity-70 blur-sm"></div>
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
                    src={customImagePath || "/placeholder.svg"}
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
              // Default cloud animation
              <>
                {/* Left cloud - optimized with fewer elements and simpler animations */}
                <motion.div
                  className="absolute top-0 left-0 w-1/2 h-screen"
                  initial={{ x: 0 }}
                  animate={{ x: "-100%" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                  onAnimationComplete={handleAnimationComplete}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute top-0 right-0 h-full w-full">
                      {/* Simplified cloud structure with fewer divs */}
                      <div className="absolute top-[10%] right-[5%] w-[90%] h-[80%] bg-white rounded-[50%] opacity-95 shadow-lg"></div>
                      <div className="absolute top-[5%] right-[15%] w-[70%] h-[90%] bg-white rounded-[50%] opacity-95 shadow-lg"></div>
                      <div className="absolute top-[40%] right-[5%] w-[30%] h-[30%] bg-white rounded-full opacity-90"></div>

                      {/* Single shadow element */}
                      <div className="absolute bottom-[10%] right-[10%] w-[80%] h-[10%] bg-gray-200 rounded-full opacity-30 blur-md"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Right cloud - optimized with fewer elements and simpler animations */}
                <motion.div
                  className="absolute top-0 right-0 w-1/2 h-screen"
                  initial={{ x: 0 }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
                >
                  <div className="relative h-full w-full">
                    <div className="absolute top-0 left-0 h-full w-full">
                      {/* Simplified cloud structure with fewer divs */}
                      <div className="absolute top-[10%] left-[5%] w-[90%] h-[80%] bg-white rounded-[50%] opacity-95 shadow-lg"></div>
                      <div className="absolute top-[5%] left-[15%] w-[70%] h-[90%] bg-white rounded-[50%] opacity-95 shadow-lg"></div>
                      <div className="absolute top-[40%] left-[5%] w-[30%] h-[30%] bg-white rounded-full opacity-90"></div>

                      {/* Single shadow element */}
                      <div className="absolute bottom-[10%] left-[10%] w-[80%] h-[10%] bg-gray-200 rounded-full opacity-30 blur-md"></div>
                    </div>
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
                  <Image src="/logo.png" alt="AggieShare Logo" fill className="object-contain" />
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
                <div className="relative w-20 h-20">
                  <Image src="/mascots/cow.png" alt="UC Davis Cow" fill className="object-contain" />
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
