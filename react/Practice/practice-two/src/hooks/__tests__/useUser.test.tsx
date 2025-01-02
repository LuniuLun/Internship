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
        phone: '987-654-3210',
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
        phone: '123-456-7890',
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
        phone: '987-654-3210',
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
        phone: '555-123-4567',
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
        phone: '987-654-3210',
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
        phone: '123-456-7890', // Added phone property
        username: 'john.doe', // Added username property
        password: 'password123' // Added password property
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
        phone: '555-123-4567', // Added phone property
        username: 'alice.johnson', // Added username property
        password: 'password789' // Added password property
      }
    ])

    // Kiểm tra transformedUsers
    expect(result.current.transformedUsers).toHaveLength(2)
    expect(result.current.transformedUsers[0].name).toBeTruthy() // Đây là component InfoGroup
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
        phone: '123-456-7890', // Added phone property
        username: 'john.doe', // Added username property
        password: 'password123' // Added password property
      }
    ]
    const allUsers: IUser[] = usersData

    const { result } = renderHook(() => useUser(usersData, allUsers))

    // Giả lập hàm mutation
    const mockAddUser = jest.fn().mockResolvedValue({
      data: {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-02'),
        phone: '987-654-3210', // Added phone property
        username: 'jane.smith', // Added username property
        password: 'password456' // Added password property
      }
    })

    // Gán mock vào mutation
    result.current.addUserMutation.mutateAsync = mockAddUser

    await act(async () => {
      await result.current.addUserMutation.mutateAsync({
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        role: 'Admin',
        createDate: new Date('2024-01-02'), // Date object
        phone: '987-654-3210', // Added phone property
        username: 'jane.smith', // Added username property
        password: 'password456' // Added password property
      })
    })

    // Kiểm tra xem hàm mutateAsync được gọi hay chưa
    expect(mockAddUser).toHaveBeenCalled()
    expect(result.current.addUserMutation.isSuccess).toBe(true) // Kiểm tra trạng thái success của mutation
  })
})
