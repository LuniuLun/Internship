import { renderHook, waitFor } from '@testing-library/react'
import { createWrapper } from './utils'
import { useUser } from '@hooks'
import { useFilterStore } from '@hooks'
import * as userService from '@services/user'
import mockUsers from '@constants/mockUsers'
import { act } from 'react'
import { IUser } from '@type/models'

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  useFilterStore: jest.fn(() => ({
    searchQuery: '',
    sortBy: 'firstName',
    itemsPerPage: 10
  }))
}))

jest.mock('@services/user')

const mockFilterStore = {
  searchQuery: '',
  sortBy: 'firstName',
  itemsPerPage: 10
}

const successResponse = {
  status: 'success',
  message: 'Success',
  data: mockUsers
}

describe('useUser Hook', () => {
  beforeEach(() => {
    ;(useFilterStore as unknown as jest.Mock).mockReturnValue(mockFilterStore)
    ;(userService.fetchUsers as jest.Mock).mockResolvedValue({
      status: 'success',
      message: 'Success',
      data: mockUsers,
      page: 1,
      limit: 10
    })
    ;(userService.fetchAllUsers as jest.Mock).mockResolvedValue(successResponse)
  })

  test('should fetch users and return successful queries', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.usersQuery.isSuccess).toBe(true)
      expect(result.current.allUsersQuery.isSuccess).toBe(true)
    })
  })

  test('should correctly transform and categorize users', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.transformedUsers).toHaveLength(3)
    })

    expect(result.current.superAdmin).toHaveLength(1)
    expect(result.current.admin).toHaveLength(1)
    expect(result.current.employee).toHaveLength(1)

    expect(result.current.lengthAllUsers).toBe(3)
  })

  test('should successfully add a user and update the cache', async () => {
    const newUser: IUser = {
      id: '4',
      firstName: 'Bob',
      lastName: 'Marley',
      email: 'bob.marley@example.com',
      role: 'Employee',
      createdDate: new Date('2024-12-31T00:00:00'),
      phone: '5559876543',
      username: 'bob.marley',
      password: 'password123'
    }

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper()
    })

    const addUserMock = userService.addUser as jest.Mock
    addUserMock.mockResolvedValue({
      status: 'success',
      message: 'User added successfully',
      data: newUser
    })

    await act(async () => {
      await result.current.addUserMutation.mutateAsync(newUser)
    })

    await waitFor(() => {
      const transformedUsers = result.current.transformedUsers
      expect(transformedUsers).toHaveLength(4)
      expect(transformedUsers).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: '4', name: expect.anything(), role: 'Employee' })])
      )
    })

    expect(result.current.addUserMutation.isSuccess).toBe(true)
  })
})
