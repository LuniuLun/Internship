import type { Meta, StoryObj } from '@storybook/react'
import InfoGroup from '.'

const meta = {
  title: 'Components/InfoGroup',
  component: InfoGroup,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: ['sm', 'lg'] }
    }
  }
} as Meta<typeof InfoGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    heading: 'Sample Heading',
    description: 'This is a sample description for InfoGroup component.',
    size: 'sm'
  }
}

export const Large: Story = {
  args: {
    heading: 'Sample Heading (Large)',
    description: 'This is a sample description for a middle-sized InfoGroup component.',
    size: 'md'
  }
}
