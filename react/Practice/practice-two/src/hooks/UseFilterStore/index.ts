import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  sortBy: string
  itemsPerPage: number
  setItemsPerPage: (itemsPerPage: number) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
}

const useFilterStore = create<FilterState>((set) => ({
  searchQuery: '',
  sortBy: '',
  itemsPerPage: 5,
  setSearchQuery: (query: string) => set(() => ({ searchQuery: query })),
  setSortBy: (sort: string) => set(() => ({ sortBy: sort })),
  setItemsPerPage: (itemsPerPage: number) => set(() => ({ itemsPerPage }))
}))

export default useFilterStore
