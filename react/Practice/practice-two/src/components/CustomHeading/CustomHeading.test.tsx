import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CustomHeading } from '@components'

describe('CustomHeading', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<CustomHeading variant='primary' title='Test Heading'></CustomHeading>)

    expect(asFragment()).toMatchSnapshot()
  })
})
