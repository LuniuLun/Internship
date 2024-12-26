import '@testing-library/jest-dom'
import React from 'react'
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

const checkCellValue = (value: string | number | boolean | React.ReactNode, rowName?: string) => {
  if (typeof value === 'string' || typeof value === 'number') {
    // Check for string or number values
    expect(screen.getByText(String(value))).toBeInTheDocument()
  } else if (React.isValidElement(value)) {
    // Check for React elements (e.g., <span>Active</span>)
    if (value.props.children === 'Active') {
      expect(screen.getByText('Active')).toBeInTheDocument()
    }
  } else if (typeof value === 'boolean') {
    // Check for boolean values (checkboxes)
    const checkbox = screen.getByRole('checkbox', {
      name: rowName ? `Cell active status for ${rowName}` : undefined
    })
    expect(checkbox).toBeInTheDocument()
    if (value) {
      expect(checkbox).toBeChecked() // Expect the checkbox to be checked for true
    } else {
      expect(checkbox).not.toBeChecked() // Expect the checkbox to be unchecked for false
    }
  }
}

describe('CustomTable Component', () => {
  beforeEach(() => {
    render(<CustomTable title='User List' data={mockData} onEdit={mockOnEdit} onDelete={mockOnDelete} />)
  })

  it('should render the table headers and data correctly', () => {
    // Verify headers
    const expectedHeaders = ['role', 'name', 'module Permission', 'age', 'status', 'Action']
    const renderedHeaders = screen.getAllByRole('columnheader').map((header) => header.textContent?.trim())
    expectedHeaders.forEach((header) => {
      expect(renderedHeaders).toContain(header)
    })

    screen.debug()

    // Verify data rows
    mockData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== 'id' && key !== 'isActive') {
          const value = row[key]
          checkCellValue(value, key)
        }
      })
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

  it('should call onEdit with the correct id when the Edit button is clicked', () => {
    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    editButtons.forEach((button, index) => {
      fireEvent.click(button)
      expect(mockOnEdit).toHaveBeenCalledWith(mockData[index].id)
    })
  })

  it('should call onDelete with the correct id when the Delete button is clicked', () => {
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
    deleteButtons.forEach((button, index) => {
      fireEvent.click(button)
      expect(mockOnDelete).toHaveBeenCalledWith(mockData[index].id)
    })
  })
})
