import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from '@layout/components/Sidebar'
import { NAV_ITEMS } from '@constants/option'

describe('Sidebar component', () => {
  it('renders all navigation items correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    )

    NAV_ITEMS.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    })
  })

  it('should highlight the active navigation item based on location', () => {
    const currentPath = '/users'

    render(
      <MemoryRouter initialEntries={[currentPath]}>
        <Sidebar />
      </MemoryRouter>
    )

    const userNavItem = screen.getByRole('link', { name: /users/i })
    expect(userNavItem).toHaveAttribute('aria-current', 'page')
  })
})
