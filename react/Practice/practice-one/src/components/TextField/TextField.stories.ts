import type { Meta, StoryObj } from '@storybook/react'
import TextField from './index'
import { fn } from '@storybook/test'

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'example',
    value: 'Sample Text',
    onChange: fn()
  }
}

export const ShortTextField: Story = {
  args: {
    name: 'short-example',
    value: 'Short Text',
    onChange: fn(),
    dimension: 'sm'
  }
}
