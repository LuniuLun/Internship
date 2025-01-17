import mockUsers from '@constants/mockUsers'
import filterUsersByRole from '.'

describe('filterUsersByRole', () => {
  it('should filter users by their roles correctly', () => {
    const { superAdmin, admin, employee } = filterUsersByRole(mockUsers)

    expect(superAdmin).toHaveLength(1)
    expect(superAdmin[0].id).toBe('2')

    expect(admin).toHaveLength(1)
    expect(admin[0].id).toBe('1')

    expect(employee).toHaveLength(1)
    expect(employee[0].id).toBe('3')
  })
})
