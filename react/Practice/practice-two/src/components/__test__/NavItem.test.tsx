import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { DashboardIcon } from '@assets/icons'
import { MemoryRouter } from 'react-router-dom'
import colors from '@styles/variables/colors'
import NavItem from '@components/NavItem'

describe('NavItem', () => {
  const renderNavItem = (isActive: boolean) =>
    render(
      <MemoryRouter>
        <NavItem icon={<DashboardIcon />} title='Test Title' isActive={isActive} to={''} />
      </MemoryRouter>
    )

  it('should render the title and icon', () => {
    const { container } = renderNavItem(false)
    expect(screen.getByText('Test Title')).toBeInTheDocument()

    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  it('should apply active styles when isActive is true', () => {
    const { container } = renderNavItem(true)

    const title = screen.getByText('Test Title')
    const iconElement = container.querySelector('svg')

    expect(title).toHaveStyle('font-weight: bold')
    expect(title).toHaveStyle(`color: ${colors.brand.primary}`)
    expect(iconElement).toHaveAttribute('fill', colors.brand.primary)
  })

  it('should apply default styles when isActive is false', () => {
    const { container } = renderNavItem(false)

    const title = screen.getByText('Test Title')
    const iconElement = container.querySelector('svg')

    expect(title).toHaveStyle('font-weight: normal')
    expect(title).toHaveStyle(`color: ${colors.brand.blackTextTertiary}`)
    expect(iconElement).toHaveAttribute('fill', colors.brand.blackTextTertiary)
  })
})
