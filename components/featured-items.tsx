import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin } from "lucide-react"

const items = [
  {
    id: 1,
    title: "Graphing Calculator",
    category: "School Supplies",
    location: "UC Davis",
    image: "/placeholder.svg?height=200&width=300",
    href: "/items/1",
  },
  {
    id: 2,
    title: "Winter Jacket",
    category: "Clothing",
    location: "UC Berkeley",
    image: "/placeholder.svg?height=200&width=300",
    href: "/items/2",
  },
  {
    id: 3,
    title: "Desk Lamp",
    category: "Dorm Essentials",
    location: "UC Santa Cruz",
    image: "/placeholder.svg?height=200&width=300",
    href: "/items/3",
  },
  {
    id: 4,
    title: "Coffee Maker",
    category: "Kitchenware",
    location: "UC Davis",
    image: "/placeholder.svg?height=200&width=300",
    href: "/items/4",
  },
]

export default function FeaturedItems() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <Link key={item.id} href={item.href}>
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-square relative">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <Badge variant="secondary" className="mt-2">
                {item.category}
              </Badge>
            </CardContent>
            <CardFooter className="flex items-center gap-1 border-t p-4 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {item.location}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
