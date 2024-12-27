import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomSelect from '@components/CustomSelect'
import colors from '@styles/variables/colors'

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

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'option1' })
      })
    )
  })

  it('applies correct border variant based on the border prop', () => {
    const { rerender } = render(<CustomSelect options={options} border='bottom' />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveStyle(`border-bottom: 1px solid ${colors.brand.black}`)

    rerender(<CustomSelect options={options} border='none' />)
    expect(selectElement).not.toHaveStyle(`border-bottom: 1px solid ${colors.brand.black}`)
    expect(selectElement).not.toHaveStyle(`border: 2px solid ${colors.brand.secondary}`)

    rerender(<CustomSelect options={options} border='full' />)
    expect(selectElement).toHaveStyle(`border: 2px solid ${colors.brand.secondary}`)
  })

  it('renders the default placeholder if none is provided', () => {
    render(<CustomSelect options={options} />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveTextContent('Select')
  })

  it('sets selected value when value prop is passed', () => {
    render(<CustomSelect options={options} value='option2' />)

    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveValue('option2')
  })
})
