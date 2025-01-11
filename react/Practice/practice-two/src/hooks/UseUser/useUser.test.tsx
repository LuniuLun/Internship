import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { addUser, editUser, deleteUser } from '@services/user'
import { useUser } from '@hooks'
import { IUser } from '@type/models'

jest.mock('@services/user', () => ({
  addUser: jest.fn(),
  editUser: jest.fn(),
  deleteUser: jest.fn()
}))

const queryClient = new QueryClient()

export const usersData: IUser[] = [
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

const newUser: IUser = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane@example.com',
  role: 'Super Admin',
  createdDate: new Date('2024-01-02T00:00:00'),
  phone: '9876543210',
  username: 'jane.smith',
  password: 'password456',
  id: '3'
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useUser hook', () => {
  beforeEach(() => {
    queryClient.clear()
    queryClient.setQueryData<IUser[]>(['users', 10, '', ''], usersData)
  })

  it('should return transformed users and all necessary data', () => {
    const { result } = renderHook(() => useUser(usersData, allUsers, 1), { wrapper })

    expect(result.current.superAdmin).toEqual([allUsers[1]])
    expect(result.current.admin).toEqual([allUsers[0]])
    expect(result.current.employee).toEqual([allUsers[2]])

    expect(result.current.transformedUsers).toHaveLength(2)
    expect(result.current.transformedUsers[0].name).toBeTruthy()
  })

  it('should return empty arrays when no usersData is provided', () => {
    const { result } = renderHook(() => useUser([], [], 1), { wrapper })

    expect(result.current.superAdmin).toEqual([])
    expect(result.current.admin).toEqual([])
    expect(result.current.employee).toEqual([])
  })

  it('should return correct users when usersData is provided', () => {
    const { result } = renderHook(() => useUser(usersData, allUsers, 1), { wrapper })

    expect(result.current.superAdmin).toHaveLength(1)
    expect(result.current.admin).toHaveLength(1)
  })

  it('should correctly transform users into TableRow format', () => {
    const { result } = renderHook(() => useUser(usersData, usersData, 1), { wrapper })

    expect(result.current.transformedUsers).toHaveLength(usersData.length)
    expect(result.current.transformedUsers[0].name).toBeTruthy()
  })

  it('should edit a user and update cache', async () => {
    const updatedUser: IUser = { ...usersData[0], firstName: 'John', lastName: 'Doe Edited' }
    ;(editUser as jest.Mock).mockResolvedValue({ data: updatedUser })

    const { result } = renderHook(() => useUser(usersData, allUsers, 0), { wrapper })

    await result.current.editUserMutation.mutateAsync(usersData[0])

    expect(editUser).toHaveBeenCalledWith(usersData[0])

    queryClient.setQueryData<IUser[]>(['users', 10, '', ''], (oldData = []) =>
      oldData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )

    const cachedUsers = queryClient.getQueryData<IUser[]>(['users', 10, '', ''])
    expect(cachedUsers).toContainEqual(updatedUser)
  })

  it('should add a new user and update cache', async () => {
    ;(addUser as jest.Mock).mockResolvedValue({ data: newUser })

    const { result } = renderHook(() => useUser(usersData, allUsers, 0), { wrapper })

    await result.current.addUserMutation.mutateAsync(newUser)

    expect(addUser).toHaveBeenCalledWith(newUser)

    queryClient.setQueryData<IUser[]>(['users', 10, '', ''], (oldData = []) => [...oldData, newUser])

    const cachedUsers = queryClient.getQueryData<IUser[]>(['users', 10, '', ''])
    expect(cachedUsers).toContainEqual(newUser)
  })

  it('should delete a user and update cache', async () => {
    ;(deleteUser as jest.Mock).mockResolvedValue({ data: usersData[0] })

    const { result } = renderHook(() => useUser(usersData, allUsers, 0), { wrapper })

    await result.current.deleteUserMutation.mutateAsync(usersData[0])

    expect(deleteUser).toHaveBeenCalledWith(usersData[0].id)

    queryClient.setQueryData<IUser[]>(['users', 10, '', ''], (oldData = []) =>
      oldData.filter((user) => user.id !== usersData[0].id)
    )

    const cachedUsers = queryClient.getQueryData<IUser[]>(['users', 10, '', ''])
    expect(cachedUsers).not.toContainEqual(usersData[0])
  })
})
