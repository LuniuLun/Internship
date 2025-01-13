import { renderHook, waitFor } from '@testing-library/react'
import { createWrapper } from './utils'
import { useUser } from '@hooks'
import { useFilterStore } from '@hooks'
import * as userService from '@services/user'
import mockUsers from '@constants/mockUsers'

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
})
