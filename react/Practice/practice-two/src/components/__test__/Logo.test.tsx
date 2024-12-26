import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LogoIcon } from '@assets/icons'
import Logo from '@components/Logo'

describe('Logo component', () => {
  it('renders the icon with specified width and height', () => {
    const width = '150px'
    const height = '150px'
    const { container } = render(
      <MemoryRouter>
        <Logo src='/home' icon={<LogoIcon />} width={width} height={height} />
      </MemoryRouter>
    )

    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()

    expect(iconElement).toHaveAttribute('width', width)
    expect(iconElement).toHaveAttribute('height', height)
  })

  it('should navigate to the correct link when clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <Logo src='/home' icon={<LogoIcon />} />
      </MemoryRouter>
    )

    const linkElement = container.querySelector('a')
    expect(linkElement).toHaveAttribute('href', '/home')
  })
})
