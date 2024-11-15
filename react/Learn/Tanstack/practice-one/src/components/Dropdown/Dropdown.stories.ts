import { Meta, StoryObj } from '@storybook/react'
import Dropdown, { IDropdownOption } from './index'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof Dropdown>

const dropdownOptions: IDropdownOption[] = [
  {
    handleOnClick: () => alert('Option 1 selected'),
    titleOption: 'Option 1'
  },
  {
    src: '/',
    titleOption: 'Option 2'
  }
]

export const Default: Story = {
  args: {
    title: 'Dropdown',
    options: dropdownOptions
  }
}
