import { Meta, StoryObj } from '@storybook/react'
import ErrorState from './index'

const meta: Meta<typeof ErrorState> = {
  title: 'Components/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof ErrorState>

export const Default: Story = {
  args: {
    title: 'Not results found'
  }
}
