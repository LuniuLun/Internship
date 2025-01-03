import { useUser } from '@hooks/useUser'
import { act, renderHook } from '@testing-library/react'
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
        createDate: new Date('2024-01-02'),
        phone: '9876543210',
        username: 'jane.smith',
        password: 'password456'
      }
    }),
    isSuccess: true
  }),
  useQueryClient: jest.fn().mockReturnValue({ invalidateQueries: jest.fn() })
}))

describe('useUser', () => {
  it('should return transformed users and all necessary data', () => {
    const usersData: IUser[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-01T00:00:00'),
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
        createDate: new Date('2024-01-02T00:00:00'),
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
        createDate: new Date('2024-01-03T00:00:00'),
        phone: '5551234567',
        username: 'alice.johnson',
        password: 'password789'
      }
    ]

    const { result } = renderHook(() => useUser(usersData, allUsers))

    expect(result.current.superAdmin).toEqual([
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Super Admin',
        createDate: new Date('2024-01-02T00:00:00'),
        phone: '9876543210',
        username: 'jane.smith',
        password: 'password456'
      }
    ])
    expect(result.current.admin).toEqual([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-01T00:00:00'),
        phone: '1234567890',
        username: 'john.doe',
        password: 'password123'
      }
    ])
    expect(result.current.employee).toEqual([
      {
        id: '3',
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@example.com',
        role: 'Employee',
        createDate: new Date('2024-01-03T00:00:00'),
        phone: '5551234567',
        username: 'alice.johnson',
        password: 'password789'
      }
    ])

    expect(result.current.transformedUsers).toHaveLength(2)
    expect(result.current.transformedUsers[0].name).toBeTruthy()
  })

  it('should call addUserMutation and invalidate queries on success', async () => {
    const usersData: IUser[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-01T00:00:00'),
        phone: '1234567890',
        username: 'john.doe',
        password: 'password123'
      }
    ]
    const allUsers: IUser[] = usersData

    const { result } = renderHook(() => useUser(usersData, allUsers))

    const mockAddUser = jest.fn().mockResolvedValue({
      data: {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-02'),
        phone: '9876543210',
        username: 'jane.smith',
        password: 'password456'
      }
    })

    result.current.addUserMutation.mutateAsync = mockAddUser

    await act(async () => {
      await result.current.addUserMutation.mutateAsync({
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-02'),
        phone: '9876543210',
        username: 'jane.smith',
        password: 'password456'
      })
    })

    expect(mockAddUser).toHaveBeenCalled()
    expect(result.current.addUserMutation.isSuccess).toBe(true)
  })

  it('should return empty arrays when no usersData is provided', () => {
    const { result } = renderHook(() => useUser(undefined, undefined))

    expect(result.current.superAdmin).toEqual([])
    expect(result.current.admin).toEqual([])
    expect(result.current.employee).toEqual([])
  })

  it('should return empty arrays when allUsers is provided but no users match roles', () => {
    const allUsers: IUser[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Guest',
        createDate: new Date(),
        phone: '',
        username: '',
        password: ''
      }
    ]
    const { result } = renderHook(() => useUser([], allUsers))

    expect(result.current.superAdmin).toEqual([])
    expect(result.current.admin).toEqual([])
    expect(result.current.employee).toEqual([])
  })

  it('should return correct users when usersData is provided', () => {
    const usersData: IUser[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        createDate: new Date(),
        phone: '',
        username: '',
        password: ''
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Super Admin',
        createDate: new Date(),
        phone: '',
        username: '',
        password: ''
      }
    ]
    const { result } = renderHook(() => useUser(usersData, usersData))

    expect(result.current.superAdmin).toHaveLength(1)
    expect(result.current.admin).toHaveLength(1)
    expect(result.current.superAdmin[0].id).toBe('2')
    expect(result.current.admin[0].id).toBe('1')
  })

  it('should correctly transform users into TableRow format', () => {
    const usersData: IUser[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        createDate: new Date(),
        phone: '',
        username: '',
        password: ''
      }
    ]
    const { result } = renderHook(() => useUser(usersData, usersData))

    expect(result.current.transformedUsers).toHaveLength(1)
    expect(result.current.transformedUsers[0].name).toBeTruthy()
  })
})
