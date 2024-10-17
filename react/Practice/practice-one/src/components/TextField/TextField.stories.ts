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
    label: 'Sample Label',
    onChange: fn(),
    errorMessage: ''
  }
}

export const WithError: Story = {
  args: {
    name: 'example',
    value: 'Sample Text',
    label: 'Sample Label',
    onChange: fn(),
    errorMessage: 'This field is required'
  }
}

export const ShortTextField: Story = {
  args: {
    name: 'short-example',
    value: 'Short Text',
    label: 'Short Example',
    onChange: fn(),
    errorMessage: '',
    dimension: 'sm'
  }
}
