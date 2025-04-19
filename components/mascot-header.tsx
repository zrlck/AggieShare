"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type Mascot = {
  id: string
  name: string
  school: string
  image: string
}

const mascots: Mascot[] = [
  {
    id: "cow",
    name: "Aggie Cow",
    school: "UC Davis",
    image: "/mascots/cow.png",
  },
  {
    id: "bear",
    name: "Oski Bear",
    school: "UC Berkeley",
    image: "/mascots/bear.png",
  },
  {
    id: "slug",
    name: "Sammy Slug",
    school: "UC Santa Cruz",
    image: "/mascots/slug.png",
  },
  {
    id: "triton",
    name: "King Triton",
    school: "UC San Diego",
    image: "/mascots/triton.png",
  },
  {
    id: "bruin",
    name: "Joe Bruin",
    school: "UCLA",
    image: "/mascots/bruin.png",
  },
  {
    id: "anteater",
    name: "Peter Anteater",
    school: "UC Irvine",
    image: "/mascots/anteater.png",
  },
  {
    id: "highlander",
    name: "Scotty Highlander",
    school: "UC Riverside",
    image: "/mascots/highlander.png",
  },
  {
    id: "gaucho",
    name: "Gaucho",
    school: "UC Santa Barbara",
    image: "/mascots/gaucho.png",
  },
  {
    id: "bobcat",
    name: "Boomer Bobcat",
    school: "UC Merced",
    image: "/mascots/bobcat.png",
  },
]

// Duplicate the mascots to create a seamless loop
const allMascots = [...mascots, ...mascots]

export default function MascotHeader() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const totalWidth = scrollContainer.scrollWidth
    const containerWidth = scrollContainer.clientWidth
    const scrollSpeed = 0.5 // pixels per frame

    const scroll = () => {
      if (!scrollContainer) return

      scrollPosition += scrollSpeed
      // Reset when we've scrolled through the first set of mascots
      if (scrollPosition >= totalWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="w-full bg-hackdavis-blue/30 py-6 overflow-hidden">
      <h2 className="text-center text-xl font-bold mb-4 text-hackdavis-navy">California College Mascots</h2>
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex space-x-8 px-8">
          {allMascots.map((mascot, index) => (
            <motion.div
              key={`${mascot.id}-${index}`}
              className="flex flex-col items-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="relative w-20 h-20 mb-2">
                <Image
                  src={mascot.image || "/placeholder.svg"}
                  alt={mascot.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 60px, 80px"
                />
              </div>
              <p className="text-xs font-medium text-hackdavis-navy">{mascot.school}</p>
              <p className="text-xs text-hackdavis-navy/70">{mascot.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-center text-hackdavis-navy font-medium">
          A HACKDAVIS HUB FOR EVERYONE WHO // creates for social good
        </p>
      </div>
    </div>
  )
}
