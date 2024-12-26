import { FilterState } from '@components/Filter/FilterProvider'
import { createContext, useContext } from 'react'

export const FilterContext = createContext<FilterState | undefined>(undefined)
export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
}
