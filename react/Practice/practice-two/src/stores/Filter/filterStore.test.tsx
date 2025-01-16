import { act } from '@testing-library/react'
import filterStore from '.'

describe('filterStore', () => {
  beforeEach(() => {
    act(() => {
      filterStore.setState({
        searchQuery: '',
        sortBy: '',
        itemsPerPage: 5,
        currentPage: 0
      })
    })
  })

  it('should update searchQuery when setSearchQuery is called with a new value', () => {
    const { setSearchQuery } = filterStore.getState()

    act(() => {
      setSearchQuery('Test Query')
    })

    const { searchQuery } = filterStore.getState()
    expect(searchQuery).toBe('Test Query')
  })

  it('should not update searchQuery if the same value is passed to setSearchQuery', () => {
    const { setSearchQuery } = filterStore.getState()

    act(() => {
      setSearchQuery('')
    })

    const { searchQuery } = filterStore.getState()
    expect(searchQuery).toBe('')
  })

  it('should update itemsPerPage when setItemsPerPage is called with a new value', () => {
    const { setItemsPerPage } = filterStore.getState()

    act(() => {
      setItemsPerPage(10)
    })

    const { itemsPerPage } = filterStore.getState()
    expect(itemsPerPage).toBe(10)
  })

  it('should not update itemsPerPage if the same value is passed to setItemsPerPage', () => {
    const { setItemsPerPage } = filterStore.getState()

    act(() => {
      setItemsPerPage(5)
    })

    const { itemsPerPage } = filterStore.getState()
    expect(itemsPerPage).toBe(5)
  })

  it('should update sortBy when setSortBy is called with a new value', () => {
    const { setSortBy } = filterStore.getState()

    act(() => {
      setSortBy('name')
    })

    const { sortBy } = filterStore.getState()
    expect(sortBy).toBe('name')
  })

  it('should not update sortBy if the same value is passed to setSortBy', () => {
    const { setSortBy } = filterStore.getState()

    act(() => {
      setSortBy('')
    })

    const { sortBy } = filterStore.getState()
    expect(sortBy).toBe('')
  })
})
