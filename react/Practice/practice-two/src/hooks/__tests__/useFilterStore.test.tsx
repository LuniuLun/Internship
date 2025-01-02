import { useFilterStore } from '@hooks/useFilterStore'
import { act } from '@testing-library/react'

describe('useFilterStore', () => {
  it('should initialize with default state', () => {
    const { searchQuery, sortBy } = useFilterStore.getState()
    expect(searchQuery).toBe('')
    expect(sortBy).toBe('')
  })

  it('should update searchQuery when setSearchQuery is called', () => {
    const { setSearchQuery } = useFilterStore.getState()

    act(() => {
      setSearchQuery('Test Query')
    })

    const { searchQuery } = useFilterStore.getState()
    expect(searchQuery).toBe('Test Query')
  })

  it('should update sortBy when setSortBy is called', () => {
    const { setSortBy } = useFilterStore.getState()

    act(() => {
      setSortBy('name')
    })

    const { sortBy } = useFilterStore.getState()
    expect(sortBy).toBe('name')
  })

  it('should update searchQuery and sortBy together', () => {
    const { setSearchQuery, setSortBy } = useFilterStore.getState()

    act(() => {
      setSearchQuery('New Query')
      setSortBy('date')
    })

    const { searchQuery, sortBy } = useFilterStore.getState()
    expect(searchQuery).toBe('New Query')
    expect(sortBy).toBe('date')
  })
})
