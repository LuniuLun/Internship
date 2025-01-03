import { Meta, StoryObj } from '@storybook/react'
import Filter from '.'
import { Button } from '@chakra-ui/react'

const meta = {
  title: 'Components/Filter',
  component: Filter,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    isLoaded: { control: 'boolean' },
    children: { control: false }
  }
} as Meta<typeof Filter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isLoaded: true
  }
}

export const WithChildren: Story = {
  args: {
    isLoaded: true,
    children: <Button variant='outline'>Custom Button</Button>
  }
}

export const Disabled: Story = {
  args: {
    isLoaded: false
  }
}
