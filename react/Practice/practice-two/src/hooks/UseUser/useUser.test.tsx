import { renderHook, waitFor } from '@testing-library/react'
import { createWrapper } from './utils'
import { useGetUser, useAddUser, useEditUser, useDeleteUser } from '@hooks'
import { filterStore } from '@stores'
import * as userService from '@services/user'
import mockUsers from '@constants/mockUsers'
import { act } from 'react'
import { IUser } from '@type/models'

jest.mock('@hooks', () => ({
  ...jest.requireActual('@hooks'),
  filterStore: jest.fn(() => ({
    searchQuery: '',
    sortBy: 'firstName',
    itemsPerPage: 10
  }))
}))

jest.mock('@services/user')
jest.mock('@stores/Filter')

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
    ;(filterStore as unknown as jest.Mock).mockReturnValue(mockFilterStore)
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
    const { result } = renderHook(() => useGetUser(), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.usersQuery.isSuccess).toBe(true)
      expect(result.current.allUsersQuery.isSuccess).toBe(true)
    })
  })

  test('should successfully add a user ', async () => {
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

    const { result } = renderHook(() => useAddUser(), {
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

    await waitFor(() => expect(result.current.addUserMutation.isSuccess).toBe(true))
  })

  test('should successfully edit a user ', async () => {
    const editedUser: IUser = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Marley',
      email: 'bob.marley.edited@example.com',
      role: 'Employee',
      createdDate: new Date('2025-01-01T00:00:00'),
      phone: '5559876543',
      username: 'bob.marley',
      password: 'password123'
    }

    const { result } = renderHook(() => useEditUser(), {
      wrapper: createWrapper()
    })

    const editUserMock = userService.editUser as jest.Mock
    editUserMock.mockResolvedValue({
      status: 'success',
      message: 'User edited successfully',
      data: editedUser
    })

    await act(async () => {
      await result.current.editUserMutation.mutateAsync(editedUser)
    })

    await waitFor(() => expect(result.current.editUserMutation.isSuccess).toBe(true))
  })

  test('should successfully delete a user ', async () => {
    const userToDelete: IUser = {
      id: '1',
      firstName: 'Bob',
      lastName: 'Marley',
      email: 'bob.marley@example.com',
      role: 'Employee',
      createdDate: new Date('2025-01-01T00:00:00'),
      phone: '5559876543',
      username: 'bob.marley',
      password: 'password123'
    }

    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: createWrapper()
    })

    const deleteUserMock = userService.deleteUser as jest.Mock
    deleteUserMock.mockResolvedValue({
      status: 'success',
      message: 'User deleted successfully',
      data: userToDelete
    })

    await act(async () => {
      await result.current.deleteUserMutation.mutateAsync(userToDelete)
    })

    await waitFor(() => expect(result.current.deleteUserMutation.isSuccess).toBe(true))
  })
})
