import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import InfoGroup from '@components/InfoGroup'

describe('InfoGroup', () => {
  it('renders the heading and description correctly', () => {
    const heading = 'Test Heading'
    const description = 'Test description for the InfoGroup component.'

    const { asFragment } = render(<InfoGroup heading={heading} description={description} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
