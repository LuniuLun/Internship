import { Meta, StoryObj } from '@storybook/react'
import ProductCard from './index'

// Meta thông tin cho Storybook
const meta: Meta<typeof ProductCard> = {
  title: 'Example/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    layout: 'centered'
  }
}

export default meta
type Story = StoryObj<typeof ProductCard>

export const Default: Story = {
  args: {
    id: '1',
    name: 'Delicious Bowl',
    imageURL: 'https://example.com/bowl.jpg',
    price: '12.99',
    quantity: '2',
    onEdit: () => alert('Edit clicked!'),
    onDelete: () => alert('Delete clicked!')
  }
}
