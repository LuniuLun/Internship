import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '@chakra-ui/react'

const meta = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['primary', 'secondary'] }
    },
    fontSize: {
      control: { type: 'text' }
    }
  },
  args: {
    variant: 'primary'
  }
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is the default heading text.'
  }
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is a primary heading.'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'This is a secondary heading.'
  }
}
