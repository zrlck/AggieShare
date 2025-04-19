import PageLayout from "../../page-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, MessageCircle, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for a single item
const items = [
  {
    id: 1,
    title: "Graphing Calculator",
    category: "School Supplies",
    location: "UC Davis",
    date: "2 days ago",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "TI-84 Plus graphing calculator. Works perfectly, just graduated and don't need it anymore. Great for calculus, statistics, and other math courses. Batteries included and it comes with the charging cable and protective case.",
    donor: {
      name: "Alex Chen",
      joined: "March 2023",
      image: "/placeholder.svg?height=100&width=100",
    },
    pickupInfo: "Available for pickup on campus near the Memorial Union, weekdays between 2-5pm.",
  },
]

export default function ItemPage({ params }: { params: { id: string } }) {
  const item = items.find((item) => item.id === Number.parseInt(params.id)) || items[0]

  return (
    <PageLayout>
      <div className="container px-4 py-8 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Item Images */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg border bg-background">
              <div className="relative aspect-video w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" priority />
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{item.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Posted {item.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">{item.category}</Badge>
              <div className="space-y-2">
                <h2 className="font-semibold">Description</h2>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold">Pickup Information</h2>
                <p className="text-muted-foreground">{item.pickupInfo}</p>
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.donor.image || "/placeholder.svg"}
                      alt={item.donor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.donor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      <User className="mr-1 inline h-3 w-3" />
                      Member since {item.donor.joined}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-hackdavis-navy hover:bg-hackdavis-navy/80 text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Donor
            </Button>
            <Link href="/browse">
              <Button variant="outline" className="w-full border-hackdavis-navy text-hackdavis-navy">
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Similar Items</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <Link key={item.id} href={`/items/${item.id}`}>
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
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
