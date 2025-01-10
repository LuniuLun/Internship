import { Meta, StoryObj } from '@storybook/react'
import Pagination from '.'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number' } },
    totalItems: { control: { type: 'number' } },
    itemsPerPage: { control: { type: 'number' } },
    itemsPerPageOptions: { control: { type: 'select' }, options: [10, 20, 50] },
    isLoaded: { control: { type: 'boolean' } },
    onPageChange: { action: 'Page changed' },
    onItemsPerPageChange: { action: 'Items per page changed' },
    fetchNextPage: { action: 'Fetch next page' }
  }
} as Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    currentPage: 1,
    totalItems: 100,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 50],
    hasNextPage: true,
    isFetchingNextPage: false,
    isLoaded: true
  }
}

export const Loading: Story = {
  args: {
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 50],
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoaded: false
  }
}

export const EndOfPagination: Story = {
  args: {
    currentPage: 10,
    totalItems: 100,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 50],
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoaded: true
  }
}

export const FetchingNextPage: Story = {
  args: {
    currentPage: 5,
    totalItems: 100,
    itemsPerPage: 10,
    itemsPerPageOptions: [10, 20, 50],
    hasNextPage: true,
    isFetchingNextPage: true,
    isLoaded: true
  }
}
