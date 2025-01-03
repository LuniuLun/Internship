import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import CustomTable, { TableRow } from '@components/CustomTable'
import colors from '@styles/variables/colors'

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
    role: 'user',
    modulePermission: 'write',
    isActive: false,
    age: 28
  },
  {
    id: '3',
    role: 'admin',
    name: 'Alice Johnson',
    modulePermission: 'admin',
    status: <span>Active</span>
  },
  {
    id: '4',
    role: 'user',
    isActive: true,
    age: 40,
    status: <span>Active</span>
  }
]

const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()

describe('CustomTable Component', () => {
  beforeEach(() => {
    render(<CustomTable title='User List' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
  })

  it('should render "No data found" when data is empty and isLoaded is true', () => {
    render(<CustomTable data={[]} isLoaded={true} />)

    const noDataFoundMessage = screen.getByText(/no data found/i)
    expect(noDataFoundMessage).toBeInTheDocument()
  })

  it('should not render "No data found" when data is empty and isLoaded is false', () => {
    render(<CustomTable data={[]} isLoaded={false} />)

    const noDataFoundMessage = screen.queryByText(/no data found/i)
    expect(noDataFoundMessage).not.toBeInTheDocument()
  })

  it('should apply correct styles based on role (admin/user)', async () => {
    const roles = ['admin', 'user']
    roles.forEach(async (role) => {
      const cells = await screen.findAllByText(role)
      cells.forEach((cell) => {
        const expectedColor = role === 'admin' ? colors.brand.hoverBtnColor : colors.brand.secondary
        expect(cell).toHaveStyle(`background-color: ${expectedColor}`)
      })
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
