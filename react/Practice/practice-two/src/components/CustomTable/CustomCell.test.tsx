import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CustomCell from './CustomCell'

describe('CustomCell Component', () => {
  const mockRow = {
    name: 'John Doe',
    role: 'Admin',
    modulePermission: 'View Only',
    isActive: true,
    date: new Date('2025-01-01')
  }

  it('should render a checkbox for boolean values', () => {
    const { asFragment } = render(<CustomCell header='isActive' row={mockRow} />)

    const checkbox = screen.getByRole('checkbox', { name: /cell active status for john doe/i })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeChecked()

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the role and modulePermission in a styled flex box', () => {
    const { asFragment } = render(<CustomCell header='role' row={mockRow} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should return an empty string if value is null or undefined', () => {
    const { asFragment } = render(<CustomCell header='unknown' row={mockRow} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the date as an ISO string (formatted date)', () => {
    const { asFragment } = render(<CustomCell header='date' row={mockRow} />)

    const dateValue = screen.getByText('2025-01-01')
    expect(dateValue).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })
})
