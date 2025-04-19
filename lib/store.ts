import { create } from "zustand"
import { persist } from "zustand/middleware"

type LocationState = {
  selectedCampus: string
  setSelectedCampus: (campus: string) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedCampus: "UC Davis Main Campus",
      setSelectedCampus: (campus) => set({ selectedCampus: campus }),
    }),
    {
      name: "location-storage",
    },
  ),
)

type ThemeState = {
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

type FilterState = {
  categoryFilter: string | null
  locationFilter: string | null
  setCategoryFilter: (category: string | null) => void
  setLocationFilter: (location: string | null) => void
  resetFilters: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  categoryFilter: null,
  locationFilter: null,
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setLocationFilter: (location) => set({ locationFilter: location }),
  resetFilters: () => set({ categoryFilter: null, locationFilter: null }),
}))
