import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomModal from '@components/CustomModal'

describe('CustomModal', () => {
  const mockHandleSubmit = jest.fn()
  const mockOnClose = jest.fn()

  const renderModal = (isOpen: boolean) => {
    render(
      <CustomModal isOpen={isOpen} onClose={mockOnClose} handleSubmit={mockHandleSubmit} title='Test Modal'>
        <div>Test content</div>
      </CustomModal>
    )
  }

  it('should render the modal with title and content when open', () => {
    renderModal(true)

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should not render the modal when closed', () => {
    renderModal(false)

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Test content')).not.toBeInTheDocument()
  })

  it('should call onClose when the cancel button is clicked', () => {
    renderModal(true)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
