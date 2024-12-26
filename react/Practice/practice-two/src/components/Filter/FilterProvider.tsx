import { FilterContext } from '@hooks/useFilter'
import { ReactNode, useMemo, useState } from 'react'

export interface FilterState {
  searchQuery: string
  sortBy: string
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
}

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')

  const value = useMemo(() => ({ searchQuery, sortBy, setSearchQuery, setSortBy }), [searchQuery, sortBy])

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
