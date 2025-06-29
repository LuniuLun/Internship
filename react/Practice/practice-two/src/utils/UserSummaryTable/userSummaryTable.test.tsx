import { TransformedUser } from '@type/models'
import { isValidElement } from 'react'
import mockUsers from '@constants/mockUsers'
import userSummaryTable from '.'

jest.mock('@components', () => ({
  InfoGroup: jest.fn(() => <div />)
}))

describe('userSummaryTable', () => {
  it('should transform user data to the correct structure', () => {
    const transformedUsers: TransformedUser[] = userSummaryTable(mockUsers)

    expect(transformedUsers[0].id).toBe('1')
    expect(isValidElement(transformedUsers[0].name)).toBe(true)
    expect(transformedUsers[0].role).toBe('Admin')
    expect(transformedUsers[0].createdDate).toBe('2024-01-01')
  })
})
