import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import StatisticsCard from '@components/StatisticCard'

const customRender = (ui: React.ReactNode) => render(ui, { wrapper: ChakraProvider })

describe('StatisticsCard', () => {
  it('renders the label and value correctly', () => {
    const label = 'Total Sales'
    const value = 5000

    customRender(<StatisticsCard label={label} value={value} />)

    const labelElement = screen.getByText(label)
    const valueElement = screen.getByText(value.toString())

    expect(labelElement).toBeInTheDocument()
    expect(valueElement).toBeInTheDocument()
  })
})
