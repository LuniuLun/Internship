import CustomTable, { TableRow } from '@components/CustomTable'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/CustomTable',
  component: CustomTable,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edited' },
    onDelete: { action: 'deleted' },
    title: {
      control: { type: 'text' },
      description: 'Table title'
    }
  }
} as Meta<typeof CustomTable>

export default meta
type Story = StoryObj<typeof meta>

const sampleData: TableRow[] = [
  {
    name: 'John Doe',
    age: 28,
    role: 'Admin'
  },
  {
    name: 'Jane Smith',
    age: 24,
    role: 'User'
  },
  {
    name: 'Mark Johnson',
    age: 35,
    role: 'Admin'
  }
]

export const Default: Story = {
  args: {
    data: sampleData,
    onEdit: (row) => alert(`Edit: ${row}`),
    onDelete: (row) => alert(`Delete: ${row}`)
  }
}

export const HavingTitle: Story = {
  args: {
    title: 'Having title',
    data: sampleData,
    onEdit: (row) => alert(`Edit: ${row}`),
    onDelete: (row) => alert(`Delete: ${row}`)
  }
}
