import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import WarningModal from '@components/WarningModal'

describe('WarningModal', () => {
  const mockOnClose = jest.fn()
  const mockHandleSubmit = jest.fn()

  const setup = (isOpen = true, title = 'Warning', message = 'Are you sure?') => {
    render(
      <WarningModal
        isModalOpen={isOpen}
        onClose={mockOnClose}
        title={title}
        message={message}
        handleSubmit={mockHandleSubmit}
      />
    )
  }

  it('should render modal with correct title and message', () => {
    setup()

    expect(screen.getByText('Warning')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    setup()

    const closeButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not render modal when isModalOpen is false', () => {
    setup(false)

    expect(screen.queryByText('Warning')).not.toBeInTheDocument()
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
  })
})
