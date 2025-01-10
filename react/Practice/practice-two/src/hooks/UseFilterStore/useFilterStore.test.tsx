import { act } from '@testing-library/react'
import useFilterStore from '.'

describe('useFilterStore', () => {
  beforeEach(() => {
    act(() => {
      useFilterStore.setState({
        searchQuery: '',
        sortBy: '',
        itemsPerPage: 5
      })
    })
  })

  it('should update searchQuery when setSearchQuery is called', () => {
    const { setSearchQuery } = useFilterStore.getState()

    act(() => {
      setSearchQuery('Test Query')
    })

    const { searchQuery } = useFilterStore.getState()
    expect(searchQuery).toBe('Test Query')
  })

  it('should update itemsPerPage when setItemsPerPage is called', () => {
    const { setItemsPerPage } = useFilterStore.getState()

    act(() => {
      setItemsPerPage(10)
    })

    const { itemsPerPage } = useFilterStore.getState()
    expect(itemsPerPage).toBe(10)
  })

  it('should update sortBy when setSortBy is called', () => {
    const { setSortBy } = useFilterStore.getState()

    act(() => {
      setSortBy('name')
    })

    const { sortBy } = useFilterStore.getState()
    expect(sortBy).toBe('name')
  })
})
