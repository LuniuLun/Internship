import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import NavItem from '@components/NavItem'
import { DashboardIcon } from '@assets/icons'
import colors from '@styles/variables/colors'

describe('NavItem', () => {
  const handleClickMock = jest.fn()

  const renderNavItem = (isActive: boolean) =>
    render(<NavItem icon={<DashboardIcon />} title='Test Title' isActive={isActive} handleClick={handleClickMock} />)

  it('should render the title and icon', () => {
    const { container } = renderNavItem(false)
    expect(screen.getByText('Test Title')).toBeInTheDocument()

    const iconElement = container.querySelector('svg')
    expect(iconElement).toBeInTheDocument()
  })

  it('should call handleClick when clicked', () => {
    renderNavItem(false)
    fireEvent.click(screen.getByText('Test Title'))
    expect(handleClickMock).toHaveBeenCalledWith('Test Title')
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
