import type { Meta, StoryObj } from '@storybook/react'
import ToastMessage from './index'

const meta: Meta<typeof ToastMessage> = {
  title: 'Components/ToastMessage',
  component: ToastMessage,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    status: 'success',
    message: 'This is a success message!'
  }
}

export const Error: Story = {
  args: {
    status: 'error',
    message: 'This is an error message!'
  }
}
