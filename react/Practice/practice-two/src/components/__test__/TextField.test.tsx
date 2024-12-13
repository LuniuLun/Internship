import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import TextField from '@components/TextField'
import { SearchIcon } from '@assets/icons'
import colors from '@styles/variables/colors'

describe('TextField', () => {
  const handleChangeMock = jest.fn()

  const renderTextField = (props: { errorMessage?: string; icon?: React.ReactNode; placeholder: string }) =>
    render(<TextField {...props} onChange={handleChangeMock} />)

  it('should render the input field with placeholder', () => {
    renderTextField({ placeholder: 'Enter username' })
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('should render an icon when passed as a prop', () => {
    const { container } = renderTextField({ placeholder: 'Enter username', icon: <SearchIcon /> })
    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  it('should call onChange when the input changes', () => {
    renderTextField({ placeholder: 'Enter username' })
    fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'new value' } })
    expect(handleChangeMock).toHaveBeenCalled()
  })

  it('should display an error message and apply active styles when provided', () => {
    renderTextField({ placeholder: 'Enter username', errorMessage: 'Username is required' })

    expect(screen.getByText('Username is required')).toBeInTheDocument()

    const errorMessageElement = screen.getByText('Username is required')
    expect(errorMessageElement).toHaveStyle(`color: ${colors.brand.red}`)
  })
})
