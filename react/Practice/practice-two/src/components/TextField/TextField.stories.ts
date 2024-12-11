import { Meta, StoryObj } from '@storybook/react'
import TextField from '.'
import searchIcon from '@assets/icons/search.svg'

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
    iconSrc: {
      control: { type: 'text' }
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
    iconSrc: '',
    errorMessage: ''
  }
}

export const WithIcon: Story = {
  args: {
    name: 'with-icon',
    placeholder: 'Enter text with icon',
    border: 'thin',
    dimension: 'sm',
    iconSrc: searchIcon,
    errorMessage: ''
  }
}

export const WithError: Story = {
  args: {
    name: 'with-error',
    placeholder: 'Enter text with error',
    border: 'thin',
    dimension: 'sm',
    iconSrc: '',
    errorMessage: 'This field is required.'
  }
}

export const MiddleSized: Story = {
  args: {
    name: 'middle-sized',
    placeholder: 'Enter text (middle-sized)',
    border: 'thin',
    dimension: 'md',
    iconSrc: '',
    errorMessage: ''
  }
}
