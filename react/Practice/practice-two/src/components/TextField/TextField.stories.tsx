import { Meta, StoryObj } from '@storybook/react'
import TextField from '.'
import { SearchIcon } from '@assets/icons'
const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' }
    },
    placeholder: {
      control: { type: 'text' }
    },
    border: {
      control: { type: 'select', options: ['thin', 'none'] }
    },
    dimension: {
      control: { type: 'select', options: ['sm', 'md'] }
    },
    icon: {
      control: { type: 'object' }
    },
    errorMessage: {
      control: { type: 'text' }
    }
  }
} as Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'default',
    placeholder: 'Enter text here',
    border: 'thin',
    dimension: 'sm',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const WithIcon: Story = {
  args: {
    name: 'with-icon',
    placeholder: 'Enter text with icon',
    border: 'thin',
    dimension: 'sm',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const WithError: Story = {
  args: {
    name: 'with-error',
    placeholder: 'Enter text with error',
    border: 'thin',
    dimension: 'sm',
    icon: '',
    errorMessage: 'This field is required.'
  }
}

export const MiddleSized: Story = {
  args: {
    name: 'middle-sized',
    placeholder: 'Enter text (middle-sized)',
    border: 'thin',
    dimension: 'md',
    icon: '',
    errorMessage: ''
  }
}
