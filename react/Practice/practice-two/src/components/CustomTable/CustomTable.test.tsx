import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CustomTable, { TableRow } from '@components/CustomTable'

const mockData: TableRow[] = [
  {
    id: '1',
    role: 'admin',
    name: 'John Doe',
    modulePermission: 'read',
    isActive: false,
    age: 30,
    status: <span>Active</span>
  },
  {
    id: '2',
    role: 'super admin',
    lastName: 'Smith',
    modulePermission: 'write',
    isActive: false,
    age: 28
  },
  {
    id: '3',
    firstName: 'DucVan',
    role: 'user',
    modulePermission: 'write',
    isActive: false,
    age: 28,
    status: <span>Inactive</span>
  }
]

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

describe('CustomTable Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render "No data found" when data is empty and isLoaded is true', () => {
    render(<CustomTable data={[]} isLoaded={true} />)
    expect(screen.getByText(/no data found/i)).toBeInTheDocument()
  })

  describe('Table Headers and Content', () => {
    beforeEach(() => {
      render(
        <CustomTable title='User Lists' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} isLoaded={true} />
      )
    })

    it('should render all column headers', () => {
      const expectedHeaders = ['role', 'name', 'module Permission', 'is Active', 'age', 'status', 'Action']
      expectedHeaders.forEach((header) => {
        expect(screen.getByText(header, { exact: false })).toBeInTheDocument()
      })
    })

    it('should call onEdit with the correct id when the Edit button is clicked', () => {
      const editButtons = screen.getAllByRole('button', { name: /edit-user-btn/i })
      editButtons.forEach((button, index) => {
        fireEvent.click(button)
        expect(mockOnEdit).toHaveBeenCalledWith(mockData[index].id)
      })
    })

    it('should call onDelete with the correct id when the Delete button is clicked', () => {
      const deleteButtons = screen.getAllByRole('button', { name: /delete-user-btn/i })
      deleteButtons.forEach((button, index) => {
        fireEvent.click(button)
        expect(mockOnDelete).toHaveBeenCalledWith(mockData[index].id)
      })
    })
  })
})
