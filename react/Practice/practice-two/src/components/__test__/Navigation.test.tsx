import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '@components/Pagination'

describe('Pagination', () => {
  const onPageChangeMock = jest.fn()
  const onItemsPerPageChangeMock = jest.fn()

  const fetchNextPageMock = jest.fn()

  const renderPagination = (currentPage: number, totalItems: number, itemsPerPage: number, hasNextPage: boolean) =>
    render(
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChangeMock}
        onItemsPerPageChange={onItemsPerPageChangeMock}
        itemsPerPageOptions={[10, 20, 30]}
        fetchNextPage={fetchNextPageMock}
        hasNextPage={hasNextPage}
        isFetchingNextPage={false}
      />
    )

  it('should render items per page select and handle change', () => {
    renderPagination(1, 100, 10, false)

    expect(screen.getByText('Items per page:')).toBeInTheDocument()

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()

    fireEvent.change(select, { target: { value: '20' } })
    expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: '20' }) })
    )
  })

  it('should display current page and total items correctly', () => {
    renderPagination(2, 100, 10, false)

    const text = screen.getByText('11-20 of 100')
    expect(text).toBeInTheDocument()
  })

  it('should disable Previous button on first page', () => {
    renderPagination(1, 100, 10, false)

    const previousButton = screen.getByLabelText('previous-page')
    expect(previousButton).toBeDisabled()
  })

  it('should disable Next button on last page when hasNextPage is false', () => {
    renderPagination(10, 100, 10, false)

    const nextButton = screen.getByLabelText('next-page')
    expect(nextButton).toBeDisabled()
  })

  it('should render correct page text when there are no items', () => {
    renderPagination(1, 0, 10, false)

    expect(screen.getByText('0-0 of 0')).toBeInTheDocument()
  })

  it('should render correct page text when there are items, but no per page options', () => {
    renderPagination(1, 100, 10, false)

    expect(screen.getByText('1-10 of 100')).toBeInTheDocument()
  })

  it('should call onPageChange when navigating to the next page', () => {
    renderPagination(1, 100, 10, true) // Pass hasNextPage as true

    const nextButton = screen.getByLabelText('next-page')
    fireEvent.click(nextButton)

    expect(onPageChangeMock).toHaveBeenCalledWith(2)

    expect(fetchNextPageMock).toHaveBeenCalledTimes(1)
  })

  it('should call onPageChange when navigating to the previous page', () => {
    renderPagination(2, 100, 10, false)

    const previousButton = screen.getByLabelText('previous-page')
    fireEvent.click(previousButton)

    expect(onPageChangeMock).toHaveBeenCalledWith(1)
  })
})
