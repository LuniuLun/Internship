import { Meta, StoryObj } from '@storybook/react'
import Dropdown from './index'
import { IDropdownOption } from '../../types/common'

// Định nghĩa meta data cho Storybook
const meta: Meta<typeof Dropdown> = {
  title: 'Example/Dropdown',
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
