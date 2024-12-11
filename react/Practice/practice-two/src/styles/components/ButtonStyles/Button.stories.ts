import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@chakra-ui/react'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: ['sm', 'md'] }
    },
    variant: {
      control: { type: 'radio', options: ['primary', 'secondary'] }
    }
  },
  args: {
    size: 'md',
    variant: 'primary',
    children: 'Button Text'
  }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button'
  }
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button'
  }
}
