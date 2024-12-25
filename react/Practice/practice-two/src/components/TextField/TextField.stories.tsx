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
    name: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    variant: { control: { type: 'radio', options: ['outline', 'filled', 'flushed', 'unstyled'] } },
    size: { control: { type: 'radio', options: ['sm', 'md', 'lg'] } },
    icon: { control: { type: 'object' }, description: 'Icon to be displayed inside the text field' },
    errorMessage: { control: { type: 'text' } },
    type: { control: { type: 'radio', options: ['text', 'password'] } }
  }
} as Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'default',
    placeholder: 'Enter text here',
    variant: 'outline',
    size: 'sm',
    icon: '',
    errorMessage: ''
  }
}

export const WithIcon: Story = {
  args: {
    name: 'with-icon',
    placeholder: 'Enter text with icon',
    variant: 'outline',
    size: 'md',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const WithError: Story = {
  args: {
    name: 'with-error',
    placeholder: 'Enter text with error',
    variant: 'outline',
    size: 'md',
    icon: '',
    errorMessage: 'This field is required.'
  }
}

export const SmallSized: Story = {
  args: {
    name: 'small',
    placeholder: 'Enter text (small)',
    variant: 'outline',
    size: 'sm',
    icon: '',
    errorMessage: ''
  }
}

export const MiddleSized: Story = {
  args: {
    name: 'middle-sized',
    placeholder: 'Enter text (middle-sized)',
    variant: 'outline',
    size: 'md',
    icon: '',
    errorMessage: ''
  }
}

export const LargeSized: Story = {
  args: {
    name: 'large-sized',
    placeholder: 'Enter text (large-sized)',
    variant: 'filled',
    size: 'lg',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const FlushedVariant: Story = {
  args: {
    name: 'flushed-variant',
    placeholder: 'Enter text (flushed variant)',
    variant: 'flushed',
    size: 'md',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const FilledVariant: Story = {
  args: {
    name: 'filled-variant',
    placeholder: 'Enter text (filled variant)',
    variant: 'filled',
    size: 'md',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const OutlineVariant: Story = {
  args: {
    name: 'outline-variant',
    placeholder: 'Enter text (outline variant)',
    variant: 'outline',
    size: 'md',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const UnstyledVariant: Story = {
  args: {
    name: 'unstyled-variant',
    placeholder: 'Enter text (unstyled variant)',
    variant: 'unstyled',
    size: 'md',
    icon: <SearchIcon />,
    errorMessage: ''
  }
}

export const PasswordField: Story = {
  args: {
    name: 'password',
    placeholder: 'Enter password',
    variant: 'outline',
    size: 'md',
    type: 'password',
    errorMessage: ''
  }
}

export const PasswordFieldWithError: Story = {
  args: {
    name: 'password-with-error',
    placeholder: 'Enter password',
    variant: 'outline',
    size: 'md',
    type: 'password',
    errorMessage: 'Password is required.'
  }
}
