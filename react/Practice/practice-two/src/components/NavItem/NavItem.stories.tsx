import { Meta, StoryObj } from '@storybook/react'
import NavItem from '.'
import { DashboardIcon } from '@assets/icons'
import { MemoryRouter } from 'react-router-dom' // Add this import

const meta = {
  title: 'Components/NavItem',
  component: NavItem,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: { type: 'object' }
    },
    title: {
      control: { type: 'text' }
    },
    isActive: {
      control: { type: 'boolean' }
    },
    to: {
      control: { type: 'text' },
      defaultValue: '/'
    }
  }
} as Meta<typeof NavItem>

export default meta

type Story = StoryObj<typeof meta>

export const Active: Story = {
  args: {
    icon: <DashboardIcon />,
    title: 'Active Item',
    isActive: true,
    to: '/'
  },
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>]
}

export const Inactive: Story = {
  args: {
    icon: <DashboardIcon />,
    title: 'Inactive Item',
    isActive: false,
    to: '/'
  },
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>]
}
