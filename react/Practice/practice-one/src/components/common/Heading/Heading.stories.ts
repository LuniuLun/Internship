import { Meta, StoryObj } from '@storybook/react'
import Heading from './'

const meta: Meta<typeof Heading> = {
  title: 'Components/Common/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof Heading>

export const H1: Story = {
  args: {
    title: 'H1 Heading',
    as: 'h1'
  }
}

export const H2: Story = {
  args: {
    title: 'H2 Heading',
    as: 'h2'
  }
}
