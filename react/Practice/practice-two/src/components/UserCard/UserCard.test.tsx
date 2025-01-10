import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import UserCard from '@components/UserCard'

describe('UserCard', () => {
  const renderUserCard = (name: string, role: string, avatar: string) => {
    const utils = render(<UserCard name={name} role={role} avatar={avatar} />)
    return utils
  }

  it('matches snapshot', () => {
    const { asFragment } = renderUserCard(
      'John Doe',
      'Developer',
      'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
