import { act } from '@testing-library/react'
import filterStore from '.'

describe('filterStore', () => {
  beforeEach(() => {
    act(() => {
      filterStore.setState({
        searchQuery: '',
        sortBy: '',
        itemsPerPage: 5
      })
    })
  })

  it('should update searchQuery when setSearchQuery is called', () => {
    const { setSearchQuery } = filterStore.getState()

    act(() => {
      setSearchQuery('Test Query')
    })

    const { searchQuery } = filterStore.getState()
    expect(searchQuery).toBe('Test Query')
  })

  it('should update itemsPerPage when setItemsPerPage is called', () => {
    const { setItemsPerPage } = filterStore.getState()

    act(() => {
      setItemsPerPage(10)
    })

    const { itemsPerPage } = filterStore.getState()
    expect(itemsPerPage).toBe(10)
  })

  it('should update sortBy when setSortBy is called', () => {
    const { setSortBy } = filterStore.getState()

    act(() => {
      setSortBy('name')
    })

    const { sortBy } = filterStore.getState()
    expect(sortBy).toBe('name')
  })
})
