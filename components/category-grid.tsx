"use client"

import Link from "next/link"
import { Book, Shirt, Laptop, Utensils, Sofa, Home, Coffee, Pizza, Sparkles, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useFilterStore } from "@/lib/store"

export const categories = [
  {
    id: "clothing",
    name: "Clothing",
    icon: <Shirt className="h-8 w-8" />,
    color: "bg-pink-100 text-pink-600",
    href: "/categories/clothing",
  },
  {
    id: "school-supplies",
    name: "School Supplies",
    icon: <Book className="h-8 w-8" />,
    color: "bg-blue-100 text-blue-600",
    href: "/categories/school-supplies",
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: <Laptop className="h-8 w-8" />,
    color: "bg-purple-100 text-purple-600",
    href: "/categories/electronics",
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    icon: <Utensils className="h-8 w-8" />,
    color: "bg-yellow-100 text-yellow-600",
    href: "/categories/kitchenware",
  },
  {
    id: "food",
    name: "Food",
    icon: <Pizza className="h-8 w-8" />,
    color: "bg-red-100 text-red-600",
    href: "/categories/food",
  },
  {
    id: "drinks",
    name: "Drinks",
    icon: <Coffee className="h-8 w-8" />,
    color: "bg-orange-100 text-orange-600",
    href: "/categories/drinks",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: <Sofa className="h-8 w-8" />,
    color: "bg-green-100 text-green-600",
    href: "/categories/furniture",
  },
  {
    id: "books-media",
    name: "Books & Media",
    icon: <BookOpen className="h-8 w-8" />,
    color: "bg-indigo-100 text-indigo-600",
    href: "/categories/books-media",
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: <Sparkles className="h-8 w-8" />,
    color: "bg-pink-100 text-pink-600",
    href: "/categories/health-beauty",
  },
  {
    id: "dorm-essentials",
    name: "Dorm Essentials",
    icon: <Home className="h-8 w-8" />,
    color: "bg-teal-100 text-teal-600",
    href: "/categories/dorm-essentials",
  },
]

export default function CategoryGrid() {
  const { setCategoryFilter } = useFilterStore()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={item} whileHover={{ y: -5 }}>
          <Link
            href="/browse"
            onClick={() => setCategoryFilter(category.id)}
            className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
          >
            <div className={`rounded-full ${category.color} p-3`}>{category.icon}</div>
            <span className="text-center font-medium">{category.name}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
