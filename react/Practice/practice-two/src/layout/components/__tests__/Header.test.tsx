import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Header from '../Header'

describe('Header component', () => {
  it('renders the logo and user info correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByText(/Hello, Lekan/)).toBeInTheDocument()
    expect(screen.getByText(/Have a nice day/)).toBeInTheDocument()
  })
})
