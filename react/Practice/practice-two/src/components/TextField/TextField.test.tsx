import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import TextField from '@components/TextField'
import { SearchIcon } from '@assets/icons'
import colors from '@styles/variables/colors'

describe('TextField', () => {
  const handleChangeMock = jest.fn()

  const renderTextField = (props: {
    errorMessage?: string
    icon?: React.ReactNode
    placeholder: string
    type?: string
  }) => render(<TextField {...props} onChange={handleChangeMock} />)

  it('should render the input field with placeholder', () => {
    renderTextField({ placeholder: 'Enter username' })
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('should render an icon when passed as a prop (for text fields)', () => {
    const { container } = renderTextField({ placeholder: 'Enter username', icon: <SearchIcon /> })
    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  it('should display an error message and apply active styles when provided', () => {
    renderTextField({ placeholder: 'Enter username', errorMessage: 'Username is required' })
    expect(screen.getByText('Username is required')).toBeInTheDocument()

    const errorMessageElement = screen.getByText('Username is required')
    expect(errorMessageElement).toHaveStyle(`color: ${colors.brand.red}`)
  })

  it('should call onChange when the input changes', () => {
    renderTextField({ placeholder: 'Enter username' })

    const input = screen.getByPlaceholderText('Enter username')

    fireEvent.change(input, { target: { value: 'new value' } })

    expect(handleChangeMock).toHaveBeenCalledTimes(1)

    expect(handleChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'new value' })
      })
    )
  })

  it('should display the correct icon when the input type is password', () => {
    renderTextField({ placeholder: 'Enter password', type: 'password' })

    // Initially, the eye icon should be shown
    expect(screen.getByLabelText('Show password')).toBeInTheDocument()

    // After toggling the icon, it should change to the close-eye icon
    fireEvent.click(screen.getByLabelText('Show password'))
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
  })
})
