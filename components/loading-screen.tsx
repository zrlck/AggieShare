"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadingComplete?: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, 3500) // 3.5 seconds loading time

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-300 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {/* Background clouds */}
          <div className="absolute top-[10%] left-[5%] w-32 h-20 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-[20%] left-[30%] w-48 h-24 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-[15%] right-[10%] w-40 h-24 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-[40%] right-[25%] w-36 h-20 bg-white rounded-full opacity-80"></div>

          {/* Cloud container - this helps center the clouds */}
          <div className="relative w-[600px] h-[300px]">
            {/* Left cloud */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-full -translate-y-1/2"
              initial={{ x: 0 }}
              animate={{ x: 0, rotate: [0, -1, 0, 1, 0] }}
              exit={{ x: "-50vw", scale: 1.2 }}
              transition={{
                x: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 },
                rotate: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 },
              }}
            >
              <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M150 180C80 180 20 140 20 90C20 40 60 10 100 10C120 10 130 20 150 20C170 20 180 10 200 10C240 10 280 40 280 90C280 140 220 180 150 180Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </motion.div>

            {/* Right cloud */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-y-1/2"
              initial={{ x: 0 }}
              animate={{ x: 0, rotate: [0, 1, 0, -1, 0] }}
              exit={{ x: "50vw", scale: 1.2 }}
              transition={{
                x: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 },
                rotate: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 },
              }}
            >
              <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M150 20C220 20 280 60 280 110C280 160 240 190 200 190C180 190 170 180 150 180C130 180 120 190 100 190C60 190 20 160 20 110C20 60 80 20 150 20Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </motion.div>

            {/* Logo and text - centered in the cloud container */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              <motion.p
                className="text-hackdavis-navy text-xl font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Made in HackDavis 2025
              </motion.p>

              {/* Loading indicator */}
              <motion.div
                className="mt-8 flex space-x-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-hackdavis-navy"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2 }}
                />
                <motion.div
                  className="h-4 w-4 rounded-full bg-hackdavis-navy"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2, delay: 0.2 }}
                />
                <motion.div
                  className="h-4 w-4 rounded-full bg-hackdavis-navy"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.2, delay: 0.4 }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating cows */}
          <motion.div
            className="absolute bottom-20 left-[15%]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="relative w-20 h-20">
              <Image src="/mascots/cow.png" alt="UC Davis Cow" fill className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[15%] right-[15%]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="relative w-20 h-20">
              <Image src="/mascots/cow.png" alt="UC Davis Cow" fill className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-[25%] right-[20%]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          >
            <div className="relative w-16 h-16">
              <Image src="/cows/cow1.png" alt="UC Davis Cow" fill className="object-contain" />
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[30%] left-[20%]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
          >
            <div className="relative w-16 h-16">
              <Image src="/cows/cow2.png" alt="UC Davis Cow" fill className="object-contain" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
