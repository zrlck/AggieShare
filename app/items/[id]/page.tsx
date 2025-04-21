// app/items/[id]/page.tsx
import PageLayout from "../../page-layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import { categories as categoriesData } from "@/components/category-grid";
import { campuses as campusesData } from "@/data/campuses";
import ContactDonor from "./contactDonor";

// TypeScript interface for a listing item
interface ListingItem {
  _id: string;
  title: string;
  description: string;
  categoryId: string;
  locationId: string;
  imageUrl: string;
  pickupInfo: string;
  createdAt: string;
  donorName?: string;
  donorEmail?: string;
}

// Ensure categories and campuses are arrays
const categories = Array.isArray(categoriesData) ? categoriesData : [];
const campuses = Array.isArray(campusesData) ? campusesData : [];

// Helper functions to get friendly names
const getCategoryName = (categoryId: string) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};

const getCampusName = (locationId: string) => {
  const campus = campuses.find((c) => c.id === locationId);
  return campus ? campus.name : locationId;
};

export default async function ItemPage({ params }: { params: { id: string } }) {
  let item: ListingItem | null = null;
  try {
    const client = await clientPromise;
    const db = client.db("HackDavis");
    item = await db.collection("listings").findOne({
      _id: new ObjectId(params.id),
    }) as ListingItem | null;
    if (!item) return notFound();
  } catch (error) {
    console.error("Error fetching item:", error);
    return notFound();
  }

  const donor = {
    name: item.donorName || "Anonymous Donor",
    email: item.donorEmail || "",
    joined: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",
    image: "/placeholder.svg?height=100&width=100",
  };

  return (
    <PageLayout>
      <div className="container px-4 py-8 md:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Item Images */}
          <div className="lg:col-span-2">
            <div
              className="overflow-hidden rounded-lg border bg-background flex items-center justify-center"
              style={{ position: "relative", height: "400px", background: "#f5f5f5" }}
            >
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
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
                    <span>
                      Posted {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "recently"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{getCampusName(item.locationId)}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">{getCategoryName(item.categoryId)}</Badge>
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
                      src={donor.image}
                      alt={donor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{donor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      <User className="mr-1 inline h-3 w-3" />
                      Member since {donor.joined}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Donor Button/Email */}
            <ContactDonor email={donor.email} />

            <Link href="/browse">
              <button className="w-full border-hackdavis-navy text-hackdavis-navy border rounded px-4 py-2 mt-2">
                Back to Browse
              </button>
            </Link>
          </div>
        </div>

        {/* Similar Items Section (you can implement this later if desired) */}
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Similar Items</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Placeholder for similar items */}
            <div className="text-center text-muted-foreground col-span-full py-8">
              Browse more items in the <Link href="/browse" className="text-hackdavis-navy underline">listings page</Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
