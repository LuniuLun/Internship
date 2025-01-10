import { useUser } from '@hooks'
import { renderHook } from '@testing-library/react'
import { IUser } from '@type/models'

jest.mock('@services/user', () => ({
  addUser: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn()
}))

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn().mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({
      data: {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Admin',
        createdDate: new Date('2024-01-02'),
        phone: '9876543210',
        username: 'jane.smith',
        password: 'password456'
      } as IUser
    }),
    isSuccess: true
  }),
  useQueryClient: jest.fn().mockReturnValue({ invalidateQueries: jest.fn() })
}))

describe('useUser', () => {
  const usersData: IUser[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'Admin',
      createdDate: new Date('2024-01-01T00:00:00'),
      phone: '1234567890',
      username: 'john.doe',
      password: 'password123'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      role: 'Super Admin',
      createdDate: new Date('2024-01-02T00:00:00'),
      phone: '9876543210',
      username: 'jane.smith',
      password: 'password456'
    }
  ]

  const allUsers: IUser[] = [
    ...usersData,
    {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      role: 'Employee',
      createdDate: new Date('2024-01-03T00:00:00'),
      phone: '5551234567',
      username: 'alice.johnson',
      password: 'password789'
    }
  ]

  it('should return transformed users and all necessary data', () => {
    const { result } = renderHook(() => useUser(usersData, allUsers, 1))

    expect(result.current.superAdmin).toEqual([allUsers[1]])
    expect(result.current.admin).toEqual([allUsers[0]])
    expect(result.current.employee).toEqual([allUsers[2]])

    expect(result.current.transformedUsers).toHaveLength(2)
    expect(result.current.transformedUsers[0].name).toBeTruthy()
  })

  it('should return empty arrays when no usersData is provided', () => {
    const { result } = renderHook(() => useUser([], [], 1))

    expect(result.current.superAdmin).toEqual([])
    expect(result.current.admin).toEqual([])
    expect(result.current.employee).toEqual([])
  })

  it('should return correct users when usersData is provided', () => {
    const { result } = renderHook(() => useUser(usersData, allUsers, 1))

    expect(result.current.superAdmin).toHaveLength(1)
    expect(result.current.admin).toHaveLength(1)
  })

  it('should correctly transform users into TableRow format', () => {
    const { result } = renderHook(() => useUser(usersData, usersData, 1))

    expect(result.current.transformedUsers).toHaveLength(usersData.length)
    expect(result.current.transformedUsers[0].name).toBeTruthy()
  })
})
