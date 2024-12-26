import { IApiResponse } from '@type/apiResponse'
import MESSAGE from '@constants/message'
import { IUser } from '@type/models'
import { IFilterOptions } from '@type/filterOptions'

const baseUrl = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_USER_ENDPOINT}`

export const fetchUsers = async (
  params: IFilterOptions = {
    page: '1',
    limit: '10',
    order: 'asc'
  }
): Promise<IApiResponse<IUser[]>> => {
  try {
    const { property = '', value = '', sortBy = '', order = 'asc', limit = '10', page = '1' } = params

    const calledUrl = new URL(baseUrl)
    calledUrl.searchParams.append('page', page)
    calledUrl.searchParams.append('limit', limit)

    if (property && value) {
      calledUrl.searchParams.append(property, value)
    }

    if (sortBy) {
      calledUrl.searchParams.append('sortBy', sortBy)
      calledUrl.searchParams.append('order', order)
    }

    const response = await fetch(calledUrl.toString())

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.user.GET_FAILED
      }
    }

    const data = await response.json()

    return {
      status: 'success',
      message: MESSAGE.user.GET_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : MESSAGE.common.UNKNOWN_ERROR
    }
  }
}

export const fetchAllUsers = async (property?: string, value?: string): Promise<IApiResponse<IUser[]>> => {
  try {
    const calledUrl = new URL(baseUrl)
    if (property && value) {
      calledUrl.searchParams.append(property, value)
    }
    const response = await fetch(calledUrl)

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.user.GET_FAILED
      }
    }

    const data = await response.json()

    return {
      status: 'success',
      message: MESSAGE.user.GET_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : MESSAGE.common.UNKNOWN_ERROR
    }
  }
}

export const addUser = async (newUser: IUser): Promise<IApiResponse<IUser>> => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.user.ADD_FAILED
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.user.ADD_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : MESSAGE.common.UNKNOWN_ERROR
    }
  }
}

export const editUser = async (newUser: IUser): Promise<IApiResponse<IUser>> => {
  try {
    if (!newUser.id) {
      throw new Error('User ID is required for editing.')
    }

    const response = await fetch(`${baseUrl}/${newUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.user.EDIT_FAILED
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.user.EDIT_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : MESSAGE.common.UNKNOWN_ERROR
    }
  }
}

export const deleteUser = async (id: string): Promise<IApiResponse<IUser>> => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      return {
        status: 'error',
        message: MESSAGE.user.DELETE_FAILED
      }
    }

    const data = await response.json()
    return {
      status: 'success',
      message: MESSAGE.user.DELETE_SUCCESS,
      data
    }
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : MESSAGE.common.UNKNOWN_ERROR
    }
  }
}
