"use client"

import PageLayout from "../page-layout"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Grid, LayoutGrid, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useFilterStore } from "@/lib/store"
import { categories } from "@/components/category-grid"
import { campuses } from "@/data/campuses"

interface ListingItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  locationId: string;
  createdAt: string;
  donorName?: string;
}

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [nameSearch, setNameSearch] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const { categoryFilter, locationFilter, setCategoryFilter, setLocationFilter } = useFilterStore()
  const [allItems, setAllItems] = useState<ListingItem[]>([])
  const [filteredItems, setFilteredItems] = useState<ListingItem[]>([])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)
  const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => setNameSearch(e.target.value)
  const handleCategoryChange = (val: string) => setCategoryFilter(val === "all" ? null : val)
  const handleLocationChange = (val: string) => setLocationFilter(val === "all" ? null : val)
  const clearFilters = () => {
    setCategoryFilter(null)
    setLocationFilter(null)
    setSearchTerm("")
    setNameSearch("")
  }

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => setAllItems(data))
      .catch(() => setAllItems([]))
  }, [])

  useEffect(() => {
    let result = allItems
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (nameSearch) {
      result = result.filter(
        (item) =>
          item.donorName?.toLowerCase().includes(nameSearch.toLowerCase())
      )
    }
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((item) => item.categoryId === categoryFilter)
    }
    if (locationFilter && locationFilter !== "all") {
      result = result.filter((item) => item.locationId === locationFilter)
    }
    setFilteredItems(result)
  }, [allItems, searchTerm, nameSearch, categoryFilter, locationFilter])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <PageLayout>
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-hackdavis-navy">Browse Items</h1>
            <p className="text-hackdavis-navy">Discover free items available in your college community</p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm md:flex-row md:items-end">
            {/* Title/Description Search */}
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Search Title/Description</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            {/* Donor Name Search */}
            <div className="w-full space-y-2 md:w-[180px]">
              <label className="text-sm font-medium">Donor Name</label>
              <Input
                type="search"
                placeholder="Search by donor name..."
                value={nameSearch}
                onChange={handleNameSearch}
              />
            </div>
            {/* Category Filter */}
            <div className="w-full space-y-2 md:w-[180px]">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter || "all"} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="border-hackdavis-navy text-hackdavis-navy"
              onClick={clearFilters}
              disabled={!categoryFilter && !locationFilter && !searchTerm && !nameSearch}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Items */}
          <Tabs defaultValue={viewMode} className="w-full">
            <TabsContent value="grid" className="mt-0">
              <AnimatePresence>
                {filteredItems.length > 0 ? (
                  <motion.div
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredItems.map((item) => {
                      // Always use the uploaded image if present
                      const safeImageUrl =
                        item.imageUrl?.startsWith("http")
                          ? item.imageUrl
                          : "/placeholder.svg"

                      return (
                        <motion.div key={item._id} variants={itemVariant} layout whileHover={{ y: -5 }}>
                          <Link href={`/items/${item._id}`} className="block h-full">
                            <Card className="overflow-hidden transition-all hover:shadow-md bg-white h-full flex flex-col">
                              <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center">
                                <Image
                                  src={safeImageUrl}
                                  alt={item.title}
                                  fill
                                  className="object-contain"
                                />
                                <div className="absolute top-2 right-2">
                                  <div className="relative h-8 w-8">
                                    <Image
                                      src={
                                        campuses.find((c) => c.id === item.locationId)?.mascotImage ||
                                        "/mascots/cow.png"
                                      }
                                      alt="Campus mascot"
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                </div>
                              </div>
                              <CardContent className="p-4 flex-1 flex flex-col">
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                <Badge variant="secondary" className="mt-2">
                                  {categories.find((c) => c.id === item.categoryId)?.name || "Unknown"}
                                </Badge>
                                {item.donorName && (
                                  <div className="mt-2 text-xs text-gray-600">
                                    Donor: {item.donorName}
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter className="flex items-center justify-between border-t p-4 text-sm text-gray-700">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {campuses.find((c) => c.id === item.locationId)?.name || "Unknown"}
                                </div>
                                <div>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</div>
                              </CardFooter>
                            </Card>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                ) : (
                  <div className="text-center py-12 text-hackdavis-navy">No items found</div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}
