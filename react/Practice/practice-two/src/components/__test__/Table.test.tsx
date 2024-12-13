import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import CustomTable, { TableRow } from '@components/CustomTable'

const mockData: TableRow[] = [
  { role: 'admin', name: 'John Doe' },
  { role: 'user', name: 'Jane Smith' }
]

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

describe('CustomTable', () => {
  it('should render the table with headers and data', () => {
    render(<CustomTable title='User List' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    expect(screen.getByText('role')).toBeInTheDocument()
    expect(screen.getByText('name')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('should call onEdit when the Edit button is clicked', () => {
    render(<CustomTable title='User List' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    const editButton = screen.getAllByRole('button', { name: /edit/i })[0] // Get first edit button
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(mockData[0])
  })

  it('should call onDelete when the Delete button is clicked', () => {
    render(<CustomTable title='User List' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} />)

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0] // Get first delete button
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith(mockData[0])
  })
})
