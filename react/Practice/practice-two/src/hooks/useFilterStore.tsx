import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  sortBy: string
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  sortBy: '',
  setSearchQuery: (query: string) => set(() => ({ searchQuery: query })),
  setSortBy: (sort: string) => set(() => ({ sortBy: sort }))
}))
