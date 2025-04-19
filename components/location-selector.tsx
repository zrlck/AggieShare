"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MapPin } from "lucide-react"
import { useLocationStore } from "@/lib/store"

const locations = [
  "UC Davis Main Campus",
  "Memorial Union",
  "Silo",
  "Tercero",
  "Segundo",
  "Cuarto",
  "Shields Library",
  "ARC",
  "West Village",
  "Downtown Davis",
]

export default function LocationSelector() {
  const { selectedCampus, setSelectedCampus } = useLocationStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1 bg-white/80 text-hackdavis-navy border-hackdavis-navy"
        >
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline-block">{selectedCampus}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Location</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locations.map((location) => (
          <DropdownMenuItem
            key={location}
            onClick={() => setSelectedCampus(location)}
            className={location === selectedCampus ? "bg-accent" : ""}
          >
            {location}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
