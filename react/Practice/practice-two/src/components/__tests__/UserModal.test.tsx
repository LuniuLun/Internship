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
    username: 'johnDoe',
    password: 'password123',
    createDate: new Date('2025-01-03T09:14:00.0000Z')
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

  it('should render the modal with the correct fields and pre-filled values when open', () => {
    renderModal(true, selectedUser)

    expect(screen.getByText('Edit User')).toBeInTheDocument()
    expect(screen.getByLabelText('firstName')).toHaveValue(selectedUser.firstName)
    expect(screen.getByLabelText('lastName')).toHaveValue(selectedUser.lastName)
    expect(screen.getByLabelText('email')).toHaveValue(selectedUser.email)
    expect(screen.getByLabelText('phone')).toHaveValue(Number(selectedUser.phone))
    expect(screen.getByLabelText('username')).toHaveValue(selectedUser.username)
    expect(screen.getByLabelText('check-password')).toHaveValue(selectedUser.password)
  })

  it('should show validation errors for required fields', async () => {
    const validationCases = [
      { field: 'firstName', value: '', error: 'Please enter First Name' },
      { field: 'lastName', value: '', error: 'Please enter Last Name' },
      { field: 'email', value: '', error: 'Please enter Email' },
      { field: 'phone', value: '', error: 'Please enter Mobile number' },
      { field: 'username', value: '', error: 'Please enter Username' },
      { field: 'check-password', value: '', error: 'Please enter Password' },
      { field: 'confirmPassword', value: '', error: 'Please confirm your Password' }
    ]

    renderModal(true)

    const submitButton = screen.getByRole('button', { name: /submit/i })

    for (const { field, value, error } of validationCases) {
      const input = screen.getByLabelText(field) as HTMLInputElement
      fireEvent.change(input, { target: { value } })

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(error)).toBeInTheDocument()
      })
    }
  })

  it('should show validation error for invalid email format', async () => {
    renderModal(true)

    const emailInput = screen.getByLabelText('email') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'invalidEmail' } })

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument()
    })
  })

  it('should show validation error for short username', async () => {
    renderModal(true)

    const usernameInput = screen.getByLabelText('username') as HTMLInputElement
    fireEvent.change(usernameInput, { target: { value: 'short' } })

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Username must have at least 6 characters/i)).toBeInTheDocument()
    })
  })

  it('should show validation error for phone number length', async () => {
    renderModal(true)

    const phoneInput = screen.getByLabelText('phone') as HTMLInputElement
    fireEvent.change(phoneInput, { target: { value: '123' } })

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Mobile number must have at least 9 characters/i)).toBeInTheDocument()
    })
  })

  it('should render empty fields when no selectedUser is provided', () => {
    renderModal(true)

    expect(screen.getByLabelText('firstName')).toHaveValue('')
    expect(screen.getByLabelText('lastName')).toHaveValue('')
    expect(screen.getByLabelText('email')).toHaveValue('')
    expect(screen.getByLabelText('phone')).toHaveValue(null)
    expect(screen.getByLabelText('username')).toHaveValue('')
    expect(screen.getByLabelText('check-password')).toHaveValue('')
  })

  it('should call onClose when the cancel button is clicked', () => {
    renderModal(true)

    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('should show password validation errors if password requirements are not met', async () => {
    renderModal(true)
    const validationMessages = [
      { value: 'short', regex: /Password must have at least 8 characters/i },
      { value: 'weak1231.', regex: /Password must contain at least one uppercase letter/i },
      { value: 'WEAKPASSWORD1.', regex: /Password must contain at least one lowercase letter/i },
      { value: 'WeakPassword.', regex: /Password must contain at least one number/i },
      { value: 'WeakPassword1', regex: /Password must contain at least one special character/i }
    ]

    const submitButton = screen.getByRole('button', { name: /submit/i })

    for (const { value, regex } of validationMessages) {
      const passwordInput = screen.getByLabelText(/check-password/i)
      fireEvent.change(passwordInput, { target: { value } })

      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(regex)).toBeInTheDocument()
      })
    }
  })

  it('should show confirmation password error if passwords do not match', async () => {
    renderModal(true)

    const passwordInput = screen.getByLabelText('check-password')
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const confirmPasswordInput = screen.getByLabelText('confirmPassword')
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } })

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText('Passwords do not match')).toBeInTheDocument()
  })

  it('should open the modal when isModalOpen is true', () => {
    renderModal(true)

    expect(screen.getByText('Add User')).toBeInTheDocument()
  })

  it('should not render the modal when isModalOpen is false', () => {
    renderModal(false)

    expect(screen.queryByText('Add User')).not.toBeInTheDocument()
  })

  it('should call handleSubmit with the correct data when the form is submitted', async () => {
    // Render modal with mock handleSubmit
    renderModal(true, selectedUser)

    // Fill in the form with new user data
    fireEvent.change(screen.getByLabelText('firstName'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByLabelText('lastName'), { target: { value: 'Smith' } })
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'jane.smith@example.com' } })
    fireEvent.change(screen.getByLabelText('phone'), { target: { value: '987654321' } })
    fireEvent.change(screen.getByLabelText('role'), { target: { value: 'Employee' } })
    fireEvent.change(screen.getByLabelText('username'), { target: { value: 'janeSmith' } })
    fireEvent.change(screen.getByLabelText('check-password'), { target: { value: 'newPassword123!' } })
    fireEvent.change(screen.getByLabelText('confirmPassword'), { target: { value: 'newPassword123!' } })

    const submitButton = screen.getByRole('button', { name: /submit/i })

    // Trigger form submission
    fireEvent.click(submitButton)

    // Ensure handleSubmit is called with correct user data
    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        id: '123',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '987654321',
        role: 'Employee',
        username: 'janeSmith',
        password: 'newPassword123!',
        createDate: selectedUser?.createDate || new Date(Date.now())
      })
    })
  })
})
