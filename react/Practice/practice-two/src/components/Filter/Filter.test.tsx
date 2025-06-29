import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Filter } from '@components'

const mockStore = {
  searchQuery: '',
  sortBy: '',
  itemsPerPage: 5,
  setSearchQuery: jest.fn(),
  setSortBy: jest.fn(),
  setItemsPerPage: jest.fn()
}

jest.mock('@stores/Filter', () => ({
  __esModule: true,
  default: () => mockStore
}))

describe('Filter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockStore.searchQuery = ''
    mockStore.sortBy = ''
    mockStore.itemsPerPage = 5
  })

  const renderFilter = (isLoaded = true, children?: React.ReactNode) => {
    return render(<Filter isLoaded={isLoaded}>{children}</Filter>)
  }

  test('matches snapshot when filter is loaded', () => {
    const { asFragment } = renderFilter(true)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should call setSortBy when sort option is changed and isLoaded is true', () => {
    const { getByRole } = renderFilter(true)
    const select = getByRole('combobox', { name: /sort/i }) as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'createdDate' } })
    expect(mockStore.setSortBy).toHaveBeenCalledWith('createdDate')
  })

  test('updates searchQuery on input change when isLoaded is true', async () => {
    const { getByPlaceholderText } = renderFilter(true)
    const searchInput = getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(searchInput, { target: { value: 'test' } })

    await waitFor(
      () => {
        expect(mockStore.setSearchQuery).toHaveBeenCalledWith('test')
      },
      { timeout: 1000 }
    )
  })

  test('prevents searchQuery change when isLoaded is false', async () => {
    const { getByPlaceholderText } = renderFilter(false)
    const searchInput = getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(searchInput, { target: { value: 'test' } })

    await waitFor(
      () => {
        expect(mockStore.setSearchQuery).not.toHaveBeenCalled()
      },
      { timeout: 1000 }
    )
  })

  test('prevents sortBy change when isLoaded is false', () => {
    const { getByRole } = renderFilter(false)
    const select = getByRole('combobox', { name: /sort/i }) as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'price' } })
    expect(mockStore.setSortBy).not.toHaveBeenCalled()
  })

  test('should not re-render when isLoaded and children are unchanged', () => {
    const { asFragment, rerender } = renderFilter(true, <div>Child</div>)

    const initialRender = asFragment()
    rerender(
      <Filter isLoaded={true}>
        <div>Child</div>
      </Filter>
    )

    expect(asFragment()).toStrictEqual(initialRender)
  })

  test('should re-render when isLoaded prop changes', () => {
    const { asFragment, rerender } = renderFilter(true, <div>Child</div>)

    const initialRender = asFragment()
    rerender(
      <Filter isLoaded={false}>
        <div>Child</div>
      </Filter>
    )

    expect(asFragment()).not.toStrictEqual(initialRender)
  })

  test('should not re-render when both isLoaded and children remain unchanged', () => {
    const { asFragment, rerender } = renderFilter(true, <div>Child</div>)

    const initialRender = asFragment()
    rerender(
      <Filter isLoaded={true}>
        <div>Child</div>
      </Filter>
    )

    expect(asFragment()).toStrictEqual(initialRender)
  })
})
