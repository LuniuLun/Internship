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

// Normal SemiBold Story
export const NormalSemiBold: Story = {
  args: {
    variant: 'normal-semiBold',
    children: 'Normal SemiBold Text'
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

// Large SemiBold Story
export const LargeSemiBold: Story = {
  args: {
    variant: 'large-semiBold',
    children: 'Large SemiBold Text'
  }
}

// Error Message Story
export const ErrorMessage: Story = {
  args: {
    variant: 'error-message',
    children: 'This is an error message!'
  }
}
