import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/components/category-grid";

interface ListingCardProps {
  item: {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    categoryId: string;
    locationId: string;
    createdAt: string;
  };
}

export default function ListingCard({ item }: ListingCardProps) {
  return (
    <Link href={`/items/${item._id}`} className="block h-full">
      <Card className="overflow-hidden transition-all hover:shadow-md bg-white h-full flex flex-col border-2 border-red-500">
        <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <Badge variant="secondary" className="mt-2 w-fit">
            {categories.find((c) => c.id === item.categoryId)?.name || " "}
          </Badge>
        </CardContent>
        <CardFooter className="flex items-center justify-end border-t p-4 text-sm text-gray-700">
          <div>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</div>
        </CardFooter>
      </Card>
    </Link>
  );
}
