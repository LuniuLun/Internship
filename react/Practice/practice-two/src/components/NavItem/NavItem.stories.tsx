import { Meta, StoryObj } from '@storybook/react'
import NavItem from '.'
import { DashboardIcon } from '@assets/icons'

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
    handleClick: {
      action: 'clicked'
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
    handleClick: (title: string) => alert(`Clicked on: ${title}`)
  }
}

export const Inactive: Story = {
  args: {
    icon: <DashboardIcon />,
    title: 'Inactive Item',
    isActive: false,
    handleClick: (title: string) => alert(`Clicked on: ${title}`)
  }
}
