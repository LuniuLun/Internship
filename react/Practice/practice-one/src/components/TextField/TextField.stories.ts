import type { Meta, StoryObj } from '@storybook/react'
import TextField from './index'
import { fn } from '@storybook/test'

const meta: Meta<typeof TextField> = {
  title: 'Example/TextField',
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
    label: 'Sample Label',
    onChange: fn(),
    error: ''
  }
}

// Câu chuyện cho TextField với error
export const WithError: Story = {
  args: {
    name: 'example',
    value: 'Sample Text',
    label: 'Sample Label',
    onChange: fn(),
    error: 'This field is required'
  }
}

// Câu chuyện cho TextField ngắn
export const ShortTextField: Story = {
  args: {
    name: 'short-example',
    value: 'Short Text',
    label: 'Short Example',
    onChange: fn(),
    error: '',
    size: 'sm'
  }
}
