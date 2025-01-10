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
        isLoaded={true}
      />
    )

  it('matches snapshot with items and next page available', () => {
    const { asFragment } = renderPagination(1, 100, 10, true)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not render anything when there are no items or items per page', () => {
    const { container } = renderPagination(1, 0, 10, true)
    expect(container.firstChild).toBeNull()

    const { container: containerWithNoItemsPerPage } = renderPagination(1, 100, 0, true)
    expect(containerWithNoItemsPerPage.firstChild).toBeNull()
  })

  it('should call onPageChange when navigating to the next page', () => {
    renderPagination(1, 100, 10, true)

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
