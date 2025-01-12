import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { addUser, editUser, deleteUser, fetchUsers, fetchAllUsers } from '@services/user'
import { useFilterStore, useUser } from '@hooks'

// Mock the services
jest.mock('@services/user')
jest.mock('@hooks', () => ({
  useFilterStore: jest.fn()
}))

// Setup mock data
const mockUsers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'Admin',
    createdDate: new Date('2024-01-01'),
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
    createdDate: new Date('2024-01-02'),
    phone: '9876543210',
    username: 'jane.smith',
    password: 'password123'
  },
  {
    id: '3',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    role: 'Employee',
    createdDate: new Date('2024-01-02'),
    phone: '5551234567',
    username: 'alice.johnson',
    password: 'password123'
  }
]

describe('useUser hook', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    jest.clearAllMocks()
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    })

    // Setup default mocks
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      searchQuery: '',
      sortBy: '',
      itemsPerPage: 10
    })

    // Mock the initial query responses
    ;(fetchUsers as jest.Mock).mockResolvedValue({
      data: mockUsers,
      page: 1,
      limit: 10
    })
    ;(fetchAllUsers as jest.Mock).mockResolvedValue({
      data: mockUsers
    })
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('should fetch and transform users correctly', async () => {
    const { result } = renderHook(() => useUser(), { wrapper })

    // Wait for initial data to be available
    await act(async () => {
      await result.current.usersQuery.fetchNextPage()
    })

    expect(result.current.transformedUsers).toHaveLength(mockUsers.length)
    expect(result.current.transformedUsers?.[0]).toHaveProperty('name')
    expect(result.current.transformedUsers?.[0]).toHaveProperty('role')
    expect(result.current.transformedUsers?.[0]).toHaveProperty('createdDate')
  })

  it('should filter users by role correctly', async () => {
    const { result } = renderHook(() => useUser(), { wrapper })

    // Wait for data to be loaded
    await act(async () => {
      await result.current.allUsersQuery.refetch()
    })

    // Wait for next render cycle
    await act(() => Promise.resolve())

    expect(result.current.superAdmin).toHaveLength(1)
    expect(result.current.admin).toHaveLength(1)
    expect(result.current.employee).toHaveLength(1)
  })

  it('should handle add user mutation successfully', async () => {
    const newUser = {
      id: '4',
      firstName: 'New',
      lastName: 'User',
      email: 'new@example.com',
      role: 'Employee',
      createdDate: new Date('2024-01-04'),
      phone: '1112223333',
      username: 'new.user',
      password: 'password123'
    }

    ;(addUser as jest.Mock).mockResolvedValue({ data: newUser })

    const { result } = renderHook(() => useUser(), { wrapper })

    await act(async () => {
      await result.current.addUserMutation.mutateAsync(newUser)
    })

    expect(addUser).toHaveBeenCalledWith(newUser)
  })

  it('should handle edit user mutation successfully', async () => {
    const updatedUser = {
      ...mockUsers[0],
      firstName: 'Updated'
    }

    ;(editUser as jest.Mock).mockResolvedValue({ data: updatedUser })

    const { result } = renderHook(() => useUser(), { wrapper })

    await act(async () => {
      await result.current.editUserMutation.mutateAsync(updatedUser)
    })

    expect(editUser).toHaveBeenCalledWith(updatedUser)
  })

  it('should handle delete user mutation successfully', async () => {
    const userToDelete = mockUsers[0]
    ;(deleteUser as jest.Mock).mockResolvedValue({ data: userToDelete })

    const { result } = renderHook(() => useUser(), { wrapper })

    await act(async () => {
      await result.current.deleteUserMutation.mutateAsync(userToDelete)
    })

    expect(deleteUser).toHaveBeenCalledWith(userToDelete.id)
  })

  it('should handle infinite query pagination', async () => {
    const secondPageUsers = [
      {
        id: '4',
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob@example.com',
        role: 'Employee',
        createdDate: new Date('2024-01-04'),
        phone: '1112223333',
        username: 'bob.wilson',
        password: 'password123'
      }
    ]

    ;(fetchUsers as jest.Mock)
      .mockResolvedValueOnce({ data: mockUsers, page: 1, limit: 10 })
      .mockResolvedValueOnce({ data: secondPageUsers, page: 2, limit: 10 })

    const { result } = renderHook(() => useUser(), { wrapper })

    await act(async () => {
      await result.current.usersQuery.fetchNextPage()
      await result.current.usersQuery.fetchNextPage()
    })

    expect(fetchUsers).toHaveBeenCalledTimes(2)
    expect(result.current.transformedUsers?.length).toBeGreaterThan(mockUsers.length)
  })

  it('should handle search query changes', async () => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue({
      searchQuery: 'John',
      sortBy: '',
      itemsPerPage: 10
    })

    const { result } = renderHook(() => useUser(), { wrapper })

    await act(async () => {
      await result.current.usersQuery.fetchNextPage()
    })

    expect(fetchUsers).toHaveBeenCalledWith(
      expect.objectContaining({
        value: 'John'
      })
    )
  })
})
