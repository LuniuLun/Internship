import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CustomSelect from '@components/CustomSelect'

describe('CustomSelect', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]

  const renderSelect = (props = {}) => {
    return render(<CustomSelect options={options} {...props} />)
  }

  it('matches the snapshot with bottom border', () => {
    const { asFragment } = renderSelect({ border: 'bottom', placeholder: 'Select an option' })
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches the snapshot with full border', () => {
    const { asFragment } = renderSelect({ border: 'full', placeholder: 'Select an option' })
    expect(asFragment()).toMatchSnapshot()
  })

  it('matches the snapshot when no selected value or placeholder is provided', () => {
    const { asFragment } = renderSelect({})
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders with the placeholder when no selected value is provided', () => {
    renderSelect({ placeholder: 'Select an option' })

    const optionElement = screen.getByRole('combobox').querySelector('option')
    expect(optionElement).toHaveTextContent('Select an option')
  })

  it('renders with the selected value when provided', () => {
    renderSelect({ placeholder: 'Select an option', value: 'option2' })

    const optionElement = screen.getByRole('combobox').querySelector('option')
    expect(optionElement).toHaveTextContent('option2')
  })

  it('renders with default "Select" when no selected value or placeholder is provided', () => {
    renderSelect({})

    const optionElement = screen.getByRole('combobox').querySelector('option')
    expect(optionElement).toHaveTextContent('Select')
  })
})
