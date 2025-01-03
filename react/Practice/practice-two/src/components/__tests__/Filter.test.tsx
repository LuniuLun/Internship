import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { useFilterStore } from '@hooks/useFilterStore'
import Filter from '@components/Filter'

jest.mock('@hooks/useFilterStore', () => ({
  useFilterStore: jest.fn()
}))

const mockSetSearchQuery = jest.fn()
const mockSetSortBy = jest.fn()

describe('Filter Component', () => {
  beforeEach(() => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      searchQuery: '',
      sortBy: '',
      setSearchQuery: mockSetSearchQuery,
      setSortBy: mockSetSortBy
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const renderSelect = (isLoaded = true, children?: React.ReactNode) => {
    return render(<Filter isLoaded={isLoaded}>{children}</Filter>)
  }
  test('renders child components passed as children prop', () => {
    const { getByText } = renderSelect(true, <div>Test Child Component</div>)
    expect(getByText('Test Child Component')).toBeInTheDocument()
  })

  test('should call setSortBy when sort option is changed and isLoaded is true', () => {
    const { getByRole } = renderSelect(true)
    const select = getByRole('combobox', { name: /sort/i }) as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'createDate' } })

    expect(mockSetSortBy).toHaveBeenCalledWith('createDate')
  })

  test('updates searchQuery on input change when isLoaded is true', () => {
    const { getByPlaceholderText } = renderSelect()
    const searchInput = getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test')
  })

  test('prevents searchQuery change when isLoaded is false', () => {
    const { getByPlaceholderText } = renderSelect(false)
    const searchInput = getByPlaceholderText('Search') as HTMLInputElement

    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(mockSetSearchQuery).not.toHaveBeenCalled()
  })

  test('prevents sortBy change when isLoaded is false', () => {
    const { getByRole } = renderSelect(false)
    const select = getByRole('combobox', { name: /sort/i }) as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'price' } })
    expect(mockSetSortBy).not.toHaveBeenCalled()
  })

  test('disables inputs when isLoaded is false', () => {
    const { getByPlaceholderText, getByRole } = renderSelect(false)
    const searchInput = getByPlaceholderText('Search') as HTMLInputElement
    const select = getByRole('combobox', { name: /sort/i }) as HTMLSelectElement

    expect(searchInput).toBeDisabled()
    expect(select).toBeDisabled()
  })
})
