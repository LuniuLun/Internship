import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import UserModal from '@components/UserModal'
import { IUser } from '@type/models'

describe('UserModal', () => {
  const mockOnClose = jest.fn()
  const mockHandleSubmit = jest.fn()

  const selectedUser: IUser = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123456789',
    role: 'Admin',
    username: 'johndoe',
    password: 'password123',
    createDate: new Date()
  }

  const renderModal = (isModalOpen: boolean, selectedUser?: IUser) => {
    render(
      <UserModal
        isModalOpen={isModalOpen}
        selectedUser={selectedUser}
        onClose={mockOnClose}
        handleSubmit={mockHandleSubmit}
      />
    )
  }

  it('should render the modal with title and content when open', () => {
    renderModal(true, selectedUser)

    // Check if modal title and inputs are rendered
    expect(screen.getByText('Edit User')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('First Name *')).toHaveValue('John')
    expect(screen.getByPlaceholderText('Last Name *')).toHaveValue('Doe')
    expect(screen.getByPlaceholderText('Email *')).toHaveValue('john.doe@example.com')
  })

  it('should not render the modal when closed', () => {
    renderModal(false)

    // Check that modal is not rendered
    expect(screen.queryByText('Edit User')).not.toBeInTheDocument()
    expect(screen.queryByPlaceholderText('First Name *')).not.toBeInTheDocument()
  })

  it('should call onClose when the cancel button is clicked', () => {
    renderModal(true)

    // Assume there's a Cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  // it('should call handleSubmit when the form is submitted with valid data', async () => {
  //   renderModal(true, selectedUser)

  //   // Simulate input changes
  //   fireEvent.change(screen.getByPlaceholderText('First Name *'), { target: { value: 'Jane' } })
  //   fireEvent.change(screen.getByPlaceholderText('Last Name *'), { target: { value: 'Smith' } })
  //   fireEvent.change(screen.getByPlaceholderText('Email *'), { target: { value: 'jane.smith@example.com' } })

  //   // Submit the form
  //   const submitButton = screen.getByRole('button', { name: /submit/i })
  //   fireEvent.click(submitButton)
  //   console.log(submitButton)

  //   // Wait for the mock submit handler to be called
  //   await waitFor(() => expect(mockHandleSubmit).toHaveBeenCalledTimes(1))

  //   // Check that the handleSubmit was called with correct data
  //   expect(mockHandleSubmit).toHaveBeenCalledWith({
  //     id: '123',
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     email: 'jane.smith@example.com',
  //     phone: '123456789',
  //     role: 'Admin',
  //     username: 'johndoe',
  //     password: 'password123',
  //     createDate: expect.any(Date)
  //   })
  // })

  it('should show error messages if required fields are not filled', async () => {
    renderModal(true)

    // Try to submit without filling in required fields
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    // Check for error messages
    expect(await screen.findByText('Please enter First Name')).toBeInTheDocument()
    expect(await screen.findByText('Please enter Last Name')).toBeInTheDocument()
    expect(await screen.findByText('Please enter Email')).toBeInTheDocument()
  })
})
