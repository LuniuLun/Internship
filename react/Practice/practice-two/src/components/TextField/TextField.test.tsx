import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import TextField from '@components/TextField'

describe('TextField', () => {
  const handleChangeMock = jest.fn()

  const renderTextField = (props: {
    errorMessage?: string
    icon?: React.ReactElement
    placeholder: string
    type?: string
  }) => render(<TextField {...props} onChange={handleChangeMock} />)

  it('matches snapshot for username input', () => {
    const { asFragment } = renderTextField({ placeholder: 'Enter username' })
    expect(asFragment()).toMatchSnapshot()
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

    expect(screen.getByLabelText('Show password')).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Show password'))
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument()
  })
})
