import { Meta, StoryObj } from '@storybook/react'
import Heading from './index'

const meta: Meta<typeof Heading> = {
  title: 'Example/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: {
    title: 'Heading'
  }
}
