import { Meta, StoryObj } from '@storybook/react'
import Text from './index'

const meta: Meta<typeof Text> = {
  title: 'Components/Common/Typography',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof Text>

// Default Story
export const Default: Story = {
  args: {
    children: 'Default Typography'
  }
}

// Normal bold Story
export const Normalbold: Story = {
  args: {
    variant: 'normal-bold',
    children: 'Normal bold Text'
  }
}

// Normal Medium Story
export const NormalMedium: Story = {
  args: {
    variant: 'normal-medium',
    children: 'Normal Medium Text'
  }
}

// Normal Thin Story
export const NormalThin: Story = {
  args: {
    variant: 'normal-thin',
    children: 'Normal Thin Text'
  }
}

// Large bold Story
export const Largebold: Story = {
  args: {
    variant: 'large-bold',
    children: 'Large bold Text'
  }
}

// Error Message Story
export const ErrorMessage: Story = {
  args: {
    variant: 'error-message',
    children: 'This is an error message!'
  }
}
