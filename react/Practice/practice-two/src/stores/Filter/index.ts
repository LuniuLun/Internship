import { create } from 'zustand'

interface FilterState {
  searchQuery: string
  sortBy: string
  itemsPerPage: number
  currentPage: number
  setCurrentPage: (currentPage: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
}

const filterStore = create<FilterState>((set) => ({
  searchQuery: '',
  sortBy: '',
  itemsPerPage: 5,
  currentPage: 0,
  setCurrentPage: (currentPage: number) => set(() => ({ currentPage: currentPage })),
  setSearchQuery: (query: string) => set(() => ({ searchQuery: query })),
  setSortBy: (sort: string) => set(() => ({ sortBy: sort })),
  setItemsPerPage: (itemsPerPage: number) => set(() => ({ itemsPerPage }))
}))

export default filterStore
