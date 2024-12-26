import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import UserCard from '@components/UserCard'

describe('UserCard', () => {
  const renderUserCard = (name: string, role: string, avatar: string) => {
    const utils = render(<UserCard name={name} role={role} avatar={avatar} />)
    return utils
  }

  it('should render the user name and role correctly', () => {
    renderUserCard('John Doe', 'Developer', 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png')

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })
})
