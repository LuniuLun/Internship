import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { DashboardIcon } from '@assets/icons'
import { MemoryRouter } from 'react-router-dom'
import NavItem from '@components/NavItem'

describe('NavItem', () => {
  const renderNavItem = (isActive: boolean) =>
    render(
      <MemoryRouter>
        <NavItem icon={<DashboardIcon />} title='Test Title' isActive={isActive} to={''} />
      </MemoryRouter>
    )

  it('matches the snapshot when isActive is true', () => {
    const { asFragment } = renderNavItem(true)
    expect(asFragment()).toMatchSnapshot()
  })
})
