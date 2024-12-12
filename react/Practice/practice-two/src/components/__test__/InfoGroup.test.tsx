import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InfoGroup from '@components/InfoGroup'
import colors from '@styles/variables/colors'

describe('InfoGroup', () => {
  it('renders the heading and description correctly', () => {
    const heading = 'Test Heading'
    const description = 'Test description for the InfoGroup component.'

    render(<InfoGroup heading={heading} description={description} />)

    const headingElement = screen.getByText(heading)
    expect(headingElement).toBeInTheDocument()

    const descriptionElement = screen.getByText(description)
    expect(descriptionElement).toBeInTheDocument()
  })

  it('applies the correct font size and color for small size', () => {
    const heading = 'Test Heading'
    const description = 'Test description for the small size.'

    render(<InfoGroup heading={heading} description={description} size='sm' />)

    const headingElement = screen.getByText(heading)
    expect(headingElement).toHaveStyle('font-size: 0.875rem')
    expect(headingElement).toHaveStyle(`color: ${colors.brand.black}`)

    const descriptionElement = screen.getByText(description)
    expect(descriptionElement).toHaveStyle('font-size: 0.75rem')
    expect(descriptionElement).toHaveStyle(`color: ${colors.brand.blackTextTertiary}`)
  })

  it('applies the correct font size and color for larger size', () => {
    const heading = 'Test Heading'
    const description = 'Test description for the larger size.'

    render(<InfoGroup heading={heading} description={description} size='md' />)

    const headingElement = screen.getByText(heading)
    expect(headingElement).toHaveStyle('font-size: 1rem')
    expect(headingElement).toHaveStyle(`color: ${colors.brand.black}`)

    const descriptionElement = screen.getByText(description)
    expect(descriptionElement).toHaveStyle('font-size: 0.75rem')
    expect(descriptionElement).toHaveStyle(`color: ${colors.brand.blackTextSecondary}`)
  })
})
