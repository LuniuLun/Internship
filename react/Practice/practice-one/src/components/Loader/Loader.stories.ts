import { Meta, StoryObj } from '@storybook/react'
import Loader from './index'

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof Loader>

export const Default: Story = {
  args: {}
}
