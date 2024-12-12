import '@testing-library/jest-dom'
import CustomSelect from '@components/CustomSelect'
import { render, screen, fireEvent } from '@testing-library/react'

const mockOnChange = jest.fn()

describe('CustomSelect', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  it('renders the select with options and placeholder', () => {
    render(<CustomSelect options={options} placeholder='Test Placeholder' />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveTextContent('Test Placeholder')

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('calls onChange when an option is selected', () => {
    render(<CustomSelect options={options} onChange={mockOnChange} />)

    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: 'option1' } })

    expect(mockOnChange).toHaveBeenCalledWith('option1')
  })

  it('applies correct border variant based on the border prop', () => {
    const { rerender } = render(<CustomSelect options={options} border='bottom' />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveStyle('border-bottom: 1px solid black')

    rerender(<CustomSelect options={options} border='none' />)
    expect(selectElement).not.toHaveStyle('border-bottom: 1px solid black')
  })

  it('renders the default placeholder if none is provided', () => {
    render(<CustomSelect options={options} />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveTextContent('Select an option')
  })
})
