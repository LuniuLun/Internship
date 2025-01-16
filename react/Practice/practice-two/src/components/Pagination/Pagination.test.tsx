import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@components/Pagination'
import { filterStore } from '@stores'

describe('Pagination component', () => {
  const fetchNextPageMock = jest.fn()

  const renderPagination = (totalItems: number, hasNextPage: boolean) =>
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPageOptions={[10, 20, 30]}
        fetchNextPage={fetchNextPageMock}
        hasNextPage={hasNextPage}
        isLoaded={true}
      />
    )

  beforeEach(() => {
    filterStore.setState({
      searchQuery: '',
      sortBy: '',
      itemsPerPage: 5,
      currentPage: 0
    })
    fetchNextPageMock.mockClear()
  })

  it('matches snapshot with items and next page available', () => {
    const { asFragment } = renderPagination(100, true)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not render anything when there are no items or items per page', () => {
    const { container } = renderPagination(0, true)
    expect(container.firstChild).toBeNull()
  })

  it('should call fetchNextPage when navigating to the next page', () => {
    renderPagination(100, true)

    const nextButton = screen.getByLabelText('next-page')
    fireEvent.click(nextButton)

    expect(fetchNextPageMock).toHaveBeenCalledTimes(1)
    expect(filterStore.getState().currentPage).toBe(1)
  })

  it('should disable previous button when on first page', () => {
    renderPagination(100, true)

    const previousButton = screen.getByLabelText('previous-page')
    const nextButton = screen.getByLabelText('next-page')

    expect(previousButton).toBeDisabled()
    expect(nextButton).not.toBeDisabled()
  })

  it('should disable next button when on last page or no next page', () => {
    renderPagination(100, false)

    const nextButton = screen.getByLabelText('next-page')
    expect(nextButton).toBeDisabled()
  })

  it('should update itemsPerPage and reset currentPage when items per page is changed', () => {
    renderPagination(100, true)

    const select = screen.getByLabelText('items-per-page')
    fireEvent.change(select, { target: { value: '20' } })

    const state = filterStore.getState()
    expect(state.itemsPerPage).toBe(20)
    expect(state.currentPage).toBe(0)
  })

  it('should decrease currentPage by 1 when currentPage > 0', () => {
    filterStore.setState({ currentPage: 2 })
    renderPagination(100, true)

    const previousButton = screen.getByLabelText('previous-page')
    fireEvent.click(previousButton)

    expect(filterStore.getState().currentPage).toBe(1)
  })

  it('should not decrease currentPage when already on first page', () => {
    renderPagination(100, true)

    const previousButton = screen.getByLabelText('previous-page')
    fireEvent.click(previousButton)

    expect(filterStore.getState().currentPage).toBe(0)
  })

  it('should update page info text correctly', () => {
    filterStore.setState({
      currentPage: 1,
      itemsPerPage: 10
    })
    renderPagination(100, true)

    expect(screen.getByText('11 - 20 of 100')).toBeInTheDocument()
  })

  it('should handle page navigation properly', () => {
    filterStore.setState({ currentPage: 1 })
    renderPagination(100, true)

    const previousButton = screen.getByLabelText('previous-page')
    const nextButton = screen.getByLabelText('next-page')

    fireEvent.click(previousButton)
    expect(filterStore.getState().currentPage).toBe(0)

    fireEvent.click(nextButton)
    expect(filterStore.getState().currentPage).toBe(1)
    expect(fetchNextPageMock).toHaveBeenCalled()
  })
})
