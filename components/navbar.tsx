"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, Search } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-hackdavis-blue/95 backdrop-blur supports-[backdrop-filter]:bg-hackdavis-blue/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image src="hackercow.png" alt="AggieShare Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-hackdavis-navy">
              Aggie<span className="text-white">Share</span>
            </span>
          </Link>
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-hackdavis-navy">Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={category.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{category.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/browse" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20 focus:bg-white/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/20 data-[state=open]:bg-white/20 text-hackdavis-navy",
                        pathname === "/browse" ? "bg-white/20" : "",
                      )}
                    >
                      Browse
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/donate" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20 focus:bg-white/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/20 data-[state=open]:bg-white/20 text-hackdavis-navy",
                        pathname === "/donate" ? "bg-white/20" : "",
                      )}
                    >
                      Donate
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20 focus:bg-white/20 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-white/20 data-[state=open]:bg-white/20 text-hackdavis-navy",
                        pathname === "/about" ? "bg-white/20" : "",
                      )}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden text-hackdavis-navy" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search items..." className="w-[200px] pl-8 md:w-[250px] lg:w-[300px]" />
            </div>
          </div>
          <ModeToggle />
          <Button variant="ghost" size="icon" className="md:hidden text-hackdavis-navy" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/donate" className="hidden md:block">
            <Button className="bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white">Donate Item</Button>
          </Link>
        </div>
      </div>
      {isSearchOpen && (
        <div className="border-t p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search items..." className="w-full pl-8" />
          </div>
        </div>
      )}
      {isMenuOpen && (
        <div className="border-t p-4 md:hidden">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/browse"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 text-hackdavis-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/categories"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 text-hackdavis-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/donate"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 text-hackdavis-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium hover:bg-white/20 text-hackdavis-navy"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

const categories = [
  {
    title: "Clothing & Accessories",
    description: "Shirts, pants, jackets, shoes, and accessories",
    href: "/categories/clothing",
  },
  {
    title: "School Supplies",
    description: "Notebooks, textbooks, backpacks, and stationery",
    href: "/categories/school-supplies",
  },
  {
    title: "Electronics",
    description: "Chargers, cables, headphones, and small gadgets",
    href: "/categories/electronics",
  },
  {
    title: "Kitchenware",
    description: "Utensils, dishes, small appliances, and cookware",
    href: "/categories/kitchenware",
  },
  {
    title: "Furniture",
    description: "Chairs, desks, lamps, and small furniture items",
    href: "/categories/furniture",
  },
  {
    title: "Food",
    description: "Non-perishable food items, snacks, and ingredients",
    href: "/categories/food",
  },
  {
    title: "Drinks",
    description: "Unopened beverages, coffee, tea, and drink mixes",
    href: "/categories/drinks",
  },
  {
    title: "Books & Media",
    description: "Books, magazines, movies, and music",
    href: "/categories/books-media",
  },
  {
    title: "Health & Beauty",
    description: "Unopened personal care items and cosmetics",
    href: "/categories/health-beauty",
  },
  {
    title: "Dorm Essentials",
    description: "Bedding, storage solutions, and room decor",
    href: "/categories/dorm-essentials",
  },
]
