import type { Meta, StoryObj } from '@storybook/react'
import CustomSelect from '.'

const meta = {
  title: 'Components/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    border: {
      control: { type: 'radio', options: ['none', 'bottom'] }
    },
    onChange: {
      action: 'changed'
    },
    options: {
      control: {
        type: 'select'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    }
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ],
    border: 'none',
    placeholder: 'Select an option'
  }
} as Meta<typeof CustomSelect>

export default meta
type Story = StoryObj<typeof meta>

// Default Select with no border
export const Default: Story = {}

// Select with bottom border
export const WithBottomBorder: Story = {
  args: {
    border: 'bottom'
  }
}
