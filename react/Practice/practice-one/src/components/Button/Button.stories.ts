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

// export const Large: Story = {
//   args: {
//     size: 'large',
//     title: 'Button'
//   }
// }

// export const Small: Story = {
//   args: {
//     size: 'small',
//     title: 'Button'
//   }
// }
