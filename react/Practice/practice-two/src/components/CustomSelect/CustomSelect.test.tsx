import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CustomSelect from '@components/CustomSelect'
import colors from '@styles/variables/colors'

describe('CustomSelect', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  const renderSelect = (props = {}) => {
    return render(<CustomSelect options={options} {...props} />)
  }

  it('renders select with options and correct placeholder', () => {
    renderSelect({ placeholder: 'Test Placeholder' })

    expect(screen.getByRole('combobox')).toHaveTextContent('Test Placeholder')
    options.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('applies border styles correctly', () => {
    const { rerender } = renderSelect({ border: 'bottom' })
    const select = screen.getByRole('combobox')

    expect(select).toHaveStyle(`border-bottom: 1px solid ${colors.brand.black}`)

    rerender(<CustomSelect options={options} border='none' />)
    expect(select).not.toHaveStyle(`border-bottom: 1px solid ${colors.brand.black}`)
    expect(select).not.toHaveStyle(`border: 2px solid ${colors.brand.secondary}`)

    rerender(<CustomSelect options={options} border='full' />)
    expect(select).toHaveStyle(`border: 2px solid ${colors.brand.secondary}`)
  })
})
