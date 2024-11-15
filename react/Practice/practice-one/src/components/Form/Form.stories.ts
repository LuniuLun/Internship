import { Meta, StoryObj } from '@storybook/react'
import Form from './index'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: { title: 'Heading' }
}
