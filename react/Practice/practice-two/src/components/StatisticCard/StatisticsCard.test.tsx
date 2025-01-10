import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import StatisticsCard from '@components/StatisticCard'

describe('StatisticsCard', () => {
  it('matches the snapshot', () => {
    const label = 'Total Sales'
    const value = 5000

    const { asFragment } = render(<StatisticsCard label={label} value={value} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
