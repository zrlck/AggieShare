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

// TypeScript interface for MongoDB listing
interface ListingItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
  locationId: string;
  createdAt: string;
}

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const { categoryFilter, locationFilter, setCategoryFilter, setLocationFilter } = useFilterStore()
  const [allItems, setAllItems] = useState<ListingItem[]>([])
  const [filteredItems, setFilteredItems] = useState<ListingItem[]>([])

  // Handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleCategoryChange = (val: string) => setCategoryFilter(val === "all" ? null : val);
  const handleLocationChange = (val: string) => setLocationFilter(val === "all" ? null : val);
  const clearFilters = () => {
    setCategoryFilter(null);
    setLocationFilter(null);
    setSearchTerm("");
  };

  // Fetch items from API
  useEffect(() => {
    fetch("/api/listings")
      .then(res => res.json())
      .then(data => setAllItems(data))
      .catch(() => setAllItems([]))
  }, [])

  // Filtering logic
  useEffect(() => {
    let result = allItems;

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter && categoryFilter !== "all") {
      result = result.filter((item) => item.categoryId === categoryFilter);
    }
    if (locationFilter && locationFilter !== "all") {
      result = result.filter((item) => item.locationId === locationFilter);
    }
    setFilteredItems(result);
  }, [allItems, searchTerm, categoryFilter, locationFilter]);

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
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Search</label>
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
            <div className="w-full space-y-2 md:w-[180px]">
              <label className="text-sm font-medium">Location</label>
              <Select value={locationFilter || "all"} onValueChange={handleLocationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campuses</SelectItem>
                  {campuses.map((campus) => (
                    <SelectItem key={campus.id} value={campus.id}>
                      {campus.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="border-hackdavis-navy text-hackdavis-navy"
              onClick={clearFilters}
              disabled={!categoryFilter && !locationFilter && !searchTerm}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>

          {/* Active Filters */}
          {(categoryFilter || locationFilter || searchTerm) && (
            <div className="flex flex-wrap gap-2">
              {categoryFilter && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-hackdavis-blue/20 hover:bg-hackdavis-blue/30"
                >
                  Category: {categories.find((c) => c.id === categoryFilter)?.name}
                  <button onClick={() => setCategoryFilter(null)} className="ml-1 rounded-full hover:bg-gray-200 p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {locationFilter && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-hackdavis-blue/20 hover:bg-hackdavis-blue/30"
                >
                  Campus: {campuses.find((c) => c.id === locationFilter)?.name}
                  <button onClick={() => setLocationFilter(null)} className="ml-1 rounded-full hover:bg-gray-200 p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-hackdavis-blue/20 hover:bg-hackdavis-blue/30"
                >
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm("")} className="ml-1 rounded-full hover:bg-gray-200 p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-hackdavis-navy">
              Showing <strong>{filteredItems.length}</strong> items
            </p>
            <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value)}>
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid className="mr-2 h-4 w-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="list">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Items Grid View */}
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
                    {filteredItems.map((item) => (
                      <motion.div key={item._id} variants={itemVariant} layout whileHover={{ y: -5 }}>
                        <Link href={`/items/${item._id}`}>
                          <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="aspect-square relative">
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                <div className="relative h-8 w-8">
                                  <Image
                                    src={
                                      campuses.find((c) => c.id === item.locationId)?.mascotImage || "/mascots/cow.png"
                                    }
                                    alt="Campus mascot"
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{item.title}</h3>
                              <Badge variant="secondary" className="mt-2">
                                {categories.find((c) => c.id === item.categoryId)?.name || "Unknown"}
                              </Badge>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {campuses.find((c) => c.id === item.locationId)?.name || "Unknown"}
                              </div>
                              <div>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</div>
                            </CardFooter>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="relative h-32 w-32 mb-4">
                      <Image src="/mascots/sad-cow.png" alt="No items found" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-hackdavis-navy">No items found</h3>
                    <p className="text-hackdavis-navy/70 text-center max-w-md mt-2">
                      We couldn't find any items matching your filters. Try adjusting your search or filters, or check
                      back later!
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="mt-4 bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            {/* Items List View */}
            <TabsContent value="list" className="mt-0">
              <AnimatePresence>
                {filteredItems.length > 0 ? (
                  <motion.div className="flex flex-col gap-4" variants={container} initial="hidden" animate="show">
                    {filteredItems.map((item) => (
                      <motion.div key={item._id} variants={itemVariant} layout whileHover={{ y: -5 }}>
                        <Link href={`/items/${item._id}`}>
                          <Card className="overflow-hidden transition-all hover:shadow-md">
                            <div className="flex flex-col md:flex-row">
                              <div className="relative h-48 w-full md:h-auto md:w-48">
                                <Image
                                  src={item.imageUrl || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
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
                              <div className="flex flex-1 flex-col p-4">
                                <div className="mb-2 flex items-center justify-between">
                                  <h3 className="font-semibold">{item.title}</h3>
                                  <Badge variant="secondary">
                                    {categories.find((c) => c.id === item.categoryId)?.name || "Unknown"}
                                  </Badge>
                                </div>
                                <p className="mb-4 text-sm text-muted-foreground">{item.description}</p>
                                <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {campuses.find((c) => c.id === item.locationId)?.name || "Unknown"}
                                  </div>
                                  <div>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="relative h-32 w-32 mb-4">
                      <Image src="/mascots/sad-cow.png" alt="No items found" fill className="object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-hackdavis-navy">No items found</h3>
                    <p className="text-hackdavis-navy/70 text-center max-w-md mt-2">
                      We couldn't find any items matching your filters. Try adjusting your search or filters, or check
                      back later!
                    </p>
                    <Button
                      onClick={clearFilters}
                      className="mt-4 bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}
