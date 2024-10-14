import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from './index'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    title: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    title: 'Button'
  }
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    title: 'Button'
  }
}

export const Medium: Story = {
  args: {
    size: 'md',
    title: 'Button'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Button'
  }
}
