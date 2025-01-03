import { fetchUsers, fetchAllUsers, addUser, editUser, deleteUser } from '@services/user'
import { IUser } from '@type/models'

global.fetch = jest.fn()

const mockUser: IUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'Admin',
  createDate: new Date('2024-01-01T00:00:00'),
  phone: '0987654321',
  username: 'john_doe',
  password: 'password123'
}

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetchUsers should return user data on success', async () => {
    const mockApiResponse = {
      users: [mockUser]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const result = await fetchUsers()
    expect(result.status).toBe('success')
    expect(result.data).toEqual(mockApiResponse)
    expect(result.message).toBeTruthy()
  })

  it('fetchUsers should return error message on failure', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({})
    })

    const result = await fetchUsers()
    expect(result.status).toBe('error')
    expect(result.message).toBeTruthy()
  })

  it('fetchAllUsers should return all users on success', async () => {
    const mockApiResponse = {
      users: [mockUser]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const result = await fetchAllUsers()
    expect(result.status).toBe('success')
    expect(result.data).toEqual(mockApiResponse)
    expect(result.message).toBeTruthy()
  })

  it('addUser should return success on adding a user', async () => {
    const mockApiResponse = {
      users: [mockUser]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const result = await addUser(mockUser)
    expect(result.status).toBe('success')
    expect(result.data).toEqual(mockApiResponse)
    expect(result.message).toBeTruthy()
  })

  it('addUser should return error on failure', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({})
    })

    const result = await addUser(mockUser)
    expect(result.status).toBe('error')
    expect(result.message).toBeTruthy()
  })

  it('editUser should update a user successfully', async () => {
    const mockApiResponse = {
      users: [mockUser]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const result = await editUser(mockUser)
    expect(result.status).toBe('success')
    expect(result.data).toEqual(mockApiResponse)
    expect(result.message).toBeTruthy()
  })

  it('editUser should return error if user ID is missing', async () => {
    const result = await editUser({} as IUser)
    expect(result.status).toBe('error')
    expect(result.message).toBeTruthy()
  })

  it('deleteUser should delete a user successfully', async () => {
    const mockApiResponse = {
      users: [mockUser]
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    })

    const result = await deleteUser(mockUser.id)
    expect(result.status).toBe('success')
    expect(result.data).toEqual(mockApiResponse)
    expect(result.message).toBeTruthy()
  })

  it('deleteUser should return error if user is not found', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({})
    })

    const result = await deleteUser(mockUser.id)
    expect(result.status).toBe('error')
    expect(result.message).toBeTruthy()
  })
})
