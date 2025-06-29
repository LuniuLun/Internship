import { Meta, StoryObj } from '@storybook/react'
import Pagination from '.'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    totalItems: { control: { type: 'number' } },
    itemsPerPageOptions: { control: { type: 'select' }, options: [10, 20, 50] },
    isLoaded: { control: { type: 'boolean' } },
    hasNextPage: { control: { type: 'boolean' } },
    fetchNextPage: { action: 'fetchNextPage' }
  }
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    totalItems: 100,
    itemsPerPageOptions: [10, 20, 50],
    fetchNextPage: () => alert('Fetching next page'),
    hasNextPage: true,
    isLoaded: true
  }
}

export const Loading: Story = {
  args: {
    totalItems: 0,
    itemsPerPageOptions: [10, 20, 50],
    fetchNextPage: () => alert('Fetching next page'),
    hasNextPage: false,
    isLoaded: false
  }
}
