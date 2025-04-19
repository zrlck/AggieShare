"use client"

import { create } from "zustand"

interface LoadingState {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  hasLoaded: boolean
  setHasLoaded: (loaded: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
  hasLoaded: false,
  setHasLoaded: (loaded) => set({ hasLoaded: loaded }),
}))

export default function useLoading() {
  const { isLoading, setIsLoading, hasLoaded, setHasLoaded } = useLoadingStore()

  const completeLoading = () => {
    setIsLoading(false)
    setHasLoaded(true)
  }

  return {
    isLoading,
    setIsLoading,
    hasLoaded,
    setHasLoaded,
    completeLoading,
  }
}
