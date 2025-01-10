import { Meta, StoryObj } from '@storybook/react'
import StatisticsCard from './'

const meta: Meta<typeof StatisticsCard> = {
  title: 'Components/StatisticsCard',
  component: StatisticsCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'number' },
    isLoaded: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof StatisticsCard>

export const Default: Story = {
  args: {
    label: 'Total Users',
    value: 150,
    isLoaded: true
  }
}

export const Loading: Story = {
  args: {
    label: 'Total Users',
    value: 150,
    isLoaded: false
  }
}
