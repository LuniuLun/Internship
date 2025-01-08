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

  describe('Loading and Empty States', () => {
    it('should render "No data found" when data is empty and isLoaded is true', () => {
      render(<CustomTable data={[]} isLoaded={true} />)
      expect(screen.getByText(/no data found/i)).toBeInTheDocument()
    })

    it('should render skeleton loading state when isLoaded is false', () => {
      render(<CustomTable data={[]} isLoaded={false} />)
      expect(screen.queryByText(/no data found/i)).not.toBeInTheDocument()
      const skeletons = document.querySelectorAll('.chakra-skeleton')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should render table with data when isLoaded is true', () => {
      render(<CustomTable data={mockData} isLoaded={true} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('admin')).toBeInTheDocument()
    })
  })

  describe('Table Headers and Content', () => {
    beforeEach(() => {
      render(
        <CustomTable title='User Lists' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} isLoaded={true} />
      )
    })

    it('should render table title', () => {
      expect(screen.getByText('User Lists')).toBeInTheDocument()
    })

    it('should render all column headers', () => {
      const expectedHeaders = ['role', 'name', 'module Permission', 'is Active', 'age', 'status', 'Action']
      expectedHeaders.forEach((header) => {
        expect(screen.getByText(header, { exact: false })).toBeInTheDocument()
      })
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
    describe('Action Buttons', () => {
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
})
